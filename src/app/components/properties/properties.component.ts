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
import { hslTriple } from '../../types';
import { convertColorTripleToString } from '../../utils';
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

  // TODO remove this after refactor
  convertColorTripleToString = convertColorTripleToString;

  // modal state & initial color
  modalSelectedColor: null | hslTriple = null; // modal is open when truthy
  shapeUuid: null | string = null; // uuid of the shape whose color we are changing

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
   * Opens modal by setting its state to the initial color
   */
  openModal(hslColor: hslTriple, uuid: string): void {
    this.shapeUuid = uuid;
    this.modalSelectedColor = hslColor;
  }

  /**
   * Closes modal and either sets a new color or does nothing
   */
  closeModal(selectedColor: hslTriple | null): void {
    this.modalSelectedColor = null; // close modal
    if (selectedColor && this.shapeUuid) {
      this.sceneService.setShapeColorById(selectedColor, this.shapeUuid);
    }
  }
}
