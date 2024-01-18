import React from "react";
import { Route, Routes } from "react-router-dom";
import MainAdminDashboard from "../../../Pages/Admin/Main-Admin/MainAdminDashboard";
import Complaints from "../../../Pages/Admin/Main-Admin/Complaints/Complaints";

const MainDashboardRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/main-admin"
          element={
            <>
              <MainAdminDashboard />
            </>
          }
        />
        <Route
          path="/main-complaints"
          element={
            <>
              <Complaints />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default MainDashboardRoute;
