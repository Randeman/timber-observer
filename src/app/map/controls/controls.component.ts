import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { MousePosition } from "ol/control";
import * as olCoordinate from 'ol/coordinate';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, OnDestroy {
  @Input() map: any;
  mousePositionControl: any;

  ngOnInit(): void {
    this.mousePositionControl = new MousePosition({coordinateFormat: function(coordinate: any) {
			return olCoordinate.format(coordinate, 'N {y}, E {x}', 6);
		  },
		
			projection: 'EPSG:4326'});

		this.map.controls.push(this.mousePositionControl);
  }

  ngOnDestroy(): void {
    this.map.controls.remove(this.mousePositionControl);
  }
  
}
