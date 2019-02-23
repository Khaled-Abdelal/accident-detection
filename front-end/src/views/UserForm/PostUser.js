import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import get from "lodash/get";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
//import FormData from "form-data";

class PostUser extends Component {
  submitUser = values => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let fd = new FormData();
    for (let key in values) {
      if (values.hasOwnProperty(key) && key !== "nextOfKin") {
        fd.append(key, values[key]);
      }
    }
    fd.append("nextOfKin[name]", values.nextOfKin.name);
    fd.append("nextOfKin[phoneNumber]", values.nextOfKin.phoneNumber);

    console.log(fd);
    axios
      .post("/api/user", fd, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("auth-token")
        }
      })
      .then(user => {
        console.log(user);
        this.props.history.push("/dashboard/users");
      })
      .catch(err => {
        console.log(err);
      });
  };
  SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Not a valid phone number"),
    nextOfKin: Yup.object().shape({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(/^(010|011|012|015)[0-9]{8}$/, "Not a valid phone number")
    }),
    device_id: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    bloodType: Yup.string()
      .required("Required")
      .matches(
        /^(A|B|AB|O)[+-]$/,
        "Not valid Blood type ex: AB-,AB+,A-,A+,O-,O+,B-,B+"
      )
  });
  render() {
    return (
      <div className="container bg-light p-5">
        <Formik
          initialValues={{
            name: "",
            password: "",
            device_id: "",
            phoneNumber: "",
            nextOfKin: {
              name: "",
              phoneNumber: ""
            },
            bloodType: "",
            address: "",
            picture: null
          }}
          validationSchema={this.SignupSchema}
          onSubmit={this.submitUser}
        >
          {({ touched, errors, setFieldValue }) => (
            <Form>
              {this.props.formFields.map(({ name, type, label }) => {
                return (
                  <div className="form-group" key={name}>
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
                    />
                    {get(errors, name) && get(touched, name) ? (
                      <div className="invalid-feedback d-block ">
                        {get(errors, name)}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <div className="form-group">
                <label htmlFor="picture">user picture</label>
                <input
                  type="file"
                  name="picture"
                  className="form-control"
                  id="picture"
                  onChange={event => {
                    setFieldValue("picture", event.currentTarget.files[0]);
                  }}
                />
              </div>

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

export default withRouter(PostUser);
