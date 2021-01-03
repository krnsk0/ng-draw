import { Component, OnInit } from '@angular/core';
import { canvasWidth, canvasHeight } from '../../constants';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { Rectangle, Circle } from '../../shapes';
import { hslTriple } from '../../types';
import { random, convertColorTripleToString } from '../../utils';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  // color picker modal state & initial color
  modalState: null | hslTriple = null; // modal is open
  selectedColor: hslTriple;
  convertColorTripleToString = convertColorTripleToString;

  constructor(public toolsService: ToolsService, public sceneService: SceneService) {
    // intialize selected color to something random
    this.selectedColor = [random(360), random(100), random(100)];
  }

  ngOnInit(): void {}

  /**
   * Handle clicks on the shape tools
   */
  shapeToolClick(tool: string): void {
    if (tool === 'circle') {
      this.sceneService.sceneState = [
        ...this.sceneService.sceneState,
        Circle.generateRandomShape(canvasWidth, canvasHeight),
      ];
      this.sceneService.pushSceneUpdate();
    }
    if (tool === 'rectangle') {
      this.sceneService.sceneState = [
        ...this.sceneService.sceneState,
        Rectangle.generateRandomShape(canvasWidth, canvasHeight),
      ];
      this.sceneService.pushSceneUpdate();
    }
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
      this.selectedColor = selectedColor;
    }
  }
}
