import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../../Pages/Admin/AdminLogin";

const AdminLoginRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin-login"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default AdminLoginRoute;
