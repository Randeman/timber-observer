import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css'],
})
export class ReportModalComponent {

  @Input() public data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  violationOptions: any = {logging: 'Незаконен дърводобив', transport: 'Незаконен транспорт', trash: 'Замърсяване', other: 'Друго'};

  constructor(public activeModal: NgbActiveModal) { }


  passBack() {
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }

  
}
