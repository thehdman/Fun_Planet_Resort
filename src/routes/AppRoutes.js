import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import WeddingPackages from '../pages/WeddingPackages';
import User from '../pages/User';


const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='WeddingPackages' element={<WeddingPackages></WeddingPackages>}></Route>
                    <Route path='User' element={<User></User>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;