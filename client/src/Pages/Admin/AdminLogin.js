import React, { useEffect, useState } from "react";
import "../../Assets/css/register_login.css";
import "../../Assets/css/bootstrap.min.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const PORT = process.env.REACT_APP_PROXY_URL;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
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

        if (formData.role === "1") {
          // Send login data to the server
          const response = await axios.post(
            `${PORT}/main-admin-login`,
            formData
          );


          // Check the response status code
          if (response.data.success) {
            localStorage.setItem(
              "MainAdminToken",
              JSON.stringify(response.data.main_admin)
            );
            localStorage.setItem(
              "role",
              1
            );
            navigate("../main-admin", { replace: true });
          } else {
            setMessage(response.data.error || "Invalid Admin Credentials");
          }
        } else if (formData.role === "2") {
          // Send login data to the server
          const response = await axios.get(
            `${PORT}/district-admin-login/${formData.email}/${formData.password}`,
          );


          // Check the response status code
          if (response.data.success) {
            localStorage.setItem(
              "MainAdminToken",
              JSON.stringify(response.data.district_admin)
            );
            localStorage.setItem(
              "role",
              2
            );
            navigate(`../district-admin/${response?.data?.district_admin?.id}`, { replace: true });
          } else {
            setMessage(
              response.data.error || "Invalid District Admin Credentials"
            );
          }
        } else if (formData.role === "3") {
          // Send login data to the server
          const response = await axios.post(
            `${PORT}/local-admin-login`,
            formData
          );

          // Check the response status code
          if (response.data.success) {
            localStorage.setItem(
              "MainAdminToken",
              JSON.stringify(response.data.local_admin)
            );
            localStorage.setItem(
              "role",
              2
            );
            navigate(`../local-station-admin/${response?.data?.local_admin?.id}`, { replace: true });
          } else {
            setMessage(
              response.data.error || "Invalid Local Station Admin Credentials"
            );
          }
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
    const storedAdmin = JSON.parse(localStorage.getItem("MainAdminToken"));
    const role = localStorage.getItem("role");

    if (storedAdmin && role == 1) {
      navigate("/main-admin", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <section className="container" id="admin-conatact">
        <header>Admin Login</header>
        <form action="#" className="form" id='admin-conatact-form' onSubmit={handleLogin}>
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
          <div className="input-box">
            <label>
              Role <span className="text-danger">*</span>
            </label>
            <div className="select-box">
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="" selected>
                  Please Select Role
                </option>
                <option value="1">Admin</option>
                <option value="2">District</option>
                <option value="3">Station</option>
              </select>
            </div>
          </div>

          <button className="submit_button" type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && <p className="text-danger text-center pt-3">{message}</p>}
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
