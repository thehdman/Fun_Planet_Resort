import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import RoomCreation from '../pages/RoomCreation';
import Fooditem from '../pages/Fooditem';
import VisitTable from '../pages/VisitTable';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='RoomCreation' element={<RoomCreation></RoomCreation>}></Route>
                    <Route path='Fooditem' element={<Fooditem></Fooditem>}></Route>
                    <Route path='VisitTable' element={<VisitTable></VisitTable>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;