import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
import CitizenRoute from "./Routes/Admin/Citizen/CitizenRoute";
import DistrictRoute from "./Routes/Admin/Main-Admin/DistrictRoute";
import StationRoute from "./Routes/Admin/Main-Admin/StationRoute";
import ComplaintRoute from "./Routes/Client/Complaint/ComplaintRoute";
import HomeRoute from "./Routes/Client/Home/HomeRoute";
import ContactRoute from "./Routes/Client/Contact/ContactRoute";
import ServiseRoute from "./Routes/Client/Servise/ServiseRoute";
import FeedbacksRoute from "./Routes/Client/Feedbacks/FeedbacksRoute";

ReactDOM.render(
  <BrowserRouter>
    <CitizenRegisterLoginRoute />
    <CitizenRoute />
    <DistrictRoute />
    <StationRoute />
    <ComplaintRoute />
    <HomeRoute />
    <ContactRoute />
    <ServiseRoute />
    <FeedbacksRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
