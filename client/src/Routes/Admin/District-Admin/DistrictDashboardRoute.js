import React from "react";
import { Route, Routes } from "react-router-dom";
import DistrictAdminDashboard from "../../../Pages/Admin/District-Admin/DistrictAdminDashboard";

const DistrictDashboardRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/district-admin"
          element={
            <>
              <DistrictAdminDashboard />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default DistrictDashboardRoute;
