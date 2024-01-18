import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../../../Layout/Admin/Navbar';
import Sidebar1 from '../../../Layout/Admin/Sidebar1';
const PORT = process.env.REACT_APP_PROXY_URL;

const AllFeedback = () => {
    const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
    const [isDarkMode, setDarkMode] = useState(false);
    const [allFeedback, setAllFeedback] = useState([]);
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


    const getAllFeedbackData = async () => {
        try {
            const res = await axios.get(`${PORT}/getAllFeedback`);
            setAllFeedback(res.data);
            console.log(res.data)
        } catch (error) {
            console.log("Error in Getting Data", error);
        }
    };

    useEffect(() => {
        getAllFeedbackData();
    }, []);

    return (
        <>
            <Sidebar1 isOpen={!sidebarHidden} />
            <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>All Feedback</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <NavLink to="">All Feedback</NavLink>
                                </li>
                                <li>
                                    <i className="bx bx-chevron-right"></i>
                                </li>
                                <li>
                                    <NavLink className="active" to="/citizen-dashboard">
                                        Home
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>All Feddbacks</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '2%', padding: '5px' }}>Id</th>
                                        <th style={{ width: '20%', padding: '5px' }}>How satisfied are you with our service?</th>
                                        <th style={{ width: '20%', padding: '5px' }}>What can we improve?</th>
                                        <th style={{ width: '10%', padding: '5px' }}>Would you recommend us to others?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allFeedback.length > 0 ? (
                                        allFeedback.map((feed, idx) => {
                                            return (
                                                <tr key={feed?.id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{feed.ans_1}</td>
                                                    <td>{feed.ans_2}</td>
                                                    <td>{feed.ans_3}</td>
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
                {/* <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={deleteDistrict}
                /> */}
            </section>
        </>
    )
}

export default AllFeedback
