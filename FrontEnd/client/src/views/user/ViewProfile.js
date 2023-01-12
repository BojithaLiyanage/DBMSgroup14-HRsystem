import React, { useState, useEffect } from "react";
import Axios from 'axios';

export function ViewProfile () {
    const [userDetails, setUserDetails] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");

    useEffect(() => {
      let token = sessionStorage.getItem("token");
        Axios.get("http://localhost:3001/user/getProfile", { headers:{Authorization : `Bearer ${token}`}})
      .then((res) => {
        setUserDetails(res.data.user);
      })
      .catch((err) => {
        setAlertMessage("");
        setAlertType("alert alert-danger");
        switch (err.response.request.status) {
          case 400:          
            setAlertMessage(err.response.data.message);
            setShow (true);
            break;
          case 500:
            setAlertMessage("Server Error!");
            setShow (true);
            break;
          case 501:
            setAlertMessage("Server Error!");
            setShow (true);
            break;
          case 502:
            setAlertMessage("Server Error!");
            setShow (true);
            break;
          default:
            break;
        }
      });
  }, []);

    return (
    <div className="container">
         <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
            {alertMessage}
         </div>
         <div className="container">
            <p>{userDetails.firstname} {userDetails.lastname}</p>
         </div>
    </div>
);
}