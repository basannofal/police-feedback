// Feedback.js
import React, { useState } from 'react';
import '../../Assets/css/Feedback.css';

const Feedback = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`feedback-sidebar ${isOpen ? 'open' : ''}`}>
            <button className={`btn btn-primary feedback-button ${isOpen ? 'open' : ''}`} onClick={handleButtonClick}>
                {isOpen ? 'Feedback' : 'Feedback'}
            </button>
            {isOpen && (
                <button className="close-button" onClick={handleButtonClick}>
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
            )}
            <div className="sidebar-content">
                <h2>Feedback Form</h2>
                <p>This is your feedback form content.</p>
            </div>
        </div>
    );
};

export default Feedback;
