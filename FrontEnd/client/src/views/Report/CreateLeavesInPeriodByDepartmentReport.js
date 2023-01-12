import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";

export function CreateLeavesInPeriodByDepartmentReport() {
  const [formValues, setformValues] = useState({});
  const [errmsg, setErr] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.to >= formValues.from)
      navigate("/reports/LeavesInPeriodByDepartmentReport", {
        state: { formValues },
      });
    else {
      setAlertType("alert alert-danger");
      setAlertMessage("Invalid dates, To date must be after From date.");
      setShow(true);
    }
  };

  return (
    <div className="background-Report">
      <div>
        <h1 class="title">Create Leaves In Period By Department Report</h1>

        <div
          style={{ visibility: show ? "visible" : "hidden" }}
          className={alertType}
          role="alert"
        >
          {alertMessage}
        </div>

        <center>
          <lable className="cardtitle3">
            Select the period to calculate the number of leaves based on
            department:
          </lable>

          <div class="side-by-side">
            <div className="form-group mt-1 mb-0 mx-5 side-by-side w-25">
              <label className="cardtitle2">From: </label>
              <input
                type="date"
                className="form-control mb-4 mx-4"
                name="from"
                id="from"
                value={formValues.from}
                onChange={handleChange}
                required
              />
              <label className="cardtitle2">To:</label>
              <input
                type="date"
                className="form-control mb-4 mx-4"
                name="to"
                id="to"
                value={formValues.to}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </center>

        <div className="form-group text-center">
          <button type="submit" className="but4" onClick={handleSubmit}>
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLeavesInPeriodByDepartmentReport;
