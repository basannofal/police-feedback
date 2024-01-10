import React from "react";
import { NavLink } from "react-router-dom";
import "../../Assets/css/sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <section id="sidebar" className={isOpen ? "" : "hide"}>
        <NavLink to="/dashboard" className="brand">
          <i class="bx bxs-chat"></i>
          <span className="text">PeopleHelps</span>
        </NavLink>
        <ul className="side-menu top">
          {/* Main Admin */}
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <NavLink to="/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Admin Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bxs-city"></i>
              <span className="text">Add District</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bx-building-house"></i>
              <span className="text">Add Station</span>
            </NavLink>
          </li>

          {/* District Head */}
          <li>
            <NavLink to="/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span className="text">District Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/district">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Add District</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bx-building-house"></i>
              <span className="text">All Station</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bxs-book-open"></i>
              <span className="text">District Complaints</span>
            </NavLink>
          </li>

          {/* Local Station District Wise */}
          <li>
            <NavLink to="/dashboard">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Station Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bxs-user-account"></i>
              <span className="text">All Citizen</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bxs-book-open"></i>
              <span className="text">Citizen Complaints</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">
              <i class="bx bxs-notification"></i>
              <span className="text">District Notice</span>
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

export default Sidebar;
