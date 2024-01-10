import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Station from '../../../Pages/Admin/Main-Admin/Station/Station';

const StationRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/station' element={
                    <>
                        <Station />
                    </>
                } />
            </Routes>
        </>
    )
}

export default StationRoute
