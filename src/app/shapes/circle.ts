import { Shape } from './shape';
import { selectionHaloColor, selectionHaloSize, hoverHaloColor, hoverHaloSize } from '../constants';
export class Circle extends Shape {
  constructor(color: string, public x: number, public y: number, public radius: number) {
    super('Circle', color);
  }

  drawHoverHalo(ctx: CanvasRenderingContext2D): void {
    if (this.selected) {
      const { x, y, radius } = this;
      ctx.fillStyle = hoverHaloColor;
      ctx.beginPath();
      ctx.arc(x, y, radius + hoverHaloSize / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  drawSelectionHalo(ctx: CanvasRenderingContext2D): void {
    if (this.selected) {
      const { x, y, radius } = this;
      ctx.fillStyle = selectionHaloColor;
      ctx.beginPath();
      ctx.arc(x, y, radius + selectionHaloSize / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
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
