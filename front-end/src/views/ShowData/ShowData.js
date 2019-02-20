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
      modalIsOpen: false
    };
  }

  componentDidMount() {
    //// fetch data
    console.log(this.props);
    axios
      .get(this.props.fetchResourceUrl)
      .then(res => {
        const formatedData = this.props.formatFetchedResource(res);
        this.setState({ data: formatedData });
      })
      .catch();
  }

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
        <ReactTable data={this.state.data} columns={this.props.columns} />
      </div>
    );
  }
}

export default withRouter(ShowData);
