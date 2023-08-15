import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private router: Router) { }


  passBack() {
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }

  onEdit(data) {
    this.passBack();
    this.router.navigate([`/reports/report/${data[0]}`]);
  }

  onDelete(id) {
    this.passBack();
    this.apiService.deleteReport(id);
    this.router.navigate(['/home']);
  }

  
}
