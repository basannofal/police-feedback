import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../Assets/css/homeNavbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <div className="rj_main">
                <div className="logo-menu">
                    <button
                        className="menu-toggler"
                        type="button"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
                    </button>
                    <NavLink className="logo" to="/">
                        Your Logo
                    </NavLink>
                </div>
                <div className="rj_img">
                    <img src={require("../../Assets/Images/Police.webp")} alt="Police Logo" />
                </div>
                <div className="rj_text">
                    <p>CITIZEN PORTAL, RAJASTHAN POLICE</p>
                    (HOME DEPARTMENT, GOVERNMENT OF RAJASTHAN)
                </div>
            </div>

            <nav className="custom-navbar">
                <div className="RAJASTHANPOLICE">RAJASTHAN POLICE</div>
                <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <NavLink className="nav-link" to="/" exact activeClassName="active"
                        onClick={() => setMenuOpen(false)}>
                        <i className="fas fa-home"></i> Home
                    </NavLink>
                    <NavLink className="nav-link" to="/services" activeClassName="active"
                        onClick={() => setMenuOpen(false)}>
                        <i className="fas fa-cogs"></i> Services
                    </NavLink>
                    <NavLink className="nav-link" to="/contact-page" activeClassName="active"
                        onClick={() => setMenuOpen(false)}>
                        <i className="fas fa-address-card"></i> Contact
                    </NavLink>
                    <NavLink className="nav-link" to="/login" activeClassName="active"
                        onClick={() => setMenuOpen(false)}>
                        <i className="fas fa-sign-in-alt"></i> Login/Registration
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
