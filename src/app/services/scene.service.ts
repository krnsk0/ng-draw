import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scene, Shape, Rectangle, Circle } from '../shapes';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  private scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor() {
    setTimeout(() => {
      this.addShapeToScene(new Rectangle('black', 100, 100, 200, 200));
    }, 100);
    setTimeout(() => {
      this.addShapeToScene(new Circle('brown', 300, 200, 50));
    }, 200);
    setTimeout(() => {
      this.addShapeToScene(new Rectangle('green', 125, 50, 25, 400));
    }, 300);
  }

  addShapeToScene(shape: Shape): void {
    this.sceneState = [...this.sceneState, shape];
    this.scene$.next(this.sceneState);
  }

  removeShapeById(id: string): void {
    this.sceneState = this.sceneState.filter((shape) => shape.id !== id);
    this.scene$.next(this.sceneState);
  }

  getSceneObservable(): BehaviorSubject<Scene> {
    return this.scene$;
  }

  findTopmostShapeUnderCursor(x: number, y: number): Shape | null {
    const sceneCopy = this.sceneState.slice();
    sceneCopy.reverse(); // reverse to allow running Array.prototype.find() from end
    return sceneCopy.find((shape) => shape.isPointInShape(x, y)) || null;
  }

  selectClick(x: number, y: number): void {
    // what's the shape under the cursor?
    const shape = this.findTopmostShapeUnderCursor(x, y);

    // toggle shape selection
    if (shape) {
      shape.selected = !shape.selected;
    }

    // deselect all shapes
    if (!shape) {
      this.sceneState.forEach((currentShape) => {
        currentShape.selected = false;
      });
    }

    // push a scene update
    this.scene$.next(this.sceneState);
  }

  hover(x: number, y: number): void {
    // what's the shape under the cursor?
    const shape = this.findTopmostShapeUnderCursor(x, y);

    // deselect all shapes
    this.sceneState.forEach((currentShape) => {
      currentShape.hovered = false;
    });

    // select hovered shape, if any
    if (shape) {
      shape.hovered = true;
    }

    // push a scene update
    this.scene$.next(this.sceneState);
  }
}
