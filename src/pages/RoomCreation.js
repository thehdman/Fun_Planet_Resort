import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {showRoomData} from "../services/Api"

const RoomCreation = () => {

    let [roomData, setRoomData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showRoomData().then((data) => {
            setRoomData(data);
            setIsLoader(false);
        });
    }, []);


    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-8'>
                        <div class="card">
                            <div class="card-header bg-warning" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong>Room List</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Room Type Name</th>
                                            <th>Room No</th>
                                            <th>Total Bed</th>
                                            <th>Room Capacity</th>
                                            <th>Room Extension No</th>
                                            <th>Room Status</th>
                                            <th>Room Status Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    {
                                        isLoader && <tbody>
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    <div class="spinner-border text-muted"></div>
                                                    <div class="spinner-border text-primary"></div>
                                                    <div class="spinner-border text-success"></div>
                                                    <div class="spinner-border text-info"></div>
                                                    <div class="spinner-border text-warning"></div>
                                                    <div class="spinner-border text-danger"></div>
                                                    <div class="spinner-border text-secondary"></div>
                                                    <div class="spinner-border text-dark"></div>
                                                    <div class="spinner-border text-light"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                    {
                                        !isLoader && <tbody>
                                            {
                                                roomData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.roomTypeName}</td>
                                                        <td>{item.roomNo}</td>
                                                        <td>{item.totalBed}</td>
                                                        <td>{item.roomCapacity}</td>
                                                        <td>{item.roomExtensionNo}</td>
                                                        <td>{item.roomStatus}</td>
                                                        <td>{item.roomStatusName}</td>
                                                        <td><button className='btn btn-danger btn-sm'>Edit</button></td>
                                                        <td><button className='btn btn-primary btn-sm'>Delete</button></td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCreation;