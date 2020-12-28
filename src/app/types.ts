export type Rectangle = {
  type: 'Rectangle';
  color: string;
  selected?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export type Circle = {
  type: 'Circle';
  color: string;
  selected?: boolean;
  x: number;
  y: number;
  radius: number;
};

export type Shape = Rectangle | Circle;

export type Scene = Shape[];
