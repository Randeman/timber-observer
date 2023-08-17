import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { VectorLayerComponent } from './layers/vector-layer/vector-layer.component';
import { ControlsComponent } from './controls/controls.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketModalComponent } from './map/modals/ticket-modal/ticket-modal.component';
import { ReportModalComponent } from './map/modals/report-modal/report-modal.component';



@NgModule({
  declarations: [MapComponent, VectorLayerComponent, ControlsComponent, TicketModalComponent, ReportModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ],
  exports: [MapComponent, VectorLayerComponent],
  bootstrap: [TicketModalComponent, ReportModalComponent]

})
export class MapModule { }
