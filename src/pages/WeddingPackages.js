import React, { useEffect, useState } from "react";
import { getWeddingList,saveWedding,onDeleteWeddingPackages,updateWeddingPackagesResort } from "../services/Api";

import axios from "axios";



const WeddingPackages = () => {
  let [weddingList, setWeddingList] = useState([]);
  let [weddingObj, setWeddingObj] = useState({
    "weddingPackageId": 0,
    "packageName": "",
    "withFoodCost": 0,
    "withoutFoodCost": 0,
    "perPersonCost": 0,
    "rangeOfPeoples": 0,
    "description": "",
    "createdDate": "",
    "isDeleted": true
  });

  const reset = () => {
    setWeddingObj({
      weddingPackageId: 0,
      packageName: "",
      withFoodCost: 0,
      withoutFoodCost: 0,
      perPersonCost: 0,
      rangeOfPeoples: 0,
      description: "",
      createdDate: "",
      isDeleted: true,
    });
  };

  let [isLoader, setIsLoader] = useState(true);
  let [isSaveLoader, setisSaveLoader] = useState(false);

  useEffect(() => {
    ShowWeddingPackages();
  }, []);

 
  const ShowWeddingPackages =() =>{
    getWeddingList().then((data) => {
      setWeddingList(data);
      setIsLoader(false);
    });
  }
  const changeFormValue = (event, key) => {
    setWeddingObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const saveAllWedding = ()=>{
    saveWedding(weddingObj).then((data)=>{
         if(data.result){
          alert("Wedding Package Save");
          ShowWeddingPackages();
         }else {
          alert(data.message);
         }
    })
  }
  const saveAllUpdate = ()=>{
    updateWeddingPackagesResort(weddingObj).then((data)=>{
         if(data.result){
          alert("Update Package Save");
          ShowWeddingPackages();
         }else {
          alert(data.message);
         } 
    })
  }

 const deleteAllWedding =(weddingPackageId)=>{
  onDeleteWeddingPackages(weddingPackageId).then((data)=>{
    if(data.result){
      alert("Wedding Package Delete");
      ShowWeddingPackages();
     }else {
      alert(data.message);
     }
  })
 };

 const onEditWeddingPackages = (item) => {
  setWeddingObj((prevObj) => ({
    ...prevObj,
    weddingPackageId: item.weddingPackageId,

    packageName: item.packageName,
    withFoodCost: item.withFoodCost,
    withoutFoodCost: item.withoutFoodCost,
    perPersonCost: item.perPersonCost,
    rangeOfPeoples: item.rangeOfPeoples,
    description: item.description,
    createdDate: item.createdDate,
    isDeleted: item.isDeleted,
  }));
};


  return (
    <div>
      <div className="row  text-center mt-3">
        <div className="col-8  text-center">
          <div className="card  text-center">
            <div className="card-header bg-primary  text-center text-white">
              <strong>Wedding Packages</strong>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Package Name</th>
                    <th>With Food Cost </th>
                    <th>Without Food Cost</th>
                    <th>Per Person Cost</th>
                    <th>Range Of Peoples</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {isLoader && (
                  <tbody>
                    <tr>
                      <td colSpan={9} className="text-center">
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
                    {weddingList.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1} </td>
                          <td> {item.packageName} </td>
                          <td> {item.withFoodCost}</td>
                          <td>{item.withoutFoodCost} </td>
                          <td>{item.perPersonCost} </td>
                          <td>{item.rangeOfPeoples} </td>
                          <td>{item.createdDate} </td>
                          <td>
                          <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                onEditWeddingPackages(item);
                              }}
                            >
                              {" "}
                              Edit
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => {
                                deleteAllWedding(item.weddingPackageId);
                              }}>
                            
                              Delete
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
          <div className="card">
            <div className="card-header bg-primary text-white text-center"><strong>Wedding Packages</strong></div>
            <div className="card-body">
              <div className="row">
                {/* <div className="col-6">
                  <label> Packages Name</label>
                  <input
                    type="text"
                    value={weddingObj.packageName}
                    onChange={(event) => {
                      changeFormValue(event, "packageName");
                    }}
                    className="form-control"
                  />
                </div> */}
                <div className="col-6">
  <label> Packages Name</label>
  <select
    value={weddingObj.packageName}
    onChange={(event) => {
      changeFormValue(event, "packageName");
    }}
    className="form-select"
  >
   
    <option value="Packages">Packages</option>
   
    <option value="Premium">Premium</option>
    <option value="Platinum">Platinum</option>
    <option value="Gold">Gold</option>
    <option value="Silver">Silver</option>
    <option value="Standard">Standard</option>
    
  </select>
  
</div>



<div className="col-6">
                <label>With Food Cost</label>
                  <input
                    type="text"
                    value={weddingObj.withFoodCost}
                    onChange={(event) => {
                      changeFormValue(event, "withFoodCost");
                    }}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                <label>Without Food Cost</label>
                  <input
                    type="text"
                    value={weddingObj.withoutFoodCost}
                    onChange={(event) => {
                      changeFormValue(event, "withoutFoodCost");
                    }}
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                <label>Per Person Cost</label>
                  <input
                    type="text"
                    value={weddingObj.perPersonCost}
                    onChange={(event) => {
                      changeFormValue(event, "perPersonCost");
                    }}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                <label> Range Of Peoples</label>
                  <input
                    type="text"
                    value={weddingObj.rangeOfPeoples}
                    onChange={(event) => {
                      changeFormValue(event, "rangeOfPeoples");
                    }}
                    className="form-control"
                  />
                </div>
                <div className="col-4">
                <label>Date</label>
                  <input
                    type="date"
                    value={weddingObj.createdDate}
                    onChange={(event) => {
                      changeFormValue(event, "createdDate");
                    }}
                    className="form-control"
                  />
                </div>
              
             
             
            
              <div className="row pt-2">
                <div className="col-6 text-center">
                <button className="btn btn-sm btn-success" onClick={reset}>
                    {" "}
                    Reset
                  </button>
                </div>
                <div className="col-6 text-center">
                  {weddingObj.weddingPackageId == 0 && (
                    <button
                      className="btn  btn-success"
                      onClick={saveAllWedding}
                    >
                      {isSaveLoader && (
                        <span class="spinner-border spinner-border-sm"></span>
                      )}
                      Save 
                    </button>
                  )}
                  {weddingObj.weddingPackageId!== 0 && (
                    <button
                    className="btn btn-sm btn-danger"
                    onClick={saveAllUpdate}
                  >
                    {" "}
                    Update
                  </button>
                  )}
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

export default WeddingPackages;
