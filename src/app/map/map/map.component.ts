import { Component, OnInit, ViewChild } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import * as olSource from "ol/source";
import OLTileLayer from "ol/layer/Tile";

import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MAP_CONSTANTS } from './map-constants';

const center: number[] = fromLonLat(MAP_CONSTANTS.center);
const zoom: number = MAP_CONSTANTS.zoom;
const tilelayerURL: string = MAP_CONSTANTS.tilelayerURL;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: Map;
  @ViewChild('modalRef') modalRef: any;

  constructor(public modalService: NgbModal) { }

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


    this.map.on('click', (evt: any) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
        return feature;
      });

      if (!feature) {
        return;
      }

      const open = this.modalService.open(ModalComponent);
      open.componentInstance.data = feature.getProperties();

    });



  }


  osm() {
    return new olSource.XYZ({
      url: tilelayerURL,
    });
  }



}
