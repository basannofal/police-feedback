import React from "react";
import { Route, Routes } from "react-router-dom";
import LocalAdminDashboard from "../../../Pages/Admin/Local-Admin/LocalAdminDashboard";
import LocalComplaints from "../../../Pages/Admin/Local-Admin/LocalComplaints";
const LocalDashboardRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/local-station-admin/:id"
          element={
            <>
              <LocalAdminDashboard />
            </>
          }
        />
         <Route
          path="/local-station-complaint/:id"
          element={
            <>
              <LocalComplaints />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default LocalDashboardRoute;
