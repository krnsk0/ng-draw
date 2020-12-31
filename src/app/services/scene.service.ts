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

  constructor(private toolsService: ToolsService) {
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

  selectHover(x: number, y: number): void {
    const shape = this.findTopmostShapeUnderCursor(x, y);
    this.sceneState.forEach((currentShape) => {
      currentShape.hovered = false;
    });
    if (shape) shape.hovered = true;
    this.scene$.next(this.sceneState);
  }

  selectClick(x: number, y: number): void {
    // what's the shape under the cursor?
    const shape = this.findTopmostShapeUnderCursor(x, y);

    // deselect all shapes if:
    // * shift is not pressed, and
    // * the user clicked on the background
    // if ((!this.toolsService.lShift && !this.toolsService.rShift) || !shape) {
    //   this.sceneState.forEach((currentShape) => {
    //     currentShape.selected = false;
    //   });
    // }

    // toggle shape selection
    if (shape) {
      shape.selected = true;
    }

    // push a scene update
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

      // push a scene update
      this.scene$.next(this.sceneState);
    }
  }

  canvasMousedown(x: number, y: number): void {
    this.selectClick(x, y);
  }

  canvasMouseup(x: number, y: number): void {
    this.selectClick(x, y);
  }

  canvasMove(x: number, y: number): void {
    if (!this.toolsService.clickState) {
      this.selectHover(x, y);
    }
    this.dragSelection(x, y);
  }

  shapeToolClick(tool: string): void {
    if (tool === 'circle') {
      this.addShapeToScene(Circle.generateRandomShape(canvasWidth, canvasHeight));
    }
    if (tool === 'rectangle') {
      this.addShapeToScene(Rectangle.generateRandomShape(canvasWidth, canvasHeight));
    }
  }

  setShapeProperty(id: string, property: string, $event: Event): void {
    // wtf, how can avoid the typecast here?
    const value = ($event.target as HTMLInputElement).value;
    const shape = this.sceneState.find((foundShape) => foundShape.id === id);

    // uughghggh this is all very bad
    if (shape && Circle.isCircle(shape) && property === 'radius') {
      shape.radius = +value;
      this.scene$.next(this.sceneState);
    }
    if (shape && Rectangle.isRectangle(shape) && property === 'width') {
      shape.width = +value;
      this.scene$.next(this.sceneState);
    }
    if (shape && Rectangle.isRectangle(shape) && property === 'height') {
      shape.height = +value;
      this.scene$.next(this.sceneState);
    }
  }
}
