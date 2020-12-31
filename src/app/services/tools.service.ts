import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  // is either shift key depresssed?
  public lShift = false;
  public rShift = false;

  // is mouse down?
  public clickState = false;

  // mouse positions
  public prevMouseCoords: [number, number] | false = false;
  public curMouseCoords: [number, number] | false = false;

  // how long was mouse down
  public mousedownTimestamp = 0;

  constructor() {
    // set up shift key listeners
    // is the constructor the right place to be doing this?
    // probably not
    // also we never unsubscribe these...
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ShiftLeft') this.lShift = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ShiftLeft') this.lShift = false;
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ShiftRight') this.rShift = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ShiftRight') this.rShift = false;
    });
  }

  setCurrentCoords(x: number, y: number): void {
    this.prevMouseCoords = this.curMouseCoords;
    this.curMouseCoords = [x, y];
  }

  registerClick(): void {
    this.mousedownTimestamp = Date.now();
  }
}
