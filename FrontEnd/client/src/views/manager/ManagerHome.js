import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./ManagerHome.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class ManagerHome extends Component {
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
          <h1 className="mngtxt1">Manager Home</h1>
          <br></br>

          <div class="center">
            <div>
              <Link to="/manager/view_employees" className="mb-3">
                <button className="but1">Employee List</button>
              </Link>
              <br />
              <Link to="/reports" className="mb-3">
                <button className="but1">Reports</button>
              </Link>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>{/* <ViewRequest />  */}</ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ManagerHome;
