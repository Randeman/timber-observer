import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css'],
})
export class TicketModalComponent implements OnInit {

  @Input() public data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  insurance: any;
  isLoading: boolean = true;

  constructor(public activeModal: NgbActiveModal,
   private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {

    this.apiService.getInsurance(this.data.vehicle_plates_number)
      .subscribe(data => {
        this.insurance = this.insuranceCheck(data);
        this.isLoading = false;
      })

  }

  get isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  passBack() {
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }

  insuranceCheck(data: string) {
    return data.includes(`<div class="rwdtable" id="printresult">`)
      ? data.slice(
        data.indexOf(`<div class="rwdtable" id="printresult">`),
        data.indexOf(`<a href="javascript:void(0)" id="noprint"`))
        .replace(`/bg/информационен`, "https://www2.guaranteefund.org/bg/информационен")
        .replace(`/images/checkmark.png`, "../../../assets/images/check.png")
        .replace(`<img src="/images/gfprint.png">`, "<hr/>")
      : data.slice(
        data.indexOf(`<div class="myerr" id="printresult">`),
        data.indexOf(`<b style="color:red;">`))
        .replace(`<img src="/images/gfprint.png">`, "<hr/>")
        .replace(`/images/attention.png`, "../../../assets/images/uncheck.png");

  }



}
