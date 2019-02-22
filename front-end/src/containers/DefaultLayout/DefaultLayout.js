import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import Profile from "../../views/Profile/Profile";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { formatUsers, formatHospitals } from "../../utils/formatResource";
import { usersForm, hospitalsForm } from "../../utils/resourceForms";

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import { routes } from "../../routes";
import PostUser from "../../views/UserForm/PostUser";
import PostHospital from "../../views/HospitalForm/PostHospital";

//const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
//hospital route
const WaitAccident = React.lazy(() =>
  import("../../views/WaitAccident/WaitAccident")
);
// admin route
const ShowData = React.lazy(() => import("../../views/ShowData/ShowData"));

class DefaultLayout extends Component {
  componentDidMount = () => {
    if (this.props.auth.loginMode === "user") {
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.signOut();
    // localStorage.removeItem("jwt-token");
    // this.props.history.push("/login");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={e => this.signOut(e)}
              authName={this.props.auth.name}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  {/* special route only for users */}
                  {this.props.auth.loginMode === "user" && (
                    <Route
                      path="/dashboard"
                      exact
                      render={props => (
                        <Profile {...props} user={this.props.auth} />
                      )}
                    />
                  )}
                  {/* special route only for hospital */}
                  {this.props.auth.loginMode === "hospital" && (
                    <Route
                      path="/dashboard"
                      exact
                      render={props => <WaitAccident />}
                    />
                  )}

                  {/* admin routes */}
                  {this.props.auth.loginMode === "user" &&
                  this.props.auth.isAdmin ? (
                    <React.Fragment>
                      <Route
                        path="/dashboard/hospitals"
                        exact
                        render={props => (
                          <ShowData
                            {...props}
                            fetchResourceUrl="/api/hospital"
                            formatFetchedResource={formatHospitals}
                            deleteUrl="/api/hospital/"
                          />
                        )}
                      />
                      <Route
                        path="/dashboard/users"
                        exact
                        render={props => (
                          <ShowData
                            {...props}
                            formatFetchedResource={formatUsers}
                            fetchResourceUrl="/api/user"
                            deleteUrl="/api/user/"
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/users/new"
                        render={props => {
                          return <PostUser formFields={usersForm} />;
                        }}
                      />
                      <Route
                        exact
                        path="/dashboard/hospitals/new"
                        render={props => {
                          return <PostHospital formFields={hospitalsForm} />;
                        }}
                      />
                    </React.Fragment>
                  ) : null}
                  <Route render={() => <Redirect to="/dashboard" />} />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actionCreators
  )(DefaultLayout)
);
