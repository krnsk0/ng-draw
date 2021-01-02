import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modalLayout.component.html',
  styleUrls: ['./modalLayout.component.css'],
})
export class ModalLayoutComponent implements OnInit {
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
