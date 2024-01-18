import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getAllOffer, saveOffer, onDeleteOffer, updateOffer } from "../services/Api";

const Offer = () => {
  let [offerData, setOfferData] = useState([]);

  let [isLoader, setIsLoader] = useState(true);

  let [offerObj, setOfferObj] = useState({
    offerId: 0,
    offerName: "",
    offerDetails: "",
    createdDate: "",
    isActive: true,
    amount: 0,
  });

  let [isFormSubmitted, setisFormSubmitted] = useState(false);

  let [isShowForm, setisShowForm] = useState(false);

  let [isShowCard, setisShowCard] = useState(false);


  useEffect(() => {
    showAllOfferData();
  }, []);

  const showAllOfferData = () => {
    getAllOffer().then((data) => {
      setOfferData(data);
      setIsLoader(false);
    });
  }

  const onResetOffer = () => {
    setOfferObj((prevObj) => ({
      ...prevObj,
      offerId: 0,
      offerName: "",
      offerDetails: "",
      createdDate: "",
      isActive: "",
      amount: 0,
    }));
  };

  const getFormValuesOffer = (event, key) => {
    setOfferObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const getCheckBoxValueOffer = (event) => {
    setOfferObj((prevObj) => ({ ...prevObj, isActive: event.target.checked }));
  };

  const addAllOfferData = () => {
    setisFormSubmitted(true);
    saveOffer(offerObj).then((data) => {
      if (data.result) {
        toast.success("Offer Added Successfully");
        showAllOfferData();
      } else {
        alert(data.message);
      }
    })
  }

  const updateAllOfferData = () => {
    updateOffer(offerObj).then((data) => {
      if (data.result) {
        toast.success("Offer Updated Successfully");
        showAllOfferData();
      } else {
        alert(data.message);
      }
    })
  }

  const deleteAllOfferData = (offerObj) => {
    onDeleteOffer(offerObj).then((data) => {
      if (data.result) {
        toast.success("Offer Deleted Successfully");
        showAllOfferData();
      } else {
        alert(data.message);
      }
    })
  }

  const onEditOffer = (item) => {
    setisShowForm(true);
    setOfferObj((prevObj) => ({
      ...prevObj,
      offerId: item.offerId,
      offerName: item.offerName,
      offerDetails: item.offerDetails,
      createdDate: item.createdDate,
      isActive: item.isActive,
      amount: item.amount,
    }));
  };

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
                                        <strong className='text-white text-start'>All Offers</strong>
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
                                              <th> SNo. </th>
                                              <th> Offer Name </th>
                                              <th> Details </th>
                                              <th> Created-Date </th>
                                              <th> Amount </th>
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
                                                    offerData.map((item, index) => {
                                                        return (<tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.offerName}</td>
                                                            <td>{item.offerDetails}</td>
                                                            <td>{item.createdDate}</td>
                                                            <td>{item.amount}</td>
                                                            <td><button className='btn btn-success btn-sm' onClick={() => {onEditOffer(item)}}>Edit</button></td>
                                                            <td><button className='btn btn-danger btn-sm' onClick={() => {deleteAllOfferData(item)}} >Delete</button></td>
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
                                            offerData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'><strong>{item.offerName}</strong></div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Offer Details</strong> - {item.offerDetails}
                                                                        <br></br>
                                                                        <strong>Created Date</strong> - {item.createdDate}
                                                                        <br></br>
                                                                        <strong>Amount</strong> - {item.amount}
                                                                        <br></br>
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                        <button className='btn btn-danger btn-sm mx-1' onClick={() => { onEditOffer(item) }}>Edit</button>
                                                                    </div>
                                                                    <div className='col-2 text-end'>
                                                                        <button className='btn btn-primary btn-sm mx-1' onClick={() => { deleteAllOfferData(item) }}>Delete</button>
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
                                            <strong className='text-white'>New Offer</strong>
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
                                            <label>Offer Name :</label>
                                            <input type="text" value={offerObj.offerName} onChange={(event) => {getFormValuesOffer(event, "offerName");}} className="form-control" />
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && offerObj.offerName == '' && <span>Offer Name is required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                        <label>Details :</label>
                                        <input type="text" value={offerObj.offerDetails} onChange={(event) => {getFormValuesOffer(event, "offerDetails")}} className="form-control" />
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && offerObj.offerDetails == '' && <span>Offer Detail is required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                        <label>Created Date :</label>
                                        <input type="date" value={offerObj.createdDate} onChange={(event) => {getFormValuesOffer(event, "createdDate")}} className="form-control"/>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && offerObj.createdDate == '' && <span>Created Date is required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                        <label>Amount :</label>
                                        <input type="text" value={offerObj.amount} onChange={(event) => {getFormValuesOffer(event, "amount")}} className="form-control" />
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && offerObj.amount == '' && <span>Amount is required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                        <label>Is-Active:</label>
                                        <input type="checkbox" checked={offerObj.isActive} onChange={(event) => {getCheckBoxValueOffer(event, "isActive")}} className="form-check-input" />
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && offerObj.isActive == '' && <span> select Is-Active </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' onClick={onResetOffer}>Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            {
                                                offerObj.offerId == 0 && <button className='btn btn-success btn-sm' onClick={addAllOfferData}>Save Data</button>
                                            }
                                            {
                                                offerObj.offerId !== 0 && <button className='btn btn-warning btn-sm' onClick={updateAllOfferData}>Update Data</button>
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

export default Offer;
