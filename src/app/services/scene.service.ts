import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scene, Shape, Rectangle, Circle } from '../shapes';

/**
 * This class is... too big.
 *
 * How can it be subdivided in a way that makes sense?
 *
 * Do we need a scene service, and another service that
 * contains a little state machine for the mouse and?
 */
@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  public readonly scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);
  private lShift = false;
  private rShift = false;

  constructor() {
    // set up shift key listeners
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ShiftLeft') this.lShift = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ShiftLeft') this.lShift = false;
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ShiftRight') this.rShift = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'ShiftRight') this.rShift = false;
    });

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
    // first we update our state snapshot
    this.sceneState = [...this.sceneState, shape];

    // then we push the state snapshot into the observable
    this.scene$.next(this.sceneState);
  }

  removeShapeById(id: string): void {
    // update state snapshot
    this.sceneState = this.sceneState.filter((shape) => shape.id !== id);

    // push to observable
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
    if ((!this.lShift && !this.rShift) || !shape) {
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
