import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scene, Shape } from '../shapes';
import { hslTriple } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  // what is this good for? (BehaviorSubject has a .value property that allows you to access the latest value)
  public sceneState: Scene = [];
  // redundant type declarartion
  public readonly scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor() {}

  /**
   * Emit the state snapshot to the observable.
   * Should be subscribed to in components to update views
   */
  pushSceneUpdate(): void {
    this.scene$.next(this.sceneState);
  }

  /**
   * Deletes a shape from the state by ID and updates
   */
  removeShapeById(id: string): void {
    this.sceneState = this.sceneState.filter((shape) => shape.id !== id);
    this.pushSceneUpdate();
  }

  /**
   * If a shape is at x, y return it, else return null
   * Searches from the end of the list
   */
  findTopmostShapeUnderCursor(x: number, y: number): Shape | null {
    const sceneCopy = this.sceneState.slice();
    sceneCopy.reverse();
    return sceneCopy.find((shape) => shape.isPointInShape(x, y)) || null;
  }

  /**
   * Set selection state for all shapes to false
   */
  deselectAllShapes(): void {
    this.sceneState.forEach((currentShape) => {
      currentShape.selected = false;
    });
    this.pushSceneUpdate();
  }

  /**
   * Adds shape by ID to selection
   */
  selectShapeById(uuid: string): void {
    const shapeToUpdate = this.sceneState.find((shape) => shape.id === uuid);
    if (shapeToUpdate) {
      shapeToUpdate.selected = true;
      this.pushSceneUpdate();
    }
  }

  /**
   * Sets hover state on a shape if one exists under x, y
   */
  hoverShape(x: number, y: number): void {
    const shape = this.findTopmostShapeUnderCursor(x, y);
    this.sceneState.forEach((currentShape) => {
      currentShape.hovered = false;
    });
    if (shape) shape.hovered = true;
  }

  /**
   * Updates shape properties based on an event
   * TODO: This is pretty wonky and should be changed to
   * accept a uuid or something and not use this crazy callback pattern
   */
  setShapeProperty(setterFunc: (val: number) => void, $event: Event): void {
    // wtf, how can avoid the typecast here? need a generic of some kind
    const value = +($event.target as HTMLInputElement).value;
    setterFunc(value);
  }

  /**
   * Updates a shape's color given its uuid
   */
  setShapeColorById(color: hslTriple, uuid: string): void {
    const shapeToUpdate = this.sceneState.find((shape) => shape.id === uuid);
    if (shapeToUpdate) {
      shapeToUpdate.hslColor = color;
      this.pushSceneUpdate();
    }
  }

  /**
   * Adds an array of shapes
   * Clears out old shapes
   */
  addShapes(shapeInstances: Scene): void {
    this.sceneState = shapeInstances;
    this.pushSceneUpdate();
  }

  /**
   * Adds a single shape
   */
  addShape(shape: Shape): void {
    this.sceneState = [...this.sceneState, shape];
    this.pushSceneUpdate();
  }
}
