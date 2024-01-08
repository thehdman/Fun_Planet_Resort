import React, { useEffect, useState } from 'react';
import { getMasterList, addMaster, onDelete, updateMaster } from '../services/Api'
const Master = () => {

    let [masterdata, setMastereData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [formsubmited, setFormSubmited] = useState(false);
    let [masterobj, setMasterObj] = useState({
        "statusId": 0,
        "statusFor": "",
        "status": "",
        "message": "",
        "result": true
    })

    useEffect(() => {
        showAllMasterData();
    }, []);

    const showAllMasterData = () => {
        getMasterList().then((data) => {
            setMastereData(data)
            setIsLoader(false);
        })
    }

    const changeFormValue = (event, key) => {
        setMasterObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const addAllMasterData = () => {
        try {
            setFormSubmited(true)
            if(masterobj.statusFor != '' && masterobj.status != '') { 
                addMaster(masterobj).then((data) => {
                    if (data.result) {
                        alert("Master Added Successfully");
                        showAllMasterData();
                    } else {
                        alert(data.message);
                    }
                })
            }
           
        } catch (error) {
            alert(error.code)
        }
       
    }
    const onEdit = (item) => {
        try {
            setMasterObj(prevObj => ({
                ...prevObj, statusId: item.statusId,
                statusFor: item.statusFor,
                status: item.status,
                message: item.message,
                result: item.result,
            }))
        } catch (error) {
            alert('Error Occuored');
        }
    }

    const updateAllMasterData = () => {
        try {
            if (masterobj.statusId == '' &&
                masterobj.statusFor == '' &&
                masterobj.status == ''
            ) {
                alert("All Fields Are Required")
            }
            else {
                setFormSubmited(true);
            }
            updateMaster(masterobj).then((data) => {
                if (data.result) {
                    alert("Update Master Successfully");
                    showAllMasterData();
                } else {
                    alert(data.message);
                }
            })
        } catch (error) {
            alert(error.code)
        }

    }

    const deleteAllMasterData = (masterobj) => {
        onDelete(masterobj).then((data) => {
            if (data.result) {
                alert("Master Deleted Successfully");
                showAllMasterData();
            } else {
                alert(data.message);
            }
        })
    }

    const reset = () => {
        setFormSubmited(false);
        setMasterObj({
            "statusId": 0,
            "statusFor": "",
            "status": "",
            "message": "",
            "result": true
        })
    }
    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <strong className='text-white'> Master List</strong>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Status For</th>
                                            <th>Status</th>
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
                                    {!isLoader && <tbody>
                                        {
                                            masterdata.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1} </td>
                                                    <td> {item.statusFor}</td>
                                                    <td> {item.status} </td>
                                                    <td><button className='btn btn-sm btn-success' onClick={() => { onEdit(item) }}> Edit</button> </td>
                                                    <td> <button className='btn btn-sm btn-danger' onClick={() => { deleteAllMasterData(item) }}> Delete</button></td>
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
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <strong className='text-white'>Add  Master</strong>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label><b>Status For</b></label>
                                        <input type='text' className='form-control' placeholder='Enter Status For' value={masterobj.statusFor} onChange={(event) => { changeFormValue(event, 'statusFor') }} />
                                        <div className='text-danger'>
                                            {
                                                //false/empty
                                                formsubmited && masterobj.statusFor == '' && <span>Status For Is Required </span>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <label><b>Status</b></label>
                                        <input type='text' className='form-control' placeholder='Enter Status' value={masterobj.status} onChange={(event) => { changeFormValue(event, 'status') }} />
                                        <div className='text-danger'>
                                            {

                                                formsubmited && masterobj.status == '' && <span>Status Is Required </span>
                                            }
                                        </div>
                                    </div>
                                </div>


                                <div className='row mt-2'>
                                    <div className='col'>
                                        <button className='btn btn-secondary' onClick={reset}>Reset</button>&nbsp;
                                        {
                                            masterobj.statusId == 0 && <button className='btn btn-success' onClick={addAllMasterData}>Add Master</button>
                                        }
                                        {
                                            masterobj.statusId !== 0 && <button className='btn  btn-warning  p-2' onClick={updateAllMasterData} > Update Master</button>
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

export default Master;