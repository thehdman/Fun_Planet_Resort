import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import Roomtype from '../pages/Roomtype';
import Enquiry from '../pages/Enquiry';


const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='Roomtype' element={<Roomtype></Roomtype>}></Route>
                    <Route path='Enquiry' element={<Enquiry></Enquiry>}></Route>
                   
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;