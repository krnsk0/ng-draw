import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  width = 500;
  height = 500;

  constructor(private sceneService: SceneService, private toolsService: ToolsService) {}

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

  // repetition below is slightly annoying and bad, fix it

  handleMousedown(event: MouseEvent): void {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      this.toolsService.clickState = true;
      this.sceneService.canvasMousedown(x, y);
    }
  }

  handleMove(event: MouseEvent): void {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      this.sceneService.canvasMove(x, y);
    }
  }

  handleMouseup(event: MouseEvent): void {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      this.toolsService.clickState = false;
      this.sceneService.canvasMouseup(x, y);
    }
  }
}
