import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scene, Shape } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private sceneState: Scene = [];
  private scene$: BehaviorSubject<Scene> = new BehaviorSubject<Scene>(this.sceneState);

  constructor() {
    setTimeout(() => {
      this.addShape({ type: 'Rectangle', color: 'black', x1: 100, y1: 100, x2: 200, y2: 200 });

      this.addShape({ type: 'Circle', color: 'brown', x: 300, y: 200, radius: 50 });
    }, 500);
  }

  addShape(shape: Shape): void {
    this.sceneState = [...this.sceneState, shape];
    this.scene$.next(this.sceneState);
  }

  getSceneObservable(): BehaviorSubject<Scene> {
    return this.scene$;
  }
}
