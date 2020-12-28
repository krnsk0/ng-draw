import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  width = 500;
  height = 500;

  constructor() {}

  ngOnInit(): void {
    if (this.canvas) {
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (ctx) {
        this.ctx = ctx;
      }
    }

    setTimeout(() => {
      this.drawRect('black', 100, 100, 200, 200);
      this.drawCircle('brown', 250, 250, 100);
    }, 0);
  }

  clear(): void {
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  drawRect(color: string, x1: number, y1: number, x2: number, y2: number): void {
    if (this.ctx) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x1, y1, x2, y2);
    }
  }

  drawCircle(color: string, x: number, y: number, radius: number): void {
    if (this.ctx) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}
