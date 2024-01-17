import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CitizenRegisterLoginRoute from "./Routes/Client/Citizen/CitizenRegisterLoginRoute";
import DistrictRoute from "./Routes/Admin/Main-Admin/DistrictRoute";
import StationRoute from "./Routes/Admin/Main-Admin/StationRoute";
import ComplaintRoute from "./Routes/Client/Complaint/ComplaintRoute";
import HomeRoute from "./Routes/Client/Home/HomeRoute";
import ContactRoute from "./Routes/Client/Contact/ContactRoute";
import ServiseRoute from "./Routes/Client/Servise/ServiseRoute";
import FeedbacksRoute from "./Routes/Client/Feedbacks/FeedbacksRoute";
import AdminLoginRoute from "./Routes/Admin/AdminLoginRoute";
import MainDashboardRoute from "./Routes/Admin/Main-Admin/MainDashboardRoute";
import DistrictDashboardRoute from "./Routes/Admin/District-Admin/DistrictDashboardRoute";
import LocalDashboardRoute from "./Routes/Admin/Local-Admin/LocalDashboardRoute";
import MyapplicationRoute from "./Routes/Client/Myapplication/MyapplicationRoute";
import EmergencyComplaintRoute from "./Routes/Client/EmergencyComplaint/EmergencyComplaintRoute";
import FeedbackRoute from "./Routes/Admin/Local-Admin/FeedbackRoute";

ReactDOM.render(
  <BrowserRouter>
    {/* Citizen Routes */}
    <CitizenRegisterLoginRoute />
    <ComplaintRoute />
    <EmergencyComplaintRoute />
    <HomeRoute />
    <ContactRoute />
    <ServiseRoute />
    <FeedbacksRoute />
    {/* Main Admin Routes */}
    <MainDashboardRoute />
    <DistrictRoute />
    <StationRoute />
    {/* District Admin Routes */}
    <DistrictDashboardRoute />

    {/* Local Admin Routes */}
    <LocalDashboardRoute />
    <FeedbackRoute />
    {/* Admins Login Routes */}
    <AdminLoginRoute />
    <MyapplicationRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
