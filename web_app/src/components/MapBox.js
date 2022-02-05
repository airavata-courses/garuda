import React from "react";
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

let colorFill = "#F00"
let coordinates = [];

function checkRange(reflectivityRange){
  if(reflectivityRange < 30){
    return "#2CF3E0" //light blue
  } else if(reflectivityRange >= 30 && reflectivityRange < 60 ) {
    return "#F51620" //red
  } else if(reflectivityRange >= 60 && reflectivityRange < 90){
    return "#0000FF" //blue
  }else if(reflectivityRange >= 90 && reflectivityRange < 120){
    return "#F8D10E" //yellow
  }else if(reflectivityRange >= 120 && reflectivityRange < 150){
    return "#80B622" //green
  }else if(reflectivityRange >= 150 && reflectivityRange < 180){
    return "#EF7C8E" // pink
  }else if(reflectivityRange >= 180 && reflectivityRange < 210){
    return "#B9B7BD" //grey
  } else {
    return "#050A30" //black
  }
}

const MapBox = (props) => {
  for (let i = 0; i < props.data.latitude.length; i++) {
    coordinates.push([props.data.longitude[i], props.data.latitude[i],props.data.reflectivity[i]]);
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
             colorFill = checkRange(coordinates[2]),
            <Marker key={index} coordinates={coordinates}>
              <circle key = {index} r="1" fill= {colorFill} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapBox;
