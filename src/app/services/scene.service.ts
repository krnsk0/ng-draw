import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { canvasWidth, canvasHeight } from '../constants';

import { Scene, Shape, Rectangle, Circle } from '../shapes';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  public sceneState: Scene = [];
  public readonly scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor() {}

  pushSceneUpdate(): void {
    this.scene$.next(this.sceneState);
  }

  removeShapeById(id: string): void {
    this.sceneState = this.sceneState.filter((shape) => shape.id !== id);
    this.pushSceneUpdate();
  }

  findTopmostShapeUnderCursor(x: number, y: number): Shape | null {
    const sceneCopy = this.sceneState.slice();
    sceneCopy.reverse();
    return sceneCopy.find((shape) => shape.isPointInShape(x, y)) || null;
  }

  deselectAllShapes(): void {
    this.sceneState.forEach((currentShape) => {
      currentShape.selected = false;
    });
  }

  hoverShape(x: number, y: number): void {
    const shape = this.findTopmostShapeUnderCursor(x, y);
    this.sceneState.forEach((currentShape) => {
      currentShape.hovered = false;
    });
    if (shape) shape.hovered = true;
  }

  shapeToolClick(tool: string): void {
    if (tool === 'circle') {
      this.sceneState = [...this.sceneState, Circle.generateRandomShape(canvasWidth, canvasHeight)];
      this.pushSceneUpdate();
    }
    if (tool === 'rectangle') {
      this.sceneState = [
        ...this.sceneState,
        Rectangle.generateRandomShape(canvasWidth, canvasHeight),
      ];
      this.pushSceneUpdate();
    }
  }

  setShapeProperty(setterFunc: (val: number) => void, $event: Event): void {
    // wtf, how can avoid the typecast here?
    const value = +($event.target as HTMLInputElement).value;
    setterFunc(value);
    this.pushSceneUpdate();
  }
}
