import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
//import FormData from "form-data";

export default class PostUser extends Component {
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
      .post("/api/user", fd, config)
      .then(user => {
        console.log(user);
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
          onSubmit={this.submitUser}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              {this.props.formFields.map(({ name, type, label }) => {
                return (
                  <div className="form-group" key={name}>
                    <label htmlFor={name}>{label}</label>
                    <Field
                      type={type}
                      name={name}
                      className="form-control"
                      id={name}
                    />
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
