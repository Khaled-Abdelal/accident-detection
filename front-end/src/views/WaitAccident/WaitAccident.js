import React, { Component } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import * as actionCreators from "../../store/actions/index";
import Directions from "../Directions/Directions";
import axios from "axios";

const MyGoogleMap = React.lazy(() => import("../MyGoogleMap/MyGoogleMap"));

class WaitAccident extends Component {
  state = {
    directions: false,
    address: []
  };

  componentDidMount() {
    const socket = socketIOClient.connect("http://localhost:5000");
    // make connection
    socket.on("connection", console.log("initial connection "));
    // join a specific room

    socket.emit("join", { id: this.props.auth.id }, data => {
      console.log("private connection made");
    });
    // listen for accident
    socket.on("accident", data => {
      console.log(data);
      this.props.accidentStart(data);
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            this.props.auth.location.coordinates[1],
            this.props.auth.location.coordinates[0]
          ),
          destination: new google.maps.LatLng(
            this.props.accident.location[1],
            this.props.accident.location[0]
          ),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      // set Google Maps Geocoding
      axios
        .get(
          "https://maps.google.com/maps/api/geocode/json?latlng=" +
            this.props.auth.location.coordinates[1] +
            "," +
            this.props.auth.location.coordinates[0] +
            "&key=AIzaSyBwxuW2cdXbL38w9dcPOXfGLmi1J7AVVB8&language=ar"
        )
        .then(res => this.setState({ address: res.data.results }))
        .catch(error => {
          console.log(error);
        });

      // fetch(
      //   "https://maps.google.com/maps/api/geocode/json?latlng=" +
      //     this.props.auth.location.coordinates[1] +
      //     "," +
      //     this.props.auth.location.coordinates[0] +
      //     "&key=AIzaSyBwxuW2cdXbL38w9dcPOXfGLmi1J7AVVB8&language=ar"
      // ).then(res =>
      //   res.json().then(data => {
      //     console.log(data);
      //   })
      // );
    });
  }
  render() {
    return (
      <div>
        <MyGoogleMap
          isMarkerShown
          googleMapURL="https://maps.google.com/maps/api/js?sensor=false&libraries=places&key=AIzaSyBwxuW2cdXbL38w9dcPOXfGLmi1J7AVVB8&fbclid=IwAR2j1WuVfgQAkSeja4OafxDevzO5S1kwhm4FLEnjXPqKO1rkcH9hivUVXQY"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          authCenter={this.props.auth.location.coordinates}
          accident={this.props.accident}
          directions={this.state.directions}
        />
        <Directions address={this.state.address} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    accident: state.accident.accident
  };
};
export default connect(
  mapStateToProps,
  actionCreators
)(WaitAccident);
