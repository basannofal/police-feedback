import React, { useEffect, useState } from 'react';
import '../../../Assets/css/complaint.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const PORT = process.env.REACT_APP_PROXY_URL;

const Feedbacks = () => {
    const {id} = useParams("")
    const [rating, setRating] = useState(0);
    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        setAddData((prevData) => ({
            ...prevData,
            ans_6: selectedRating,
        }));
    };
    const [distData, setDistData] = useState([]);
    const [stationData, setStationData] = useState([]);
    const [addData, setAddData] = useState({
        ans_1: '',
        ans_2: '',
        ans_3: '',
        ans_4: '',
        ans_5: '',
        did: "",
        sid: "",
        ans_6: null,
    });


    const handleAnswerChange = (event) => {
        const { name, value } = event.target;
        setAddData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addFeedbackData = async (e) => {
        e.preventDefault();
        if (addData.rating === 0) {
            alert("Please provide a rating.");
            return;
        }

        await axios
            .post(`http://localhost:1010/addFeedback/${id}`, addData)
            .then(() => {
                const form = e.target;
                form.reset();
                setRating(0);
            })
            .catch((error) => {
                alert("Error submitting feedback. Please try again.");
                console.log("Error adding feedback:", error);
            });
    }

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

    useEffect(() => {
        getAllDistrictData();
        getAllStationData();
    }, []);

    const filteredStations = stationData.filter(
        (station) => station.district_id == addData.did
    );


    return (
        <div className="container secActive">
            <header>Feedback Form</header>
            <form method='post' onSubmit={addFeedbackData}>
                <div className="forms first" style={{ width: '90%' }}>
                    <div className="details feedback">
                        <span className="title">Feedback</span>

                        <div className="row">
                            <div className="col-md-7">
                                <div className="input-field">
                                    <label>How satisfied were you with the communication during your interaction with our service?</label>
                                    <select className="form-control" name='ans_1' onChange={handleAnswerChange}>
                                        <option value="">Select</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Satisfactory">Satisfactory</option>
                                        <option value="NeedsImprovement">Needs Improvement</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="input-field">
                                    <label>How satisfied are you with the resolution provided by our service?</label>
                                    <select className="form-control" name='ans_2' onChange={handleAnswerChange}>
                                        <option value="">Select</option>
                                        <option value="FullyResolved">Fully Resolved</option>
                                        <option value="PartiallyResolved">Partially Resolved</option>
                                        <option value="NotResolved">Not Resolved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-field">
                                    <label>Would you use our service again?</label>
                                    <select className="form-control" name='ans_3' onChange={handleAnswerChange}>
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-field">
                                    <label>How likely are you to recommend our service to others?</label>
                                    <select className="form-control" name='ans_4' onChange={handleAnswerChange}>
                                        <option value="">Select</option>
                                        <option value="VeryLikely">Very Likely</option>
                                        <option value="Likely">Likely</option>
                                        <option value="Neutral">Neutral</option>
                                        <option value="Unlikely">Unlikely</option>
                                        <option value="VeryUnlikely">Very Unlikely</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-field">
                                    <label htmlFor="districtSelect" className="col-form-label">
                                        District Name:
                                    </label>
                                    <select
                                        className="form-control"
                                        id="districtSelect"
                                        name="did"
                                        onChange={handleAnswerChange}
                                    >
                                        <option value="">Select District</option>
                                        {distData.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.district_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-field">
                                    <label htmlFor="stationselect" className="col-form-label">
                                        Station Name:
                                    </label>
                                    <select
                                        className="form-control"
                                        id="stationselect"
                                        name="sid"
                                        onChange={handleAnswerChange}
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

                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-field">
                                    <label>Please provide additional comments or suggestions for improvement?</label>
                                    <textarea className="form-control" placeholder="Enter your comments" name='ans_5' onChange={handleAnswerChange}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-field">
                                    <label>Give me a rating on stars?</label>
                                    <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={star <= rating ? 'active' : ''}
                                                onClick={() => handleStarClick(star)}
                                                name='ans_6'
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <button className="submit" type='submit'>
                            <span className="btnText">Submit</span>
                            <i className="uil uil-navigator"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Feedbacks;
