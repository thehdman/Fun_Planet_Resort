import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import WeddingQuatation from '../pages/WeddingQuotation';
import QuotationList from '../pages/QuotationList';


const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='WeddingQuotation' element={<WeddingQuatation></WeddingQuatation>}></Route>
                    <Route path='QuotationList' element={<QuotationList></QuotationList>}></Route>
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;