import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Footer from "../footer/footer";
import { login } from "./loginUtils";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Alert } from "reactstrap";
import { Input } from "antd";

export function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const initialValues = { username: "", password: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    setUserName(formValues.username);
    setPassword(formValues.password);
  }, [isSubmit, formValues]);

  useEffect(() => {
    if (isSubmit) {
      login({ username, password })
        .then((level) => {
          //const level = sessionStorage.getItem("paygrade");
          if (level == "level 0") {
            navigate("/adminHome");
          } else if (level == "level 1") {
            navigate("/employeeHome");
          } else if (level == "level 2") {
            navigate("/supervisorHome");
          } else if (level == "level 3") {
            navigate("/managerHome");
          } else if (level == "level 4") {
            navigate("/hrHome");
          } else {
            console.log("Invalid paygrade", level);
            navigate("/");
          }
        })
        .catch((err) => {
          setAlertType("alert alert-danger");
          switch (err.request.status) {
            case 400:
              setAlertMessage("Incorrect username or password");
              setShow(true);
              break;
            case 401:
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
  }, [isSubmit, username, password]);

  return (
    <div className="loginBody">
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>
      <div>
        <div className="row">
          <center>
            <div className="login">
              <h3> Welcome to Juyter Apperals </h3>
              <Form onSubmit={handleSubmit}>
                <Label className="logindet">Username</Label>
                <Input
                  placeholder="Enter Your User Name"
                  id="username"
                  type="text"
                  value={formValues.username}
                  onChange={handleChange}
                  name="username"
                />
                {/* <Input
                  id="username"
                  type="text"
                  value={formValues.username}
                  onChange={handleChange}
                  className="text border shadow-sm mt-0"
                  name="username"
                /> */}
                <br></br>

                <Label className="logindet">Password</Label>
                <Input
                  placeholder="Enter Your Password"
                  id="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  name="password"
                />
                {/* <Input
                  id="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="text border shadow-sm mt-0"
                  name="password"
                /> */}

                <br />

                <button className="but1">Sign In</button>
              </Form>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
