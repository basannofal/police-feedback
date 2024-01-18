import React from 'react';
import '../../Assets/css/Footer.css';

const Footer = () => {
    return (
        <div className='footer_main'>
            <div className='footer_info'>
                <p>
                    <label>Information</label><br />
                    Website Visitors: <strong>63667</strong><br /> <br />
                    Last Updated On: <strong>15 Dec 2023, 7:43 PM</strong></p>

                <i class="fa-brands fa-facebook-f"></i>
                <span class="fa-brands fa-twitter"></span>
            </div>


            <div className='footer_list'>
                <ul>
                    <li>Home</li>
                    <li>Services</li>
                    <li>Contact</li>
                    <li>EmergencyComplaint</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
