import { Injectable } from '@angular/core';
import { toolTypes, cursorTypes, hslTriple } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  // is either shift key depresssed?
  public lShift = false;
  public rShift = false;

  // is mouse down?
  public clickState = false;

  // mouse positions; helps with dragging
  public prevMouseCoords: [number, number] | false = false;
  public curMouseCoords: [number, number] | false = false;

  // tool mode / cursor state
  public toolMode: toolTypes = 'select';
  public tempShapeUuid: string | null = null; // uuid of shape being drawn
  public mousedownCoords: [number, number] | null = null; // needed for rectangle dragging... ☹️

  // what color is selected
  selectedColor: hslTriple = [0, 0, 0];

  /**
   * Because there are no lifecycle methods for singleton services
   * we never unsubscribe. Not a problem-- yet. Might need to move
   * subscriptions elsewhere in future
   */
  constructor() {
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

  /**
   * Stores current & last mouse coords
   */
  setCurrentCoords(x: number, y: number): void {
    this.prevMouseCoords = this.curMouseCoords;
    this.curMouseCoords = [x, y];
  }

  /**
   * Is either shift key down
   */
  shift(): boolean {
    return this.lShift || this.rShift;
  }

  /**
   * Set active tool
   */
  selectTool(toolName: toolTypes): void {
    this.toolMode = toolName;
  }
}
