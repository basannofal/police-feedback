import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
import CitizenRoute from "./Routes/Admin/Citizen/CitizenRoute";
import DistrictRoute from "./Routes/Admin/Main_Admin/DistrictRoute";
import ClientMainRoute from "./Routes/Client/ClientMainRoute";

ReactDOM.render(
  <BrowserRouter>
    <CitizenRegisterLoginRoute />
    <CitizenRoute />
    <ClientMainRoute />
    <DistrictRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
