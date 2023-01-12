import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { EditUser } from "./EditUser";
import "./ViewUser.css";
import { CheckIf } from "./buttonComponent";

export function ViewUser() {
  const { user_id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [isSupervisorSet, setisSupervisorSet] = useState(false);
  const [supervisorDetails, setSupervisor] = useState({});

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/manager/view_user/" + user_id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((getUserDetails) => {
        setUserDetails(getUserDetails.data.data);
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
  }, [user_id]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/manager/get_supervisor/" + user_id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((supervisor) => {
        if (supervisor.data.data.length !== 0) {
          setSupervisor(supervisor.data.data[0]);
          setisSupervisorSet(true);
        }
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
  }, [user_id]);

  return (
    <div>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>
      <div>
        <div>
          <div className="bg-viewuser">
            <div className="text-center">
              <br></br>
              <h5 className="bg-primary p-1 px-4 rounded text-white">
                Employee ID: {userDetails.empId}
              </h5>
              <h5 className="txt1">
                {userDetails.firstname} {userDetails.lastname}
              </h5>
              <p className="px-4 rounded text-white">{userDetails.type}</p>
              <h7 className="txt2">{userDetails.dept_name} Department</h7>
              <h6 className="fonts">{userDetails.status}</h6>
            </div>
            <hr></hr>
            <div className="bg-viewuser">
              <div>
                <label className="fonts">
                  E-mail: <lable className="det"> {userDetails.email}</lable>
                </label>

                <br />
                <label className="fonts">
                  Mobile Number (Primary):{" "}
                  <lable className="det">{userDetails.phone1}</lable>
                </label>

                <br />
                <label className="fonts">
                  Mobile Number (Secondary):{" "}
                  <lable className="det">{userDetails.phone2}</lable>
                </label>

                <br />
                <label className="fonts">
                  Joined date:{" "}
                  <lable className="det">{userDetails.Joined_date}</lable>
                </label>

                <br />
                <label className="fonts">
                  Birthday:{" "}
                  <lable className="det">{userDetails.birthday}</lable>
                </label>

                <br />
                <label className="fonts">
                  Pay Grade:{" "}
                  <lable className="det">{userDetails.paygrade}</lable>
                </label>

                <br />
                <label className="fonts">
                  Salary: <lable className="det">{userDetails.salary}</lable>
                </label>
                <br />

                <label className="fonts">
                  NIC Number:{" "}
                  <lable className="det">{userDetails.nic_number}</lable>
                </label>

                <br />
                <label className="fonts">
                  Leaves Count:{" "}
                  <lable className="det">{userDetails.leave_count}</lable>
                </label>

                <br />
                <label className="fonts">
                  Address:{" "}
                  <lable className="det">
                    {userDetails.line1}, {userDetails.line2}, {userDetails.city}
                    , {userDetails.district}
                  </lable>
                </label>

                <br />
                <label className="fonts">
                  Marital Status:{" "}
                  <lable className="det">{userDetails.mar_status}</lable>
                </label>

                <br />
                <br />

                <hr></hr>
                <h6 className="txt2"> Emergency Contact Details: </h6>

                <label className="fonts">
                  Name: <lable className="det">{userDetails.name}</lable>
                </label>
                <br />
                <label className="fonts">
                  Relation:{" "}
                  <lable className="det">{userDetails.relationship}</lable>
                </label>
                <br />
                <label className="fonts">
                  Contact Number:{" "}
                  <lable className="det">{userDetails.phone_number}</lable>
                </label>
                <br />

                <hr></hr>

                {isSupervisorSet ? (
                  <div>
                    <h6 className="alotxt1">
                      {" "}
                      Allocated Supervisor:{" "}
                      {sessionStorage.getItem("paygrade") === "level 1" ||
                      sessionStorage.getItem("paygrade") === "level 2" ? (
                        <p className="alotxt1">
                          {supervisorDetails.firstname}{" "}
                          {supervisorDetails.lastname}
                        </p>
                      ) : (
                        <Link
                          className="alotxt1"
                          to={`/manager/view_user/${supervisorDetails.user_Id}`}
                        >
                          {supervisorDetails.firstname}{" "}
                          {supervisorDetails.lastname}
                        </Link>
                      )}{" "}
                    </h6>
                  </div>
                ) : (
                  <h6 className="alotxt2">No Supervisor Allocated</h6>
                )}
              </div>
              <br />
              <br />
              <CheckIf />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editUser"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit User Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditUser userDetails={userDetails} />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
