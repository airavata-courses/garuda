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

const MapBox = (props) => {
  const [coordinates] = useState([]);

  for (let i = 0; i < props.data.latitude.length; i++) {
    coordinates.push([props.data.longitude[i], props.data.latitude[i], props.data.reflectivity[i]]);
  }
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
        center={[40.2672, 86.1349]}
      >
        <ZoomableGroup zoom={2} disablePanning>
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
              <circle key={index} r="0.1" fill={coordinates[2] > 100 ? "#fff" : "#000"} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapBox;
