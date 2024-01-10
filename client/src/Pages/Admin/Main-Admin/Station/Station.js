import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../Layout/Admin/Sidebar';
import Navbar from '../../../../Layout/Admin/Navbar';
import '../../../../Assets/css/form.css';
import axios from 'axios';
import DeleteModal from '../../../../Layout/Admin/DeleteModal';
import { NavLink } from 'react-router-dom';
const PORT = process.env.REACT_APP_PROXY_URL;

const Station = () => {
    const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
    const [isDarkMode, setDarkMode] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStationId, setSelectedStationId] = useState(null);
    const [allData, setAllData] = useState([]);
    const [allstationData, setAllStationData] = useState([]);
    const [addData, setAddData] = useState({
        station_name: '',
        email: '',
        password: '',
        address: '',
        number: '',
        district_id: '',
    })
    const [editData, setEditData] = useState({
        station_name: '',
        email: '',
        password: '',
        address: '',
        number: '',
        district_id: '',
    });

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

    //get All District data 
    useEffect(() => {
        getAllData();
        getAllStationData();
    }, [allstationData])


    const getAllData = () => {
        axios.get('http://localhost:1010/getDistrict')
            .then((res) => {
                setAllData(res.data);
            })
            .catch((error) => {
                console.log("Error in Getting Data", error)
            })
    }

    //add data section start
    const handleStationNameChange = (event) => {
        const { name, value } = event.target;
        setAddData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const saveStationData = async (e) => {
        e.preventDefault();


        await axios
            .post(`http://localhost:1010/addStation`, addData)
            .then(() => {
                const form = e.target;
                form.reset();
            })
            .catch((error) => {
                alert("Enter All Details");
                console.log("Error adding station data in station.js:", error);
            });
    };

    //GET DATA 

    const getAllStationData = () => {
        axios.get('http://localhost:1010/getStationData')
            .then((res) => {
                setAllStationData(res.data);
            })
            .catch((error) => {
                console.log("Error in Getting Data", error)
            })
    }

    //DELETE MODAL SECTION START
    const openDeleteModal = (stationId) => {
        setSelectedStationId(stationId);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setSelectedStationId(null);
        setIsDeleteModalOpen(false);
    };
    const deleteDistrict = () => {
        if (selectedStationId) {
            deleteStationData(selectedStationId);
            closeDeleteModal();
        }
    };
    const deleteStationData = async (deleteId) => {
        try {
            await axios.delete(`http://localhost:1010/deleteStation/${deleteId}`);
            getAllData();
        } catch (error) {
            console.log("Error in delting data", error)
        }
    };

    //EDIT DATA SECTION START

    const getDataForEdit = (editId) => {
        axios.get(`http://localhost:1010/getStationForEdit/${editId}`)
            .then((res) => {
                setEditData(res.data[0]);
            })
            .catch((error) => {
                console.log("Error in Getting Data", error)
            })
    }

    const handleEditStationNameChange = (event) => {
        const { name, value } = event.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSaveEditData = (editid) => {
        axios
            .put(`http://localhost:1010/editStationData/${editid}`, editData)
            .then(() => {
                getAllStationData();
            })
            .catch((error) => {
                console.log("Error updating Station data in Station.js: ", error);
            });
    };


    return (
        <>
            <Sidebar isOpen={!sidebarHidden} />
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
                                    <NavLink className="active" to="/citizen-dashboard">
                                        Home
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="btn-download">
                            <span className="text" id='add-district' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add Station</span>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Station Names</h3>
                                <i className="bx bx-search"></i>
                                <i className="bx bx-filter"></i>
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
                                        <th>District Name</th>
                                        <th>Opration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allstationData.map((station, idx) => {
                                        const district = allData.find((district) => district.id === station.district_id);
                                        const districtName = district ? district.district_name : '';

                                        return (
                                            <tr key={station.id}>
                                                <td>{idx + 1}</td>
                                                <td>{station.station_name}</td>
                                                <td>{station.email}</td>
                                                <td>{station.password}</td>
                                                <td>{station.address}</td>
                                                <td>{station.number}</td>
                                                <td>{districtName}</td>
                                                <td>
                                                    <button
                                                        className="editbutton"
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo"
                                                        onClick={() => getDataForEdit(station.id)}
                                                    >
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                    <button
                                                        className="data_delete_btn"
                                                        onClick={() => openDeleteModal(station.id)}
                                                    >
                                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* ADD MODAL */}
                    <form method='post' onSubmit={saveStationData}>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Station</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label">Station Name:</label>
                                                <input type="text" className="form-control" id="recipient-name" name="station_name" placeholder='Enter Station Name'
                                                    onChange={handleStationNameChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label"> Email:</label>
                                                <input type="text" className="form-control" id="recipient-name" name="email" placeholder='Enter Email'

                                                    onChange={handleStationNameChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label">Password:</label>
                                                <input type="text" className="form-control" id="recipient-name" name="password" placeholder='Enter Password'
                                                    onChange={handleStationNameChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label">Address:</label>
                                                <input type="text" className="form-control" id="recipient-name" name="address" placeholder='Enter Address'
                                                    onChange={handleStationNameChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label">Mobile Number:</label>
                                                <input type="number" className="form-control" id="recipient-name" name="number" placeholder='Enter Mobile Number'
                                                    onChange={handleStationNameChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="districtSelect" className="col-form-label">District Name:</label>
                                                <select className="form-control" name="district_id" onChange={handleStationNameChange}>
                                                    <option value="">Select District</option>
                                                    {allData.map((district) => (
                                                        <option key={district.id} value={district.id}>
                                                            {district.district_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >
                                            Save
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>


                    {/* EDIT MODAL */}
                    <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Station</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label for="recipient-name" className="col-form-label">Station Name:</label>
                                            <input type="text" className="form-control" id="recipient-name" name="station_name"
                                                onChange={handleEditStationNameChange} value={editData && editData.station_name}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="recipient-name" className="col-form-label"> Email:</label>
                                            <input type="text" className="form-control" id="recipient-name" name="email"
                                                onChange={handleEditStationNameChange}
                                                value={editData && editData.email}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="recipient-name" className="col-form-label">Password:</label>
                                            <input type="text" className="form-control" id="recipient-name" name="password"
                                                onChange={handleEditStationNameChange}
                                                value={editData && editData.password}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="recipient-name" className="col-form-label">Address:</label>
                                            <input type="text" className="form-control" id="recipient-name" name="address"
                                                onChange={handleEditStationNameChange}
                                                value={editData && editData.address}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="recipient-name" className="col-form-label">Mobile Number:</label>
                                            <input type="number" className="form-control" id="recipient-name" name="number"
                                                onChange={handleEditStationNameChange}
                                                value={editData && editData.number}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="districtSelect" className="col-form-label">District Name:</label>
                                            <select className="form-control" name="district_id" onChange={handleEditStationNameChange} value={editData && editData.district_id}>
                                                <option value=''>Select District</option>
                                                {allData.map((district) => (
                                                    <option key={district.id} value={district.id}>
                                                        {district.district_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={() => handleSaveEditData(editData.id)}
                                    >
                                        Save
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                </main>
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={deleteDistrict}
                />
            </section>
        </>
    )
}

export default Station
