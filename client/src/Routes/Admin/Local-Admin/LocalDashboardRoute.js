import React from "react";
import { Route, Routes } from "react-router-dom";
import LocalAdminDashboard from "../../../Pages/Admin/Local-Admin/LocalAdminDashboard";
import LocalComplaints from "../../../Pages/Admin/Local-Admin/LocalComplaints";
import LocalFeedback from "../../../Pages/Admin/Local-Admin/LocalFeedback";
import LocalEmergencyComplaints from "../../../Pages/Admin/Local-Admin/LocalEmergencyComplaints";
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

        <Route
          path="/local-station-feedback/:id"
          element={
            <>
              <LocalFeedback />
            </>
          }
        />

        <Route
          path="/local-station-emergency-complaint/:id"
          element={
            <>
              <LocalEmergencyComplaints />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default LocalDashboardRoute;
