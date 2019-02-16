import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withRouter } from "react-router-dom";

import axios from "axios";
//import { isRegExp } from "util";

class ShowData extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    //// fetch data
    axios
      .get(this.props.fetchResourceUrl)
      .then(res => {
        const formatedData = this.props.formatFetchedResource(res);
        this.setState({ data: formatedData });
      })
      .catch();
  }

  render() {
    return <ReactTable data={this.state.data} columns={this.props.columns} />;
  }
}

export default withRouter(ShowData);
