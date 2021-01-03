import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { canvasWidth, canvasHeight, canvasBackgroundColor } from '../../constants';
import { Subscription } from 'rxjs';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { Scene, Shape } from '../../shapes';
import { toolTypes } from '../../types';

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
   */
  handleShapeMousedown(coords: [number, number], toolName: toolTypes): void {
    // TODO
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
      if (this.toolsService.toolMode) {
        this.handleSelectMousedown(coords);
      } else {
        this.handleShapeMousedown(coords, this.toolsService.toolMode);
      }
    }
  }

  handleSelectMove(coords: [number, number]): void {
    const [x, y] = coords;

    // the old move method
    if (!this.toolsService.clickState) {
      this.sceneService.hoverShape(x, y);
    }
    if (this.toolsService.clickState) {
      this.dragSelection(x, y);
    }

    this.sceneService.pushSceneUpdate();
  }

  /**
   * Handle shape move
   */
  handleShapeMove(coords: [number, number], toolName: toolTypes): void {}

  /**
   * Upates toolService's state, initiates drags if needed
   * when the use moves the mouse over the canvas
   */
  handleMove(event: MouseEvent): void {
    const coords = this.calculateRelativeCoords(event);
    if (coords) {
      this.toolsService.setCurrentCoords(...coords);

      // delegate to correct method
      if (this.toolsService.toolMode) {
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

      // delegate to correct method
      if (this.toolsService.toolMode) {
        // TODO
      } else {
        // TODO
      }
    }
  }
}
