import { Shape } from './shape';

export class Rectangle extends Shape {
  constructor(
    color: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super('Rectangle', color);
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
