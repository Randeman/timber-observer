import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export const featureStyles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: "red",
      }),
      stroke: new Stroke({
        color: "red",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  LineString: new Style({
    stroke: new Stroke({
        color: "yellow",
        lineDash: [9],
        width: 3,
      }),
    })
};
