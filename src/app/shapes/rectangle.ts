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
}
