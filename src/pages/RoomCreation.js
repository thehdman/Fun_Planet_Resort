import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { showRoomData, showRoomTypeData, showRoomStatus, addRoomData, editRoom, deleteRoom } from "../services/Api"

const RoomCreation = () => {

    let [roomData, setRoomData] = useState([]);
    let [roomObj, setRoomObj] = useState({
        "roomId": 0,
        "roomTypeId": 0,
        "roomNo": "",
        "totalBed": 0,
        "roomCapacity": 0,
        "roomExtensionNo": "",
        "roomStatus": 0,
        "message": "",
        "result": true
    });
    let [roomType, setRoomType] = useState([]);
    let [roomStatusList, setRoomStatusList] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [isFormSubmitted, setisFormSubmitted] = useState(false);

    useEffect(() => {
        showAllRoomData();
        showAllRoomTypeData();
        showAllRoomStatus();
    }, []);

    const showAllRoomData = () => {
        showRoomData().then((data) => {
            setRoomData(data);
            setIsLoader(false);
        });
    }

    const showAllRoomTypeData = () => {
        showRoomTypeData().then((data) => {
            setRoomType(data);
        });
    }

    const showAllRoomStatus = () => {
        showRoomStatus().then((data) => {
            setRoomStatusList(data);
        });
    }

    const getRoomObj = (event, key) => {
        setRoomObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const addAllRoomData = () => {
        setisFormSubmitted(true);
        addRoomData(roomObj).then((data) => {
            if (data.result) {
                alert('Room Added Successfully');
                showAllRoomData();
            }
            else {
                alert(data.message);
            }
        })
    }

    const editRoomData = (id) => {
        debugger;
        editRoom(id).then((data) => {
            console.log(data)
            if (data.result) {
                setRoomObj(data)
            }
            else {
                alert(data.message)
            }
        })
    }

    const updateRoomData = () => {
        addRoomData(roomObj).then((data) => {
            if (roomObj.roomTypeId == ' ' || roomObj.roomNo == ' ' || roomObj.totalBed == ' ' || roomObj.roomCapacity == ' ' || roomObj.roomExtensionNo == ' ' || roomObj.roomStatus == ' ') {
                alert("All Fields are Important")
            }
            else {
                setisFormSubmitted(true);
                if (data.result) {
                    alert('Room Data Updated Successfully');
                    showAllRoomData();
                }
                else {
                    alert(data.message);
                }
            }
        })
    }

    const deleteRoomData = (obj) => {
        deleteRoom(obj).then((data) => {
            if (data.result) {
                alert('Room Data Deleted Successfully');
                showAllRoomData();
            }
            else {
                alert(data.message)
            }
        })
    }

    const resetRoomData = () => {
        debugger;
        setRoomObj({
            "roomId": 0,
            "roomTypeId": 0,
            "roomNo": "",
            "totalBed": 0,
            "roomCapacity": 0,
            "roomExtensionNo": "",
            "roomStatus": 0,
            "message": "",
            "result": true
        })
    }

    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-8'>
                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong className='text-white'>Room List</strong>
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
                                                        <td>{item.roomStatusName}</td>
                                                        <td><button className='btn btn-success btn-sm' onClick={() => { editRoomData(item.roomId) }}>Edit</button></td>
                                                        <td><button className='btn btn-danger btn-sm' onClick={() => { deleteRoomData(item) }}>Delete</button></td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <strong className='text-white'>Add Leaves</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Room Type</label>
                                        <select className='form-select' value={roomObj.roomTypeId} onChange={(event) => { getRoomObj(event, 'roomTypeId') }}>
                                            <option>Select Room Type</option>
                                            {
                                                roomType.map((item) => {
                                                    return (<option value={item.statusId}>{item.status}</option>)
                                                })
                                            }
                                        </select>
                                        <div className='text-danger'>
                                            {
                                                isFormSubmitted && roomObj.roomTypeId == '' && <span>Room Type is required.</span>
                                            }

                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <label>Room No</label>
                                        <input type='text' className='form-control' value={roomObj.roomNo} onChange={(event) => { getRoomObj(event, 'roomNo') }}></input>
                                        <div className='text-danger'>
                                            {
                                                isFormSubmitted && roomObj.roomNo == '' && <span>Room No is required.</span>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Total Bed</label>
                                        <input type='number' className='form-control' value={roomObj.totalBed} onChange={(event) => { getRoomObj(event, 'totalBed') }}></input>
                                        <div className='text-danger'>
                                            {
                                                isFormSubmitted && roomObj.totalBed == '' && <span>Total Bed is required.</span>
                                            }

                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <label>Room Capacity</label>
                                        <input type='number' className='form-control' value={roomObj.roomCapacity} onChange={(event) => { getRoomObj(event, 'roomCapacity') }}></input>
                                        <div className='text-danger'>
                                            {
                                                isFormSubmitted && roomObj.roomCapacity == '' && <span>Room Capacity is required.</span>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Room Extension No</label>
                                        <input type='text' className='form-control' value={roomObj.roomExtensionNo} onChange={(event) => { getRoomObj(event, 'roomExtensionNo') }}></input>
                                        <div className='text-danger'>
                                            {
                                                isFormSubmitted && roomObj.roomExtensionNo == '' && <span>Room Extension No is required.</span>
                                            }

                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <label>Room Status</label>
                                        <select className='form-select' value={roomObj.roomStatus} onChange={(event) => { getRoomObj(event, 'roomStatus') }}>
                                            <option>Select Room Status</option>
                                            {
                                                roomStatusList.map((item) => {
                                                    return (<option value={item.statusId}>{item.status}</option>)
                                                })
                                            }
                                        </select>
                                        <div className='text-danger'>
                                            {
                                                isFormSubmitted && roomObj.roomStatus == '' && <span>Room Status is required.</span>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 mt-3 text-center'>
                                        <button className='btn btn-secondary btn-sm' onClick={resetRoomData}>Reset</button>
                                    </div>
                                    <div className='col-6 mt-3 text-center'>
                                        {
                                            roomObj.roomId == 0 && <button className='btn btn-success btn-sm' onClick={addAllRoomData}>Save Data</button>
                                        }
                                        {
                                            roomObj.roomId !== 0 && <button className='btn btn-warning btn-sm' onClick={updateRoomData}>Update Data</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCreation;