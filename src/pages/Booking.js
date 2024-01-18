import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getAllBooking, getServiceListBooking, onEditBooking, saveBooking, deleteBooking, updateBooking } from '../services/Api';


const Booking = () => {

  let [bookingList, setBookingList] = useState([]);

  let [bookingObj, setBookingObj] = useState({
    bookingId: 0,
    customerName: "",
    mobileNo: "",
    altMobNo: "",
    serviceId: 0,
    noOfMembers: 0,
    creationDate: "",
    isWithFood: true,
    bookingDate: "",
    createdByUserId: 185,
    totalAmount: 0,
    advanceAmount: 0,
    remainingPaidAmount: 0,
    isConfirmed: true,
    naration: "",
    discount: 0,
    isDeleted: false,
  });

  let [isLoader, setIsLoader] = useState(true);

  let [serviceList, setServiceList] = useState([]);

  let [isFormSubmitted, setisFormSubmitted] = useState(false);

  let [isShowForm, setisShowForm] = useState(false);
  
  let [isShowCard, setisShowCard] = useState(false);

  useEffect(() => {
    showAllBookingData();
    showAllServiceBookingData();
  }, [])


  const showAllBookingData = () => {
    getAllBooking().then((data) => {
      setBookingList(data);
      setIsLoader(false);
    })
  }

  const showAllServiceBookingData = () => {
    getServiceListBooking().then((data) => {
      setServiceList(data);
      setIsLoader(false);
    })
  }

  const addAllBookingData = () => {
    setisFormSubmitted(true);
    saveBooking(bookingObj).then((data) => {
      if (data.result) {
        toast.success("Booking Added Successfully");
        showAllBookingData();
      } else {
        alert(data.message);
      }
    })
  };

  const changeFormValueBooking = (event, key) => {
    setBookingObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const changeCheckBoxValueFoodBooking = (event) => {
    setBookingObj((prevObj) => ({
      ...prevObj,
      isWithFood: event.target.checked,
    }));
  };

  const changeCheckBoxValueConfirmedBooking = (event) => {
    setBookingObj((prevObj) => ({
      ...prevObj,
      isConfirmed: event.target.checked,
    }));
  };


  const onResetBooking = () => {
    setBookingObj((prevObj) => ({
      ...prevObj,
      bookingId: 0,
      customerName: "",
      mobileNo: "",
      altMobNo: "",
      serviceId: 0,
      noOfMembers: 0,
      creationDate: "",
      isWithFood: true,
      bookingDate: "",
      createdByUserId: 0,
      totalAmount: 0,
      advanceAmount: 0,
      remainingPaidAmount: 0,
      isConfirmed: true,
      naration: "",
      discount: 0,
      isDeleted: true,
    }));
  };

  const editAllBookingData = (bookingId) => {
    setisShowForm(true);
    onEditBooking(bookingId).then((data) => {
      setBookingObj(data);
    });
  };


  const deleteAllBookingData = (bookingId) => {
    deleteBooking(bookingId).then((data) => {
      if (data.result) {
        toast.success("Booking Deleted Successfully");
        showAllBookingData();
      } else {
        alert(data.message);
      }
    });
  };

  const updateAllBookingData = () => {
    updateBooking(bookingObj).then((data) => {
      if (data.result) {
        toast.success("Booking Updated Successfully");
        showAllBookingData();
      } else {
        alert(data.message);
      }
    })
  }

  const showForm = () => {
    setisShowForm(true);
}

const showCard = () => {
    setisShowCard(true);
}

const closeForm = () => {
    setisShowForm(false);
}

const showTable = () => {
    setisShowCard(false);
}

  return (
    <div>
    <div className='container-fluid mt-2'>
                <div className='row'>
                    <div className='col-12 mb-2 text-end'>
                        <button className='btn btn-danger mb-2' onClick={showForm}>Add Data</button>
                    </div>
                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-6'>
                                        <strong className='text-white text-start'>Booking List</strong>
                                    </div>
                                    <div className='col-6 text-end '>
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
                                !isShowCard && <div class="card-body">
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                              <th>S.No.</th>
                                              <th>Customer Name </th>
                                              <th>Mobile No </th>
                                              <th>Booking Date </th>
                                              <th>Service Name </th>
                                              <th> Edit </th>
                                              <th> Delete </th>
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
                                                    bookingList.map((item, index) => {
                                                        return (<tr>
                                                            <td> {index + 1} </td>
                                                            <td> {item.customerName} </td>
                                                            <td> {item.mobileNo} </td>
                                                            <td> {item.bookingDate} </td>
                                                            <td> {item.serviceName} </td>
                                                            <td><button className='btn btn-success btn-sm' onClick={() => { editAllBookingData(item.bookingId) }}>Edit</button></td>
                                                            <td><button className='btn btn-danger btn-sm' onClick={() => { deleteAllBookingData(item.bookingId) }}>Delete</button></td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            }
                            {
                                isShowCard && <div className='card-body'>
                                    <div className='row'>
                                        {
                                            bookingList.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'><strong>{item.customerName}</strong></div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Mobile No</strong> - {item.mobileNo}
                                                                        <br></br>
                                                                        <strong>Booking Date</strong> - {item.bookingDate}
                                                                        <br></br>
                                                                        <strong>Service Name</strong> - {item.serviceName}
                                                                        <br></br>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                        <button className='btn btn-danger btn-sm mx-1' onClick={() => { editAllBookingData(item.bookingId) }}>Edit</button>
                                                                    </div>
                                                                    <div className='col-2 text-end'>
                                                                        <button className='btn btn-primary btn-sm mx-1' onClick={() => { deleteAllBookingData(item.bookingId) }}>Delete</button>
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
                            isShowForm && <div class="card">
                                <div class="card-header bg-primary" >
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'>New Booking</strong>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <button className='btn p-0 btn-body' onClick={closeForm}>
                                                <i className="fa fa-times fa-lg text-white"></i>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Select Service</label>
                                            <select className='form-select' value={bookingObj.serviceId} onChange={(event) => { changeFormValueBooking(event, 'serviceId') }}>
                                              <option>Select Service</option>
                                                {
                                                    serviceList.map((item) => {
                                                        return (<option value={item.serviceId}>{item.serviceName}</option>)
                                                    })
                                                }
                                            </select>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.serviceId == '' && <span>Service is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Customer Name</label>
                                            <input type='text' className='form-control' value={bookingObj.customerName} onChange={(event) => { changeFormValueBooking(event, 'customerName') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.customerName == '' && <span>Customer Name is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Mobile No</label>
                                            <input type='text' className='form-control' value={bookingObj.mobileNo} onChange={(event) => { changeFormValueBooking(event, 'mobileNo') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.mobileNo == '' && <span>Mobile No is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Alt Mobile No</label>
                                            <input type='text' className='form-control' value={bookingObj.altMobNo} onChange={(event) => { changeFormValueBooking(event, 'altMobNo') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.altMobNo == '' && <span>Alt Mobile No is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>No Of Members</label>
                                            <input type='text' className='form-control' value={bookingObj.noOfMembers} onChange={(event) => { changeFormValueBooking(event, 'noOfMembers') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.noOfMembers == '' && <span>No Of Members is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                        <label>Creation Date</label>
                                            <input type='date' className='form-control' value={bookingObj.creationDate} onChange={(event) => { changeFormValueBooking(event, 'creationDate') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.creationDate == '' && <span>Date is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                        <label>Booking Date</label>
                                            <input type='date' className='form-control' value={bookingObj.bookingDate} onChange={(event) => { changeFormValueBooking(event, 'bookingDate') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.bookingDate == '' && <span>Booking Date is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Is With Food</label>
                                            <input type='checkbox' checked={bookingObj.isWithFood} onChange={(event) => { changeCheckBoxValueFoodBooking(event) }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.isWithFood == '' && <span>Value is Required </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Total Amount</label>
                                            <input type='text' className='form-control' value={bookingObj.totalAmount} onChange={(event) => { changeFormValueBooking(event, 'totalAmount') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.totalAmount == '' && <span>Total Amount is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Discount</label>
                                            <input type='text' className='form-control' value={bookingObj.discount} onChange={(event) => { changeFormValueBooking(event, 'discount') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.discount == '' && <span>Discount is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Advance Amount</label>
                                            <input type='text' className='form-control' value={bookingObj.advanceAmount} onChange={(event) => { changeFormValueBooking(event, 'advanceAmount') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.advanceAmount == '' && <span>Advance Amount is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                        <label>Is Confirmed</label>
                                            <input type='checkbox' checked={bookingObj.isConfirmed} onChange={(event) => { changeCheckBoxValueConfirmedBooking(event) }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.isConfirmed == '' && <span>Value is Required </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Remaining Paid Amount</label>
                                            <input type='text' className='form-control' value={bookingObj.remainingPaidAmount} onChange={(event) => { changeFormValueBooking(event, 'remainingPaidAmount') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.remainingPaidAmount == '' && <span>Remaining Paid Amount is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Naration</label>
                                            <textarea className='form-control' value={bookingObj.naration} onChange={(event) => { changeFormValueBooking(event, 'naration') }} />
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && bookingObj.naration == '' && <span>Naration is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' onClick={onResetBooking}>Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            {
                                                bookingObj.bookingId == 0 && <button className='btn btn-success btn-sm' onClick={addAllBookingData}>Save Data</button>
                                            }
                                            {
                                                bookingObj.bookingId !== 0 && <button className='btn btn-warning btn-sm' onClick={updateAllBookingData}>Update Data</button>
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
};

export default Booking;
