
// should be a class.
// Also I'd have implemented this as an object so that values are indexed by a property name instead of numerical index
export type hslTriple = [number, number, number];
// like this:
export class HSLColor {
  constructor(public h: number, public s: number, public l: number) {
  }

  /**
   * this replaces convertColorTripleToString from utils
   */
  toString(): string {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }

  /**
   * we could also do something like this:
   */
  static fromRGB(rgbColor: undefined): HSLColor {
    return new HSLColor(0, 0, 0); // just a stub
  }
}


export type toolTypes = 'select' | 'rectangle' | 'circle';
// TODO: remove unused
export type cursorTypes = 'grab' | 'grabbing' | 'crosshair' | 'default' | 'pointer' | 'copy';
