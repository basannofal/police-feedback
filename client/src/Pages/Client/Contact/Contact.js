import React, { useEffect, useState } from "react";
import "../../../Assets/css/Contact.css";
import ChatBoat from "../Citizen/ChatBoat";
import axios from "axios";

const PORT = process.env.REACT_APP_PROXY_URL;

function Contact() {
  const [contactData, setContactData] = useState([]);
  const [stationData, setStationData] = useState([]);

  useEffect(() => {
    getAllData();
    getAllStationData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${PORT}/getContact`);
      setContactData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  const getAllStationData = async () => {
    try {
      const response = await axios.get(`${PORT}/getContactStation`);
      setStationData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error in Getting Data", error);
    }
  };

  return (
    <>
      <table class="table table-striped" id="table1-contact">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Helpline Number</th>
            <th scope="col">Type of Helpline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>100</td>
            <td>Police Helpline</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>108</td>
            <td>Helpline for medical emergency</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>181</td>
            <td>Abhayam Women helpline</td>
          </tr>
        </tbody>
      </table>
      <div className="table-responsive">
        <table className="table table-striped" id="table-contact">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">District Name</th>
              <th scope="col">Station Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Number</th>
            </tr>
          </thead>
          <tbody>
            {contactData.length > 0 &&
              contactData.map((dist) => (
                <tr key={dist.id}>
                  <td>{dist.id}</td>
                  <td>{dist.district_name}</td>
                  <td>
                    {stationData
                      .filter((station) => station.district_id === dist.id)
                      .map((filteredStation) => (
                        <div key={filteredStation.id}>
                          <p>{filteredStation.station_name}</p>
                        </div>
                      ))}
                  </td>
                  <td>
                    {stationData
                      .filter((station) => station.district_id === dist.id)
                      .map((filteredStation) => (
                        <div key={filteredStation.id}>
                          <p>{filteredStation.email}</p>
                        </div>
                      ))}
                  </td>
                  <td>
                    {stationData
                      .filter((station) => station.district_id === dist.id)
                      .map((filteredStation) => (
                        <div key={filteredStation.id}>
                          <p>{filteredStation.number}</p>
                        </div>
                      ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ChatBoat />
    </>
  );
}

export default Contact;
