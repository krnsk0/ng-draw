import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scene, Shape } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  private scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);
  private shapeCounter = 0;

  constructor() {
    setTimeout(() => {
      this.addRect('black', 100, 100, 200, 200);
    }, 250);
    setTimeout(() => {
      this.addCircle('brown', 300, 200, 50);
    }, 500);
    setTimeout(() => {
      this.addRect('green', 125, 50, 25, 400);
    }, 750);
  }

  addRect(color: string, x: number, y: number, width: number, height: number): void {
    this.addShapeToScene({ color, x, y, width, height, type: 'Rectangle', id: this.shapeCounter });
    this.shapeCounter += 1;
  }

  addCircle(color: string, x: number, y: number, radius: number): void {
    this.addShapeToScene({ color, x, y, radius, type: 'Circle', id: this.shapeCounter });
    this.shapeCounter += 1;
  }

  addShapeToScene(shape: Shape): void {
    this.sceneState = [...this.sceneState, shape];
    this.scene$.next(this.sceneState);
  }

  removeShapeById(id: number): void {
    this.sceneState = this.sceneState.filter((shape) => shape.id !== id);
    this.scene$.next(this.sceneState);
  }

  getSceneObservable(): BehaviorSubject<Scene> {
    return this.scene$;
  }
}
