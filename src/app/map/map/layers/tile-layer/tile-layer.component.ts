import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import * as olSource from "ol/source";
import OLTileLayer from "ol/layer/Tile";

@Component({
  selector: 'app-tile-layer',
  templateUrl: './tile-layer.component.html',
  styleUrls: ['./tile-layer.component.css']
})
export class TileLayerComponent implements OnInit, OnDestroy {
  @Input() map: any;
  tileLayer: any;
  
  ngOnInit(): void {
    this.tileLayer = new OLTileLayer({
      source: this.osm(),
      zIndex: 0,
    });
    
    console.log(this.map);
    this.map.addLayer(this.tileLayer);
    console.log(this.map);
    
    
		this.tileLayer.setZIndex(0);
  }
  
  ngOnDestroy(): void {
    this.map?.removeLayer(this.tileLayer);
  }

  osm() {
    return new olSource.XYZ({
          url: "http://mt0.google.com/vt/lyrs=y&hl=bg&x={x}&y={y}&z={z}",
        });
  }

}
