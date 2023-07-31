import { Component, Input } from '@angular/core';

import { get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Circle, Fill, Stroke, Style } from "ol/style";

const featureStyles = {
  Point: new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "red",
      }),
      stroke: new Stroke({
        color: "red",
      }),
    }),
  }),
}

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css']
})
export class ObserverComponent {

  @Input() map: any;

figure = [{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[26.23647483399741,43.33446779944785]},"properties":null}]}];

}
