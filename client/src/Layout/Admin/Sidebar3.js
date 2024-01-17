import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../Assets/css/sidebar.css";
import { useLocation } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar3 = ({ isOpen }) => {
  const { id } = useParams("");
  console.log(id);
  const location = useLocation();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("MainAdminToken");
    const role = localStorage.getItem("role");
    setUserRole(role);
    console.log(token);
    console.log(role == 1 || role == 2);
    if (!token || (role != 1 && role != 2 && role != 3)) {
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
          <span className="text">Police Station</span>
        </NavLink>
        <ul className="side-menu top">
          {/* Main Admin */}
          <li
            className={
              location.pathname.startsWith("/local-station-admin")
                ? "active"
                : ""
            }
          >
            <NavLink to={`/local-station-admin/${id}`}>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname.startsWith("/local-station-complaint")
                ? "active"
                : ""
            }
          >
            <NavLink to={`/local-station-complaint/${id}`}>
              <i class="bx bx-building-house"></i>
              <span className="text">Complaints</span>
            </NavLink>
          </li>
          <li
            className={location.pathname === `/feedback/${id}` ? "active" : ""}
          >
            <NavLink to={`/feedback/${id}`}>
              <i class="bx bxs-notification"></i>
              <span className="text">Feedback</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname.startsWith("/local-station-emergency-complaint")
                ? "active"
                : ""
            }
          >
            <NavLink to={`/local-station-emergency-complaint/${id}`}>
              <i class="bx bx-building-house"></i>
              <span className="text">Emergency Complain</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname === `/allfeedback/${id}` ? "active" : ""
            }
          >
            <NavLink to={`/allfeedback/${id}`}>
              <i class="bx bxs-notification"></i>
              <span className="text">All Feedback</span>
            </NavLink>
          </li>
        </ul>

        <ul className="side-menu">
          {userRole == 2 ? (
            <li>
              <NavLink to="/station">
                <i class="bx bx-left-arrow-alt"></i>
                <span className="text">Back to District</span>
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {userRole == 1 ? (
            <li>
              <NavLink to="/station">
                <i class="bx bx-left-arrow-alt"></i>
                <span className="text">Back to Admin</span>
              </NavLink>
            </li>
          ) : (
            ""
          )}
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
