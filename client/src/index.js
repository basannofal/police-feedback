import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
import CitizenRoute from "./Routes/Admin/Citizen/CitizenRoute";
import DistrictRoute from "./Routes/Admin/Main-Admin/DistrictRoute";
import StationRoute from "./Routes/Admin/Main-Admin/StationRoute";
import ClientMainRoute from "./Routes/Client/ClientMainRoute";

ReactDOM.render(
  <BrowserRouter>
    <CitizenRegisterLoginRoute />
    <CitizenRoute />
    <ClientMainRoute />
    <DistrictRoute />
    <StationRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
