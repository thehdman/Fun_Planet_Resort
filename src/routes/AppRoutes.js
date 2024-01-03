import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import MasterForm from '../components/Forms/MasterForm';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='MasterForm' element={<MasterForm></MasterForm>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;