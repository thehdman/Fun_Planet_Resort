import axios from 'axios';
import { getShowEnquiry, getUserList, getReferenceList, getSubjectList, getEnquiryStatusList, saveEnquiry, onEditEnquiry, deleteenquiry, updateenquiry } from '../services/Api';
import React, { useEffect, useState } from 'react';

const Enquiry = () => {

    let [showEnquiryArray, setshowEnquiryArray] = useState([]);

    const [showEnquiryObj, setShowEnquiryObj] = useState({
        "name": "",
        "userId": null,
        "contactNo": "",
        "statusId": null,
        "masterId": null,
        "referenceId": null,
        "frDate": null,
        "toDate": null,
        "pageNumber": 0,
        "pageSize": 10
    });

    let [enquiryObj, setEnquiryObj] = useState({
        "enquiryId": 0,
        "name": "",
        "subject": "",
        "details": "",
        "enquiryStatus": "",
        "contactNo": "",
        "enquiryDate": new Date(),
        "referenceId": 0,
        "message": "",
        "reference": "",
        "statusId": 0,
        "result": true,
        "emailId": "",
        "feedBack": "",
        "altContactNo": "",
        "userId": 0,
        "userName": "",
        "customerId": 0,
        "otherRef": "",
        "masterId": 0,
        "followUpDate": ""
    });

    const [deleteenqobj, setenqobj] = useState({
        "enquiryId": 0,
        "name": "",
        "subject": "",
        "details": "",
        "enquiryStatus": "",
        "contactNo": "",
        "enquiryDate": "",
        "referenceId": 0,
        "message": "",
        "reference": "",
        "statusId": 0,
        "result": true,
        "emailId": "",
        "feedBack": "",
        "altContactNo": "",
        "userId": 0,
        "userName": "",
        "customerId": 0,
        "otherRef": "",
        "masterId": 0,
        "followUpDate": ""
    })


    useEffect(() => {

        // getShowEnquiry();
        getAllEnquiryData();
        getAllUserListData();
        getSubjectListData();
        getAllReferenceData();
        getEnquiryStatusListData();
    }, []);


    let [userList, setUserList] = useState([]);//foreign key variable

    let [referenceList, setReferenceList] = useState([]);//foreign key variable

    let [subjectList, setSubjectList] = useState([]);//foreign key variable

    let [enquiryStatusList, setEnquiryStatusList] = useState([]);//foreign key variable

    const getFormValues = (event, key) => {
        setEnquiryObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    };



    const getAllEnquiryData = () => {
        getShowEnquiry(showEnquiryObj).then((data) => {
            setshowEnquiryArray(data)
        })
    }

    const getAllUserListData = () => {
        getUserList().then((data) => {
            setUserList(data);
        })
    }

    const getAllReferenceData = () => {
        getReferenceList().then((data) => {
            setReferenceList(data)
        })

    }

    const getSubjectListData = () => {
        getSubjectList().then((data) => {
            setSubjectList(data)
        })
    }

    const getEnquiryStatusListData = () => {
        getEnquiryStatusList().then((data) => {
            setEnquiryStatusList(data);
        })
    }

    const SaveAllEnquiry = () => {
        saveEnquiry(enquiryObj).then((data) => {
            if (data.result) {
                alert('added!!');
                getAllUserListData();

            } else {
                alert(data.message);
            }
        })
    }


    // const EditEnquiry = (id) =>{
    //     debugger;
    //     onEditEnquiry(id).then((data)=>{
    //         if (data.result)
    //        {
    //         setEnquiryObj(data)
    //        }else{
    //         alert(data.message)
    //        }

    //     })
    // }


    // const EditEnquiry =(enquiryId)=>{
    //     onEdit(enquiryId).then((data)=>{
    //       if(data.result){
    //         alert("Wedding Package Delete");
    //         getAllEnquiryData();

    //        }

    //     })
    //    };

    const deleteEnquirydata = (deleteenqobj) => {
        deleteenquiry(deleteenqobj).then((data) => {
            if (data.result) {
                alert('Enquiry Deleted');
                getAllUserListData();
            } else {
                alert(data.message);
            }
        })
    }

    const updateEnquiryData = (enquiryObj) => {
        updateenquiry(enquiryObj).then((data) => {
            if (data.result) {
                alert('Updated Deleted');
                getAllUserListData();
            } else {
                alert(data.message);
            }
        })
    }



    const resetEnquiry = () => {
        setEnquiryObj({
            "enquiryId": 0,
            "name": "",
            "subject": "",
            "details": "",
            "enquiryStatus": "",
            "contactNo": "",
            "enquiryDate": new Date(),
            "referenceId": 0,
            "message": "",
            "reference": "",
            "statusId": 0,
            "result": true,
            "emailId": "",
            "feedBack": "",
            "altContactNo": "",
            "userId": 0,
            "userName": "",
            "customerId": 0,
            "otherRef": "",
            "masterId": 0,
            "followUpDate": ""
        })
    }


    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <strong style={{ textAlign: 'center', color: 'white' }}>Enquiry List</strong></div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SNo</th>
                                            <th>Name</th>
                                            <th>ContactNo</th>
                                            <th>EnquiryDate</th>
                                            <th>EmailId</th>

                                            <th>FollowUpDate</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            showEnquiryArray.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td>{item.enquiryDate}</td>
                                                    <td>{item.emailId}</td>

                                                    <td>{item.followUpDate}</td>
                                                    <td><button className='btn btn-sm btn-success' >Edit</button></td>
                                                    <td><button className='btn btn-sm btn-danger' onClick={() => { deleteEnquirydata(item) }}>Delete</button></td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>


                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <strong style={{ textAlign: 'center', color: 'white' }}>New Enquiry</strong>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <label>Select User</label>
                                        <select className="form-select mt-2" value={enquiryObj.userId} onChange={(event) => { getFormValues(event, "userId"); }}>
                                            <option value="">Select User</option>
                                            {userList.map((item) => {
                                                return (
                                                    <option value={item.userId}> {item.userName} </option>
                                                );
                                            })}
                                        </select>


                                    </div>

                                    <div className="col-6">
                                        <label>Select Reference</label>
                                        <select className="form-select mt-2" value={enquiryObj.referenceId} onChange={(event) => {
                                            getFormValues(event, "referenceId");
                                        }}
                                        >
                                            <option value="">Select Reference</option>
                                            {referenceList.map((item) => {
                                                return (
                                                    <option value={item.statusId}> {item.status} </option>
                                                );
                                            })}
                                        </select>

                                    </div>
                                </div>
                                <div className="row">


                                    <div className="col-6">
                                        <label>Select Subject</label>
                                        <select
                                            className="form-select mt-2"
                                            value={enquiryObj.masterId}
                                            onChange={(event) => {
                                                getFormValues(event, "masterId");
                                            }}
                                        >
                                            <option value="">Select Subject</option>
                                            {subjectList.map((item) => {
                                                return (
                                                    <option value={item.statusId}> {item.status} </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label>Select Enquiry Status</label>
                                        <select
                                            className="form-select mt-2"
                                            value={enquiryObj.statusId}
                                            onChange={(event) => {
                                                getFormValues(event, "statusId");
                                            }}
                                        >
                                            <option value="">Select Enquiry Status</option>
                                            {enquiryStatusList.map((item) => {
                                                return (
                                                    <option value={item.statusId}> {item.status} </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>


                                <div className="row mt-2">
                                    <div className="col-6">
                                        <label>Name </label>
                                        <input
                                            type="text"
                                            value={enquiryObj.name}
                                            onChange={(event) => {
                                                getFormValues(event, "name");
                                            }}
                                            className="form-control   mt-1"

                                        ></input>
                                    </div>
                                    <div className="col-6">
                                        <label>Contact No </label>
                                        <input
                                            type="text"
                                            value={enquiryObj.contactNo}
                                            onChange={(event) => {
                                                getFormValues(event, "contactNo");
                                            }}
                                            className="form-control  text-white mt-1"

                                        ></input>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <label>Details </label>
                                        <textarea
                                            type='text'
                                            value={enquiryObj.details}
                                            onChange={(event) => {
                                                getFormValues(event, "details");
                                            }}
                                            className="form-control  text-white mt-1"
                                        ></textarea>
                                    </div>

                                    <div className="col-6">
                                        <label>EnquiryDate </label>
                                        <input
                                            type="date"
                                            value={enquiryObj.enquiryDate}
                                            onChange={(event) => {
                                                getFormValues(event, "enquiryDate");
                                            }}
                                            className="form-control  text-white mt-1"
                                        ></input>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <label>EmailId </label>
                                        <input
                                            type="text"
                                            value={enquiryObj.emailId}
                                            onChange={(event) => {
                                                getFormValues(event, "emailId");
                                            }}
                                            className="form-control  text-white mt-1"
                                        ></input>
                                    </div>
                                    <div className="col-6">
                                        <label>FeedBack </label>
                                        <input
                                            type="text"
                                            value={enquiryObj.feedBack}
                                            onChange={(event) => {
                                                getFormValues(event, "feedBack");
                                            }}
                                            className="form-control  text-white mt-1"
                                        ></input>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <label>AltContact No </label>
                                        <input
                                            type="text"
                                            value={enquiryObj.altContactNo}
                                            onChange={(event) => {
                                                getFormValues(event, "altContactNo");
                                            }}
                                            className="form-control  text-white mt-1"
                                        ></input>

                                    </div>
                                    <div className="col-6">
                                        <label>FollowUpDate </label>
                                        <input
                                            type="date"
                                            value={enquiryObj.followUpDate}
                                            onChange={(event) => {
                                                getFormValues(event, "followUpDate");
                                            }}
                                            className="form-control  text-white mt-1"
                                        ></input>
                                    </div>


                                    <div className="row pt-3">

                                        <div className="col-3">
                                            <button className="btn btn-secondary px-3" onClick={resetEnquiry} >Reset
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            {
                                                enquiryObj.enquiryId == 0 && <button className="btn btn-success px-3" onClick={SaveAllEnquiry}>
                                                    Save Enquiry
                                                </button>
                                            }

                                        </div>

                                        <div className='col-3'>
                                            {
                                                enquiryObj.enquiryId !== 0 && <button className='btn btn-warning' onClick={updateEnquiryData} >Update</button>
                                            }


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

export default Enquiry;