import React from 'react';
import { Routes, Route } from "react-router-dom";
import Ourservise from '../../../Pages/Client/Ourservise/Ourservise';
import Navbar from '../../../Layout/Client/Navbar';
import Feedback from '../../../Layout/Client/Feedback';


const ServiseRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/services' element={
                    <>
                        <Navbar />
                        <Ourservise />
                        <Feedback />
                    </>
                } />
            </Routes>
        </>
    )
}

export default ServiseRoute
