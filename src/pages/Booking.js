import React, { useEffect, useState } from "react";
import axios from "axios";
import  {getAllBooking, getServiceList, onEditBooking, saveBooking, deleteBooking, updateBooking} from '../services/Api';


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
    createdByUserId: 160,
    totalAmount: 0,
    advanceAmount: 0,
    remainingPaidAmount: 0,
    isConfirmed: true,
    naration: "",
    discount: 0,
    isDeleted: false,
  });

  let [isLoader, setIsLoader] = useState(true);

  let [isSaveLoader, setIsSaveLoader] = useState(false);

  let [serviceList, setServiceList] = useState([]);

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
    getServiceList().then((data) => {
      setServiceList(data);
      setIsLoader(false);
    })
  }
  
  const addAllBookingData = async () => {
    saveBooking(bookingObj).then((data) => {
      if (data.result) {
        alert("Booking Added Successfully");
        showAllBookingData();
      } else {
        alert(data.message);
      }
    })
  };

  const changeFormValue = (event, key) => {
    setBookingObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const changeCheckBoxValueFood = (event) => {
    setBookingObj((prevObj) => ({
      ...prevObj,
      isWithFood: event.target.checked,
    }));
  };

  const changeCheckBoxValueConfirmed = (event) => {
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
  onEditBooking(bookingId).then((data) => {
    setBookingObj(data); 
  });
};


const deleteAllBookingData = (bookingId) => {
  deleteBooking(bookingId).then((data) => {
    if (data.result) {
      alert("Booking Deleted Successfully");
      showAllBookingData();
    } else {
      alert(data.message);
    }
  });
};

const updateAllBookingData = () => {
  updateBooking(bookingObj).then((data) => {
    if (data.result) {
      alert("Booking Updated Successfully");
      showAllBookingData();
    } else {
      alert(data.message);
    }
  })
}

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div className="card text-center">
            <div className="card-header bg-primary text-white">
              Booking List
            </div>
            <div className="card-body">
              <table className="table table-bordered">
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
                {isLoader && (
                  <tbody>
                    <tr>
                      <td colSpan="9" className="text-center">
                      <td colSpan="9" className="text-center">
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
                      </td>
                    </tr>
                  </tbody>
                )}
                {!isLoader && (
                  <tbody>
                    {bookingList.map((item, index) => {
                      return (
                        <tr>
                          <td> {index + 1} </td>
                          <td> {item.customerName} </td>
                          <td> {item.mobileNo} </td>
                          <td> {item.bookingDate} </td>
                          <td> {item.serviceName} </td>
                          <td>
                            <button
                              className="btn btn-sm btn-success" onClick={() => {editAllBookingData(item.bookingId)}}                  
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm" onClick={() => {deleteAllBookingData(item.bookingId)}} 
                              
                            >
                              {" "}
                              Delete{" "}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card text-center">
            <div className="card-header bg-primary text-white">New Booking</div>
            <div className="card-body text-start">
              <div className="row mt-2">
                <div className="col-6">
                  <label>Select Service</label>
                  <select
                    className="form-select mt-2"
                    value={bookingObj.serviceId}
                    onChange={(event) => {
                      changeFormValue(event, "serviceId");
                    }}
                  >
                    <option value="">Select Service</option>
                    {serviceList.map((item) => {
                      return (
                        <option value={item.serviceId}>
                          {" "}
                          {item.serviceName}{" "}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-6">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    value={bookingObj.customerName}
                    onChange={(event) => {
                      changeFormValue(event, "customerName");
                    }}
                    className="form-control mt-2"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <label>Mobile No</label>
                  <input
                    type="text"
                    value={bookingObj.mobileNo}
                    onChange={(event) => {
                      changeFormValue(event, "mobileNo");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>Alt Mobile No</label>
                  <input
                    type="text"
                    value={bookingObj.altMobNo}
                    onChange={(event) => {
                      changeFormValue(event, "altMobNo");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>No Of Members</label>
                  <input
                    type="text"
                    value={bookingObj.noOfMembers}
                    onChange={(event) => {
                      changeFormValue(event, "noOfMembers");
                    }}
                    className="form-control mt-2"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <label>Creation Date</label>
                  <input
                    type="date"
                    value={bookingObj.creationDate}
                    onChange={(event) => {
                      changeFormValue(event, "creationDate");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>Booking Date</label>
                  <input
                    type="date"
                    value={bookingObj.bookingDate}
                    onChange={(event) => {
                      changeFormValue(event, "bookingDate");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>Is With Food</label>
                  <input
                    type="checkbox"
                    checked={bookingObj.isWithFood}
                    onChange={(event) => {
                      changeCheckBoxValueFood(event);
                    }}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <label>Total Amount</label>
                  <input
                    type="text"
                    value={bookingObj.totalAmount}
                    onChange={(event) => {
                      changeFormValue(event, "totalAmount");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>Discount</label>
                  <input
                    type="text"
                    value={bookingObj.discount}
                    onChange={(event) => {
                      changeFormValue(event, "discount");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>Advance Amount</label>
                  <input
                    type="text"
                    value={bookingObj.advanceAmount}
                    onChange={(event) => {
                      changeFormValue(event, "advanceAmount");
                    }}
                    className="form-control mt-2"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <label>Is Confirmed</label>
                  <input
                    type="checkbox"
                    checked={bookingObj.isConfirmed}
                    onChange={(event) => {
                      changeCheckBoxValueConfirmed(event);
                    }}
                  />
                </div>
                <div className="col-4">
                  <label>Remaining Paid Amount</label>
                  <input
                    type="text"
                    value={bookingObj.remainingPaidAmount}
                    onChange={(event) => {
                      changeFormValue(event, "remainingPaidAmount");
                    }}
                    className="form-control mt-2"
                  />
                </div>
                <div className="col-4">
                  <label>Naration</label>
                  <textarea
                    value={bookingObj.naration}
                    onChange={(event) => {
                      changeFormValue(event, "naration");
                    }}
                    className="form-control mt-2"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6 text-center">
                  <button className="btn btn-secondary mx-3" onClick={onResetBooking}>
                    Reset
                  </button>
                </div>
                <div className="col-6 text-center">
                  {bookingObj.bookingId === 0 && (
                    <button
                      className="btn btn-success px-3" onClick={addAllBookingData}
                      
                    >
                      Save Booking
                    </button>
                  )}
                  {bookingObj.bookingId !== 0 && (
                    <button
                      className="btn btn-warning px-3" onClick={updateAllBookingData}
                      
                    >
                      Update Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
