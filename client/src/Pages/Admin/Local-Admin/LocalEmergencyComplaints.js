import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Sidebar3 from "../../../Layout/Admin/Sidebar3";
import Navbar from "../../../Layout/Admin/Navbar";
import axios from "axios";
import "../../../Assets/css/complaint.css";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
const PORT = process.env.REACT_APP_PROXY_URL;

const LocalEmergencyComplaints = () => {
  const { id } = useParams("");

  const [emergencyComplaints, setEmergencyComplaints] = useState([]);
  const [allDistrictData, setAllDistrictData] = useState([]);

  // get districts
  const getAllDistrict = () => {
    axios
      .get(`${PORT}/getDistrict`)
      .then((res) => {
        setAllDistrictData(res.data);
      })
      .catch((error) => {
        console.log("Error in Getting Data", error);
      });
  };

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
    getAllDistrict();
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
                    <th style={{ width: "5%", textAlign: "center" }}>ID</th>
                    <th style={{ width: "20%", textAlign: "center" }}>
                      Location
                    </th>
                    <th
                      style={{
                        width: "5%",
                        textAlign: "center",
                      }}
                    >
                      District
                    </th>
                    <th style={{ width: "30%", textAlign: "center" }}>Video</th>
                    <th style={{ width: "40%", textAlign: "center" }}>
                      Images
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyComplaints.length > 0 ? (
                    emergencyComplaints.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.location}</td>
                        <td className="px-2">
                          {" "}
                          {allDistrictData.map((x) => {
                            if (data.did === x.id) {
                              return x.district_name;
                            }
                          })}
                        </td>
                        <td className="px-2">
                          {data.video && (
                            <div>
                              <video controls width="300" height="auto">
                                <source
                                  src={`/upload/emegencycomplaint/${data.video}`}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </td>

                        <td className="px-2">
                          {data.images.length > 0 ? (
                            <div style={{ display: "flex" }}>
                              {data.images.split(",").map((image, index) => (
                                <img
                                  key={index}
                                  src={`/upload/emegencycomplaint/${image}`}
                                  alt=""
                                  className="thumbnail-image"
                                  // style={{
                                  //   cursor: "pointer",
                                  //   width: "50px",
                                  //   height: "50px",
                                  // }}
                                />
                              ))}
                            </div>
                          ) : (
                            <span>No Images</span>
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
