import React from "react";
import { NavLink } from "react-router-dom";
import "../../Assets/css/sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar2 = ({ isOpen }) => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <section id="sidebar" className={isOpen ? "" : "hide"}>
        <NavLink to="/district-admin" className="brand">
          <i class="bx bxs-chat"></i>
          <span className="text">PeopleHelps</span>
        </NavLink>
        <ul className="side-menu top">
          {/* Main Admin */}
          <li
            className={location.pathname === "/district-admin" ? "active" : ""}
          >
            <NavLink to="/district-admin">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/district" ? "active" : ""}>
            <NavLink to="/district">
              <i class="bx bxs-city"></i>
              <span className="text">Police Station</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/station" ? "active" : ""}>
            <NavLink to="/station">
              <i class="bx bx-building-house"></i>
              <span className="text">Complaints</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/notice" ? "active" : ""}>
            <NavLink to="/notice">
              <i class="bx bxs-notification"></i>
              <span className="text">Notice</span>
            </NavLink>
          </li>
        </ul>

        <ul className="side-menu">
          <li>
            <NavLink to="/dashboard">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="logout">
              <i className="bx bx-log-out-circle"></i>
              <span className="text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Sidebar2;
