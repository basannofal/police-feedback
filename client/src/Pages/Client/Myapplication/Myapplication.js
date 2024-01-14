import React, { useEffect, useState } from "react";
import "../../../Assets/css/table.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const PORT = process.env.REACT_APP_PROXY_URL;

const Myapplication = () => {
  const [myapplications, setMyapplications] = useState([]);
  const [itemStatus, setItemStatus] = useState(0);
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

  return (
    <>
      <div class="table-users">
        <div class="header">My Complaints</div>

        <table cellspacing="0">
          <tr>
            <th>Stolen Item</th>
            <th>Item Name</th>
            <th width="230">Item Description</th>
            <th>Status</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Complained</th>
            <th>Verified</th>
            <th>Station Visited</th>
            <th>Completed</th>
            <th>Reject</th>
          </tr>
          {myapplications.map((item, idx) => {
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
                    <i class="fa-regular fa-circle-check"></i>
                  ) : (
                    <i class="fa-solid fa-calendar-day"></i>
                  )}
                </td>
                <td>
                  {item.complete_date != null ? (
                    <i class="fa-regular fa-circle-check"></i>
                  ) : (
                    <i class="fa-solid fa-calendar-day"></i>
                  )}
                </td>
                <td>
                  {item.raw_fir_date != null ? (
                    <i class="fa-regular fa-circle-check"></i>
                  ) : (
                    <i class="fa-solid fa-calendar-day"></i>
                  )}
                </td>
                <td>
                  {item.verify_date != null ? (
                    <i class="fa-regular fa-circle-check"></i>
                  ) : (
                    <i class="fa-solid fa-calendar-day"></i>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                  >
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Myapplication;
