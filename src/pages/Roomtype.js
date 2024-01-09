import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getAllRoomType, SaveRoomtype, UpdateRoomtype } from '../services/Api';

const Roomtype = () => {

    let [RoomTypeList, setRoomTypeList] = useState([]);
    let [roomTypeObj, setRoomTypeObj] = useState({
        'roomTypeId': 0,
        'roomTypeName': '',
        'roomMaxCapacity': 0,
        'message': ' ',
        'result': true,
    });


    useEffect(() => {
        showroomtypedata();
    }, []);

    const changeFormValue = (event, key) => {
        setRoomTypeObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    };


    const showroomtypedata = () => {
        getAllRoomType().then((data) => {
            setRoomTypeList(data);
        });
    }

    const getAllRoomtypeAdd = () => {
        SaveRoomtype(roomTypeObj).then((data) => {
            if (data.result) {
                alert('added!!');
                showroomtypedata();
            } else {
                alert(data.message);
            }
        })
    }

    const getUpdateRoomType = () => {
        (roomTypeObj).then((data) => {
            if (data.result) {
                alert('updated!!');
                showroomtypedata();
            } else {
                alert(data.message);
            }
        })
    }

    const onEditRoomType = (item) => {
        setRoomTypeObj(prevObj => ({
            ...prevObj,
            roomTypeId: item.roomTypeId,
            roomMaxCapacity: item.roomMaxCapacity,
            roomTypeName: item.roomTypeName,
        }));
    }

    const resetRoomtype = () => {
        setRoomTypeObj({
            'roomTypeId': 0,
            'roomTypeName': '',
            'roomMaxCapacity': 0,
            'message': ' ',
            'result': true,
        })
    }

    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <strong style={{ textAlign: 'center', color: 'white' }}> All Room List</strong>
                            </div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Room Type Name</th>
                                        <th>Room Max Capacity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        RoomTypeList.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.roomTypeName}</td>
                                                <td>{item.roomMaxCapacity}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-success' onClick={() => { onEditRoomType(item) }}>Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <strong style={{ textAlign: 'center', color: 'white' }}> Room Form</strong>

                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Room Type Name</label>
                                        <input type='text' className='form-control' value={roomTypeObj.roomTypeName} onChange={(e) => { changeFormValue(e, 'roomTypeName') }} />

                                    </div>
                                    <div className='col-6'>
                                        <label>Room Max Capacity</label>
                                        <input type='text' className='form-control' value={roomTypeObj.roomMaxCapacity} onChange={(e) => { changeFormValue(e, 'roomMaxCapacity') }} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3 pt-2'>
                                        <button className='btn btn-secondary' onClick={resetRoomtype}>Reset</button>
                                    </div>
                                    <div className='col-6 pt-2'>
                                        {
                                            roomTypeObj.roomTypeId ==0 && <button className='btn btn-success' onClick={getAllRoomtypeAdd}>Save </button>
                                        }
                                        
                                    </div>
                                    <div className='col-3 pt-2'>
                                        {
                                            roomTypeObj.roomTypeId !==0 &&  <button className='btn btn-warning' onClick={getUpdateRoomType} >Update </button>
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
}
export default Roomtype;