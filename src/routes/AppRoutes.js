import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import AddFoodItem from '../pages/AddFoodItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Master from '../pages/Master';
import WeddingService from '../pages/WeddingService';
import Offer from '../pages/Offer';
import Booking from '../pages/Booking';

const AppRoutes = () => {
    return (
        <div>
                <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                ></ToastContainer>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='AddFoodItem' element={<AddFoodItem></AddFoodItem>}></Route>
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