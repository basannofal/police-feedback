import React, { useState, useEffect } from "react";
import Navbar from "../../../Layout/Admin/Navbar";
import Sidebar1 from "../../../Layout/Admin/Sidebar1";
import "../../../Assets/css/main.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const PORT = process.env.REACT_APP_PROXY_URL;

const MainAdminDashboard = () => {
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
      console.log("Cleanup function called");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [citizenFeedback, setCitizenFeedback] = useState([]);
  const [allDist, setAllDist] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [allCitizen, setAllCitizen] = useState([]);

  const getFeedbackData = async () => {
    try {
      const res = await axios.get(`${PORT}/getcitizenfeedback`);
      setCitizenFeedback(res.data);
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  const getAllDistrict = () => {
    axios
      .get(`${PORT}/getDistrict`)
      .then((res) => {
        setAllDist(res.data);
      })
      .catch((error) => {
        console.log("Error in Getting Data", error);
      });
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
    getAllDistrict();
    getAllComplaints();
    getAllCitizen();
  }, []);

  // Create data for the chart
  const chartData = allDist.map((district) => {
    const districtFeedback = citizenFeedback.filter(
      (feedback) => feedback.did === district.id
    );

    const districtComplaints = allComplaints.filter(
      (complaint) => complaint.dist_id === district.id
    );

    return {
      district: district.district_name,
      complaints: districtComplaints.length, // Count of complaints for the district
      feedback: districtFeedback.length, // Count of feedback for the district
    };
  });

  const ratings = Array.from({ length: 5 }, (_, index) => `${index + 1} Star`);

  return (
    <>
      <Sidebar1 isOpen={!sidebarHidden} />
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

          <div className="head-title">
            <div className="left">
              <h5 className="mb-4 mt-2 fw-semibold">
                Feedback & Complaint Chart :{" "}
              </h5>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              width={50}
              height={40}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="complaints" fill="#8884d8" />
              <Bar dataKey="feedback" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </main>
      </section>
    </>
  );
};

export default MainAdminDashboard;
