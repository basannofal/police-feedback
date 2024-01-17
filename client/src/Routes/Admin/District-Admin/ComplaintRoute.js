import React from 'react';
import { Route, Routes } from "react-router-dom";
import Complaint from '../../../Pages/Admin/District-Admin/Complaint';

const ComplaintRoute = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/district-complaint/:id"
                    element={
                        <>
                            <Complaint />
                        </>
                    }
                />
            </Routes>
        </>
    )
}

export default ComplaintRoute
