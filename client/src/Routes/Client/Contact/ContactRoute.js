import React from 'react';
import { Routes, Route } from "react-router-dom";
import Contact from '../../../Pages/Client/Contact/Contact';
import Navbar from '../../../Layout/Client/Navbar';
import Feedback from '../../../Layout/Client/Feedback';

const ContactRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/contact-page' element={
                    <>
                        <Navbar />
                        <Contact />
                        <Feedback />
                    </>
                } />
            </Routes>
        </>
    )
}

export default ContactRoute
