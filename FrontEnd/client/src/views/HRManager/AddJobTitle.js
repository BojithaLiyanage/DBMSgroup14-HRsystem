import React, { useState, useEffect } from "react";
import Axios from "axios";

export function AddTitle() {
  const [formValues, setformValues] = useState({});
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      let token = sessionStorage.getItem("token");
      Axios.post("http://localhost:3001/hr/add_title/", formValues, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
    setIsSubmit(false);
  });

  return (
    <div className="container">
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>

      <form class="p-3" onSubmit={handleSubmit}>
        <div className="form-group mb-3 mx-0">
          <label className="label1">Job Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <center>
            <button className="but2" type="submit">
              Save
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}
