import React, { useEffect, useState } from "react";
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const COLUMNS = [
  { Header: "Leave ID", accessor: "id" },
  { Header: "Type", accessor: "type" },
  { Header: "Date", accessor: "Date" },
  { Header: "status", accessor: "status" },
  { Header: "reason", accessor: "reason" },
];

export default function EmployeeHomeTable() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emp_ID, setEmpID] = useState("");

  const user_id = sessionStorage.getItem("userId");

  const setShowToTrue = () => {
    setShow(true);
  };

  const setShowToFalse = () => {
    setShow(false);
  };

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get(`http://localhost:3001/user/get_leaves/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((leaves) => {
        setLeaves(leaves.data.data);
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: leaves,
    },
    useRowSelect,
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [...columns]; //Above is a dependency for a manager. Check Role!
      });
    }
  );

  return (
    <>
      <React.Fragment>
        <br></br>
        <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
          <p>{alertMessage}</p>
        </Alert>
        <br></br>
        <br></br>
        <div>
          <TableContainer component={Paper} sx={{ mt: -2 }}>
            <Table
              sx={{
                minWidth: 650,
                bgcolor: "#141b2d",
                padding: 100,
              }}
              size="medium"
              aria-label="a dense table"
            >
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="center">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}

              <TableBody {...getTableBodyProps()}>
                {leaves.map(({ id, type, Date, status, reason }) => (
                  <TableRow>
                    <TableCell align="center" sx={{ color: "#fff" }} key={id}>
                      {id}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }} key={id}>
                      {type}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }} key={id}>
                      {dateFormatter(Date)}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }} key={id}>
                      {status}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }} key={id}>
                      {reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </React.Fragment>
    </>
  );
}
