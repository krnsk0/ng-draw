import { Shape } from './shape';
import { selectionHaloColor, selectionHaloSize, hoverHaloColor, hoverHaloSize } from '../constants';
import { hslTriple } from '../types';
import { convertColorTripleToString } from '../utils';

export type serializedCircle = {
  kind: 'Circle';
  hslColor: hslTriple;
  x: number;
  y: number;
  radius: number;
};

export class Circle extends Shape {
  constructor(hslColor: hslTriple, public x: number, public y: number, public radius: number) {
    super('Circle', hslColor);
  }

  static isCircle(s: Shape): s is Circle {
    return s instanceof Circle;
  }

  getSerializeables(): serializedCircle {
    return {
      kind: 'Circle',
      hslColor: this.hslColor,
      x: this.x,
      y: this.y,
      radius: this.radius,
    };
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
    ctx.fillStyle = convertColorTripleToString(hslColor);
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
