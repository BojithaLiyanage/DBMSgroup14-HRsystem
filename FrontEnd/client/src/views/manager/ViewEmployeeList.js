import "./ManagerHome.css";
import React, { Component } from "react";
import ManagerHomeTable from "./ManagerHomeTable";

class ViewEmployeeList extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.state = {
      isModalOpen: false,
      check: false,
      selectAll: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleSelectAll() {
    this.setState({
      selectAll: !this.state.selectAll,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg-manager">
          <h1 className="title">Employees</h1>
          <ManagerHomeTable />
        </div>
      </React.Fragment>
    );
  }
}

export default ViewEmployeeList;
