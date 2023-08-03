import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import GeoJSON from "ol/format/GeoJSON";
import OLVectorLayer from "ol/layer/Vector";
import { get } from "ol/proj";
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style, Icon } from "ol/style";
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
  vectorLayer: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

      this.sub = this.apiService.getFullTickets()
        .subscribe({ 
        next: (data: any) => {
          data.map((x: any) => {

            this.vectorLayer = new OLVectorLayer({
              source: new VectorSource({
                features: this.createFeature(x)
              }),
              style: new Style({
                image: new Icon({
                  anchorXUnits: "fraction",
                  anchorYUnits: "pixels",
                  src: "../../../assets/images/truck24.png",
                }),
              })
            });
            this.apiService.storeTickets(x.id, x);
            this.map.addLayer(this.vectorLayer);
            this.vectorLayer.setZIndex(0);
          }
        )
      },
      error: (err: Error) => {console.error(err)},
      complete: () => {this.isLoading = false}
    })

    // this.vectorLayer = new OLVectorLayer({
    //   source: new VectorSource({
    //     features: this.feature(`{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[25.25,42.25]},"properties":null}]}`)
    //   }),
    //   style: this.featureStyles[JSON.parse(`{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[47.25,22.55]},"properties":null}]}`).features[0].geometry.type]
    // });
    // this.map.addLayer(this.vectorLayer);
    // this.vectorLayer.setZIndex(0);
    // this.isLoading = false
  }

  ngOnDestroy(): void {
    this.map?.removeLayer(this.vectorLayer);
    this.sub.unsubscribe();
  }

  createFeature(x: any) {
    const figure = `{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[${x.gps_lon},${x.gps_lat}]},"properties":${JSON.stringify(x)}}]}`
    const feature = new GeoJSON().readFeatures(JSON.parse(figure), { featureProjection: get("EPSG:3857") } as any);
    return feature  
  }

}
