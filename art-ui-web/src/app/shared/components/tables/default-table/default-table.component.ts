import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-default-table',
  templateUrl: 'default-table.html',
  styleUrls: ['default-table.scss']
})
export class DefaultTableComponent {

  @Input() columns: any = [];
  @Input() rows: any = [];

  @Input() emptyMessage = 'Nenhuma informação a ser listada.';

  @Input() hasActions = true;
  @Input() hasEditButton = true;
  @Input() hasActiveButton = true;
  @Input() hasDeleteButton = true;

  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() activeClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  editClickAction(item) {
    this.editClick.emit(item);
  }

  activeClickAction(item) {
    this.activeClick.emit(item);
  }

  deleteClickAction(item) {
    this.deleteClick.emit(item);
  }
}
