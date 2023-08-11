import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
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

  urls: Array<string> = [];
  files: Array<Blob> = [];

  detectFiles(event) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  deleteImage(url: any, index): void {
    this.urls = this.urls.filter((x, i) => x !== url || i !== index);
    this.files = this.files.filter((x, i) => i !== index);

  }




}


