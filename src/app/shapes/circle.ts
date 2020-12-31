import { Shape } from './shape';
import {
  selectionHaloColor,
  selectionHaloSize,
  hoverHaloColor,
  hoverHaloSize,
  minCircleRadius,
  maxCircleRadius,
} from '../constants';
export class Circle extends Shape {
  constructor(color: string, public x: number, public y: number, public radius: number) {
    super('Circle', color);
  }

  static generateRandomShape(xMax: number, yMax: number): Circle {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const x = Math.floor(Math.random() * Math.floor(xMax));
    const y = Math.floor(Math.random() * Math.floor(yMax));
    const radius = Math.floor(Math.random() * Math.floor(maxCircleRadius / 3)) + minCircleRadius;
    return new Circle(color, x, y, radius);
  }

  static isCircle(s: Shape): s is Circle {
    return s instanceof Circle;
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  drawHoverHalo(ctx: CanvasRenderingContext2D): void {
    if (this.hovered) {
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

  setRadiusFactory(): (radius: number) => void {
    return (radius: number) => {
      this.radius = radius;
    };
  }
}
