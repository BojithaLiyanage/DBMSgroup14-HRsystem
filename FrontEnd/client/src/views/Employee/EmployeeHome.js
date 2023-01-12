import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./EmployeeHome.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EmployeeHomeTable from "./EmployeeHomeTable";

class EmployeeHome extends Component {
  constructor(props) {
    super(props);
    this.user_id = sessionStorage.getItem("userId");
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
        <div className="bg-employee">
          <h1 className="title">Employee Home</h1>
          <br></br>

          <div class="center">
            <div class="btn-group-vertical">
              <Link to={"/user/apply_leave"} className="mb-3">
                <button outline color="dark" className="but1">
                  Apply Leave
                </button>
              </Link>
              <Link to={`/manager/view_user/${this.user_id}`} className="mb-3">
                <button outline color="dark" className="but1">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
          <h1 className="cardtitle4">My Leave Details</h1>
          <EmployeeHomeTable />
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EmployeeHome;
