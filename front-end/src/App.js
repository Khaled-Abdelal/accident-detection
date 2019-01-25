import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";

import { connect } from "react-redux";
import "./App.scss";
import * as actionCreators from "./store/actions/index";
//import { parse } from "url";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500"),
  loading
});

class App extends Component {
  state = {
    toLogin: true,
    hospitalName: "",
    password: "",
    error: "",
    loggedHospital: {}
  };

  componentDidMount() {
    if (localStorage.getItem("auth-token") != null) {
      this.props.getUserFromLocalStorage();
      this.props.history.push("dashboard");
    }
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/login"
          name="Login Page"
          render={props => (
            <Login
              {...props}
              hospitalName={this.state.hospitalName}
              password={this.state.password}
              onInputChange={this.onInputChange}
              onHospitalSubmit={this.onHospitalSubmit}
            />
          )}
        />
        <Route
          exact
          path="/register"
          name="Register Page"
          component={Register}
        />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <Route
          path="/"
          name="Home"
          component={() =>
            this.props.isAuth ? (
              <DefaultLayout hospital={this.props.user} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.auth != null,
    user: state.auth.auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actionCreators
  )(App)
);
