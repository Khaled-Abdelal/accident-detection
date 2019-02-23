import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
//import { isRegExp } from "util";

class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: []
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === "/dashboard/hospitals") {
      /// hospitals route table columns
      const hospitalsColumns = [
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
        },
        {
          Header: "Controls",
          Cell: ({ row }) => {
            return (
              <button
                className="btn btn-danger btn-sm"
                onClick={e => {
                  this.deleteResource(row.id);
                }}
              >
                Delete
              </button>
            );
          } // String-based value accessors!
        }
      ];
      this.setState({ columns: hospitalsColumns });
    } else if (this.props.location.pathname === "/dashboard/users") {
      /// users columns
      const usersColumns = [
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
        },
        {
          Header: "Controls",
          Cell: ({ row }) => {
            return (
              <button
                className="btn btn-danger btn-sm"
                onClick={e => {
                  this.deleteResource(row.id);
                }}
              >
                Delete
              </button>
            );
          } // String-based value accessors!
        }
      ];
      this.setState({ columns: usersColumns });
    }
    //// fetch data
    axios
      .get(this.props.fetchResourceUrl, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("auth-token")
        }
      })
      .then(res => {
        const formatedData = this.props.formatFetchedResource(res);
        this.setState({ data: formatedData });
      })
      .catch();
  }

  //// delete resource
  deleteResource = id => {
    axios
      .delete(this.props.deleteUrl + id, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("auth-token")
        }
      })
      .then(res => {
        this.setState(prevState => {
          const newData = prevState.data.filter(element => {
            return element.id !== res.data;
          });
          return {
            ...prevState,
            data: newData
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container d-flex flex-column">
        <div className="controls">
          <Link
            className="pull-right btn btn-success"
            to={this.props.location.pathname + "/new"}
          >
            New
          </Link>
        </div>
        <ReactTable data={this.state.data} columns={this.state.columns} />
      </div>
    );
  }
}

export default withRouter(ShowData);
