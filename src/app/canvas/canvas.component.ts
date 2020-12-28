import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SceneService } from '../services/scene.service';
import { Scene, Shape, Rectangle, Circle } from '../types';

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
    scene.forEach((shape: Shape) => {
      if (shape.type === 'Rectangle') {
        this.drawRect(shape);
      }
      if (shape.type === 'Circle') {
        this.drawCircle(shape);
      }
    });
  }

  clear(): void {
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  drawRect(shape: Rectangle): void {
    const { color, x, y, width, height } = shape;
    if (this.ctx) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    }
  }

  drawCircle(shape: Circle): void {
    const { color, x, y, radius } = shape;
    if (this.ctx) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  handleClick(event: MouseEvent): void {
    if (this.canvasRef) {
      const domRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - domRect.x;
      const y = event.clientY - domRect.y;
      console.log(`canvas clicked at ${x}, ${y}`);
    }
  }
}
