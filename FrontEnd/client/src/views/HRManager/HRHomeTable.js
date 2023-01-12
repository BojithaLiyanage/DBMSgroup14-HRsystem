import React, { useEffect, useState } from "react";
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, Modal, ModalHeader, ModalBody, Alert } from "reactstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const COLUMNS = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Type", accessor: "type" },
  { Header: "Status", accessor: "status" },
  { Header: "Birthday", accessor: "birthday" },
  { Header: "Email", accessor: "email" },
  { Header: "Joined Date", accessor: "Joined_date" },
  { Header: "NIC", accessor: "nic_number" },
  { Header: "Leave Count", accessor: "leave_count" },
];

export default function HRHomeTable() {
  const navigate = useNavigate();
  const [users, setUserDetails] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
    Axios.get("http://localhost:3001/manager/get_users_list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((userList) => {
        const filteredUsersList = userList.data.data.filter((e) => {
          return e.type != "HR Manager" && e.type != "Admin";
        });
        setUserDetails(filteredUsersList);
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
      data: users,
    },
    useRowSelect,
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [...columns];
      });
    }
  );

  return (
    <>
      <React.Fragment>
        <div className="background-HR">
          <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
            <p>{alertMessage}</p>
          </Alert>
          {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}

          <TableContainer component={Paper} sx={{ mt: 7 }}>
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
                {users.map(
                  ({
                    id,
                    firstname,
                    lastname,
                    type,
                    status,
                    birthday,
                    email,
                    Joined_date,
                    nic_number,
                    leave_count,
                  }) => (
                    <TableRow key={id}>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {id}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        <Link to={`/manager/view_user/${id}`}>
                          {firstname} {lastname}
                        </Link>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {type}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {status}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {dateFormatter(birthday)}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {email}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {dateFormatter(Joined_date)}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {nic_number}
                      </TableCell>
                      <TableCell key={id} align="center" sx={{ color: "#fff" }}>
                        {leave_count}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </React.Fragment>
    </>
  );
}
