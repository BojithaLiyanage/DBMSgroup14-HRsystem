import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ReactTable from "react-table";

export function ViewUsersList() {
  const [userDetails, setUserDetails] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/manager/get_users_list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((userList) => {
        setUserDetails(userList.data.data);
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

  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-3 mb-0">Displaying Current Users List</h1>
        <div
          style={{ visibility: show ? "visible" : "hidden" }}
          className={alertType}
          role="alert"
        >
          {alertMessage}
        </div>
        <div className="container">
          <ul>
            {userDetails.map(({ id, firstname, lastname }) => (
              <li key={id}>
                <Link to={`/manager/view_user/${id}`}>
                  {firstname} {lastname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
