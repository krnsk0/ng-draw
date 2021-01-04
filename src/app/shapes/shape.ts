import { v4 as uuidv4 } from 'uuid';
import { hslTriple } from '../types';

export abstract class Shape {
  public readonly id: string;
  public readonly type: string;
  public selected = false;
  public hovered = false;
  public hslColor: hslTriple;

  constructor(type: string, hslColor: hslTriple) {
    this.id = uuidv4();
    this.type = type;
    this.hslColor = hslColor;
  }

  abstract serialize(): string;
  abstract drawHoverHalo(ctx: CanvasRenderingContext2D): void;
  abstract drawSelectionHalo(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInShape(x: number, y: number): boolean;
  abstract move(dx: number, dy: number): void;
}

export type Scene = Shape[];
