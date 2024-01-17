import React, { useEffect, useState } from "react";
import styles from "./Myapplication.module.css"; // Import the CSS module
import axios from "axios";
import { useParams } from "react-router-dom";
const PORT = process.env.REACT_APP_PROXY_URL;

const Myapplication = () => {
  const [myapplications, setMyapplications] = useState([]);
  const [itemStatus, setItemStatus] = useState(0);
  const [complaintId, setComplaintId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [feedbackData, setfeedbackData] = useState("");

  const { id } = useParams("");

  const getApplications = async () => {
    try {
      const res = await axios.get(`${PORT}/getmyapplication/${id}`);
      if (!res) {
        console.log("Error");
      } else {
        console.log(res.data);
        setMyapplications(res.data);
      }
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleFeedbackChange = (e) => {
    setfeedbackData(e.target.value);
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
        `${PORT}/editrejectbyuser/${complaintId}/${userId}`,
        data
      );
      getApplications();
      // Handle the response as needed
      console.log(res.data);
    } catch (error) {
      console.log("Error in saving district data", error);
    }
  };

  return (
    <>
      <div className={styles.applicationTable}>
        <div className={styles.applicationTableHeader}>My Complaints</div>

        <table cellSpacing="0">
          <tr>
            <th>Stolen Item</th>
            <th>Item Name</th>
            <th width="230">Item Description</th>
            <th>Status</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Complained</th>
            <th>give Appointment</th>
            <th>Station Visited</th>
            <th>Completed</th>
            <th>Reject</th>
          </tr>
          {
            myapplications.length > 0 ? (
              myapplications.map((item, idx) => {
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
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={`/upload/complaint/${item.item_img}`}
                        alt={item.item_name}
                        className={styles.applicationTableImg}
                      />
                    </td>
                    <td>{item.item_name}</td>
                    <td>{item.item_desc}</td>
                    <td>{getStatusMessage()}</td>
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
                    <td>
                      {item.complaint_date != null ? (
                        <i
                          className={`fa-regular fa-circle-check ${styles.applicationTableCell}`}
                        ></i>
                      ) : (
                        <i
                          className={`fa-solid fa-calendar-day ${styles.applicationTableCell}`}
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.raw_fir_date != null ? (
                        <i
                          className={`fa-regular fa-circle-check ${styles.applicationTableCell}`}
                        ></i>
                      ) : (
                        <i
                          className={`fa-solid fa-calendar-day ${styles.applicationTableCell}`}
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.verify_date != null ? (
                        <i
                          className={`fa-regular fa-circle-check ${styles.applicationTableCell}`}
                        ></i>
                      ) : (
                        <i
                          className={`fa-solid fa-calendar-day ${styles.applicationTableCell}`}
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.complete_date != null ? (
                        <i
                          className={`fa-regular fa-circle-check ${styles.applicationTableCell}`}
                        ></i>
                      ) : (
                        <i
                          className={`fa-solid fa-calendar-day ${styles.applicationTableCell}`}
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.status == 3 || item.status == 4 || item.status == 5 ? "Closing" : <button
                        id="add-district"
                        data-bs-toggle="modal"
                        data-bs-target="#messageModal"
                        data-bs-whatever="@mdo"
                        className={`btn btn-danger ${styles.applicationTableCell}`}
                        onClick={() => {
                          setComplaintId(item.id);
                          setUserId(item.user_id);
                        }}
                      >
                        <i
                          className={`fa-solid fa-circle-xmark ${styles.applicationTableCell}`}
                        ></i>
                      </button>}
                    </td>
                  </tr>
                );
              })
            ) : (
              "Data is Not Avalible"
            )
          }
        </table>
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
      </div>
    </>
  );
};

export default Myapplication;
