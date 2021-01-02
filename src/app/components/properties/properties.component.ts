import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SceneService } from '../../services/scene.service';
import { Scene } from '../../shapes';
import { Circle, Rectangle, Shape } from '../../shapes';
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
  // scene state snapshot and subscription
  private scene: Scene = [];
  private subscription: Subscription | null = null;

  // mins and maxes for consumption in template
  minRectangleSide = minRectangleSide;
  maxRectangleSide = maxRectangleSide;
  minCircleRadius = minCircleRadius;
  maxCircleRadius = maxCircleRadius;

  // typeguards for template use
  isCircle = Circle.isCircle;
  isRectangle = Rectangle.isRectangle;

  // for the color-picker modal
  modalOpen = true;
  tempHslModalColor: [number, number, number] = [0, 0, 0];

  // helper for color conversion
  convertColorTripleToString = Shape.convertColorTripleToString;

  constructor(public sceneService: SceneService) {}

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

  modalOverlayClick(): void {
    this.modalOpen = false;
  }

  openModal(): void {
    this.modalOpen = true;
  }
}
