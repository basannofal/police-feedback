import React, { useState } from "react";
import "../../../Assets/css/register_login.css";
import "../../../Assets/css/bootstrap.min.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PORT = process.env.REACT_APP_PROXY_URL;

const CitizenRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Register Form
  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform full form validation
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        // Send registration data to the server
        const response = await axios.post(`${PORT}/citizen-register`, formData);

        // Check the response from the server
        if (response.data.success) {
          toast.success("Registration successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(`Registration failed: ${response.data.error}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error("Error during registration. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  // Validation Fields
  const validateForm = (data) => {
    let errors = {};

    if (data.firstName === "") {
      errors.firstName = "Please enter the first name";
    }

    if (data.surname === "") {
      errors.surname = "Please enter the surname";
    }

    if (data.email === "") {
      errors.email = "Please enter the email address";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (data.phoneNumber === "") {
      errors.phoneNumber = "Please enter the phone number";
    } else if (data.phoneNumber.length !== 10) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid numeric phone number";
    }

    if (data.password === "") {
      errors.password = "Please enter the password";
    }

    if (data.confirmPassword === "") {
      errors.confirmPassword = "Please enter the confirm password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  // Espacially Mobile Number Validation
  const validateMobileNumber = (data) => {
    let errors = {};

    if (data.phoneNumber === "") {
      errors.phoneNumber = "Please enter the phone number";
    } else if (data.phoneNumber.length !== 10) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid numeric phone number";
    }

    return errors;
  };

  // Espacially Email Validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Sending OTP Validation
  const handleSendOtpValidation = async (e) => {
    e.preventDefault();

    // Perform mobile number validation only
    const validationErrors = validateMobileNumber(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Mobile number is valid, proceed with sending OTP
      try {
        setLoading(true);
        await handleSendOtp();
        setOtpSent(true);
      } catch (error) {
        setErrors({ otp: "Failed to Send OTP" });
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Mobile number validation errors");
    }
  };

  // Sending OTP to the Server
  const handleSendOtp = async (res) => {
    const { phoneNumber } = formData;

    if (!phoneNumber) {
      setErrors({ phoneNumber: "Please enter the phone number" });
      return;
    }

    try {
      await axios.post(`${PORT}/send-otp`, {
        phoneNumber,
      });
      setOtpSent(true);
    } catch (error) {
      console.log(res.data.error);
      setErrors({ otp: "Failed to Send OTP" });
    }
  };

  // Verifying OTP to the Server
  const handleVerifyOtp = async () => {
    const { phoneNumber, otp } = formData;

    if (!otp) {
      setErrors({ otp: "Please enter the OTP" });
      setSuccess({});
      return;
    }

    try {
      await axios.post(`${PORT}/verify-otp`, {
        phoneNumber,
        otp,
      });
      setSuccess({
        otp: "OTP verification successful.",
      });
      setErrors({ otp: "" });
    } catch (error) {
      // Handle the specific error received from the server
      if (error.response && error.response.data) {
        setErrors({ otp: error.response.data.error });
      } else {
        setErrors({ otp: "Failed to verify OTP. Please try again." });
      }
      setSuccess({});
    }
  };

  return (
    <>
      <section className="container">
        <header>Citizen Registration</header>
        <form action="#" className="form" onSubmit={handleRegister}>
          <div className="column">
            <div className="input-box">
              <label>
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="text-danger pt-2">{errors.firstName}</div>
              )}
            </div>
            <div className="input-box">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                placeholder="Enter middle name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>
                Surname <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="surname"
                placeholder="Enter surname"
                onChange={handleChange}
              />
              {errors.surname && (
                <div className="text-danger pt-2">{errors.surname}</div>
              )}
            </div>
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
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                maxLength={10}
                name="phoneNumber"
                placeholder="Enter phone number"
                onChange={handleChange}
                disabled={otpSent}
              />
              {errors.phoneNumber && (
                <div className="text-danger pt-2">{errors.phoneNumber}</div>
              )}
            </div>

            {!otpSent ? (
              <button
                className="otp_btn"
                type="submit"
                onClick={handleSendOtpValidation}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <div className="input-box">
                  <label>OTP</label>
                  <input
                    type="number"
                    name="otp"
                    placeholder="Enter the OTP"
                    onChange={handleChange}
                    disabled={success.otp}
                  />
                  {errors.otp && (
                    <div className="text-danger pt-2">{errors.otp}</div>
                  )}
                  {success.otp && (
                    <div className="text-success pt-2">{success.otp}</div>
                  )}
                </div>
                {!success.otp && ( // Render the "Verify OTP" button only if OTP verification is not successful
                  <button
                    className="otp_btn"
                    type="button"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                )}
              </>
            )}
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
            <div className="input-box">
              <label>
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger pt-2">{errors.confirmPassword}</div>
              )}
            </div>
          </div>
          <button className="submit_button" type="submit">
            Submit
          </button>
        </form>
        <div className="text-center">
          Already have an Account?
          <NavLink to={"/citizen-login"}> Click here</NavLink>
        </div>
      </section>
    </>
  );
};

export default CitizenRegister;
