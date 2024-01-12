
import React, { useState, useEffect } from "react";
import Sidebar1 from "../../../../Layout/Admin/Sidebar1";
import Navbar from "../../../../Layout/Admin/Navbar";
import "../../../../Assets/css/form.css";
import axios from "axios";
import DeleteModal from "../../../../Layout/Admin/DeleteModal";
import { NavLink } from "react-router-dom";
const PORT = process.env.REACT_APP_PROXY_URL;

const District = () => {
  //navbar and sidebar code
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [addData, setAddData] = useState({
    district_name: "",
    email: "",
    password: "",
    address: "",
    number: "",
  });
  const [editData, setEditData] = useState({
    district_name: "",
    email: "",
    password: "",
    address: "",
    number: "",
  });
  const [allData, setAllData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

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

  //add data section start
  const handleDistNameChange = (event) => {
    const { name, value } = event.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const saveDistrictData = async (e) => {
    e.preventDefault();
    console.log("object");
    await axios
      .post(`http://localhost:1010/addDistrict`, addData)
      .then(() => {
        setAddData({
          district_name: "",
          email: "",
          password: "",
          address: "",
          number: "",
        });
        const form = e.target;
        form.reset();
        console.log("Form state after reset:", addData);
      })
      .catch((error) => {
        alert("Enter All Details");
        console.log("Error adding district data in Brand.js:", error);
      });
  };

  //get All data
  useEffect(() => {
    getAllData();
  }, [addData]);
  const getAllData = () => {
    axios
      .get("http://localhost:1010/getDistrict")
      .then((res) => {
        setAllData(res.data);
      })
      .catch((error) => {
        console.log("Error in Getting Data", error);
      });
  };

  // delete modal
  const openDeleteModal = (distId) => {
    setSelectedDistrictId(distId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedDistrictId(null);
    setIsDeleteModalOpen(false);
  };
  const deleteDistrict = () => {
    if (selectedDistrictId) {
      deleteDistrictData(selectedDistrictId);
      closeDeleteModal();
    }
  };
  const deleteDistrictData = async (deleteId) => {
    try {
      await axios.delete(`http://localhost:1010/deleteDistrict/${deleteId}`);
      getAllData();
    } catch (error) {
      console.log("Error in delting data", error);
    }
  };

  //GET DATA FOR EDIT
  const getDataForEdit = (editId) => {
    axios
      .get(`http://localhost:1010/getDistrictForEdit/${editId}`)
      .then((res) => {
        setEditData(res.data[0]);
      })
      .catch((error) => {
        console.log("Error in Getting Data", error);
      });
  };

  //EDIT DATA SECTION START
  const handleEditDistNameChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEditData = (editid) => {
    axios
      .put(`http://localhost:1010/editDistData/${editid}`, editData)
      .then(() => {
        getAllData();
      })
      .catch((error) => {
        console.log("Error updating product data in Product.js: ", error);
      });
  };

  return (
    <>
      <Sidebar1 isOpen={!sidebarHidden} />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>District</h1>
              <ul className="breadcrumb">
                <li>
                  <NavLink to="">District</NavLink>
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
              <span
                className="text"
                id="add-district"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                Add District
              </span>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>District Names</h3>
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
                    <th>Opration</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((distData, idx) => {
                    return (
                      <tr key={distData.id}>
                        <td>{idx + 1}</td>
                        <td>{distData.district_name}</td>
                        <td>{distData.email}</td>
                        <td>{distData.password}</td>
                        <td>{distData.address}</td>
                        <td>{distData.number}</td>
                        <td>
                          <button
                            className="editbutton"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal1"
                            data-bs-whatever="@mdo"
                            onClick={() => getDataForEdit(distData.id)}
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                          <button
                            className="data_delete_btn"
                            onClick={() => openDeleteModal(distData.id)}
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
          <form method="post" onSubmit={saveDistrictData}>
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
                      Add District
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
                        <label for="recipient-name" className="col-form-label">
                          District Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="district_name"
                          placeholder="Enter District Name"
                          onChange={handleDistNameChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          {" "}
                          Email:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="email"
                          placeholder="Enter Email"
                          onChange={handleDistNameChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Password:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="password"
                          placeholder="Enter Password"
                          onChange={handleDistNameChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Address:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="address"
                          placeholder="Enter Address"
                          onChange={handleDistNameChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">
                          Mobile Number:
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="recipient-name"
                          name="number"
                          placeholder="Enter Mobile Number"
                          onChange={handleDistNameChange}
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

          {/* EDIT MODAL */}
          <div
            className="modal fade"
            id="exampleModal1"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit District
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
                      <label for="recipient-name" className="col-form-label">
                        District Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="district_name"
                        onChange={handleEditDistNameChange}
                        value={editData && editData.district_name}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        {" "}
                        Email:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="email"
                        onChange={handleEditDistNameChange}
                        value={editData && editData.email}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        Password:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="password"
                        onChange={handleEditDistNameChange}
                        value={editData && editData.password}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        Address:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="address"
                        onChange={handleEditDistNameChange}
                        value={editData && editData.address}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        Mobile Number:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="recipient-name"
                        name="number"
                        onChange={handleEditDistNameChange}
                        value={editData && editData.number}
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
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
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
  );
};

export default District;
