import { Component, OnInit } from '@angular/core';
import { SceneService } from '../services/scene.service';
import { Scene, Shape, Circle, Rectangle } from '../shapes';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  private scene: Scene = [];
  constructor(private sceneService: SceneService) {}

  ngOnInit(): void {
    this.sceneService.scene$.subscribe((nextScene) => {
      this.scene = nextScene;
    });
  }

  getSelectedShapes(): Scene {
    return this.scene.filter((shape) => shape.selected);
  }

  handleDelete(uuid: string): void {
    this.sceneService.removeShapeById(uuid);
  }

  // typeguard
  isCircle(s: Shape): s is Circle {
    return s instanceof Circle;
  }

  // typeguard
  isRectangle(s: Shape): s is Rectangle {
    return s instanceof Rectangle;
  }
}
