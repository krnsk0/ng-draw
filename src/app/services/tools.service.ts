import { Injectable } from '@angular/core';
import { tools } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  // what tool is currenetly selected?
  public selectedTool: tools = 'select';

  // is either shift key depresssed?
  public lShift = false;
  public rShift = false;

  // is mouse down?
  public clickState = false;

  // mouse positions
  public prevMouseCoords: [number, number] | false = false;
  public curMouseCoords: [number, number] | false = false;

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

  selectTool(toolName: tools): void {
    this.selectedTool = toolName;
  }

  setCurrentCoords(x: number, y: number): void {
    this.prevMouseCoords = this.curMouseCoords;
    this.curMouseCoords = [x, y];
  }
}
