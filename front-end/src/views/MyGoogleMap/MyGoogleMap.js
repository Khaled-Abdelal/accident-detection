import React from "react";
import hospitalIcon from "../../assets/img/placeholder.svg";
import accidentIcon from "../../assets/img/accident.svg";

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from "react-google-maps";

const MyGoogleMap = props => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: props.authCenter[1], lng: props.authCenter[0] }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.authCenter[1], lng: props.authCenter[0] }}
          icon={{
            url: hospitalIcon,

            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      )}
      {props.accident != null ? (
        <Marker
          position={{
            lat: props.accident.location[1],
            lng: props.accident.location[0]
          }}
          icon={{
            url: accidentIcon,

            scaledSize: new window.google.maps.Size(50, 50)
          }}
        />
      ) : null}

      {props.directions && (
        <DirectionsRenderer
          directions={props.directions}
          options={{
            markerOptions: { visible: false },
            polylineOptions: { strokeColor: "red" }
          }}
        />
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MyGoogleMap));
