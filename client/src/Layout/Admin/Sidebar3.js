import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../Assets/css/sidebar.css";
import { useLocation } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar3 = ({ isOpen }) => {

  const {id} = useParams("");
  console.log(id)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("MainAdminToken");
    if (!token) {
      navigate("/admin-login");
    }
  }, []);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("MainAdminToken"))
  );

  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const openLogOutModal = () => {
    setIsLogOutModalOpen(true);
  };

  const closeLogOutModal = () => {
    setIsLogOutModalOpen(false);
  };

  const logOutAdmin = () => {
    // Handle logout logic here (e.g., clear local storage)
    localStorage.removeItem("MainAdminToken");
    navigate("/admin-login");
  };


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
            className={location.pathname.startsWith("/local-station-admin") ? "active" : ""}
          >
            <NavLink to={`/local-station-admin/${id}`}>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li className={location.pathname.startsWith("/local-station-complaint") ? "active" : ""}>
            <NavLink to={`/local-station-complaint/${id}`}>
              <i class="bx bx-building-house"></i>
              <span className="text">Complaints</span>
            </NavLink>
          </li>
          <li className={location.pathname.startsWith("/local-station-feedback") ? "active" : ""}>
            <NavLink to={`/local-station-feedback/${id}`}>
              <i class="bx bxs-notification"></i>
              <span className="text">Feedbacks</span>
            </NavLink>
          </li>
          <li className={location.pathname.startsWith("/local-station-emergency-complaint") ? "active" : ""}>
            <NavLink to={`/local-station-emergency-complaint/${id}`}>
              <i class="bx bx-building-house"></i>
              <span className="text">Emergency Complain</span>
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
            <a
              onClick={openLogOutModal}
              className="logout"
              style={{ cursor: "pointer" }}
            >
              <i className="bx bx-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      {isLogOutModalOpen && (
        <LogOut onCancel={closeLogOutModal} onLogOut={logOutAdmin} />
      )}
    </>
  );
};

export default Sidebar3;
