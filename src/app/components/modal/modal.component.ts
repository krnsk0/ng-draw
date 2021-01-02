import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() overlayClick = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Communicate background click to parent
   */
  backgroundClick(): void {
    this.overlayClick.emit(null);
  }
}
