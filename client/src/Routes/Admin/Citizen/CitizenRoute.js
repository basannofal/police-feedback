import React from "react";
import { Routes, Route } from "react-router-dom";
import CitizenDashboard from "../../../Pages/Admin/Citizen/CitizenDashboard";

const CitizenRoute = () => {
  return (
    <Routes>
      <Route
        path="/citizen-dashboard"
        element={
          <>
            <CitizenDashboard />
          </>
        }
      />
    </Routes>
  );
};

export default CitizenRoute;
