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
    toLogin: true
  };

  componentDidMount() {
    if (localStorage.getItem("auth-token") != null) {
      this.props.getUserFromLocalStorage();
      //this.props.history.push("dashboard");
    }
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/login/hospital"
          name="Login Page"
          render={props => <Login {...props} loginMode="hospital" />}
        />
        <Route
          exact
          path="/login/user"
          name="Login Page"
          render={props => <Login {...props} loginMode="user" />}
        />
        <Route
          exact
          path="/register"
          name="Register Page"
          component={Register}
        />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        {this.props.isAuth && (
          <Route path="/dashboard" name="Home" component={DefaultLayout} />
        )}
        <Route
          path="/"
          exact
          component={() => <Redirect to="/dashboard/home" />}
        />
        {!this.props.isAuth && <Redirect to="/login/hospital" />}
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
