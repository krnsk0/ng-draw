import { v4 as uuidv4 } from 'uuid';
import { hslTriple } from '../types';

export abstract class Shape {

  /**
   * For the editor we're drawing a very hard line between the data layer and presentation logic:
   * The "ShapeModel" class would only have the properties id, kind, hslColor.
   *  The ShapeModel class should only be concerned with the data itself not with how it's displayed.
   *  Some examples for methods that I'd expect on a model class:
   *    - serialize, deserialize, toString
   *    - makeIndependentCopy, freeze
   *    - setColor, setRandomColor
   * The ui logic around how that data is displayed is a completely separate deal. To archieve smth similar to
   *  what you've implemented below, I'd build a second class that has the array of shapes as a property and additional
   *  properties for the "selected" state etc.
   * This might also clarify some confusion around when to update the state: The model should be updated when
   *  the shape has changed (e.g. width, height, color, ...). The ui/tool state (e.g. hovered, selected) should be 
   *  updated everytime the state changes.
   * When displaying the shape obviously both of these informations are relevant to how things are displayed, which is
   *  why the presentaition logic frequently needs to accumulate model and state updates. You'll often find code like
   *  this in component classes
   *  ```
   *  combineLatest(
   *    this.model,  // observable
   *    this.selected  // observable
   *  ).subscribe(() => doSmth())
   *  ```
   *  Alternatively you would to smth like this in your html template:
   *  ```
   *  <my-shape [selected]="selected | async" [color]="(model | async).hslColor"></my-shape>
   *  ```
   *  which is just a different way of accumulating updates to the model and the tool state
   */

  public readonly id: string;
  public readonly kind: string;
  public selected = false;
  public hovered = false;
  // I'd call that just "color" since it's clear from the type how that data should be interpreted
  //  -> even better: if hslColor is a class that class can provide methods for interpreting the values
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
