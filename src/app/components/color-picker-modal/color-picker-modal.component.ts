import { Component, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { hslTriple } from '../../types';
import { convertColorTripleToString } from '../../utils';

@Component({
  selector: 'app-color-picker-modal',
  templateUrl: './color-picker-modal.component.html',
  styleUrls: ['./color-picker-modal.component.css'],
})
export class ColorPickerModalComponent implements OnChanges {
  @Input() initialColor: null | hslTriple = null; // you can define a setter for the input property instead of using ngOnChanges

  // I like this portion of the interface
  @Output() pickerCancel = new EventEmitter<null>();
  @Output() pickerConfirm = new EventEmitter<hslTriple>();

  currentColor: hslTriple = [0, 0, 0];  // should be observable
  convertColorTripleToString = convertColorTripleToString;

  constructor(public sceneService: SceneService) {}

  /**
   * When parent updates color input, set current color
   *
   * Using a current color keeps us from accidentally mutating the
   * triple passed in
   */
  ngOnChanges(): void {
    if (this.initialColor) {
      this.currentColor = this.initialColor;
    }
  }

  /**
   * Close modal without returning anything
   */
  cancelModal(): void {
    this.pickerCancel.emit(null);
  }

  /**
   * Close modal, pass new color
   */
  okModal(): void {
    this.pickerConfirm.emit(this.currentColor);
  }

  /**
   * Handle input events from the color sliders
   */
  handleColorInput(tripleIndex: number, $event: Event): void {
    const value = +($event.target as HTMLInputElement).value;

    // we copy, mutate the copy, and then replace in state
    // to allow change detection to work
    const colorCopy: hslTriple = [this.currentColor[0], this.currentColor[1], this.currentColor[2]];
    colorCopy[tripleIndex] = +value;
    this.currentColor = colorCopy;
  }
}
