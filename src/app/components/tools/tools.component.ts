import { Component, OnInit } from '@angular/core';
import { canvasWidth, canvasHeight } from '../../constants';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { Rectangle, Circle } from '../../shapes';
import { hslTriple } from '../../types';
import { random } from '../utils';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  // color picker modal state & initial color
  modalSelectedColor: null | hslTriple = null; // modal is open
  selectedColor: hslTriple;

  constructor(public toolsService: ToolsService, public sceneService: SceneService) {
    // selectedColor =
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
}
