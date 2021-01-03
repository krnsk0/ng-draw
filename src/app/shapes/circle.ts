import { Shape } from './shape';
import {
  selectionHaloColor,
  selectionHaloSize,
  hoverHaloColor,
  hoverHaloSize,
  minCircleRadius,
  maxCircleRadius,
} from '../constants';
import { hslTriple } from '../types';
import { random } from '../utils';

export class Circle extends Shape {
  constructor(
    hslColor: [number, number, number],
    public x: number,
    public y: number,
    public radius: number
  ) {
    super('Circle', hslColor);
  }

  static generateRandomShape(xMax: number, yMax: number): Circle {
    const hslColor: hslTriple = [random(360), random(100), random(100)];
    const x = random(xMax);
    const y = random(yMax);
    const radius = random(maxCircleRadius / 3) + minCircleRadius;
    return new Circle(hslColor, x, y, radius);
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
    const { hslColor, x, y, radius } = this;
    ctx.fillStyle = Shape.convertColorTripleToString(hslColor);
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
