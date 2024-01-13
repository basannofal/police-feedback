// Feedback.js
import React, { useState } from 'react';
import '../../Assets/css/Feedback.css';
import axios from 'axios';

const Feedback = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const [addData, setAddData] = useState({
        ans_1: '',
        ans_2: '',
        ans_3: '',
    })
    const handleAnswerChange = (event) => {
        const { name, value } = event.target;
        setAddData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addFeedbackData = async (e) => {
        e.preventDefault();

        await axios
            .post(`http://localhost:1010/addLocalFeedback`, addData)
            .then(() => {
                const form = e.target;
                form.reset();
                setIsOpen(false);
            })
            .catch((error) => {
                alert("Error submitting feedback. Please try again.");
                console.log("Error adding feedback:", error);
            });
    }

    return (
        <div className={`feedback-sidebar ${isOpen ? 'open' : ''}`}>
            <button className={`btn btn-primary feedback-button ${isOpen ? 'open' : ''}`} onClick={handleButtonClick}>
                {isOpen ? 'Feedback' : 'Feedback'}
            </button>
            {isOpen && (
                <button className="close-button" onClick={handleButtonClick}>
                    <i className="fa-regular fa-circle-xmark"></i>
                </button>
            )}
            <div className="sidebar-content">
                <h2>Feedback Form</h2>
                <form method='post' onSubmit={addFeedbackData}>
                    <div className='feed_back_form'>
                        <label htmlFor="question1">How satisfied are you with our service?</label>
                        <select id="question1" name="ans_1" onChange={handleAnswerChange}>
                            <option value="">Select</option>
                            <option value="verySatisfied">Very Satisfied</option>
                            <option value="satisfied">Satisfied</option>
                            <option value="neutral">Neutral</option>
                            <option value="unsatisfied">Unsatisfied</option>
                            <option value="veryUnsatisfied">Very Unsatisfied</option>
                        </select>
                    </div>
                    <div className="feed_back_form">
                        <div>
                            <label htmlFor="question2">What can we improve?</label>
                        </div>
                        <textarea id="question2" placeholder='Enter Your Thoughts' name="ans_2" onChange={handleAnswerChange}></textarea>
                    </div>

                    <div className="feed_back_form">
                        <label htmlFor="question3">Would you recommend us to others?</label>
                        <select id="question3" name="ans_3" onChange={handleAnswerChange}>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div>
                        <button id='submit-btn' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
