import React from 'react';
import { Route, Routes } from "react-router-dom";
import AllFeedback from '../../../Pages/Admin/Local-Admin/AllFeedback';

const AllFeedbackRoute = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/allfeedback"
                    element={
                        <>
                            <AllFeedback />
                        </>
                    }
                />
            </Routes>
        </>
    )
}

export default AllFeedbackRoute
