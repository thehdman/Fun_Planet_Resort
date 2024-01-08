import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import Master from '../pages/Master';
import WeddingService from '../pages/WeddingService';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='Master' element={<Master/>}></Route>
                    <Route path='WeddingService' element={<WeddingService/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;