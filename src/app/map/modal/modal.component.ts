import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  
  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit(): void {
    console.log(this.data);
    
  }

  passBack() {
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }


}
