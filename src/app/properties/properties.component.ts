import { Component, OnInit } from '@angular/core';
import { SceneService } from '../services/scene.service';
import { Scene, Shape } from '../shapes';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  private scene$: BehaviorSubject<Scene>;
  private scene: Scene = [];
  constructor(private sceneService: SceneService) {
    this.scene$ = this.sceneService.getSceneObservable();
  }

  ngOnInit(): void {
    this.scene$.subscribe((nextScene) => {
      this.scene = nextScene;
    });
  }

  handleDelete(uuid: string): void {
    this.sceneService.removeShapeById(uuid);
  }
}
