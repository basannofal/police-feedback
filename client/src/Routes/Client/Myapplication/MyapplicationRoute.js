import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from '../../../Layout/Client/Navbar';
import Feedback from '../../../Layout/Client/Feedback';
import Myapplication from '../../../Pages/Client/Myapplication/Myapplication';


const ServiseRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/myapplication/:id' element={
                    <>
                        <Navbar />
                        <Myapplication />
                        <Feedback />
                    </>
                } />
            </Routes>
        </>
    )
}

export default ServiseRoute
