import React, { useEffect, useState } from "react";
import "../../../Assets/css/register_login.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import ChatBoat from "./ChatBoat";
const PORT = process.env.REACT_APP_PROXY_URL;

const CitizenLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Login Form
  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        // Send login data to the server
        const response = await axios.post(`${PORT}/citizen-login`, formData);

        // Check the response status code
        if (response.data.success) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.citizen)
          );
          navigate("/", { replace: true });
        } else {
          setMessage(response.data.error || "Invalid Credentials");
        }
      } catch (error) {
        // Handle the error (e.g., display an error message)
        console.error("Error during login:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form has validation errors");
      setMessage("");
    }
  };

  // Validation Fields
  const validateForm = (data) => {
    let errors = {};

    if (data.email === "") {
      errors.email = "Please enter the email address";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (data.password === "") {
      errors.password = "Please enter the password";
    }

    return errors;
  };

  // Email Validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    // Check if the user is already authenticated (for example, using localStorage)
    const storedUser = JSON.parse(localStorage.getItem("userToken"));
    if (storedUser) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <section className="containt border">
        <header>Citizen Login</header>
        <form action="#" className="form" onSubmit={handleLogin}>
          <div className="column">
            <div className="input-box">
              <label>
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter email address"
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger pt-2">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
              {errors.password && (
                <div className="text-danger pt-2">{errors.password}</div>
              )}
            </div>
          </div>
          <button className="submit_button" type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && <p className="text-danger text-center pt-3">{message}</p>}
        </form>
        <div className="text-center">
          Don't have an account?
          <NavLink to={"/citizen-register"}> Click here</NavLink>
        </div>
      </section>
      <ChatBoat />
    </>
  );
};

export default CitizenLogin;
