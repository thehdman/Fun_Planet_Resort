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
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);


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

    const showForm = () => {
        setisShowForm(true);
    }

    const closeForm = () => {
        setisShowForm(false);
    }

    const showCard = () => {
        setisShowCard(true);
    }

    const showTable = () => {
        setisShowCard(false);
    }

    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-12 mb-2 text-end'>
                        <button className='btn btn-danger mb-2' onClick={showForm}>Add Data</button>
                    </div>
                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong style={{ textAlign: 'center', color: 'white' }}> All Room List</strong>
                                    </div>
                                    <div className='col-6 text-end'>
                                        {
                                            !isShowCard && <button className='btn btn-body p-0 outline' onClick={showCard}>
                                                <i class="fa fa-th fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }
                                        {
                                            isShowCard && <button className='btn btn-body p-0 outline' onClick={showTable}>
                                                <i class="fa fa-table fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                !isShowCard &&  <div className='card-body'>
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
                            }
                            {
                                isShowCard &&  <div className='card-body'>
                                <div className='row'>
                                    {
                                        RoomTypeList.map((item, index) => {
                                            return (
                                                <div className='col-4'>
                                                    <div className='card card-margin mb-4 bg-body-tertiary'>
                                                        <div className='card-title px-3 pt-3'><strong>{item.roomTypeName}</strong></div>
                                                        <div className='card-body'>
                                                            <div className='row'>
                                                                <div className='col-3 d-flex align-items-center p-1'>
                                                                    <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                </div>
                                                                <div className='col-9'>
                                                                    <strong>Room Max Capacity</strong> - {item.roomMaxCapacity}
                                                                </div>
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                    <button className='btn btn-danger btn-sm mx-1' onClick={() => { onEditRoomType(item) }}>Edit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className='col-4'>
                        {
                            isShowForm && <div className='card'>
                                <div className='card-header bg-primary'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'> Room Form</strong>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <button className='btn p-0 btn-body' onClick={closeForm}>
                                                <i className="fa fa-times fa-lg text-white"></i>
                                            </button>
                                        </div>
                                    </div>
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
                                                roomTypeObj.roomTypeId == 0 && <button className='btn btn-success' onClick={getAllRoomtypeAdd}>Save </button>
                                            }

                                        </div>
                                        <div className='col-3 pt-2'>
                                            {
                                                roomTypeObj.roomTypeId !== 0 && <button className='btn btn-warning' onClick={getUpdateRoomType} >Update </button>
                                            }

                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Roomtype;