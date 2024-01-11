// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
// import DistrictRoute from "./Routes/Admin/Main-Admin/DistrictRoute";
// import StationRoute from "./Routes/Admin/Main-Admin/StationRoute";
// import ClientMainRoute from "./Routes/Client/ClientMainRoute";
// import AdminLoginRoute from "./Routes/Admin/AdminLoginRoute";
// import MainDashboardRoute from "./Routes/Admin/Main-Admin/MainDashboardRoute";
// import DistrictDashboardRoute from "./Routes/Admin/District-Admin/DistrictDashboardRoute";
// import LocalDashboardRoute from "./Routes/Admin/Local-Admin/LocalDashboardRoute";

// ReactDOM.render(
//   <BrowserRouter>
//     {/* Citizen Routes */}
//     <CitizenRegisterLoginRoute />
//     <ClientMainRoute />
//     {/* Main Admin Routes */}
//     <MainDashboardRoute />
//     <DistrictRoute />
//     <StationRoute />
//     {/* District Admin Routes */}
//     <DistrictDashboardRoute />

//     {/* Local Admin Routes */}
//     <LocalDashboardRoute />
//     {/* Admins Login Routes */}
//     <AdminLoginRoute />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
import CitizenRoute from "./Routes/Admin/Citizen/CitizenRoute";
import DistrictRoute from "./Routes/Admin/Main-Admin/DistrictRoute";
import StationRoute from "./Routes/Admin/Main-Admin/StationRoute";
import ClientMainRoute from "./Routes/Client/ClientMainRoute";
import ComplaintRoute from "./Routes/Client/Complaint/ComplaintRoute";

ReactDOM.render(
  <BrowserRouter>
    <CitizenRegisterLoginRoute />
    <CitizenRoute />
    <ClientMainRoute />
    <DistrictRoute />
    <StationRoute />
    <ComplaintRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
