import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../../Layout/Admin/Navbar';
import Sidebar1 from '../../../../Layout/Admin/Sidebar1';
const PORT = process.env.REACT_APP_PROXY_URL;


const Complaints = () => {
    const {id} = useParams("")
    const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
    const [isDarkMode, setDarkMode] = useState(false);
    const [getData, setGetData] = useState([]);
    const [complaintId, setComplaintId] = useState();
    const [complaintData, setComplaintData] = useState([]);

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

    const getAllData = () => {
        axios
            .get(`${PORT}/getDistrict`)
            .then((res) => {
                setGetData(res.data);
            })
            .catch((error) => {
                console.log("Error in Getting Data", error);
            });
    };

    //get station all complaint
    const getAllStationComplaintData = (cid) => {
        console.log(cid)
        axios
            .get(`http://localhost:1010/getalldistcomplaint/${cid}`)
            .then((res) => {
                setComplaintData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log("Error in Getting Data", error);
            });
    };

    useEffect(() => {
        getAllData()
    }, [])

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        setComplaintId(selectedDistrictId);
        getAllStationComplaintData(selectedDistrictId);
    };

  return (
    <>
    <Sidebar1 isOpen={!sidebarHidden} />
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
                        <select className="form-control" style={{ width: '300px' }} onChange={handleDistrictChange}>
                            <option>Select District</option>
                            {
                                getData.length > 0 ? (
                                    getData.map((district) => {
                                        return (
                                            <option key={district.id} value={district.id}>
                                                {district.district_name}
                                            </option>
                                        )
                                    })
                                ) : (
                                    "Data is Not avalible"
                                )
                            }
                        </select>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                complaintData.length > 0 ? (
                                    complaintData.map((compalint, idx) => {
                                        const getStatusMessage = () => {
                                            switch (compalint.status) {
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
                                            <tr key={compalint.id}>
                                                <td>
                                                    <img
                                                        src={`/upload/complaint/${compalint.item_img}`}
                                                        alt={compalint.item_name}
                                                    />
                                                </td>
                                                <td>{compalint.item_name}</td>
                                                <td>{compalint.item_desc}</td>
                                                <td>
                                                    {compalint.appointment_date != null
                                                        ? compalint.appointment_date.substring(0, 10)
                                                        : "Waiting"}
                                                </td>
                                                <td>
                                                    {compalint.appointment_time != null
                                                        ? compalint.appointment_time
                                                        : "Waiting"}
                                                </td>
                                                <td>
                                                    <td>{getStatusMessage()}</td>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    "Data is Not Avalible"
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </section>
</>
  )
}

export default Complaints