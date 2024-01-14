import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../../Layout/Client/Navbar";
import EmergencyComplaint from "../../../Pages/Client/EmergencyComplaint/EmergencyComplaint";

const EmergencyComplaintRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/emergency-complaint"
          element={
            <>
              <Navbar />
              <EmergencyComplaint />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default EmergencyComplaintRoute;
