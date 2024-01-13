import React from 'react';
import { Routes, Route } from "react-router-dom";
import Complaint from '../../../Pages/Client/Complaint/Complaint';

const ComplaintRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/complaint"
          element={
            <>
              <Complaint />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default ComplaintRoute
