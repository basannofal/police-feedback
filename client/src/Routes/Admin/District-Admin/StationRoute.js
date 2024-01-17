import React from 'react';
import { Route, Routes } from "react-router-dom";
import Station from '../../../Pages/Admin/District-Admin/Station';

const StationRoute = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/district-station/:id"
                    element={
                        <>
                            <Station />
                        </>
                    }
                />
            </Routes>
        </>
    )
}

export default StationRoute
