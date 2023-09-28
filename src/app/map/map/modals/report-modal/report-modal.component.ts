import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { REPORT_CONSTANTS } from "src/app/report/report-constants";


@Component({
  selector: 'app-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css'],
})
export class ReportModalComponent {

  @Input() public data: any;
  violationOptions = REPORT_CONSTANTS.violationOptions;
  isLoading: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get isAuthor() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user.uid === this.data[1]?.author;
  }

  passBack(data?: any) {
    this.activeModal.close(data || "");
  }

  onEdit(data) {
    this.passBack();
    this.router.navigate([`/reports/report/${data[0]}`]);
  }

  onDelete(data) {
    this.isLoading = true;
    this.apiService.deleteReport(data[0])
    .subscribe({complete: () => {
      this.passBack(data);
    }})
  }

  
}
