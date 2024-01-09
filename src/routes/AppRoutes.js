import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import Login from '../pages/Login';

import WeddingPackages from '../pages/WeddingPackages';
import User from '../pages/User';

import Roomtype from '../pages/Roomtype';
import Enquiry from '../pages/Enquiry';

import WeddingQuatation from '../pages/WeddingQuotation';
import QuotationList from '../pages/QuotationList';

import AddFoodItem from '../pages/AddFoodItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from '../pages/Services';
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
                    <Route path='Login' element={<Login></Login>}></Route>
            

                    <Route path='WeddingPackages' element={<WeddingPackages></WeddingPackages>}></Route>
                    <Route path='User' element={<User></User>}></Route>
                    <Route path='Roomtype' element={<Roomtype></Roomtype>}></Route>
                    <Route path='Enquiry' element={<Enquiry></Enquiry>}></Route>
                   
                    <Route path='WeddingQuotation' element={<WeddingQuatation></WeddingQuatation>}></Route>
                    <Route path='QuotationList' element={<QuotationList></QuotationList>}></Route>
                    
                    <Route path='AddFoodItem' element={<AddFoodItem></AddFoodItem>}></Route>
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