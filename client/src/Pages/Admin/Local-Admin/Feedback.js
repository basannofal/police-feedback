import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../../../Layout/Admin/Navbar';
import Sidebar3 from "../../../Layout/Admin/Sidebar3";
const PORT = process.env.REACT_APP_PROXY_URL;

const Feedback = () => {
    const { id } = useParams("");
    const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
    const [isDarkMode, setDarkMode] = useState(false);
    const [feedback, setFeedback] = useState([]);
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

    const getFeedbackData = async () => {
        try {
            const res = await axios.get(`${PORT}/getfeedback/${id}`);
            setFeedback(res.data);
        } catch (error) {
            console.log("Error in Getting Data", error);
        }
    };

    useEffect(() => {
        getFeedbackData();
    }, [])
    return (
        <>
            <Sidebar3 isOpen={!sidebarHidden} />
            <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Feedback</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <NavLink to="">Feedback</NavLink>
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
                                <h3>Complaints Feddbacks</h3>
                                <i className="bx bx-search"></i>
                                <i className="bx bx-filter"></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '2%', padding: '5px' }}>Id</th>
                                        <th style={{ width: '20%', padding: '5px' }}>How satisfied were you with the communication during your interaction with our service?</th>
                                        <th style={{ width: '20%', padding: '5px' }}>How satisfied are you with the resolution provided by our service?</th>
                                        <th style={{ width: '10%', padding: '5px' }}>Would you use our service again?</th>
                                        <th style={{ width: '20%', padding: '5px' }}>How likely are you to recommend our service to others?</th>
                                        <th style={{ width: '20%', padding: '5px' }}>Please provide additional comments or suggestions for improvement?</th>
                                        <th style={{ width: '10%', padding: '5px' }}>Give me a rating on stars?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedback.map((feed, idx) => {
                                        return (
                                            <tr key={feed?.id}>
                                                <td>{idx + 1}</td>
                                                <td>{feed.ans_1}</td>
                                                <td>{feed.ans_2}</td>
                                                <td>{feed.ans_3}</td>
                                                <td>{feed.ans_4}</td>
                                                <td>{feed.ans_5}</td>
                                                <td>{feed.ans_6}</td>
                                            </tr>
                                        );
                                    })}
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

export default Feedback
