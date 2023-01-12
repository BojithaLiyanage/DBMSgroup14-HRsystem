import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ViewPaygrades.css";

export function EditPaygrade(props) {
  const paygrade = props.paygrade;

  const [formValues, setformValues] = useState({});
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setformValues(paygrade);
  }, [paygrade]);

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
      Axios.post("http://localhost:3001/hr/edit_paygrade/", formValues, {
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
  }, [isSubmit, formValues]);

  return (
    <div>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="label1">Paygrade</label>
          <p className="form-control"> {formValues.paygrade}</p>
        </div>

        <div className="form-group mb-3">
          <label className="label1">Salary</label>
          <input
            name="salary"
            type="number"
            className="form-control"
            value={formValues.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="label1">Number of Leaves</label>
          <input
            name="num_leaves"
            type="number"
            className="form-control"
            value={formValues.num_leaves}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <center>
            <button className="but2" type="submit">
              Save Changes
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}
