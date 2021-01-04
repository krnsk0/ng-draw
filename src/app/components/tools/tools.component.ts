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
  modalState: null | hslTriple = null; // modal is open
  convertColorTripleToString = convertColorTripleToString;
  selectedToolBackgroundColor = selectedToolBackgroundColor;

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
  openModal(initialColor: hslTriple): void {
    this.modalState = initialColor;
  }

  /**
   * Closes modal and either sets a new color or does nothing
   */
  closeModal(selectedColor: hslTriple | null): void {
    this.modalState = null; // close modal
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
}
