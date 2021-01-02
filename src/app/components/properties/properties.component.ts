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
import { hslTriple } from '../../types';

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
  modalOpen = false;
  tempHslModalColor: [number, number, number] = [0, 0, 0];
  tempShapeId: string | null = null;
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

  /**
   * Open the modal, set a temp color
   */
  openModal(shapeId: string): void {
    this.modalOpen = true;
    this.tempShapeId = shapeId;
    const currentShape = this.sceneService.sceneState.find((shape) => shape.id === shapeId);
    if (currentShape) {
      this.tempHslModalColor = currentShape.hslColor;
    }
  }

  /**
   * Close modal without changing any state
   */
  cancelModal(): void {
    this.modalOpen = false;
  }

  /**
   * Close modal but persist color change
   */
  modalOk(): void {
    this.modalOpen = false;
    const currentShape = this.sceneService.sceneState.find(
      (shape) => shape.id === this.tempShapeId
    );
    if (currentShape) {
      currentShape.hslColor = this.tempHslModalColor;
      this.sceneService.pushSceneUpdate();
    }
  }

  /**
   * Handle input events from the color sliders
   */
  handleColorInput(tripleIndex: number, $event: Event): void {
    const value = +($event.target as HTMLInputElement).value;
    const colorCopy: hslTriple = [
      this.tempHslModalColor[0],
      this.tempHslModalColor[1],
      this.tempHslModalColor[2],
    ];
    colorCopy[tripleIndex] = +value;
    this.tempHslModalColor = colorCopy;
  }
}
