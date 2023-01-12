import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./ViewUserRequest.css";

export function ViewUserRequest(props) {
  const navigate = useNavigate();

  const leave_id = props.id;
  const [formValues, setformValues] = useState([]);
  // const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isAccept, setIsAccept] = useState(null);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get(`http://localhost:3001/supervisor/getLeaveData/${leave_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setformValues(response.data.data[0]);
    });
  }, []);

  const dateFormatter = (date) => {
    if (date != null) {
      return date.split("T")[0];
    } else {
      return date;
    }
  };

  const handleAccept = (e) => {
    e.preventDefault();
    setIsAccept(true);
  };

  const handleReject = (e) => {
    e.preventDefault();
    setIsAccept(false);
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (isAccept) {
      Axios.post(
        `http://localhost:3001/supervisor/accept_leave/${formValues.id}`,
        [],
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((response) => {
          setAlertType("alert alert-success");
          setAlertMessage(response.data.message);
          setShow(true);
        })
        .catch((err) => {
          setAlertType("alert alert-danger");
          setAlertMessage("");
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
    } else if (isAccept === false) {
      Axios.post(
        `http://localhost:3001/supervisor/reject_leave/${formValues.id}`,
        [],
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((response) => {
          setAlertType("alert alert-success");
          setAlertMessage(response.data.message);
          setShow(true);
        })
        .catch((err) => {
          setAlertType("alert alert-danger");
          setAlertMessage("");
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
    }
    setIsAccept(null);
  }, [isAccept]);

  return (
    <div>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>

      <div className="bg-viewleave">
        <div>
          <center>
            <label className="label">Leave Request Id:</label>
            <p className="bg-secondary m-4 p-1 px-4 rounded text-white">
              {formValues.id}
            </p>
          </center>
        </div>

        <div className="text-center">
          <label className="label">Leave Status:</label>
          <p className="bg-primary p-1 px-4 rounded text-white">
            {formValues.status}
          </p>
        </div>

        <br />
        <div className="text-center mt-2">
          <label className="label">Name:</label>
          <h5 className="mt-2 mb-0">
            {formValues.firstname} {formValues.lastname}
          </h5>
          <br />

          <div className="px-4 mt-1">
            <label className="label">Leave Type:</label>
            <p className="fonts">{formValues.type}</p>
          </div>

          <div className="px-4 mt-1">
            <label className="label">Date:</label>
            <p className="fonts">{dateFormatter(formValues.Date)}</p>
          </div>

          <div className="px-4 mt-1">
            <label className="label">Reason:</label>
            <p className="fonts">{formValues.reason}</p>
          </div>

          <br />
          <div>
            <button
              className="but5"
              data-bs-dismiss="modal"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>

          <div>
            <button
              className="but6"
              data-bs-dismiss="modal"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
