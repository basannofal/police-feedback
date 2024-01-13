import React from "react";
import { Route, Routes } from "react-router-dom";
import LocalAdminDashboard from "../../../Pages/Admin/Local-Admin/LocalAdminDashboard";
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
      </Routes>
    </>
  );
};

export default LocalDashboardRoute;
