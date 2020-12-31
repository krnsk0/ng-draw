import { Component, OnInit } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Scene } from '../../shapes';
import { Circle, Rectangle } from '../../shapes';
import {
  minRectangleSide,
  maxRectangleSide,
  minCircleRadius,
  maxCircleRadius,
} from '../../constants';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  private scene: Scene = [];

  // mins and maxes for consumption in template
  minRectangleSide = minRectangleSide;
  maxRectangleSide = maxRectangleSide;
  minCircleRadius = minCircleRadius;
  maxCircleRadius = maxCircleRadius;

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
