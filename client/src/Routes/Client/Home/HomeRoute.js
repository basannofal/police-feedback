import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../../../Pages/Client/Home/Home';
import Navbar from '../../../Layout/Client/Navbar';
import Feedback from '../../../Layout/Client/Feedback';


const HomeRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={
                    <>
                        <Navbar />
                        <Home />
                        <Feedback />
                    </>
                } />
            </Routes>
        </>
    )
}

export default HomeRoute
