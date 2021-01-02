import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { canvasWidth, canvasHeight } from '../../constants';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { Scene, Shape } from '../../shapes';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement> | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  width = canvasWidth;
  height = canvasHeight;

  constructor(private sceneService: SceneService, public toolsService: ToolsService) {}

  ngOnInit(): void {
    if (this.canvasRef) {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (ctx) this.ctx = ctx;
    }

    this.sceneService.scene$.subscribe((nextScene) => {
      this.updateScene(nextScene);
    });
  }

  updateScene(scene: Scene): void {
    // clean slate
    this.clear();

    // draw stuff
    scene.forEach((shape: Shape) => {
      if (this.ctx) {
        shape.drawHoverHalo(this.ctx);
        shape.drawSelectionHalo(this.ctx);
        shape.draw(this.ctx);
      }
    });
  }

  clear(): void {
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  private calculateRelativeCoords(event: MouseEvent): [number, number] | undefined {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      return [x, y];
    }
    return;
  }

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

  handleMousedown(event: MouseEvent): void {
    this.toolsService.registerClick();
    const coords = this.calculateRelativeCoords(event);
    this.toolsService.clickState = true;
    if (coords) {
      this.toolsService.setCurrentCoords(...coords);

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
  }

  handleMove(event: MouseEvent): void {
    const coords = this.calculateRelativeCoords(event);
    if (coords) {
      const [x, y] = coords;
      this.toolsService.setCurrentCoords(...coords);

      // the old move method
      if (!this.toolsService.clickState) {
        this.sceneService.hoverShape(x, y);
      }
      if (this.toolsService.clickState) {
        this.dragSelection(x, y);
      }

      this.sceneService.pushSceneUpdate();
    }
  }

  handleMouseup(event: MouseEvent): void {
    const coords = this.calculateRelativeCoords(event);
    this.toolsService.clickState = false;
    if (coords) {
      this.toolsService.setCurrentCoords(...coords);
    }
  }
}
