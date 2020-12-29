import { v4 as uuidv4 } from 'uuid';

export abstract class Shape {
  public readonly id: string;
  public readonly type: string;

  // do we need getters/setters here?
  // probably not
  public selected = false;
  public hovered = false;
  public color: string;

  constructor(type: string, color: string) {
    this.id = uuidv4();
    this.type = type;
    this.color = color;
  }

  abstract drawHoverHalo(ctx: CanvasRenderingContext2D): void;
  abstract drawSelectionHalo(ctx: CanvasRenderingContext2D): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInShape(x: number, y: number): boolean;
}

export type Scene = Shape[];
