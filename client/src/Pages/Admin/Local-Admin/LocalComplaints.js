import React, { useEffect, useState } from "react";
import Sidebar3 from "../../../Layout/Admin/Sidebar3";
import Navbar from "../../../Layout/Admin/Navbar";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
const PORT = process.env.REACT_APP_PROXY_URL;

const LocalComplaints = () => {
  const { id } = useParams("");
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [allData, setAllData] = useState([]);
  const [complaintId, setComplaintId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [feedbackData, setfeedbackData] = useState("");

  const [appointmentdata, setappointmentdata] = useState({
    appointment_date: "",
    appointment_time: "",
  });

  const handleDateChange = (e) => {
    setappointmentdata({
      ...appointmentdata,
      appointment_date: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    setappointmentdata({
      ...appointmentdata,
      appointment_time: e.target.value,
    });
  };

  const saveApoimentData = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request with appointmentdata
      const res = await axios.patch(
        `${PORT}/editapoimenttime/${complaintId}/${userId}`,
        appointmentdata
      );
      getApplications();
      // Handle the response as needed
      console.log(res.data);
    } catch (error) {
      console.log("Error in saving district data", error);
    }
  };

  const saveVerify = async (item) => {
    setComplaintId(item.id);
    setUserId(item.user_id);
    try {
      // Send a POST request with appointmentdata
      const res = await axios.patch(
        `${PORT}/editverify/${complaintId}/${userId}`
      );
      getApplications();
      // Handle the response as needed
      console.log(res.data);
    } catch (error) {
      console.log("Error in saving district data", error);
    }
  };

  const saveSuccess = async (item) => {
    setComplaintId(item.id);
    setUserId(item.user_id);
    try {
      // Send a POST request with appointmentdata
      const res = await axios.patch(
        `${PORT}/editsuccess/${complaintId}/${userId}`
      );
      getApplications();
      // Handle the response as needed
      console.log(res.data);
    } catch (error) {
      console.log("Error in saving district data", error);
    }
  };

  const saveReject = async (e) => {
    e.preventDefault();
    try {
      const data = {
        feedbackData: feedbackData,
        // Include other properties if needed
      };
      // Send a POST request with appointmentdata
      const res = await axios.patch(
        `${PORT}/editrejectbypolice/${complaintId}/${userId}`,
        data
      );
      getApplications();
      // Handle the response as needed
      console.log(res.data);
    } catch (error) {
      console.log("Error in saving district data", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  const getApplications = async () => {
    try {
      const res = await axios.get(`${PORT}/getlocalapplication/${id}`);
      if (!res) {
        console.log("Error");
      } else {
        console.log(res.data);
        setAllData(res.data);
      }
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  useEffect(() => {
    getApplications();
    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleFeedbackChange = (e) => {
    setfeedbackData(e.target.value);
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
                    <th>Stolen Item</th>
                    <th>Item Name</th>
                    <th>Item Description</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Status</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((item, idx) => {
                    const getStatusMessage = () => {
                      switch (item.status) {
                        case 0:
                          return "Pending";
                        case 1:
                          return "In Progress";
                        case 2:
                          return "Verified";
                        case 3:
                          return "Success";
                        case 4:
                          return "Rejected by Police";
                        case 5:
                          return "Rejected by User";
                        default:
                          return "Waiting";
                      }
                    };

                    const renderOperations = (item) => {
                      switch (item.status) {
                        case 0:
                          return (
                            <>
                              <button
                                className="btn btn-primary"
                                id="add-district"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                data-bs-whatever="@mdo"
                                onClick={() => {
                                  setComplaintId(item.id);
                                  setUserId(item.user_id);
                                }}
                              >
                                Set Appointment
                              </button>
                            </>
                          );
                        case 1:
                          return (
                            <>
                              <button
                                className="btn btn-warning"
                                onClick={() => saveVerify(item)}
                              >
                                Verify
                              </button>
                              <button
                                className="btn btn-danger mx-2"
                                id="add-district"
                                data-bs-toggle="modal"
                                data-bs-target="#messageModal"
                                data-bs-whatever="@mdo"
                                onClick={() => {
                                  setComplaintId(item.id);
                                  setUserId(item.user_id);
                                }}
                              >
                                Reject
                              </button>
                            </>
                          );
                        case 2:
                          return (
                            <>
                              <button
                                className="btn btn-success"
                                onClick={() => saveSuccess(item)}
                              >
                                Success
                              </button>
                              <button
                                className="btn btn-danger mx-2"
                                id="add-district"
                                data-bs-toggle="modal"
                                data-bs-target="#messageModal"
                                data-bs-whatever="@mdo"
                                onClick={() => {
                                  setComplaintId(item.id);
                                  setUserId(item.user_id);
                                }}
                              >
                                Reject
                              </button>
                            </>
                          );
                        case 3:
                        case 4:
                        case 5:
                          return <span>Close Complaint</span>;
                        default:
                          return null;
                      }
                    };
                    return (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={`/upload/complaint/${item.item_img}`}
                            alt={item.item_name}
                            // className={styles.applicationTableImg}
                          />
                        </td>
                        <td>{item.item_name}</td>
                        <td>{item.item_desc}</td>
                        <td>
                          {item.appointment_date != null
                            ? item.appointment_date.substring(0, 10)
                            : "Waiting"}
                        </td>
                        <td>
                          {item.appointment_time != null
                            ? item.appointment_time
                            : "Waiting"}
                        </td>
                        <td>{getStatusMessage()}</td>

                        <td>{renderOperations(item)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <form method="post" onSubmit={saveApoimentData}>
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Set Appointment
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="appointment-date"
                          className="col-form-label"
                        >
                          Appointment Date:
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="appointment-date"
                          name="appointment_date"
                          value={appointmentdata.appointment_date}
                          onChange={handleDateChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="appointment-time"
                          className="col-form-label"
                        >
                          Appointment Time:
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          id="appointment-time"
                          name="appointment_time"
                          value={appointmentdata.appointment_time}
                          onChange={handleTimeChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <form method="post" onSubmit={saveReject}>
            <div
              className="modal fade"
              id="messageModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Send Feedback
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="feedback" className="col-form-label">
                          Feedback:
                        </label>
                        <textarea
                          className="form-control"
                          id="feedback"
                          name="feedback"
                          value={feedbackData}
                          onChange={handleFeedbackChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Reject With Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default LocalComplaints;
