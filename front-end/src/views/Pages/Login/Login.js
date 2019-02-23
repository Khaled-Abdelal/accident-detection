import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import * as actionCreators from "../../../store/actions/index";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class Login extends Component {
  state = {
    hospitalName: "",
    password: "",
    name: "",
    error: ""
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.props.loginMode === "hospital") {
      if (this.state.hospitalName === "" || this.state.password === "") {
        return this.setState({ error: "name and password are both required" });
      } else {
        this.props.loginStart(
          this.state.hospitalName,
          this.state.password,
          this.props.loginMode
        );
      }
    } else if (this.props.loginMode === "user") {
      if (this.state.name === "" || this.state.password === "") {
        return this.setState({ error: "name and password are both required" });
      } else {
        this.props.loginStart(
          this.state.name,
          this.state.password,
          this.props.loginMode
        );
      }
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        {this.props.isAuth ? <Redirect to="/dashboard/home" /> : null}
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        {this.props.loginMode === "hospital" ? (
                          <Input
                            type="text"
                            placeholder="hospitalName"
                            autoComplete="hospitalName"
                            value={this.state.hospitalName}
                            name="hospitalName"
                            onChange={this.onInputChange}
                          />
                        ) : (
                          <Input
                            type="text"
                            placeholder="name"
                            autoComplete="name"
                            value={this.state.name}
                            name="name"
                            onChange={this.onInputChange}
                          />
                        )}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.password}
                          name="password"
                          onChange={this.onInputChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.auth != null
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    actionCreators
  )(Login)
);
