import React from "react";
import { Route, Routes } from "react-router-dom";
import MainAdminDashboard from "../../../Pages/Admin/Main-Admin/MainAdminDashboard";

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
      </Routes>
    </>
  );
};

export default MainDashboardRoute;
