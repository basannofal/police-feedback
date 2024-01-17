import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../Assets/css/sidebar.css";
import { useLocation } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar2 = ({ isOpen }) => {
  const { id } = useParams("");
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("MainAdminToken");
    const role = localStorage.getItem("role");
    setUserRole(role);
    console.log(role == 1 || role == 2);
    if (!token || (role != 1 && role != 2)) {
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
          <span className="text">District Panel</span>
        </NavLink>
        <ul className="side-menu top">
          {/* Main Admin */}
          <li
            className={location.pathname === `/district-admin/${id}` ? "active" : ""}
          >
            <NavLink to={`/district-admin/${id}`}>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li className={location.pathname === `/district-station/${id}` ? "active" : ""}>
            <NavLink to={`/district-station/${id}`}>
              <i class="bx bxs-city"></i>
              <span className="text">Police Station</span>
            </NavLink>
          </li>
          <li className={location.pathname === `/district-complaint/${id}` ? "active" : ""}>
            <NavLink to={`/district-complaint/${id}`}>
              <i class="bx bx-building-house"></i>
              <span className="text">Complaints</span>
            </NavLink>
          </li>
        </ul>

        <ul className="side-menu">
          {userRole == 1 ? (
            <li>
              <NavLink to="/main-admin">
                <i class='bx bx-left-arrow-alt'></i>
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

export default Sidebar2;
