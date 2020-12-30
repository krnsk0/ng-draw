import { Shape } from './shape';
import { selectionHaloColor, selectionHaloSize, hoverHaloColor, hoverHaloSize } from '../constants';
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

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  drawHoverHalo(ctx: CanvasRenderingContext2D): void {
    if (this.hovered) {
      const { x, y, width, height } = this;
      ctx.fillStyle = hoverHaloColor;
      ctx.fillRect(
        x - hoverHaloSize / 2,
        y - hoverHaloSize / 2,
        width + hoverHaloSize,
        height + hoverHaloSize
      );
    }
  }

  drawSelectionHalo(ctx: CanvasRenderingContext2D): void {
    if (this.selected) {
      const { x, y, width, height } = this;
      ctx.fillStyle = selectionHaloColor;
      ctx.fillRect(
        x - selectionHaloSize / 2,
        y - selectionHaloSize / 2,
        width + selectionHaloSize,
        height + selectionHaloSize
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { color, x, y, width, height } = this;
    // draw main shape
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  isPointInShape(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}
