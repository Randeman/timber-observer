import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormatedDataPipe } from './pipes/formated-data.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    FormatedDataPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, FormatedDataPipe]
})
export class SharedModule { }
