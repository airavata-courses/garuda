import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

// world map
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json";

function checkRange(reflectivityRange) {
  if (reflectivityRange > -20) {
    return "#FFA500" //orange
  } else if (reflectivityRange > -22 && reflectivityRange <= -20) {
    return "#F51620" //red
  } else if (reflectivityRange > -24 && reflectivityRange <= -22) {
    return "#80B622" //green
  } else if (reflectivityRange > -26 && reflectivityRange <= -24) {
    return "#2CF3E0" //light blue
  } else if (reflectivityRange > -28 && reflectivityRange <= -26) {
    return "#EF7C8E" // pink
  } else if (reflectivityRange >= 60 && reflectivityRange < 90) {
    return "#0000FF" //blue
  } else if (reflectivityRange >= 90 && reflectivityRange < 120) {
    return "#F8D10E" //yellow
  } else if (reflectivityRange >= 120 && reflectivityRange < 150) {
    return "#80B622" //green
  } else if (reflectivityRange >= 150 && reflectivityRange < 180) {
    return "#EF7C8E" // pink
  } else if (reflectivityRange >= 180 && reflectivityRange < 210) {
    return "#EF7C8E" //grey
  } else {
    return "#2CF3E0" //black
  }
}

const MapBox = (props) => {
  const [coordinates] = useState([]);

  for (let i = 0; i < props.data.obj.latitude.length; i++) {
    coordinates.push([props.data.obj.longitude[i], props.data.obj.latitude[i], props.data.obj.reflectivity[i]]);
  }
  console.log(coordinates)
  // TODO: set height width
  return (
    <div>
      <ComposableMap

      // play with these params 

      // projection="geoAzimuthalEqualArea"
      //   projectionConfig={{
      //     rotate: [-190, 100, 0],
      //     scale: 100,
      //   }}
      //   projectionConfig={{
      //     yOffset: 50,
      //   }}
      //   style={{
      //     border: "1px solid #DDD",
      //   }}
      >
        <ZoomableGroup zoom={5} center={props.data.station} disablePanning>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                // .filter((d) => d.properties.REGION_UN === "Americas")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                  />
                ))
            }
          </Geographies>
          {coordinates.map((coordinates, index) => (
            <Marker key={index} coordinates={coordinates}>
              <circle key={index} r="0.1" fill={checkRange(coordinates[2])} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapBox;
