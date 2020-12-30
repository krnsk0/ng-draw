import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolsService } from './tools.service';

import { Scene, Shape, Rectangle, Circle } from '../shapes';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  public readonly scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor(private toolsService: ToolsService) {
    // this just helps with testing.
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

  findTopmostShapeUnderCursor(x: number, y: number): Shape | null {
    const sceneCopy = this.sceneState.slice();
    sceneCopy.reverse(); // reverse to allow running Array.prototype.find() from end
    return sceneCopy.find((shape) => shape.isPointInShape(x, y)) || null;
  }

  selectClick(x: number, y: number): void {
    // what's the shape under the cursor?
    const shape = this.findTopmostShapeUnderCursor(x, y);

    // deselect all shapes if:
    // * shift is not pressed
    // * the user clicked on the background
    if ((!this.toolsService.lShift && !this.toolsService.rShift) || !shape) {
      this.sceneState.forEach((currentShape) => {
        currentShape.selected = false;
      });
    }

    // toggle shape selection
    if (shape) {
      shape.selected = !shape.selected;
    }

    // push a scene update
    this.scene$.next(this.sceneState);
  }

  circleClick(x: number, y: number): void {}

  rectangleClick(x: number, y: number): void {}

  canvasClick(x: number, y: number): void {
    if (this.toolsService.selectedTool === 'select') this.selectClick(x, y);
    if (this.toolsService.selectedTool === 'circle') this.circleClick(x, y);
    if (this.toolsService.selectedTool === 'rectangle') this.rectangleClick(x, y);
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
