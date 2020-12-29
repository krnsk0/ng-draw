import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SceneService } from '../services/scene.service';
import { Scene, Shape } from '../shapes';

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

  constructor(private sceneService: SceneService) {}

  ngOnInit(): void {
    if (this.canvasRef) {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (ctx) this.ctx = ctx;
    }

    this.sceneService.getSceneObservable().subscribe((nextScene) => {
      this.updateScene(nextScene);
    });
  }

  updateScene(scene: Scene): void {
    this.clear();

    // draw selected hapes
    scene.forEach((shape: Shape) => {
      if (this.ctx) {
        shape.drawSelectionHalo(this.ctx);
        shape.drawHoverHalo(this.ctx);
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

  handleClick(event: MouseEvent): void {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      this.sceneService.selectClick(x, y);
    }
  }

  handleHover(event: MouseEvent): void {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      this.sceneService.hover(x, y);
    }
  }
}
