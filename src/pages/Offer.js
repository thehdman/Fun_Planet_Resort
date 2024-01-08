import React, { useEffect, useState } from "react";

import { getAllOffer, saveOffer, onDelete, updateOffer } from "../services/Api";

const Offer = () => {

  let [offerData, setOfferData] = useState([]);

  let [isLoader, setIsLoader] = useState(true);

  let [isSaveLoader, setIsSaveLoader] = useState(false);

  let [offerObj, setOfferObj] = useState({
    offerId: 0,
    offerName: "",
    offerDetails: "",
    createdDate: "",
    isActive: true,
    amount: 0,
  });

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



  const getFormValues = (event, key) => {
    setOfferObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const getCheckBoxValue = (event) => {
    setOfferObj((prevObj) => ({ ...prevObj, isActive: event.target.checked }));
  };

  const addAllOfferData = () => {
    saveOffer(offerObj).then((data) => {
      if (data.result) {
        alert("Offer Added Successfully");
        showAllOfferData();
      } else {
        alert(data.message);
      }
    })
  }

  const updateAllOfferData = () => {
    updateOffer(offerObj).then((data) => {
      if (data.result) {
        alert("Offer Updated Successfully");
        showAllOfferData();
      } else {
        alert(data.message);
      }
    })
  }

  const deleteAllOfferData = (offerObj) => {
    onDelete(offerObj).then((data) => {
      if (data.result) {
        alert("Offer Deleted Successfully");
        showAllOfferData();
      } else {
        alert(data.message);
      }
    })
  }

  const onEdit = (item) => {
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


  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div className="card text-center">
            <div className="card-header bg-primary text-white">All Offers</div>
            <div className="card-body">
              <table className="table table-bordered">
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
                {isLoader && (
                  <tbody>
                    <tr>
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
                    </tr>
                  </tbody>
                )}
                {!isLoader && (
                  <tbody>
                    {offerData.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.offerName}</td>
                          <td>{item.offerDetails}</td>
                          <td>{item.createdDate}</td>
                          <td>{item.amount}</td>
                           <td>
                            {" "}
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => {
                                onEdit(item);
                              }}
                            >
                              {" "}
                              Edit{" "}
                            </button>{" "}
                          </td>
                          <td>
                            {" "}
                            <button
                              className="btn btn-sm btn-danger" onClick={() => {deleteAllOfferData(item)}}  
                            >
                              {" "}
                              Delete{" "}
                            </button>{" "}
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
            <div className="card-header bg-primary text-white">New Offer</div>
            <div className="card-body text-start">
              <div className="row mt-2">
                <div className="col-6 ">
                  <label>Offer Name :</label>
                  <input
                    type="text"
                    value={offerObj.offerName}
                    onChange={(event) => {
                      getFormValues(event, "offerName");
                    }}
                    className="form-control mt-1"
                  ></input>
                </div>
                <div className="col-6">
                  <label>Details :</label>
                  <input
                    type="text"
                    value={offerObj.offerDetails}
                    onChange={(event) => {
                      getFormValues(event, "offerDetails");
                    }}
                    className="form-control mt-1"
                  ></input>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <label>Date :</label>
                  <input
                    type="date"
                    value={offerObj.createdDate}
                    onChange={(event) => {
                      getFormValues(event, "createdDate");
                    }}
                    className="form-control mt-1"
                  ></input>
                </div>
                <div className="col-6">
                  <label>Amount :</label>
                  <input
                    type="text"
                    value={offerObj.amount}
                    onChange={(event) => {
                      getFormValues(event, "amount");
                    }}
                    className="form-control mt-1"
                  ></input>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <label>Is-Active:</label>
                  <input
                    type="checkbox"
                    checked={offerObj.isActive}
                    onChange={(event) => {
                      getCheckBoxValue(event, "isActive");
                    }}
                    className="form-check-input mt-1"
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <button className="btn btn-secondary mx-5" onClick={onResetOffer}>
                    Reset
                  </button>
                  {offerObj.offerId === 0 && (
                    <button
                      className="btn btn-success px-3" onClick={addAllOfferData}                   
                    >
                      Save Offer
                    </button>
                  )}
                  {offerObj.offerId !== 0 && (
                    <button
                      className="btn btn-warning px-3" onClick={updateAllOfferData}
                    >
                      Update Offer
                    </button>
                  )}
                </div>
                <div className="col-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
