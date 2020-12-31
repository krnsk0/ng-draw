import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Scene } from '../../shapes';
import { Circle, Rectangle } from '../../shapes';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  private scene: Scene = [];
  constructor(public sceneService: SceneService) {}

  // typeguards for template use
  isCircle = Circle.isCircle;
  isRectangle = Rectangle.isRectangle;

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
}
