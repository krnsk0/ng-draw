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
}

export class Rectangle extends Shape {
  constructor(
    private color: string,
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {
    super('Rectangle');
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { color, x, y, width, height } = this;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
}

export class Circle extends Shape {
  constructor(private color: string, private x: number, private y: number, private radius: number) {
    super('Circle');
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { color, x, y, radius } = this;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export type Scene = Shape[];
