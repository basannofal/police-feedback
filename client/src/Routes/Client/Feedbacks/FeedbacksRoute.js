import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from '../../../Layout/Client/Navbar';
import Feedbacks from '../../../Pages/Client/Feedbacks/Feedbacks';

const FeedbacksRoute = () => {
  return (
    <>
      <Routes>
        <Route path='/feedback-page/:id' element={
          <>
            <Navbar />
            <Feedbacks />
          </>
        } />
      </Routes>
    </>
  )
}

export default FeedbacksRoute
