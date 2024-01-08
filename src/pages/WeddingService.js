
import React, { useEffect, useState } from 'react';
import {getWedding , addWeddingService, updateService, onDeleteWedding} from '../services/Api'
const WeddingService = () => {

    let [weddingList, setWeddingList] = useState([]);
    let [serviceobj, setServiceObj] = useState({
        "serviceId":0,
        "rate":0,
        "isActive": false,
        "isDeleted": false,
        "isPax": false,
        "message": "",
        "orderNo":0,
        "result": true,
        "serviceType": "",
        "name": ""
    })
    let [formsubmited, setFormSubmited] = useState(false);
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showAllWeddingrData();
    }, []);
    const showAllWeddingrData = () => {
        getWedding().then((data) => {
            setWeddingList(data)
            setIsLoader(false);
        })
    }
    const addAllWedding = () => {
        try {
            addWeddingService(serviceobj).then((data) => {
                debugger;
                if (data.result) {
                    debugger;
                    alert("Wedding Added Successfully");
                    showAllWeddingrData();
                } else {
                    alert(data.message);
                }
            })
        } catch (error) {
            alert(error.code)
        }
       
    }

 
    const changeFormValue = (event, key) => {
        setServiceObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const changeCheboxValue = (event, key) => {
        setServiceObj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }

    const onEdit = (item) => {
        try {
            setServiceObj(prevObj => ({
                ...prevObj, serviceId: item.serviceId,
                rate: item.rate,
                isActive: item.isActive,
                isDeleted: item.isDeleted,
                isPax: item.isPax,
                orderNo: item.orderNo,
                serviceType: item.serviceType,
                name: item.name
            }))
        } catch (error) {
            alert('Error Occuored');
        }

    }
    
    const updateAllWedding = () => {
        try {
            if (serviceobj.serviceId == '' &&
            serviceobj.rate == '' &&
            serviceobj.isActive == '' &&
            serviceobj.isDeleted == '' &&
            serviceobj.isPax == '' &&
            serviceobj.orderNo == '' &&
            serviceobj.serviceType == '' &&
            serviceobj.name == '') {
            alert("All Fields Are Required")
        }
        else {
            setFormSubmited(true);
        }
            updateService(serviceobj).then((data) => {
                if (data.result) {
                    alert("Update Successfully");
                    showAllWeddingrData();
                } else {
                    alert(data.message);
                }
            })
        } catch (error) {
            alert(error.code)
        }

    }

    const deleteAllWeddingData = (serviceobj) => {
        onDeleteWedding(serviceobj).then((data) => {
            if (data.result) {
                alert("Master Deleted Successfully");
                showAllWeddingrData();
            } else {
                alert(data.message);
            }
        })
    }




    
    const reset = () => {
        setFormSubmited(false);
        setServiceObj({
            ...serviceobj,
            "serviceId":0,
            "rate": '',
            "isActive": '',
            "isDeleted": '',
            "isPax": '',
            "message": "",
            "orderNo": '',
            "result": '',
            "serviceType": "",
            "name": ""

        });
    };

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                Wedding Service List
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Name</th>
                                            <th>Service Type</th>
                                            <th>Order No</th>
                                            <th>Rate</th>
                                            <th>Editr</th>
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
                                    {
                                        !isLoader && <tbody>
                                            {
                                                weddingList.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1} </td>
                                                        <td> {item.name}</td>
                                                        <td> {item.serviceType} </td>
                                                        <td> {item.orderNo} </td>
                                                        <td> {item.rate} </td>
                                                        <td><button className='btn btn-sm btn-success' onClick={() => { onEdit(item) }} > Edit</button> </td>
                                                        <td> <button className='btn btn-sm btn-danger' onClick={()=>{deleteAllWeddingData(item)}}> Delete</button></td>
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
                                Add Wedding Service
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'name') }} value={serviceobj.name} placeholder='Enter Service Name' />
                                        <div className='text-danger'>
                                            {
                                                //false/empty
                                                formsubmited && serviceobj.name == '' && <span>User Name Is Required </span>
                                            }
                                        </div>

                                    </div>
                                    <div className='col-6'>
                                        <input type='text' className='form-control  ' onChange={(event) => { changeFormValue(event, 'serviceType') }} value={serviceobj.serviceType} placeholder='Enter Service Type' required />
                                        <div className='text-danger'>
                                            {
                        
                                                formsubmited && serviceobj.serviceType == '' && <span>Service Type Is Required </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <input type='text' className='form-control  mt-2' onChange={(event) => { changeFormValue(event, 'orderNo') }} value={serviceobj.orderNo} placeholder='Enter Order No' />
                                        <div className='text-danger'>
                                            {
                                                
                                                formsubmited && serviceobj.orderNo == '' && <span>Order Number Is Required </span>
                                            }
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <input type='text' className='form-control  mt-2' onChange={(event) => { changeFormValue(event, 'rate') }} value={serviceobj.rate} placeholder='Enter Rate' />
                                        <div className='text-danger'>
                                            {
                                                
                                                formsubmited && serviceobj.rate == '' && <span>Rate Is Required </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-4'>
                                        <input type="checkbox" onChange={(event) => { changeCheboxValue(event, 'isActive' ) }}  checked={serviceobj.isActive}/>
                                        <label /> IsActive
                                    </div>
                                    <div className='col-4'>
                                        <input type="checkbox" onChange={(event) => { changeCheboxValue(event, 'isDeleted') }} checked={serviceobj.isDeleted}/>
                                        <label /> IsDeleted
                                    </div>
                                    <div className='col-4'>
                                        <input type="checkbox" onChange={(event) => { changeCheboxValue(event, 'isPax') }} checked={serviceobj.isPax}/>
                                        {/* checked={serviceobj.isPax} */}
                                        <label /> IsPax
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-6'>
                                        <button className='btn btn-secondary' onClick={reset}>Reset</button>&nbsp;
                                        {
                                            serviceobj.serviceId == 0 &&
                                             <button className='btn btn-success ' onClick={addAllWedding}>Add Service</button>

                                        }
                                        {
                                            serviceobj.serviceId !== 0 && <button className='btn btn-sm btn-warning  p-2' onClick={updateAllWedding}> Update Service</button>
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

export default WeddingService;