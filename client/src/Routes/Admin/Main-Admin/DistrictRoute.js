import React from 'react';
import { Route, Routes } from 'react-router-dom';
import District from '../../../Pages/Admin/Main-Admin/District/District';

const DistrictRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/district' element={
                    <>
                        <District />
                    </>
                } />
            </Routes>
        </>
    )
}

export default DistrictRoute
