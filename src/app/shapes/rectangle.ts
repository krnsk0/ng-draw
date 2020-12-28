import { Shape } from './shape';

export class Rectangle extends Shape {
  constructor(
    private color: string,
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {
    super('Rectangle');
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { color, x, y, width, height } = this;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  isPointInShape(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}
