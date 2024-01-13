import React from "react";
import { Routes, Route } from "react-router-dom";
import Complaint from "../../../Pages/Client/Complaint/Complaint";
import Navbar from "../../../Layout/Client/Navbar";

const ComplaintRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/complaint/:id"
          element={
            <>
              <Navbar />
              <Complaint />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default ComplaintRoute;
