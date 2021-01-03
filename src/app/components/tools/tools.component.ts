import { Component, OnInit } from '@angular/core';
import { canvasWidth, canvasHeight } from '../../constants';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { Rectangle, Circle } from '../../shapes';
import { hslTriple, toolTypes } from '../../types';
import { convertColorTripleToString, makeRandomHslColor } from '../../utils';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  // color picker modal state & initial color
  modalState: null | hslTriple = null; // modal is open
  selectedColor: hslTriple = [0, 0, 0];
  convertColorTripleToString = convertColorTripleToString;

  constructor(public toolsService: ToolsService, public sceneService: SceneService) {
    this.pickRandomColor();
  }

  ngOnInit(): void {}

  /**
   * set color to something random
   */
  pickRandomColor(): void {
    this.selectedColor = makeRandomHslColor();
  }

  /**
   * Handle clicks on the shape tools
   * TODO: remove this
   */
  // shapeToolClick(tool: string): void {
  //   if (tool === 'circle') {
  //     this.sceneService.sceneState = [
  //       ...this.sceneService.sceneState,
  //       Circle.generateRandomShape(canvasWidth, canvasHeight, this.selectedColor),
  //     ];
  //     this.sceneService.pushSceneUpdate();
  //   }
  //   if (tool === 'rectangle') {
  //     this.sceneService.sceneState = [
  //       ...this.sceneService.sceneState,
  //       Rectangle.generateRandomShape(canvasWidth, canvasHeight, this.selectedColor),
  //     ];
  //     this.sceneService.pushSceneUpdate();
  //   }
  // }

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
      this.selectedColor = selectedColor;
    }
  }

  /**
   * select tool
   */
  selectTool(toolName: toolTypes): void {
    this.toolsService.selectTool(toolName);
  }
}
