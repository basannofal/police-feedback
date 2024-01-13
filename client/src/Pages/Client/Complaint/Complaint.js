import React, { useEffect, useState } from "react";
import "../../../Assets/css/complaint.css";
import axios from "axios";
const PORT = process.env.REACT_APP_PROXY_URL;

const Complaint = () => {
  const [distData, setDistData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    number: "",
    address: "",
    pincode: "",
    did: "",
    sid: "",
    itemname: "",
    itemdesc: "",
    itemimage: null,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      itemimage: e.target.files[0],
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    try {
        const res = await axios.post(`${PORT}/addcomplaint`, formData)

    } catch (error) {
        console.error("Error saving data", error);
        
    }

  };



  useEffect(() => {
    getAllDistrictData();
    getAllStationData();
  }, []);

  //get district data
  const getAllDistrictData = () => {
    axios
      .get(`${PORT}/getDistrict`)
      .then((res) => {
        setDistData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error in Getting Data", error);
      });
  };

  //get all station data
  const getAllStationData = () => {
    axios
      .get(`${PORT}/getStationData`)
      .then((res) => {
        setStationData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error in Getting Data", error);
      });
  };

  // Filter stations based on the selected district
  console.log(formData.did);
  const filteredStations = stationData.filter(
    (station) => station.district_id == formData.did
  );

  return (
    <>
      <div className="container secActive">
        <header>Complaint Form</header>

        <form method="post" onSubmit={handleSubmit}>
          <div className="form first">
            <div class="details personal">
              <span class="title">Personal Details</span>

              <div class="fields">
                <div class="input-field">
                  <label>First Name</label>
                  <input type="text" onChange={handleInputChange} value={formData.fname} name="fname" placeholder="Enter First name" />
                </div>

                <div class="input-field">
                  <label>Middle Name</label>
                  <input type="text" onChange={handleInputChange} value={formData.mname} name="mname" placeholder="Enter Middle name" />
                </div>

                <div class="input-field">
                  <label>Last Name</label>
                  <input type="text" onChange={handleInputChange} value={formData.lname} name="lname" placeholder="Enter Last name" />
                </div>

                <div class="input-field">
                  <label>Email</label>
                  <input type="text" onChange={handleInputChange} value={formData.email} name="email" placeholder="Enter your email" />
                </div>

                <div class="input-field">
                  <label>Mobile Number</label>
                  <input type="number" onChange={handleInputChange} value={formData.number} name="number" placeholder="Enter mobile number" />
                </div>

                <div class="input-field">
                  <label>Present Address</label>
                  <input type="text" onChange={handleInputChange} value={formData.address} name="address" placeholder="Enter Present Address" />
                </div>

                <div class="input-field">
                  <label>Pin Code</label>
                  <input type="number" onChange={handleInputChange} value={formData.pincode} name="pincode" placeholder="Enter Pin Code" />
                </div>
                <div className="input-field">
                  <label htmlFor="districtSelect" className="col-form-label">
                    District Name:
                  </label>
                  <select
                    className="form-control"
                    id="districtSelect"
                    name="did"
                    onChange={handleInputChange}
                  >
                    <option value="">Select District</option>
                    {distData.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.district_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-field">
                  <label htmlFor="stationselect" className="col-form-label">
                    Station Name:
                  </label>
                  <select
                    className="form-control"
                    id="stationselect"
                    name="sid"
                    onChange={handleInputChange}
                  >
                    <option value="">Select District</option>
                    {filteredStations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.station_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="details ID">
              <span class="title">Stolen Details</span>

              <div class="fields">
                <div class="input-field">
                  <label>Item Name</label>
                  <input type="text"  onChange={handleInputChange} value={formData.itemname} name="itemname" placeholder="Enter Item name" />
                </div>

                <div class="input-field">
                  <label>Item Description</label>
                  <textarea type="text"  onChange={handleInputChange} value={formData.itemdesc} name="itemdesc" placeholder="Enter Item Description" />
                </div>
                <div class="input_image">
                  <label>Item Images</label>
                  <input className="" type="file" onChange={handleFileChange} name="itemimage" />
                </div>
                <button type="submit" class="sumbit">
                  <span class="btnText">Submit</span>
                  <i class="uil uil-navigator"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Complaint;
