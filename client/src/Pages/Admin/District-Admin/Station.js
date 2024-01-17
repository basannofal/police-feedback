import React, { useState, useEffect } from 'react';
import Navbar from '../../../Layout/Admin/Navbar';
import Sidebar2 from '../../../Layout/Admin/Sidebar2';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
const PORT = process.env.REACT_APP_PROXY_URL;

const Station = () => {
    const { id } = useParams("");
    const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
    const [isDarkMode, setDarkMode] = useState(false);

    const [stationData, setSatationData] = useState([]);

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

    const getStationData = async () => {
        console.log(id)
        try {
            const res = await axios.get(`${PORT}/getstationdata/${id}`);
            setSatationData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log("Error in Getting Data", error);
        }
    };

    useEffect(() => {
        getStationData();
    }, [])

    const navigate = useNavigate();
    const gostationDashboard = (id) => {
        navigate(`/local-station-admin/${id}`);
    };
    return (
        <>
            <Sidebar2 isOpen={!sidebarHidden} />
            <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Station</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <NavLink to="">Station</NavLink>
                                </li>
                                <li>
                                    <i className="bx bx-chevron-right"></i>
                                </li>
                                <li>
                                    <NavLink className="active" to="">
                                        Home
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Station Names</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Address</th>
                                        <th>Mobile Number</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stationData.length > 0 ? (
                                            stationData.map((station, idx) => {
                                                return (
                                                    <tr key={station.id}>
                                                        <td>{idx + 1}</td>
                                                        <td>{station.station_name}</td>
                                                        <td>{station.email}</td>
                                                        <td>{station.password}</td>
                                                        <td>{station.address}</td>
                                                        <td>{station.number}</td>
                                                        <td>
                                                            <button
                                                                className="data_delete_btn bg-success"
                                                                onClick={() => gostationDashboard(station.id)}
                                                            >
                                                                <i className="fa fa-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
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

export default Station
