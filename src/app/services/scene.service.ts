import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scene, Shape, Rectangle, Circle } from '../shape';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  private scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor() {
    setTimeout(() => {
      this.addShapeToScene(new Rectangle('black', 100, 100, 200, 200));
    }, 250);
    setTimeout(() => {
      this.addShapeToScene(new Circle('brown', 300, 200, 50));
    }, 500);
    setTimeout(() => {
      this.addShapeToScene(new Rectangle('green', 125, 50, 25, 400));
    }, 750);
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
}
