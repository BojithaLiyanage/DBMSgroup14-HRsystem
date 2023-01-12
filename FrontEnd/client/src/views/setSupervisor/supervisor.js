import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { SetSupervisor } from "./setSupervisor";
import "./button.css";

function checkAllocate(empID, supList) {
  var result = { status: "Not-Allocated", color: "secondary" };
  const emp_list = [];
  supList.map(({ Emp_Id }) => emp_list.push(Emp_Id));
  for (let x = 0; x < emp_list.length; x++) {
    if (empID == emp_list[x]) {
      result.status = "Allocated";
      result.color = "success";
      return result;
    }
  }
  return result;
}

export function Supervisor() {
  const [userDetails, setUserDetails] = useState([]);
  const [SupervisorList, setSupervisorList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [filteredList, setfilteredList] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/manager/get_users_list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((userList) => {
        setUserDetails(userList.data.data);
        setfilteredList(
          userList.data.data.filter(function (e) {
            return (
              e.type != "Admin" && e.type != "HR Manager" && e.type != "Manager"
            );
          })
        );
      })
      .catch((err) => {
        setAlertMessage("");
        setAlertType("alert alert-danger");
        switch (err.response.request.status) {
          case 400:
            setAlertMessage(err.response.data.message);
            setShow(true);
            break;
          case 500:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 501:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 502:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          default:
            break;
        }
      });
  }, []);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/manager/get_supervisor_list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((userList) => {
        setSupervisorList(userList.data.data);
      })
      .catch((err) => {
        setAlertMessage("");
        setAlertType("alert alert-danger");
        switch (err.response.request.status) {
          case 400:
            setAlertMessage(err.response.data.message);
            setShow(true);
            break;
          case 500:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 501:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 502:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          default:
            break;
        }
      });
  });

  return (
    <div>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>

      <div className="background-sup">
        <ul className="list-group">
          {filteredList.map(({ empId, firstname, lastname }) => (
            <li key={empId} className="center">
              <SetSupervisor
                userID={empId}
                fname={firstname}
                lname={lastname}
                allU={filteredList}
                supList={SupervisorList}
              />
              <h4
                className={`badge bg-${
                  checkAllocate(empId, SupervisorList).color
                }`}
              >
                {checkAllocate(empId, SupervisorList).status}
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
