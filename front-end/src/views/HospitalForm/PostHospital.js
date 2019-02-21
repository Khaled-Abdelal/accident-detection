import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
export default class PostHospital extends Component {
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
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          onSubmit={this.submitHospital}
        >
          {({ values, errors }) => (
            <Form>
              {this.props.formFields.map(
                ({ name, type, label, placeholder }) => {
                  return (
                    <div className="form-group" key={name}>
                      <label htmlFor={name}>{label}</label>
                      <Field
                        type={type}
                        name={name}
                        className="form-control"
                        id={name}
                        placeholder={placeholder}
                      />
                    </div>
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
