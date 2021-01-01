import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolsService } from './tools.service';
import { canvasWidth, canvasHeight } from '../constants';

import { Scene, Shape, Rectangle, Circle } from '../shapes';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  public readonly scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor(private toolsService: ToolsService) {}

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
      this.addShapeToScene(Circle.generateRandomShape(canvasWidth, canvasHeight));
    }
    if (tool === 'rectangle') {
      this.addShapeToScene(Rectangle.generateRandomShape(canvasWidth, canvasHeight));
    }
  }

  setShapeProperty(setterFunc: (val: number) => void, $event: Event): void {
    // wtf, how can avoid the typecast here?
    const value = +($event.target as HTMLInputElement).value;
    setterFunc(value);
    this.scene$.next(this.sceneState);
  }

  dragSelection(x: number, y: number): void {
    if (this.toolsService.prevMouseCoords) {
      const [prevX, prevY] = this.toolsService.prevMouseCoords;

      // move selected shapes
      this.sceneState
        .filter((shape) => shape.selected)
        .forEach((shape) => {
          shape.move(x - prevX, y - prevY);
        });
    }
  }

  canvasMousedown(x: number, y: number): void {
    const shape = this.findTopmostShapeUnderCursor(x, y);

    // deselects previous selection when click is on
    // an unselected shape (w/out shift)
    if (shape && !shape.selected && !this.toolsService.shift()) {
      this.deselectAllShapes();
    }

    if (shape) {
      shape.selected = true;
    }

    if (!shape) {
      this.deselectAllShapes();
    }

    this.scene$.next(this.sceneState);
  }

  canvasMouseup(x: number, y: number): void {
    // empty, for now
  }

  canvasMove(x: number, y: number): void {
    if (!this.toolsService.clickState) {
      this.hoverShape(x, y);
    }
    if (this.toolsService.clickState) {
      this.dragSelection(x, y);
    }

    this.scene$.next(this.sceneState);
  }
}
