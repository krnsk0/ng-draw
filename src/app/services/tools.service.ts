import { Injectable } from '@angular/core';
import { tools } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  // what tool is currenetly selected?
  public selectedTool: tools = 'select';

  // when a shape is selected, how many times has the user
  // clicked the canvas to create a shape?
  public shapeClickCount: 0 | 1 | 2 = 0;

  // is either shift key depresssed?
  public lShift = false;
  public rShift = false;

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
}
