import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

import GeoJSON from "ol/format/GeoJSON";
import OLVectorLayer from "ol/layer/Vector";
import { get } from "ol/proj";
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style } from "ol/style";
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-vector-layer',
  templateUrl: './vector-layer.component.html',
  styleUrls: ['./vector-layer.component.css']
})
export class VectorLayerComponent implements OnInit, OnDestroy {
  @Input() map: any;

  sub!: Subscription;
  @Output() isLoading = true;


  feature(figure: string): any {
    return new GeoJSON()
      .readFeatures(JSON.parse(figure), { featureProjection: get("EPSG:3857") } as any)
  };

  featureStyles: any = {
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
    })
  }

  vectorLayer: any;


  constructor(private apiService: ApiService) { }



  ngOnInit(): void {

    this.sub = this.apiService.getFullTickets()
      .subscribe({ 
      next: (data: any) => {
        data.map((x: any) => {
          const figure = this.createFigure(x.gps_lat, x.gps_lon);
          this.vectorLayer = new OLVectorLayer({
            source: new VectorSource({
              features: this.feature(figure)
            }),
            style: this.featureStyles[JSON.parse(figure).features[0].geometry.type]
          });

          this.map.addLayer(this.vectorLayer);
          this.vectorLayer.setZIndex(0);
        }
      )
    },
    error: (err: Error) => {console.error(err)},
    complete: () => {this.isLoading = false}
  })
  }

  ngOnDestroy(): void {
    this.map?.removeLayer(this.vectorLayer);
    this.sub.unsubscribe();
  }

  createFigure(lat: string, lon: string) {
    return `{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[${lon},${lat}]},"properties":null}]}`
  }

}
