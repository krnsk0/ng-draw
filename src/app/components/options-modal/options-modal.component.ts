import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { ToolsService } from '../../services/tools.service';
import { serializedCircle, Circle } from '../../shapes/circle';
import { serializedRectangle, Rectangle } from '../../shapes/rectangle';

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.css'],
})
export class OptionsModalComponent implements OnInit {
  @Output() optionsCancel = new EventEmitter<null>();

  constructor(public toolsService: ToolsService, public sceneService: SceneService) {}

  ngOnInit(): void {}

  /**
   * Close modal
   */
  cancelModal(): void {
    this.optionsCancel.emit(null);
  }

  /**
   * Persist to localstorage
   */
  save(): void {
    const serialized = JSON.stringify(
      this.sceneService.sceneState.map((shape) => shape.getSerializeables()),
      null,
      2
    );
    try {
      window.localStorage.setItem('drawing', serialized);
      this.cancelModal();
    } catch (err) {
      console.error('Error persisting serialized data', err);
    }
  }

  load(): void {
    try {
      const serializedState = window.localStorage.getItem('drawing');
      if (!serializedState) throw new Error('localstorage returned nullish value');
      if (serializedState) {
        const shapes = JSON.parse(serializedState) as Array<serializedCircle | serializedRectangle>;
        shapes.forEach((shape) => {
          if (shape.kind === 'Rectangle') {
            const rect = new Rectangle(shape.hslColor, shape.x, shape.y, shape.width, shape.height);
            this.sceneService.sceneState = [...this.sceneService.sceneState, rect];
          }
          if (shape.kind === 'Circle') {
            const circle = new Circle(shape.hslColor, shape.x, shape.y, shape.radius);
            this.sceneService.sceneState = [...this.sceneService.sceneState, circle];
          }
        });
        this.sceneService.pushSceneUpdate();
        this.cancelModal();
      }
    } catch (err) {
      console.error('Error getting or parsing serialized data', err);
    }
  }
}
