import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { SceneService } from '../../services/scene.service';
import { canvasWidth, canvasHeight } from '../../constants';
import { Rectangle, Circle } from '../../shapes';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  constructor(public toolsService: ToolsService, public sceneService: SceneService) {}

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
