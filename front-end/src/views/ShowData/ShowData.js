import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withRouter } from "react-router-dom";

import axios from "axios";
import { isRegExp } from "util";

class ShowData extends Component {
  state = {
    data: [],
    columns: []
  };
  componentDidMount() {
    /// determine columns
    if (this.props.location.pathname === "/dashboard/hospitals") {
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
      this.setState({ columns });
    } else if (this.props.location.pathname === "/dashboard/users") {
      const columns = [
        {
          Header: "Id",
          accessor: "id" // String-based value accessors!
        },
        {
          Header: "Name",
          accessor: "name" // String-based value accessors!
        },
        {
          Header: "Device Id",
          accessor: "device_id" // String-based value accessors!
        },
        {
          Header: "BloodType",
          accessor: "bloodType" // String-based value accessors!
        },
        {
          Header: "PhoneNumber",
          accessor: "phoneNumber" // String-based value accessors!
        },
        {
          Header: "Address",
          accessor: "address" // String-based value accessors!
        }
      ];
      this.setState({ columns });
    }
    //// fetch data

    if (this.props.location.pathname === "/dashboard/hospitals") {
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
    } else if (this.props.location.pathname === "/dashboard/users") {
      axios
        .get("/api/user")
        .then(res => {
          console.log(res.data);
          const users = res.data.map(user => {
            return {
              name: user.name,
              isDonor: user.isDonor,
              address: user.address,
              phoneNumber: user.phoneNumber,
              bloodType: user.bloodType,
              device_id: user.device_id,
              id: user._id
            };
          });
          this.setState({ data: users });
        })
        .catch();
    }
  }

  render() {
    return <ReactTable data={this.state.data} columns={this.state.columns} />;
  }
}

export default withRouter(ShowData);
