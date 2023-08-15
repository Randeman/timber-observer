import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from '../map/map.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { EditReportComponent } from './edit-report/edit-report.component';

@NgModule({
  declarations: [ReportComponent, EditReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MapModule,
    ReportRoutingModule
  ], 
  providers: [NgbActiveModal],
  exports: [ReportComponent]
})
export class ReportModule { }
