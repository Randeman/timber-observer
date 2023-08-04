import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  insurance: any;
  
  constructor(public activeModal: NgbActiveModal,
    private apiService: ApiService) { }
  
  ngOnInit(): void {
    console.log(this.data);
    this.apiService.getInsurance(this.data.vehicle_plates_number)
     .subscribe(data => {
      console.log(data.slice(data.indexOf(`<div class="rwdtable" id="printresult">`),
      data.indexOf(`<br />
    <a href="javascript:void(0)" id="noprint"`)));
      
      this.insurance = data.includes(`<div class="rwdtable" id="printresult">`)
      ? data.slice(
        data.indexOf(`<div class="rwdtable" id="printresult">`),
        data.indexOf(`<a href="javascript:void(0)" id="noprint"`))
        .replace(`/bg/информационен`, "https://www2.guaranteefund.org/bg/информационен")
        .replace(`/images/checkmark.png`, "../../../assets/images/check.png")
        .replace(`<img src="/images/gfprint.png">`,"<hr/>")
        : data.slice(
          data.indexOf(`<div class="myerr" id="printresult">`),
          data.indexOf(`<b style="color:red;">`))
          .replace(`<img src="/images/gfprint.png">`,"<hr/>")
          .replace(`/images/attention.png`, "../../../assets/images/uncheck.png");
    });
    
    
  }

  passBack() {
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }


}
