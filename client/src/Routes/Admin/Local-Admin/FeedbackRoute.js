import React from 'react';
import { Route, Routes } from "react-router-dom";
import Feedback from '../../../Pages/Admin/Local-Admin/Feedback';

const FeedbackRoute = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/feedback/:id"
                    element={
                        <>
                            <Feedback />
                        </>
                    }
                />
            </Routes>
        </>
    )
}

export default FeedbackRoute
