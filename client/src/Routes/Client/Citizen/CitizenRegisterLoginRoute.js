import React from "react";
import { Routes, Route } from "react-router-dom";
import CitizenRegister from "../../../Pages/Client/Citizen/CitizenRegister";
import CitizenLogin from "../../../Pages/Client/Citizen/CitizenLogin";
import Navbar from "../../../Layout/Client/Navbar";
import ChatBoat from "../../../Pages/Client/Citizen/ChatBoat";

const CitizenRegisterLoginRoute = () => {
  return (
    <Routes>
      <Route
        path="/citizen-register"
        element={
          <>
            <Navbar />
            <CitizenRegister />
          </>
        }
      />
      <Route
        path="/citizen-login"
        element={
          <>
            <Navbar />
            <CitizenLogin />
          </>
        }
      />
      <Route
        path="/chat-boat"
        element={
          <>
            {/* <Navbar /> */}
            <ChatBoat />
          </>
        }
      />
    </Routes>
  );
};

export default CitizenRegisterLoginRoute;
