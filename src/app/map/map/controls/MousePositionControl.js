import { useContext, useEffect } from "react";
import { MousePosition } from "ol/control";
import MapContext from "../../../contexts/MapContext";
import * as olCoordinate from 'ol/coordinate';

const MousePositionControl = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let mousePositionControl = new MousePosition({coordinateFormat: function(coordinate) {
			return olCoordinate.format(coordinate, 'N {y}, E {x}', 6);
		  },
		
			projection: 'EPSG:4326'});

		map.controls.push(mousePositionControl);

		return () => map.controls.remove(mousePositionControl);
	}, [map]);

	return null;
};

export default MousePositionControl;