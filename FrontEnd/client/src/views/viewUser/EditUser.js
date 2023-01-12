import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
//import SubHeader from "../../components/subHeader/subHeader";
import { useNavigate } from "react-router-dom";
import "./ViewUser.css";

export function EditUser(props) {
  const navigate = useNavigate();

  const initialValues = props.userDetails;
  const [formValues, setformValues] = useState(initialValues);
  const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [depSelect, setDepSelect] = useState([]);
  const [MsSelect, setMsSelect] = useState([]);
  const [EtSelect, setEtSelect] = useState([]);
  const [PgSelect, setPgSelect] = useState([]);
  const [EsSelect, setEsSelect] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getHRMSdetails").then((response) => {
      //setUserslist(response.data);
      const selectDetails = response.data;
      setDepSelect([...selectDetails[0]]);
      setMsSelect([...selectDetails[1]]);
      setEtSelect([...selectDetails[2]]);
      setPgSelect([...selectDetails[3]]);
      setEsSelect([...selectDetails[4]]);
    });
  }, []);

  useEffect(() => {
    setformValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(formValues);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      setData(formValues);
      let token = sessionStorage.getItem("token");
      Axios.post(
        "http://localhost:3001/manager/edit_user/" + formValues.id,
        data,
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
    setIsSubmit(false);
  }, [isSubmit, formValues, data]);

  return (
    <div>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={alertType}
        role="alert"
      >
        {alertMessage}
      </div>

      <form onSubmit={handleSubmit} className="form_eu">
        <div className="form-group mb-2">
          <label className="label1">Firstname</label>
          <input
            name="firstname"
            type="text"
            className="form-control"
            value={formValues.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Lastname</label>
          <input
            name="lastname"
            type="text"
            className="form-control"
            value={formValues.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Birthday</label>
          <input
            name="birthday"
            type="date"
            className="form-control"
            value={formValues.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Salary</label>
          <input
            name="salary"
            type="text"
            className="form-control"
            value={formValues.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Joined Date</label>
          <input
            name="Joined_date"
            type="date"
            className="form-control"
            value={formValues.Joined_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">NIC Number</label>
          <input
            name="nic_number"
            type="text"
            className="form-control"
            value={formValues.nic_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group mb-2">
            <label className="label1">Phone Number 1</label>
            <input
              name="phone1"
              type="text"
              className="form-control"
              value={formValues.phone1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-2">
            <label className="label1">Phone Number 2</label>
            <input
              name="phone2"
              type="text"
              className="form-control"
              value={formValues.phone2}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group mb-2">
          <label className="label1">Department </label>
          <br></br>
          <select
            name="dept_id"
            className="select-box2"
            onChange={handleChange}
            value={formValues.dept_id}
          >
            {depSelect.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <label className="label1">Marital Status</label>
          <select
            name="marital_id"
            className="select-box2"
            onChange={handleChange}
            value={formValues.marital_id}
          >
            {MsSelect.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <label className="label1">Employee status</label>
          <select
            name="empstatus_id"
            className="select-box2"
            onChange={handleChange}
            value={formValues.empstatus_id}
          >
            {EsSelect.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>{" "}
        <div className="form-group mb-2">
          <label className="label1">Employee Type</label>
          <select
            name="emptype_id"
            className="select-box2"
            onChange={handleChange}
            value={formValues.emptype_id}
          >
            {EtSelect.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <h5>Address</h5>
        <div className="form-group mb-2">
          <label className="label1">Line 1</label>
          <input
            name="line1"
            type="text"
            className="form-control"
            value={formValues.line1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Line 2</label>
          <input
            name="line2"
            type="text"
            className="form-control"
            value={formValues.line2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">City</label>
          <input
            name="city"
            type="text"
            className="form-control"
            value={formValues.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">District</label>
          <input
            name="district"
            type="text"
            className="form-control"
            value={formValues.district}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Postal code</label>
          <input
            name="postal_code"
            type="text"
            className="form-control"
            value={formValues.postal_code}
            onChange={handleChange}
            required
          />
        </div>
        <br></br>
        <h4>Emergency Contact Number Details</h4>
        <br></br>
        <div className="form-group mb-2">
          <label className="label1">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Phone Number</label>
          <input
            name="phone_number"
            type="text"
            className="form-control"
            value={formValues.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label className="label1">Relation</label>
          <input
            name="relationship"
            type="text"
            className="form-control"
            value={formValues.relationship}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <center>
            <button type="submit" className="but2" data-bs-dismiss="modal">
              Save
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}
