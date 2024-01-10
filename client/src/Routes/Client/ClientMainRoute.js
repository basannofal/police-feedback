import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Client/Home";

const ClientMainRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      />
    </Routes>
  );
};

export default ClientMainRoute;
