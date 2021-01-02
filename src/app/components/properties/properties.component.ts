import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class PropertiesComponent implements OnInit, OnDestroy {
  private scene: Scene = [];
  private subscription: Subscription | null = null;

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
    this.subscription = this.sceneService.scene$.subscribe((nextScene) => {
      this.scene = nextScene;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Helper to get only selected shapes
   */
  getSelectedShapes(): Scene {
    return this.scene.filter((shape) => shape.selected);
  }

  /**
   * Event handler for delete buttons
   */
  handleDelete(uuid: string): void {
    this.sceneService.removeShapeById(uuid);
  }
}
