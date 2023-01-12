import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function CreateEmployeeAndSupervisorReport() {
  const [parameterList, setParameterList] = useState([]);
  const [parameters, setParameters] = useState(null);
  const [formValues, setformValues] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get(
      "http://localhost:3001/report/get_employee_and_supervisor_report_parameters",
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((resParameterList) => {
        setParameterList(resParameterList.data.data);
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
    setParameters(new Array(parameterList.length).fill(false));
  }, [parameterList]);

  useEffect(() => {
    setformValues({ ...formValues, parameters: parameters });
  }, [parameters]);

  const handleParameterChange = (position) => {
    const updatedCheckedParameters = parameters.map((parameter, index) =>
      index === position ? !parameter : parameter
    );

    setParameters(updatedCheckedParameters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reports/employeeAndSupervisorReport", { state: { formValues } });
  };

  const isRequired = (parameter) => {
    let requiredParametrs = ["Employee Name", "Supervisor Name"];

    if (requiredParametrs.includes(parameter)) return true;
    else return false;
  };

  return (
    <div className="background-Report ">
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>

      <div>
        <h1 class="title">Create Employee And Supervisor Report</h1>

        <center>
          <div>
            <label className="cardtitle1">
              Select down the Report Parameters
            </label>
            <ul className="form">
              {parameterList.map((name, index) => {
                return (
                  <div>
                    <FormControl size="small">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                "&:hover": { bgcolor: "white" },
                              }}
                            />
                          }
                          label={name.COLUMN_NAME}
                          labelPlacement="start"
                          id={`custom-checkbox-${index}`}
                          checked={parameters[index]}
                          required={isRequired(name.COLUMN_NAME)}
                          onChange={() => handleParameterChange(index)}
                        />{" "}
                      </FormGroup>
                    </FormControl>
                  </div>
                );
              })}
            </ul>
          </div>

          <div className="form-group text-center">
            <button type="submit" className="but4" onClick={handleSubmit}>
              Generate Report
            </button>
          </div>
        </center>
      </div>
    </div>
  );
}

export default CreateEmployeeAndSupervisorReport;
