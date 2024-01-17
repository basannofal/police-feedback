import React from "react";
import { Route, Routes } from "react-router-dom";
import Complaint from "../../../Pages/Admin/District-Admin/Complaint";

const DistrictDashboardRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/district-admin/:id"
          element={
            <>
              <Complaint />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default DistrictDashboardRoute;
