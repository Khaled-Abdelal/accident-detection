import React from "react";
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
        />
      )}
      {props.accident != null ? (
        <Marker
          position={{
            lat: props.accident.location[1],
            lng: props.accident.location[0]
          }}
        />
      ) : null}

    {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MyGoogleMap));
