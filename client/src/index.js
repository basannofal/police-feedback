import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
import DistrictRoute from "./Routes/Admin/Main-Admin/DistrictRoute";
import StationRoute from "./Routes/Admin/Main-Admin/StationRoute";
import ClientMainRoute from "./Routes/Client/ClientMainRoute";
import AdminLoginRoute from "./Routes/Admin/AdminLoginRoute";
import MainDashboardRoute from "./Routes/Admin/Main-Admin/MainDashboardRoute";

ReactDOM.render(
  <BrowserRouter>
    <CitizenRegisterLoginRoute />
    <ClientMainRoute />
    <MainDashboardRoute />
    <DistrictRoute />
    <StationRoute />
    <AdminLoginRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
