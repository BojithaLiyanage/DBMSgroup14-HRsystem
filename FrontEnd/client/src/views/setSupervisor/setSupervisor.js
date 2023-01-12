import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
//import SubHeader from "../../components/subHeader/subHeader";
import { useNavigate } from "react-router-dom";
import "./button.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function notInList(element, list) {
  for (let x = 0; x < list.length; x++) {
    if (element == list[x]) {
      return false;
    }
  }
  return true;
}

//Emp_Id: 35
//Sup_Id: 34

export function SetSupervisor(props) {
  const uID = props.userID;
  const Emfirstname = props.fname;
  const Emlastname = props.lname;
  const allUsers = props.allU;
  const Supervisor_list = props.supList;
  const users_supList = [];
  const [searchedVal, setSearchedVal] = useState("");
  var supervisor_allocate = false;

  for (let x = 0; x < Supervisor_list.length; x++) {
    if (Supervisor_list[x].Emp_Id == uID) {
      users_supList.push(Supervisor_list[x].Sup_Id);
      supervisor_allocate = true;
    }
  }

  const filteredList = allUsers.filter(function (e) {
    return e.empId != uID && notInList(e.empId, users_supList);
  });

  const assign = (e) => {
    const Employee_ID = uID;
    const Supervisor_ID = e.currentTarget.dataset.id;
    const supervisorDetails = { Sup_ID: Supervisor_ID, Emp_ID: Employee_ID };
    console.log("assigned empId,SupId: ", Employee_ID, Supervisor_ID);
    let token = sessionStorage.getItem("token");
    Axios.post("http://localhost:3001/hr/setSupervisor", supervisorDetails, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //setAlertType("alert alert-success");
        //setAlertMessage(response.data.message);
      })
      .catch((err) => {
        // setAlertType("alert alert-danger");
        // setAlertMessage("");
        // switch (err.response.request.status) {
        //   case 400:
        //     setAlertMessage(err.response.data.message);
        //     setShow(true);
        //     break;
        //   case 500:
        //     setAlertMessage("Server Error!");
        //     setShow(true);
        //     break;
        //   case 501:
        //     setAlertMessage("Server Error!");
        //     setShow(true);
        //     break;
        //   case 502:
        //     setAlertMessage("Server Error!");
        //     setShow(true);
        //     break;
        //   default:
        //     break;
        // }
      });
  };

  if (supervisor_allocate) {
    return (
      <div>
        <h4>
          {Emfirstname} {Emlastname}
        </h4>
        <button
          className="but3"
          data-bs-toggle="modal"
          data-bs-target={`#supervisorSet${uID}`}
        >
          Set Supervisor
        </button>

        <div
          className="modal fade"
          id={`supervisorSet${uID}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <div
                  class="alert alert-primary d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>
                    A supervisor has been already allocated for {Emfirstname}{" "}
                    {Emlastname}.
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <button className="but4" data-bs-dismiss="modal">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h4>
          {Emfirstname} {Emlastname}
        </h4>
        <button
          className="but3"
          data-bs-toggle="modal"
          data-bs-target={`#supervisorSet${uID}`}
        >
          Set Supervisor
        </button>

        <div
          className="modal fade"
          id={`supervisorSet${uID}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable ">
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Assign a Supervisor for {Emfirstname} {Emlastname}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="background-sup">
                <div className="input-group rounded">
                  <input
                    type="search"
                    id="searhResult"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={(e) => setSearchedVal(e.target.value)}
                  />
                </div>

                <table className="table" id="myTable">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Department</th>
                      <th scope="col">Paygrade</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList
                      .filter(
                        (row) =>
                          !searchedVal.length ||
                          row.firstname
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase())
                      )
                      .map(
                        ({
                          empId,
                          firstname,
                          lastname,
                          dept_name,
                          paygrade,
                        }) => (
                          <tr key={empId}>
                            <td scope="row">
                              {firstname} {lastname}
                            </td>
                            <td>{dept_name}</td>
                            <td>{paygrade}</td>
                            <td>
                              <button
                                onClick={assign}
                                data-id={empId}
                                className="but3"
                                data-bs-dismiss="modal"
                              >
                                Assign
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
