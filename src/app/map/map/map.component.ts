import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import * as olSource from "ol/source";
import OLTileLayer from "ol/layer/Tile";

const center: number[] = fromLonLat([25.33, 42.90]);
const zoom: number = 7;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  
  map!: Map;


  ngOnInit(): void {
    
      this.map = new Map({
      layers: [
        new OLTileLayer({
          source: this.osm(),
        }),
      ],
      target: 'map',
      view: new View({ 
        center,
        zoom, 
      }),
    });
   
    

  }

  osm() {
    return new olSource.XYZ({
          url: "http://mt0.google.com/vt/lyrs=y&hl=bg&x={x}&y={y}&z={z}",
        });
  }

}
