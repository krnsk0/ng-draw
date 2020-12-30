import { Injectable } from '@angular/core';
import { tools } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  public selectedTool: tools = 'select';
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

  toolClickHandler(toolName: tools): void {
    this.selectedTool = toolName;
  }
}
