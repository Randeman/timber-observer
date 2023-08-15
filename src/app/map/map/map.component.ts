import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import * as olSource from "ol/source";
import OLTileLayer from "ol/layer/Tile";
import OLVectorLayer from "ol/layer/Vector";
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from "ol/style";
import { Draw, Modify, Snap } from 'ol/interaction.js';

import { TicketModalComponent } from './modals/ticket-modal/ticket-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MAP_CONSTANTS } from '../map-constants';
import { ReportModalComponent } from './report-modal/report-modal.component';

const center: number[] = fromLonLat(MAP_CONSTANTS.center);
const zoom: number = MAP_CONSTANTS.zoom;
const tilelayerURL: string = MAP_CONSTANTS.tilelayerURL;

const source = new VectorSource({
  features: [],
});

const vectorLayer = new OLVectorLayer({
  source: source
});

const style = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: "red",
    }),
    stroke: new Stroke({
      color: "red",
    }),
  })
});



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: Map;
  draw!: Draw;
  modify!: Modify;
  snap!: Snap;
  @Input('setFeature') setFeature!: EventEmitter<any>;
  @Input() viewVector!: boolean;
  @Output() coordinates = new EventEmitter<string>;
  @Input('setDrawInteraction') setDrawInteraction!: EventEmitter<null>;
  @Input('setModifyInteraction') setModifyInteraction!: EventEmitter<null>;
  @Input('removeInteractions') removeInteractions!: EventEmitter<null>;

  setCoordinates(value: string) {
    this.coordinates.emit(value)
  }

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

      if (evt.map.interactions.array_.length > 9) {
        return;
      }
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
        return feature;
      });

      if (!feature) {
        return;
      }

      const featureProperties = feature.getProperties();
      let open;
      if(!!featureProperties.id){
         open = this.modalService.open(TicketModalComponent);
        }
        else {
        open = this.modalService.open(ReportModalComponent);
      }

      open.componentInstance.data = featureProperties;

    });

    this.setDrawInteraction?.subscribe(e => {
      this.addDrawInteraction();
    });

    this.setModifyInteraction?.subscribe(e => {
      this.addModifyInteraction();
    });

    this.removeInteractions?.subscribe(e => {
      this.deleteInteractions();
    });

    this.setFeature?.subscribe(feature => { 
      source.addFeatures(feature);
      source.forEachFeature(feature => feature.setStyle(style));
      vectorLayer.setMap(this.map);
    })
   

  }


  osm() {
    return new olSource.XYZ({
      url: tilelayerURL,
    });
  }

  addDrawInteraction() {

    if (!this.map) return;
    
    this.draw = new Draw({
      source: source,
      type: "Point",
    });
    this.map.addInteraction(this.draw);

    this.snap = new Snap({ source: source });
    this.map.addInteraction(this.snap);


    this.draw.once('drawend', (e: any) => {
      const drawFeature = e.feature;

      let coordinates;
      if (drawFeature.getGeometry() instanceof SimpleGeometry) {
        coordinates = drawFeature
          .getGeometry()
          .clone()
          .transform("EPSG:3857", "EPSG:4326")
          .getCoordinates()

      } else {
        coordinates = [];
      }

      drawFeature.setStyle(style);

      vectorLayer.setMap(this.map);

      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);

      this.setCoordinates(coordinates.reverse().join(", "));
    });
  }

  addModifyInteraction() {

    if (!this.map) return;
    this.modify = new Modify({ source: source });
    this.map.addInteraction(this.modify);

    this.snap = new Snap({ source: source });
    this.map.addInteraction(this.snap);

    this.modify.on('modifyend', (e: any) => {

      const modifyFeature = e.features.getArray()[0];

      let coordinates;
      if (modifyFeature.getGeometry() instanceof SimpleGeometry) {
        coordinates = modifyFeature
          .getGeometry()
          .clone()
          .transform("EPSG:3857", "EPSG:4326")
          .getCoordinates()

      } else {
        coordinates = [];
      }

      modifyFeature.setStyle(style);

      vectorLayer.setMap(this.map);

      this.setCoordinates(coordinates.reverse().join(", "));
    })
  }

  deleteInteractions() {

    this.map.removeInteraction(this.modify);
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.snap);

    vectorLayer.setMap(null);
    vectorLayer.getSource()?.clear();

    this.setCoordinates("");

  }

  

}
