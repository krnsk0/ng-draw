import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { canvasWidth, canvasHeight, canvasBackgroundColor } from '../../constants';
import { Circle, Rectangle } from '../../shapes';
import { Subscription } from 'rxjs';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { Scene, Shape } from '../../shapes';
import { toolTypes, cursorTypes } from '../../types';
import { euclideanDistance } from '../../utils';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private readonly canvasRef: ElementRef<HTMLCanvasElement> | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private subscription: Subscription | null = null;
  readonly width = canvasWidth;
  readonly height = canvasHeight;

  constructor(private sceneService: SceneService, public toolsService: ToolsService) {}

  get cursorStyle(): cursorTypes {
    if (this.toolsService.toolMode === 'select') {
      return 'default';
    } else {
      return 'crosshair';
    }
  }

  ngOnInit(): void {
    if (this.canvasRef) {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (ctx) this.ctx = ctx;
    }

    this.subscription = this.sceneService.scene$.subscribe((nextScene) => {
      this.updateScene(nextScene);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Helepr which calculates the element-relative x, y coords of a
   * cavnas interaction from an event which represents an interaction
   * with the canvas
   */
  private calculateRelativeCoords(event: MouseEvent): [number, number] | undefined {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      return [x, y];
    }
    return;
  }

  /**
   * Wipes the canvas and updates it. The actual drawing is
   * handled by the shape classes-- we just pass the canvas
   * context object in, here
   */
  updateScene(scene: Scene): void {
    this.clear();

    scene.forEach((shape: Shape) => {
      if (this.ctx) {
        shape.drawHoverHalo(this.ctx);
        shape.drawSelectionHalo(this.ctx);
        shape.draw(this.ctx);
      }
    });
  }

  /**
   * Overwrites whatever is on the canvas with the canvas' configured
   * background color
   */
  clear(): void {
    if (this.ctx) {
      this.ctx.fillStyle = canvasBackgroundColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  /**
   * This handles dragging a selection on the canvas based on a
   * delta computed from the previous mouse position as stored in
   * the tool service
   */
  dragSelection(x: number, y: number): void {
    if (this.toolsService.prevMouseCoords) {
      const [prevX, prevY] = this.toolsService.prevMouseCoords;

      // move selected shapes
      this.sceneService.sceneState
        .filter((shape) => shape.selected)
        .forEach((shape) => {
          shape.move(x - prevX, y - prevY);
        });
    }
  }

  /**
   * Upates toolService's state, selects or deselects shapes
   * as needed when user clicks on canvas
   */
  handleSelectMousedown(coords: [number, number]): void {
    const [x, y] = coords;
    const shape = this.sceneService.findTopmostShapeUnderCursor(x, y);

    // deselects previous selection when user's click
    // is on an unselected shape (w/out shift)
    if (shape && !shape.selected && !this.toolsService.shift()) {
      this.sceneService.deselectAllShapes();
    }

    if (shape) {
      shape.selected = true;
    }

    if (!shape) {
      this.sceneService.deselectAllShapes();
    }

    this.sceneService.pushSceneUpdate();
  }

  /**
   * Handle mousedown click on a shape
   * Initiates a drag that creates a shape
   * Stores the uuid of the temp shape
   * for modification/destruction later
   */
  handleShapeMousedown(coords: [number, number], toolName: toolTypes): void {
    const [x, y] = coords;
    if (this.toolsService.toolMode === 'circle') {
      const circle = new Circle(this.toolsService.selectedColor, x, y, 5);
      this.toolsService.tempShapeUuid = circle.id;
      this.sceneService.sceneState = [...this.sceneService.sceneState, circle];
      this.sceneService.pushSceneUpdate();
    }
    if (this.toolsService.toolMode === 'rectangle') {
      const rect = new Rectangle(this.toolsService.selectedColor, x, y, 5, 5);
      this.toolsService.tempShapeUuid = rect.id;
      this.sceneService.sceneState = [...this.sceneService.sceneState, rect];
      this.sceneService.pushSceneUpdate();

      // store click coords to help with dragging later
      this.toolsService.mousedownCoords = [x, y];
    }
  }

  /**
   * Delegate mousedown clicks to the appropriate
   * handler depending on the selected tool
   */
  handleMousedown(event: MouseEvent): void {
    const coords = this.calculateRelativeCoords(event);
    this.toolsService.clickState = true;
    if (coords) {
      this.toolsService.setCurrentCoords(...coords);
      // delegate to correct method
      if (this.toolsService.toolMode === 'select') {
        this.handleSelectMousedown(coords);
      } else {
        this.handleShapeMousedown(coords, this.toolsService.toolMode);
      }
    }
  }

  /**
   * Handler for mousemove events when tool is select
   */
  handleSelectMove(coords: [number, number]): void {
    const [x, y] = coords;

    if (!this.toolsService.clickState) {
      this.sceneService.hoverShape(x, y);
    }
    if (this.toolsService.clickState) {
      this.dragSelection(x, y);
    }

    this.sceneService.pushSceneUpdate();
  }

  /**
   * Handles dragging when creating a new shape
   */
  handleShapeMove(coords: [number, number], toolName: toolTypes): void {
    const [x, y] = coords;
    const shape = this.sceneService.sceneState.find(
      (s) => s.id === this.toolsService.tempShapeUuid
    );

    // Only run when mouse button is down...
    // Check for 'shape' is just a non-null check,
    // but typeguards for shape type needed because some
    // stuff doesn't exist on Shape, only on subclasses
    if (this.toolsService.clickState && shape) {
      if (this.toolsService.toolMode === 'circle' && Circle.isCircle(shape)) {
        // adjust radius
        const radius = euclideanDistance(x, y, shape.x, shape.y);
        shape.radius = radius;
      }
      if (
        this.toolsService.toolMode === 'rectangle' &&
        Rectangle.isRectangle(shape) &&
        this.toolsService.mousedownCoords
      ) {
        const [initialX, initialY] = this.toolsService.mousedownCoords;
        // adjust rectangle points
        // cursor is to the right of shape's x
        if (x > initialX) shape.width = x - initialX;
        if (x < initialX) {
          shape.x = x;
          shape.width = initialX - x;
        }

        // cursor is below shape's y
        if (y > initialY) shape.height = y - initialY;
        if (y < initialY) {
          shape.y = y;
          shape.height = initialY - y;
        }
      }
    }

    this.sceneService.pushSceneUpdate();
  }

  /**
   * Upates toolService's state, initiates drags if needed
   * when the use moves the mouse over the canvas
   */
  handleMove(event: MouseEvent): void {
    const coords = this.calculateRelativeCoords(event);
    if (coords) {
      this.toolsService.setCurrentCoords(...coords);

      // delegate to correct method
      if (this.toolsService.toolMode === 'select') {
        this.handleSelectMove(coords);
      } else {
        this.handleShapeMove(coords, this.toolsService.toolMode);
      }
    }
  }

  /**
   * Upates toolService's state when the user
   * releases the mouse button
   */
  handleMouseup(event: MouseEvent): void {
    const coords = this.calculateRelativeCoords(event);
    this.toolsService.clickState = false;
    if (coords) {
      this.toolsService.setCurrentCoords(...coords);

      // which tool is selected?
      if (this.toolsService.toolMode === 'select') {
        // no-op, for now
      } else {
        // no-op, for now
      }
    }
  }
}
