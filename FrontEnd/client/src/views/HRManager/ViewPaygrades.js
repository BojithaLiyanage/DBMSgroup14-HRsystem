import React, { useState, useEffect } from "react";
import Axios from "axios";
import { EditPaygrade } from "./EditPaygrade";
import "./ViewPaygrades.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export function ViewPaygrades() {
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);

  const [paygradeDetails, setPayGradeDetails] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/hr/getPayGrades", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const details = response.data;
        setPayGradeDetails(details);
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
  }, []);

  return (
    <div>
      <div className="background-HR">
        <div
          style={{ visibility: show ? "visible" : "hidden" }}
          className={alertType}
          role="alert"
        >
          {alertMessage}
        </div>

        <div>
          <h1 className="title">Paygrades</h1>
          <TableContainer component={Paper} sx={{ mt: 10 }}>
            <Table
              sx={{
                minWidth: 650,
                bgcolor: "#141b2d",
                padding: 50,
              }}
              size="medium"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: 17, fontWeight: 600, color: "#fff" }}
                  >
                    Paygrade{" "}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: 17, fontWeight: 600, color: "#fff" }}
                  >
                    Salary
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: 17, fontWeight: 600, color: "#fff" }}
                  >
                    No Of Leaves
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paygradeDetails.map(({ ID, paygrade, salary, num_leaves }) => (
                  <TableRow key={ID}>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      {paygrade}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      {salary}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      {num_leaves}
                    </TableCell>
                    <TableCell>
                      <button
                        className="but3"
                        data-bs-toggle="modal"
                        data-bs-target={"#editPaygrade" + ID}
                      >
                        Edit Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {paygradeDetails.map((paygrade) => (
          <div
            className="modal fade"
            id={"editPaygrade" + paygrade.ID}
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
                    Edit Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <EditPaygrade paygrade={paygrade} />
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
