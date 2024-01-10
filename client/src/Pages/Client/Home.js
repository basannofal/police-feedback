import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );
  // Function to handle logout
  const handleLogout = () => {
    // Clear the session or token (for example, using localStorage)
    localStorage.removeItem("userToken");
    setUser(null);
  };

  useEffect(() => {
    // Check for the presence of the user object when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("userToken"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">{/* <Brand /> */}</div>
          <div className="nav-elements">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/projects">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    Name:
                    {user.fname}
                    {user.mname}
                    {user.surname}
                  </li>
                  <li>Email: {user.email}</li>
                  {/* Add more properties as needed */}
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/citizen-login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Home;
