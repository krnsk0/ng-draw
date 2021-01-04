import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.css'],
})
export class OptionsModalComponent implements OnInit {
  @Output() optionsCancel = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Close modal
   */
  cancelModal(): void {
    this.optionsCancel.emit(null);
  }
}
