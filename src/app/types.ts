export type Rectangle = {
  type: 'Rectangle';
  id: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selected?: boolean;
};

export type Circle = {
  type: 'Circle';
  id: number;
  color: string;
  x: number;
  y: number;
  radius: number;
  selected?: boolean;
};

export type Shape = Rectangle | Circle;

export type Scene = Shape[];
