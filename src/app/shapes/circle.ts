import { Shape } from './shape';

export class Circle extends Shape {
  constructor(private color: string, private x: number, private y: number, private radius: number) {
    super('Circle');
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { color, x, y, radius } = this;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  isPointInShape(x: number, y: number): boolean {
    const distanceFromCenter = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    return distanceFromCenter <= this.radius;
  }
}
