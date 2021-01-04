import { Shape } from './shape';
import {
  selectionHaloColor,
  selectionHaloSize,
  hoverHaloColor,
  hoverHaloSize,
  minRectangleSide,
  maxRectangleSide,
} from '../constants';
import { hslTriple } from '../types';
import { random, convertColorTripleToString } from '../utils';

export class Rectangle extends Shape {
  constructor(
    hslColor: hslTriple,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super('Rectangle', hslColor);
  }

  static isRectangle(s: Shape): s is Rectangle {
    return s instanceof Rectangle;
  }

  serialize(): string {
    const jsonString = JSON.stringify(
      {
        type: this.type,
        hslColor: this.hslColor,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      },
      null,
      2
    );
    console.log('jsonString: ', jsonString);
    return jsonString;
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
    const { hslColor, x, y, width, height } = this;
    ctx.fillStyle = convertColorTripleToString(hslColor);
    ctx.fillRect(x, y, width, height);
  }

  isPointInShape(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }

  setWidthFactory(): (width: number) => void {
    return (width: number) => {
      this.width = width;
    };
  }

  setHeightFactory(): (height: number) => void {
    return (height: number) => {
      this.height = height;
    };
  }
}
