import React, { useState } from 'react';
import '../../../Assets/css/complaint.css';
const Feedbacks = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);

    };
    return (
        <div className="container secActive">
            <header>Feedback Form</header>
            <form>
                <div className="forms first" style={{ width: '90%' }}>
                    <div className="details feedback">
                        <span className="title">Feedback</span>

                        <div className="row">
                            <div className="col-md-7">
                                <div className="input-field">
                                    <label>How satisfied were you with the communication during your interaction with our service?</label>
                                    <select className="form-control">
                                        <option>Excellent</option>
                                        <option>Good</option>
                                        <option>Satisfactory</option>
                                        <option>Needs Improvement</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="input-field">
                                    <label>How satisfied are you with the resolution provided by our service?</label>
                                    <select className="form-control">
                                        <option>Fully Resolved</option>
                                        <option>Partially Resolved</option>
                                        <option>Not Resolved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-field">
                                    <label>Would you use our service again?</label>
                                    <select className="form-control">
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-field">
                                    <label>How likely are you to recommend our service to others?</label>
                                    <select className="form-control">
                                        <option>Very Likely</option>
                                        <option>Likely</option>
                                        <option>Neutral</option>
                                        <option>Unlikely</option>
                                        <option>Very Unlikely</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-field">
                                    <label>Please provide additional comments or suggestions for improvement?</label>
                                    <textarea className="form-control" placeholder="Enter your comments"></textarea>
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
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <button className="submit">
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
