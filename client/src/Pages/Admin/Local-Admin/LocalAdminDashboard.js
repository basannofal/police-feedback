import React, { useState, useEffect } from "react";
import Navbar from "../../../Layout/Admin/Navbar";
import "../../../Assets/css/main.css";
import Sidebar3 from "../../../Layout/Admin/Sidebar3";
import axios from "axios"
import AllFeedback from "./AllFeedback";
const PORT = process.env.REACT_APP_PROXY_URL;

const LocalAdminDashboard = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [allComplaints, setAllComplaints] = useState([])
  const [citizenFeedback, setCitizenFeedback] = useState([]);
  const [allCitizen, setAllCitizen] = useState([])

  const getFeedbackData = async () => {
    try {
      const res = await axios.get(`${PORT}/getcitizenfeedback`);
      setCitizenFeedback(res.data);
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  const getAllComplaints = async () => {
    try {
      const res = await axios.get(`${PORT}/getallcomplaints`);
      setAllComplaints(res.data);
      console.log(allComplaints);
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  const getAllCitizen = async () => {
    try {
      const res = await axios.get(`${PORT}/getregisteredcitizen`);
      setAllCitizen(res.data);
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

    //get All feedback data
    useEffect(() => {
      getFeedbackData();
      getAllCitizen();
      getAllComplaints()
    }, []);
  

  return (
    <>
      <Sidebar3 isOpen={!sidebarHidden} />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bxs-book-content"></i>
              <span className="text">
                <h3>{allComplaints.length}</h3>
                <p>Total Complaints</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group"></i>
              <span className="text">
                <h3>{allCitizen.length}</h3>
                <p>Total Citizen</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-book-reader"></i>
              <span className="text">
                <h3>{citizenFeedback.length}</h3>
                <p>Total Registred Feedbacks</p>
              </span>
            </li>
          </ul>

        </main>
      </section>
    </>
  );
};

export default LocalAdminDashboard;
