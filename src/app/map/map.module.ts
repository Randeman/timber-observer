import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { VectorLayerComponent } from './layers/vector-layer/vector-layer.component';
import { ControlsComponent } from './controls/controls.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './modal/modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MapComponent, VectorLayerComponent, ControlsComponent, ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ],
  exports: [MapComponent],
  bootstrap: [ModalComponent]

})
export class MapModule { }
