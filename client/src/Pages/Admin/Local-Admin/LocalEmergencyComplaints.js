import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Sidebar3 from "../../../Layout/Admin/Sidebar3";
import Navbar from "../../../Layout/Admin/Navbar";
import axios from "axios";
const PORT = process.env.REACT_APP_PROXY_URL;

const LocalEmergencyComplaints = () => {
  const { id } = useParams("");

  const [emergencyComplaints, setEmergencyComplaints] = useState([]);
  // get emergency complaints
  const getEmerComplaints = async () => {
    try {
      const res = await axios.get(`${PORT}/getemergencycomplaints/${id}`);
      if (!res) {
        console.log("Error");
      } else {
        setEmergencyComplaints(res.data);
      }
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  useEffect(() => {
    getEmerComplaints();
  }, []);

  // Dashboard Setting

  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <Sidebar3 isOpen={!sidebarHidden} />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Complaints</h1>
              <ul className="breadcrumb">
                <li>
                  <NavLink className="active" to={`/local-station-admin/${id}`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <NavLink>Complaints</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Complaints</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>District</th>
                    <th>Video</th>
                    <th>Images</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyComplaints.length > 0 ? (
                    emergencyComplaints.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.location}</td>
                        <td>{data.did}</td>
                        <td>
                          {data.video && (
                            <video controls width="200">
                              <source
                                src={`./upload/emegencycomplaint/${data.video}`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </td>
                        <td>
                          {data.images && Array.isArray(data.images) ? (
                            <div>
                              <h5>Images:</h5>
                              {data.images.map((image, imageIndex) => (
                                <img
                                  key={imageIndex}
                                  src={`./upload/emegencycomplaint/${image}`}
                                  alt={`Image ${imageIndex + 1}`}
                                  style={{ width: "100px", height: "auto" }}
                                />
                              ))}
                            </div>
                          ) : (
                            <p>No images available</p>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Records Not Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default LocalEmergencyComplaints;
