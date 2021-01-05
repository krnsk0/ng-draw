import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.css'],
})
export class ModalLayoutComponent implements OnInit {
  @Output() overlayClick = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Communicate background click to parent
   */
  backgroundClick(): void {   // I think smth. like this is okay to be written inline in html
    this.overlayClick.emit(null);   // Pass click event through to event emitter
  }
}
