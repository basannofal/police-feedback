import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const PORT = process.env.REACT_APP_PROXY_URL;

const EmergencyComplaint = () => {
  const navigate = useNavigate();

  const [distData, setDistData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    did: "",
    sid: "",
    video: null,
    images: [],
    location: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    video: "",
    images: "",
    location: "",
    district: "",
    station: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["video/mp4"];

    setErrorMessages({
      ...errorMessages,
      video: "", // Resetting the error message before validation
    });

    if (file) {
      if (file.size > maxSize) {
        setErrorMessages({
          ...errorMessages,
          video: "Video size should be less than 5MB.",
        });
      } else if (!allowedTypes.includes(file.type)) {
        setErrorMessages({
          ...errorMessages,
          video: "Only MP4 videos are allowed.",
        });
      } else {
        setFormData({
          ...formData,
          video: file,
        });
      }
    }
  };

  const getCPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function success(position) {
          const { latitude, longitude } = position.coords;
          console.log("latitude", latitude, "longitude", longitude);

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD-cylYXk7D3NvvOEhscctAk0PRJTdAOLk`
            );

            const address =
              response.data.results[0]?.formatted_address ||
              "Address not found";

            setFormData({
              ...formData,
              location: address,
            });
          } catch (error) {
            console.error("Error fetching address", error);
          }
        },
        function error(error_message) {
          console.error(
            "An error has occurred while retrieving location",
            error_message
          );
        }
      );
    } else {
      console.log("Geolocation is not enabled on this browser");
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const newImages = [];
    const minImageCount = 3;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    setErrorMessages({
      ...errorMessages,
      images: "", // Resetting the error message before validation
    });

    if (files.length < minImageCount) {
      setErrorMessages({
        ...errorMessages,
        images: `Select at least ${minImageCount} images.`,
      });
    } else {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          setErrorMessages({
            ...errorMessages,
            images: `Image ${i + 1} size should be less than 5MB.`,
          });
          return;
        }
        if (!allowedTypes.includes(file.type)) {
          setErrorMessages({
            ...errorMessages,
            images: `Only PNG, JPG, JPEG, and WebP images are allowed for Image ${
              i + 1
            }.`,
          });
          return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
          newImages.push({ file, url: e.target.result });
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: newImages,
          }));
          setSelectedImages(newImages);
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.did || !formData.sid) {
      setErrorMessages({
        ...errorMessages,
        district: "Please select both District and Station.",
      });
      return;
    }

    if (!formData.location) {
      setErrorMessages({
        ...errorMessages,
        location: "Please provide the location.",
      });
      return;
    }

    try {
      const newData = new FormData();
      newData.append("video", formData.video);
      newData.append("location", formData.location);
      newData.append("did", formData.did);
      newData.append("sid", formData.sid);

      // Append each image to the FormData
      selectedImages.forEach((image, index) => {
        newData.append(`images`, image.file);
      });

      const res = await axios.post(`${PORT}/addemergencycomplaint`, newData);

      navigate("/", { replace: true });
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
  const filteredStations = stationData.filter(
    (station) => station.district_id == formData.did
  );

  return (
    <>
      <div className="container">
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
          // style={{ overflowY: "auto", maxHeight: "500px" }}
        >
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="videoUpload">Video Upload:</label>
              <input
                type="file"
                className="form-control"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
              />
              <p style={{ color: "red" }}>{errorMessages.video}</p>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="images">Images Upload:</label>
              <input
                className="form-control"
                name="images"
                type="file"
                onChange={handleImageUpload}
                multiple
              />
              <p style={{ color: "red" }}>{errorMessages.images}</p>

              <div>
                {selectedImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={`Selected Image ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                    <p onClick={() => removeImage(index)}>Remove</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <p style={{ color: "red" }}>{errorMessages.location}</p>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <button type="submit" onClick={getCPosition}>
                Get Current location
              </button>
            </div>
          </div>
          <div className="column">
            <div className="input-box">
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
              <p style={{ color: "red" }}>{errorMessages.district}</p>
            </div>
            <div className="input-box">
              <label htmlFor="stationselect" className="col-form-label">
                Station Name:
              </label>
              <select
                className="form-control"
                id="stationselect"
                name="sid"
                onChange={handleInputChange}
              >
                <option value="">Select Station</option>
                {filteredStations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.station_name}
                  </option>
                ))}
              </select>
              <a target="_blank" href="https://peoplehelpsmap.netlify.app/">
                Click here to view near police station
              </a>
              <p style={{ color: "red" }}>{errorMessages.station}</p>
            </div>
          </div>
          <button className="submit_button" type="submit">
            {loading ? "Sending..." : "Send Complaint"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EmergencyComplaint;
