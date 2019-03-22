import React, { Component } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import * as actionCreators from "../../store/actions/index";
import Directions from "../Directions/Directions";
import Profile from "../Profile/Profile";
import axios from "axios";
import connected from "../../assets/img/connected.png";
import disconnected from "../../assets/img/disconnected.png";

//import { timingSafeEqual } from "crypto";

const MyGoogleMap = React.lazy(() => import("../MyGoogleMap/MyGoogleMap"));

class WaitAccident extends Component {
  state = {
    socket: null,
    connected: false
  };
  /// close connection
  componentWillUnmount = () => {
    this.state.socket.close();
    console.log("closed");
  };

  componentDidMount() {
    let socket = socketIOClient("/");
    this.setState(state => {
      return { socket };
    });

    // make connection
    socket.on("connect", () => {
      console.log("initial connection ");
      this.setState({ connected: true });
    });
    // join a specific room

    socket.emit("join", { id: this.props.auth.id }, data => {
      console.log("private connection made", data);
    });
    socket.on("disconnect", () => {
      console.log("client disconnected");
      this.setState({ connected: false });
    });
    // listen for accident
    socket.on("accident", data => {
      console.log(data);
      this.props.accidentStart(data);
      const google = window.google;
      ///// get route
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
            this.props.setRoute(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      // get address
      axios
        .get(
          "https://maps.google.com/maps/api/geocode/json?latlng=" +
            this.props.accident.location[1] +
            "," +
            this.props.accident.location[0] +
            "&key=AIzaSyBwxuW2cdXbL38w9dcPOXfGLmi1J7AVVB8&language=ar"
        )
        .then(res => this.props.setAddress(res.data.results))
        .catch(error => {
          console.log(error);
        });
    });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.connected ? (
            <div>
              <h2>
                Connected <img src={connected} style={{ width: "40px" }} />
              </h2>
            </div>
          ) : (
            <div>
              <h2>
                Disconnected{" "}
                <img src={disconnected} style={{ width: "40px" }} />
              </h2>
            </div>
          )}
        </div>
        <MyGoogleMap
          isMarkerShown
          googleMapURL="https://maps.google.com/maps/api/js?sensor=false&libraries=places&key=AIzaSyBwxuW2cdXbL38w9dcPOXfGLmi1J7AVVB8&fbclid=IwAR2j1WuVfgQAkSeja4OafxDevzO5S1kwhm4FLEnjXPqKO1rkcH9hivUVXQY"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          authCenter={this.props.auth.location.coordinates}
          accident={this.props.accident}
          directions={this.props.route}
        />
        {this.props.address ? (
          <Directions address={this.props.address} />
        ) : null}
        {this.props.accident ? (
          <Profile user={this.props.accident.user} />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    accident: state.accident.accident,
    route: state.accident.route,
    address: state.accident.address
  };
};
export default connect(
  mapStateToProps,
  actionCreators
)(WaitAccident);
