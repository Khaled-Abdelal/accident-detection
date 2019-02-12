import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";

export default class ShowData extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    axios
      .get("/api/hospital")
      .then(res => {
        const hospitals = res.data.map(hosp => {
          return {
            hospitalName: hosp.hospitalName,
            long: hosp.location.coordinates[0],
            lat: hosp.location.coordinates[1],
            id: hosp._id
          };
        });
        console.log(hospitals);
        this.setState({ data: hospitals });
      })
      .catch();
  }
  render() {
    const columns = [
      {
        Header: "Id",
        accessor: "id" // String-based value accessors!
      },
      {
        Header: "Name",
        accessor: "hospitalName" // String-based value accessors!
      },
      {
        Header: "Long",
        accessor: "long" // String-based value accessors!
      },
      {
        Header: "Lat",
        accessor: "lat" // String-based value accessors!
      }
    ];
    return <ReactTable data={this.state.data} columns={columns} />;
  }
}
