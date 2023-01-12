import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Redirect } from "react";
import { Login } from "../views/login/login";
import { Logout } from "../views/login/logout";
import { Register } from "../views/register/register";
import { Supervisor } from "../views/setSupervisor/supervisor";
import { ViewUser } from "../views/viewUser/ViewUser";
import { ViewUsersList } from "../views/manager/ViewUsersList";
import { ApplyLeave } from "../views/Employee/ApplyLeave";
import { Error } from "../views/error/error";
import { ViewProfile } from "../views/user/ViewProfile";
import { CreateEmployeeByDepartmentReport } from "../views/Report/CreateEmployeeByDepartmentReport";
import { CreateLeavesInPeriodByDepartmentReport } from "../views/Report/CreateLeavesInPeriodByDepartmentReport";
import { CreateGroupedEmployeesReport } from "../views/Report/CreateGroupedEmployeeCountReport";
import { CreateEmployeeAndSupervisorReport } from "../views/Report/CreateEmployeeAndSupervisorReport";
import { EmployeeByDepartmentReport } from "../views/Report/EmployeeByDepartmentReport";
import { LeavesInPeriodByDepartmentReport } from "../views/Report/LeavesInPeriodByDepartmentReport";
import { AverageSalarybyDepartmentReport } from "../views/Report/AverageSalarybyDepartmentReport";
import { EmployeeAndSupervisorReport } from "../views/Report/EmployeeAndSupervisorReport";
import { GroupedEmployeesReport } from "../views/Report/GroupedEmployeeCountReport";
import SupervisorHome from "../views/Supervisor/SupervisorHome";
import HRViewEmployeeList from "../views/HRManager/ViewEmployeeList";
import HRHome from "../views/HRManager/HRHome";
import ManagerHome from "../views/manager/ManagerHome";
import ManagerViewEmployeeList from "../views/manager/ViewEmployeeList";
import ReportList, { ReportListWithRouter } from "../views/Report/ReportList";
import EmployeeHome from "../views/Employee/EmployeeHome";
import { LevelAuthRoute } from "../auth/LevelAuthRoute";
import { ViewPaygrades } from "../views/HRManager/ViewPaygrades";
import { ViewUserRequest } from "../views/Supervisor/ViewUserRequest";
import { VieJobTitles } from "../views/HRManager/ViewJobTitles";
import Header from "../views/admin/Header";
import LoginSignup from "../views/admin/LoginSignupMainComponent";
import RegisterHR from "../views/admin/RegisterHR";
import AdminHome from "../views/admin/AdminHome";
// import Logout from '../components/Logout'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/register"
          element={
            <LevelAuthRoute levels={["level 4"]}>
              {" "}
              <Register />{" "}
            </LevelAuthRoute>
          }
        />
        {/* <Route path="/" element={<LoginSignup />}></Route> */}
        {/* <Route path="/logout" element={<Logout />}></Route> */}
        <Route path="/adminHome" element={<AdminHome />}></Route>
        <Route path="/registerHR" element={<RegisterHR />}></Route>

        <Route path="*" element={<LoginSignup />}></Route>
        <Route
          path="/supervisorAllocation"
          element={
            <LevelAuthRoute levels={["level 4"]}>
              {" "}
              <Supervisor />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/supervisorHome"
          element={
            <LevelAuthRoute levels={["level 2"]}>
              {" "}
              <SupervisorHome />
            </LevelAuthRoute>
          }
        />
        <Route
          path="/viewRequest/:user_id"
          element={
            <LevelAuthRoute levels={["level 2"]}>
              {" "}
              <ViewUserRequest />
            </LevelAuthRoute>
          }
        />
        <Route path="/hrHome" element={<HRHome />} />
        <Route
          path="/managerHome"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              <ManagerHome />
            </LevelAuthRoute>
          }
        />
        <Route
          path="/employeeHome"
          element={
            <LevelAuthRoute levels={["level 1"]}>
              {" "}
              <EmployeeHome />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/hr/view_employees"
          element={
            <LevelAuthRoute levels={["level 4"]}>
              {" "}
              <HRViewEmployeeList />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/hr/view_paygrades"
          element={
            <LevelAuthRoute levels={["level 4"]}>
              <ViewPaygrades />
            </LevelAuthRoute>
          }
        />
        <Route
          path="/hr/view_jobTitles"
          element={
            <LevelAuthRoute levels={["level 4"]}>
              {" "}
              <VieJobTitles />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/manager/view_user/:user_id"
          element={
            <LevelAuthRoute
              levels={["level 4", "level 3", "level 2", "level 1"]}
            >
              {" "}
              <ViewUser />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/manager/view_employees"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <ManagerViewEmployeeList />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/user/apply_leave"
          element={
            <LevelAuthRoute levels={["level 1", "level 2"]}>
              {" "}
              <ApplyLeave />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/user/view_profile"
          element={
            <LevelAuthRoute
              levels={["level 1", "level 2", "level 3", "level 4"]}
            >
              {" "}
              <ViewProfile />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <ReportListWithRouter />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/createEmployeeByDepartmentReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <CreateEmployeeByDepartmentReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/createLeavesInPeriodByDepartmentReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <CreateLeavesInPeriodByDepartmentReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/createGroupedEmployeesReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <CreateGroupedEmployeesReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/averageSalarybyDepartmentReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <AverageSalarybyDepartmentReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/createEmployeeAndSupervisorReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <CreateEmployeeAndSupervisorReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/employeeByDepartmentReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <EmployeeByDepartmentReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/leavesInPeriodByDepartmentReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <LeavesInPeriodByDepartmentReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/groupedEmployeesReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <GroupedEmployeesReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route
          path="/reports/employeeAndSupervisorReport"
          element={
            <LevelAuthRoute levels={["level 3"]}>
              {" "}
              <EmployeeAndSupervisorReport />{" "}
            </LevelAuthRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
