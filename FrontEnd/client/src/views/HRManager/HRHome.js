import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./HRHome.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class HRHome extends Component {
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
        <div className="background-HR">
          <h1 className="hrtxt1">HR Manager Home</h1>
          <br />
          <div class="center">
            <div>
              <Link to="/register" className="mb-3">
                <button className="but1">Register New Employee</button>
              </Link>
              <br />
              <Link to="/hr/view_paygrades" className="mb-3">
                <button className="but1">Employee Paygrades</button>
              </Link>
              <br />
              <Link to="/hr/view_jobTitles" className="mb-3">
                <button className="but1">Job Titles</button>
              </Link>
              <br />
              <Link to="/supervisorAllocation" className="mb-3">
                <button className="but1">Supervisor Allocation</button>
              </Link>
              <br />
              <Link to="/hr/view_employees" className="mb-3">
                <button className="but1">Employee List</button>
              </Link>
              <br />
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>{/* <ViewRequest /> */}</ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default HRHome;
