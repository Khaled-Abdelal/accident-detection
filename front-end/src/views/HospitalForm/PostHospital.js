import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import axios from "axios";
import get from "lodash/get";
import * as Yup from "yup";

class PostHospital extends Component {
  submitHospital = values => {
    if (typeof values.location.coordinates === "string") {
      values.location.coordinates = values.location.coordinates.split(",");
      values.location.coordinates[0] = parseFloat(
        values.location.coordinates[0]
      );
      values.location.coordinates[1] = parseFloat(
        values.location.coordinates[1]
      );
    }

    axios
      .post("/api/hospital", values)
      .then(hospital => {
        console.log(hospital);
        this.props.history.push("/dashboard/hospitals");
      })
      .catch(err => {
        console.log(err);
      });
  };
  //// sign up Schema
  SignupSchema = Yup.object().shape({
    hospitalName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    location: Yup.object().shape({
      coordinates: Yup.string()
        .matches(
          /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)?$/,
          "pattern doesn't match ex: longitude,latitude"
        )
        .required("Required")
    })
  });
  render() {
    return (
      <div className="container bg-light p-5">
        <Formik
          initialValues={{
            hospitalName: "",
            password: "",
            location: {
              coordinates: ""
            }
          }}
          validationSchema={this.SignupSchema}
          onSubmit={this.submitHospital}
        >
          {({ touched, errors }) => (
            <Form>
              {this.props.formFields.map(
                ({ name, type, label, placeholder }) => {
                  return (
                    <React.Fragment key={name}>
                      <div className="form-group">
                        <label htmlFor={name}>{label}</label>
                        <Field
                          type={type}
                          name={name}
                          className={
                            "form-control " +
                            (get(errors, name) && get(touched, name)
                              ? "is-invalid"
                              : "")
                          }
                          id={name}
                          placeholder={placeholder}
                        />
                        {get(errors, name) && get(touched, name) ? (
                          <div className="invalid-feedback d-block ">
                            {get(errors, name)}
                          </div>
                        ) : null}
                      </div>
                    </React.Fragment>
                  );
                }
              )}
              <button className="btn btn-primary pull-right" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(PostHospital);
