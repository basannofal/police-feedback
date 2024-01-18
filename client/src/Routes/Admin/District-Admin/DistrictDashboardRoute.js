import React from "react";
import { Route, Routes } from "react-router-dom";
import Complaint from "../../../Pages/Admin/District-Admin/Complaint";
import DistrictAdminDashboard from "../../../Pages/Admin/District-Admin/DistrictAdminDashboard";

const DistrictDashboardRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/district-admin/:id"
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
