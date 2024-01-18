import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../../Layout/Client/Footer";
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

  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

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
        setSelectedVideoUrl("");
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

        // Set the selected video URL
        const videoUrl = URL.createObjectURL(file);
        setSelectedVideoUrl(videoUrl);
      }
    }
  };

  // const getCPosition = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       async function success(position) {
  //         const { latitude, longitude } = position.coords;
  //         console.log("latitude", latitude, "longitude", longitude);

  //         try {
  //           const response = await axios.get(
  //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD-cylYXk7D3NvvOEhscctAk0PRJTdAOLk`
  //           );

  //           const address =
  //             response.data.results[0]?.formatted_address ||
  //             "Address not found";

  //           setFormData({
  //             ...formData,
  //             location: address,
  //           });
  //         } catch (error) {
  //           console.error("Error fetching address", error);
  //         }
  //       },
  //       function error(error_message) {
  //         console.error(
  //           "An error has occurred while retrieving location",
  //           error_message
  //         );
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not enabled on this browser");
  //   }
  // };

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
      // setSelectedVideoUrl("");
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

    if (
      isVideoValid() &&
      areImagesValid() &&
      isLocationValid() &&
      areDistrictAndStationValid()
    ) {
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

  // video validation
  const isVideoValid = () => {
    if (!formData.video) {
      setErrorMessages({
        ...errorMessages,
        video: "Please upload a video.",
      });
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["video/mp4"];

    if (formData.video.size > maxSize) {
      setErrorMessages({
        ...errorMessages,
        video: "Video size should be less than 5MB.",
      });
      setFormData({
        ...formData,
        video: null,
      });
      setSelectedVideoUrl("");
      return false;
    } else if (!allowedTypes.includes(formData.video.type)) {
      setErrorMessages({
        ...errorMessages,
        video: "Only MP4 videos are allowed.",
      });
      setFormData({
        ...formData,
        video: null,
      });
      return false;
    }

    setErrorMessages({
      ...errorMessages,
      video: "",
    });
    return true;
  };

  // images validation
  const areImagesValid = () => {
    const minImageCount = 3;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    if (selectedImages.length < minImageCount) {
      setErrorMessages({
        ...errorMessages,
        images: `Select at least ${minImageCount} images.`,
      });
      return false;
    }

    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];

      if (image.file.size > maxSize) {
        setErrorMessages({
          ...errorMessages,
          images: `Image ${i + 1} size should be less than 5MB.`,
        });
        return false;
      } else if (!allowedTypes.includes(image.file.type)) {
        setErrorMessages({
          ...errorMessages,
          images: `Only PNG, JPG, JPEG, and WebP images are allowed for Image ${
            i + 1
          }.`,
        });
        return false;
      }
    }

    setErrorMessages({
      ...errorMessages,
      images: "",
    });
    return true;
  };

  // location validation
  const isLocationValid = () => {
    if (!formData.location.trim()) {
      setErrorMessages({
        ...errorMessages,
        location: "Please provide the location.",
      });
      return false;
    }

    setErrorMessages({
      ...errorMessages,
      location: "",
    });
    return true;
  };

  // dist and station validation
  const areDistrictAndStationValid = () => {
    if (!formData.did || !formData.sid) {
      setErrorMessages({
        ...errorMessages,
        district: "Please select District.",
        station: "Please select Station.",
      });
      return false;
    }

    setErrorMessages({
      ...errorMessages,
      district: "",
      station: "",
    });
    return true;
  };

  return (
    <>
      <div className="container">
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
          style={{ overflowY: "auto", maxHeight: "500px" }}
        >
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label className="pt-2" htmlFor="videoUpload">
                Video Upload:{" "}
                <span style={{ color: "red" }}>
                  * <small>( Upload Video Max 5MB )</small>
                </span>
              </label>
              <input
                type="file"
                className="form-control mt-2"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
              />
              <p style={{ color: "red" }}>{errorMessages.video}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedVideoUrl && (
                  <video
                    controls
                    width="100%"
                    height="200"
                    style={{
                      borderRadius: "8px",
                      marginTop: "10px",
                    }}
                  >
                    <source src={selectedVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label className="pt-2" htmlFor="images">
                Images Upload:{" "}
                <span style={{ color: "red" }}>
                  * <small>( Minimum 3 Images are required )</small>
                </span>
              </label>
              <input
                className="form-control mt-2"
                name="images"
                type="file"
                onChange={handleImageUpload}
                multiple
              />
              <p style={{ color: "red" }}>{errorMessages.images}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      flex: "0 0 calc(33.33% - 10px)",
                      position: "relative",
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Selected Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover", // To maintain aspect ratio
                        borderRadius: "8px", // Optional: Add border radius
                      }}
                    />
                    <p
                      onClick={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        color: "#265DF2",
                        cursor: "pointer",
                      }}
                    >
                      <i class="fa-regular fa-circle-xmark"></i>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label className="pt-2" htmlFor="location">
                Location: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control mt-2"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <p style={{ color: "red" }}>{errorMessages.location}</p>
            </div>
            {/* <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <button type="submit" onClick={getCPosition}>
                Get Current location
              </button>
            </div> */}
          </div>

          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label className="pt-2" htmlFor="districtSelect">
                District Name: <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control mt-2"
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
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label className="pt-2" htmlFor="stationselect">
                Station Name: <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control mt-2"
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
              <p style={{ color: "red" }}>{errorMessages.station}</p>
              <a target="_blank" href="https://peoplehelpsmap.netlify.app/">
                Click here to view near police station
              </a>
            </div>
          </div>
          <button className="submit_button" type="submit">
            {loading ? "Sending..." : "Send Complaint"}
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default EmergencyComplaint;
