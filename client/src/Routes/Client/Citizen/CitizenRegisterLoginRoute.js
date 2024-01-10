import React from "react";
import { Routes, Route } from "react-router-dom";
import CitizenRegister from "../../../Pages/Client/Citizen/CitizenRegister";
import CitizenLogin from "../../../Pages/Client/Citizen/CitizenLogin";

const CitizenRegisterLoginRoute = () => {
  return (
    <Routes>
      <Route
        path="/citizen-register"
        element={
          <>
            <CitizenRegister />
          </>
        }
      />
      <Route
        path="/citizen-login"
        element={
          <>
            <CitizenLogin />
          </>
        }
      />
    </Routes>
  );
};

export default CitizenRegisterLoginRoute;
