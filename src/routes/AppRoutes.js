import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import Services from '../pages/Services';
import Master from '../pages/Master';
import WeddingService from '../pages/WeddingService';
import Offer from '../pages/Offer';
import Booking from '../pages/Booking';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='Services' element={<Services></Services>}></Route>
                    <Route path='Master' element={<Master/>}></Route>
                    <Route path='WeddingService' element={<WeddingService/>}></Route>
                    <Route path='Offer' element={<Offer></Offer>}></Route>
                    <Route path='Booking' element={<Booking></Booking>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;