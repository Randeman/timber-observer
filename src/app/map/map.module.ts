import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { TileLayerComponent } from './map/layers/tile-layer/tile-layer.component';
import { VectorLayerComponent } from './map/layers/vector-layer/vector-layer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MapComponent,
    TileLayerComponent,
    VectorLayerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [MapComponent, TileLayerComponent, VectorLayerComponent]
})
export class MapModule { }
