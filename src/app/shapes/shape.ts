import { v4 as uuidv4 } from 'uuid';

export abstract class Shape {
  readonly id: string;
  readonly type: string;
  private selected = false;

  constructor(type: string) {
    this.id = uuidv4();
    this.type = type;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInShape(x: number, y: number): boolean;
}

export type Scene = Shape[];
