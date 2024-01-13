import React, { useEffect, useState } from 'react';
import { getAllVisit, addVisitdata,getAllService ,getsingalvisit} from "../services/Api"


const VisitTable = () => {
    let [vistlist, setvistlist] = useState([])

    let [AllService, setAllService] = useState([]);


    let [visitObj, setvistObj] = useState({

        "name": "",
        "userId": null,
        "contactNo": "",
        "frDate": null,
        "toDate": null,
        "serviceId": null,
        "bookingUId": "",
        "ticketNo": "",
        "isDone": false
    })


    useEffect(() => {
        showVisitForm();
        showVisitService();


    },[]);

    const showVisitForm = () => {
        getAllVisit(visitObj).then((data) => {
            setvistlist(data);

        })

    }
    const addAllVisitData = () => {
        addVisitdata(setvistObj).then((data) => {
            debugger;
            if (data.result) {
                
                alert('Data Added Successfully')
                showVisitForm();

            }
            else {
                alert(data.message)
            }

        })

    }
    const showVisitService = () => {
        getAllService().then((data)=>{
            setAllService(data);  
        })
    }

    // const showsingalvisit = () => {
    //     getsingalvisit().then((data)=>{
    //         setvistObj(data);
    //     })

    // }







    const changeformvalue = (event, key) => {
        setvistObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const changeisConfirm = (event) => {
        setvistObj(prevObj => ({ ...prevObj, isConfirm: event.target.checked }))
    }





    return (
        <div>
            <div className='contaniar'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='card'>
                            <div className=' card-header bg-primary'>
                                <strong className='text-white'>Visit form</strong>
                            </div>
                            <div className='card-body'>

                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>sr</th>
                                            <th>Name</th>
                                            <th>UserId</th>
                                            <th>ContactNo</th>
                                            <th>FrDate</th>
                                            <th>ToDate</th>
                                            <th>ServiceId</th>
                                            <th>BookingUId</th>
                                            <th>IsDone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vistlist.map((item, index) => {
                                                return(<tr>
                                            
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.userId}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.frDate}</td>
                                                    <td>{item.toDate}</td>
                                                    <td>{item.serviceId}</td>
                                                    <td>{item.bookingUId}</td>
                                                    <td>{item.isDone ? 'IsDone' : 'Not IsDone'}</td>
                                                    <td>
                                                        {/* <button className='btn btn-sm btn-primary' onClick={() => { showsingalvisit(item.visitId) }}>Open</button> */}
                                                    </td>


                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className='card'>
                            <div className=' card-header bg-primary'>
                                <strong className='text-white'>Add Visit</strong>
                            </div>
                            <div className='card-body'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <label>Name</label>
                                                    <input type='text' className='form-control' value={visitObj.name} onChange={(event) => changeformvalue(event, 'name')}></input>
                                                </div>
                                                <div className='col-4'>
                                                    <label>mobile No</label>
                                                    <input type='text' className='form-control' value={visitObj.mobile} onChange={(event) => changeformvalue(event, 'mobile')}></input>
                                                </div>
                                                <div className='col-4'>
                                                    <label>Select Service</label>
                                                    <select className='form-select' value={visitObj.serviceId} onChange={(event) => changeformvalue(event, 'serviceId')}>
                                                        <option>Select Service</option>
                                                        {
                                                            AllService.map((item) => {
                                                                return (<option value={item.serviceId}>{item.serviceName}</option>)

                                                            })
                                                        }
                                                    </select>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='row'>

                                                <div className='col-6'>
                                                    <label>No of Members</label>
                                                    <input type='text' className='form-control' value={visitObj.noOfMembers} onChange={(event) => changeformvalue(event, 'noOfMembers')}/>
                                                </div>

                                                <div className='col-6'>
                                                    <label>Booking date</label>
                                                    <input type='Date' className='form-control' value={visitObj.bookingToDate} onChange={(event) => changeformvalue(event, 'bookingToDate')}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className='row'>
                                                <div className='col-3'>
                                                    <label>Total Amount</label>
                                                    <input type='text' className='form-control' value={visitObj.totalAmount} onChange={(event) => changeformvalue(event, 'totalAmount')}/>
                                                </div>
                                                <div className='col-3'>
                                                    <label>  Advance Amount </label>
                                                    <input type='text' className='form-control' value={visitObj.advance} onChange={(event) => changeformvalue(event, 'advance')}/>
                                                </div>
                                                <div className='col-3'>
                                                    <label>Remaining</label>
                                                    <input type='text' className='form-control' value={visitObj.remaining} onChange={(event) => changeformvalue(event, 'remaining')}/>
                                                </div>
                                                <div className='col-3'>
                                                    <label>userId</label>
                                                    <input type='text' className='form-control' value={visitObj.userId} onChange={(event) => changeformvalue(event, 'userId')}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className='row'>
                                                <div className='col-3 pt-4'>
                                                    <label>isConfirmed</label>
                                                    <input type='checkbox' checked={visitObj.isConfirm} onChange={(event) => changeisConfirm(event, 'isConfirm')} />
                                                </div>
                                                <div className='col-6'>
                                                    <label>Payment Detalis</label>
                                                    <input type='text-area' className='form-control' value={visitObj.paymentDetails} onChange={(event) => changeformvalue(event, 'paymentDetails')}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 pt-4'>
                                            <button className='btn btn-sm btn-success' onClick={addAllVisitData}>Save</button>
                                            <button className='btn btn-sm btn-secondary'> Cancel</button>

                                        </div>

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

export default VisitTable;