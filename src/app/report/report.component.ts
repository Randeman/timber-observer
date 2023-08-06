import { Component, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  viewVector: boolean = false;
  coordinates: string = "";
  interactionMode: boolean = false;
  setInteractions = new EventEmitter<null>;
  removeInteractions = new EventEmitter<null>;

  setCoordinates(coordinates: string) {
    this.coordinates = coordinates;
  }
  
  onSetInteractions() {
    this.setInteractions.emit(null);
    this.interactionMode = !this.interactionMode;
  }

  onDeleteInteractions() {
    this.removeInteractions.emit(null);
    this.interactionMode = !this.interactionMode;
  }


  constructor(
    private apiService: ApiService,
    private router: Router) { }

  onReport(form: NgForm): void {
    if (form.invalid) return;
    // this.userService.login(form.value).subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   }
    // })
    console.log(form.value);
   

  }

  


}
