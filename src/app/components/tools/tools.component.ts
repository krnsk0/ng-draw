import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { hslTriple, toolTypes } from '../../types';
import { convertColorTripleToString, makeRandomHslColor } from '../../utils';
import { selectedToolBackgroundColor } from '../../constants';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  // color picker modal state & initial color
  pickerModalState: null | hslTriple = null; // modal is open
  convertColorTripleToString = convertColorTripleToString;
  selectedToolBackgroundColor = selectedToolBackgroundColor;

  // options modal
  isOptionsModalOpen = false;

  /**
   * Pick random color on page load
   */
  constructor(public toolsService: ToolsService, public sceneService: SceneService) {
    this.pickRandomColor();
  }

  ngOnInit(): void {}

  /**
   * set color to something random
   */
  pickRandomColor(): void {
    this.toolsService.selectedColor = makeRandomHslColor();
  }

  /**
   * Opens the color picker modal
   */
  openPickerModal(initialColor: hslTriple): void {
    this.pickerModalState = initialColor;
  }

  /**
   * Closes modal and either sets a new color or does nothing
   */
  closePickerModal(selectedColor: hslTriple | null): void {
    this.pickerModalState = null; // close modal
    if (selectedColor) {
      this.toolsService.selectedColor = selectedColor;
    }
  }

  /**
   * select tool
   */
  selectTool(toolName: toolTypes): void {
    this.toolsService.selectTool(toolName);
  }

  /**
   * Open options modal
   */
  openOptionsModal(): void {
    this.isOptionsModalOpen = true;
  }

  /**
   * Close options modal
   */
  closeOptionsModal(): void {
    this.isOptionsModalOpen = false;
  }
}
