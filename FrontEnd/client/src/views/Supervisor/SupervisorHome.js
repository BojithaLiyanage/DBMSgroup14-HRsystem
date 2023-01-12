import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./SupervisorHome.css";
import React, { Component } from "react";
import SupervisorHomeTable from "./SupervisorHomeTable";
import { Link } from "react-router-dom";

class SupervisorHome extends Component {
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

  userDetails = [];

  render() {
    return (
      <React.Fragment>
        <div className="background-supervisor">
          <h1 className="title">Supervisor Home</h1>
          <br></br>

          <div class="center">
            <div class="btn-group-vertical">
              <Link to={"/user/apply_leave"} className="mb-3">
                <Button outline color="dark" className="but1">
                  Apply Leave
                </Button>
              </Link>
              <Link to={`/manager/view_user/${this.user_id}`} className="mb-3">
                <Button outline color="dark" className="but1">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>

          <SupervisorHomeTable />
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

export default SupervisorHome;
