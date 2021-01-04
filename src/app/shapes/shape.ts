import { v4 as uuidv4 } from 'uuid';
import { hslTriple } from '../types';

export abstract class Shape {
  public readonly id: string;
  public readonly kind: string;
  public selected = false;
  public hovered = false;
  public hslColor: hslTriple;

  constructor(kind: string, hslColor: hslTriple) {
    this.id = uuidv4();
    this.kind = kind;
    this.hslColor = hslColor;
  }

  abstract getSerializeables(): any; // narrowed in subclass
  abstract drawHoverHalo(ctx: CanvasRenderingContext2D): void;
  abstract drawSelectionHalo(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInShape(x: number, y: number): boolean;
  abstract move(dx: number, dy: number): void;
}

export type Scene = Shape[];
