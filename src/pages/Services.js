import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showServicesData, addServicesData, DeleteService} from '../services/Api';

const Services = () => {



    let [serviceData, setServiceData] = useState([]);

    let [serviceObj, setServicesObj] = useState({
        "serviceId": 0,
        "serviceName": "",
        "taxableAmount": 0,
        "cgst": 0,
        "sgst": 0,
        "isActive": true,
        "isDeleted": true,
        "message": "",
        "result": true
    })
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        showAllServiceData();
    }, []);

    const showAllServiceData = () => {
        showServicesData().then((data) => {
            setIsLoader(false);
            setServiceData(data);
        })
    }

    const addAllServicesData = () => {
        addServicesData(serviceObj).then((data) => {
            if (data.result) {
                alert("Services Added Successfully");
                showAllServiceData();
            } else {
                alert(data.message);
            }
        })
    }

    const getServicesObj = (event, key) => {
        setServicesObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const editService = (item) => {
        
            setServicesObj(prevObj => ({
                ...prevObj, serviceId: item.serviceId,
                serviceName: item.serviceName,
                taxableAmount: item.taxableAmount,
                cgst: item.cgst,
                sgst: item.sgst,
            }))
    
        
    
    }



        const updateService = async () => {
            addServicesData(serviceObj).then((data) => {
                if (data.result) {
                    alert("Services Updated Successfully");
                    showAllServiceData();
                } else {
                    alert(data.message);
                }
            }) 
        }
        const DeleteAllService = () => {
            DeleteService().then((data) => {
                if(data.result){
                    alert('Service Deleted Successfully');
                    showAllServiceData();
                }
                else{
                    alert(data.message)
                }
            })
        }
        
        const resetServicesData = () => {
            setServicesObj({
                "serviceId": 0,
                "serviceName": "",
                "taxableAmount": 0,
                "cgst": 0,
                "sgst": 0,
                "isActive": true,
                "isDeleted": true,
                "message": "Saved Successfully",
                "result": true
            })
        }

        return (
            <div>
                <div className='container-fluid mt-4'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='card'>
                                <div className='card-header bg-primary'>
                                    <strong className='text-white'>Service List</strong>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Service Name</th>
                                                <th>Taxable Amount</th>
                                                <th>CGST</th>
                                                <th>SGST</th>
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
                                        {
                                            !isLoader && <tbody>
                                                {
                                                    serviceData.map((item, index) => {
                                                        return (<tr>
                                                            <td>{index + 1} </td>
                                                            <td> {item.serviceName} </td>
                                                            <td> {item.taxableAmount}</td>
                                                            <td> {item.cgst}</td>
                                                            <td> {item.sgst}</td>
                                                            <td><button className='btn btn-sm btn-success' onClick= { editService} > Edit</button> </td>
                                                            <td> <button className='btn btn-sm btn-danger'onClick={DeleteAllService} > Delete</button></td>
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
                                    <strong className='text-white'> Add Services</strong>
                                </div>
                                <div className='card-body'>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Service Name</label>
                                            <input type='text' className='form-control' onChange={(event) => { getServicesObj(event, 'serviceName') }} value={serviceObj.serviceName} placeholder='Enter Service Name' />
                                        </div>
                                        <div className='col-6'>
                                            <label>Taxable Amount</label>
                                            <input type='text' className='form-control' onChange={(event) => { getServicesObj(event, 'taxableAmount') }} placeholder='Enter Taxable Amount' />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>CGST</label>
                                            <input type='text' className='form-control' onChange={(event) => { getServicesObj(event, 'cgst') }} value={serviceObj.cgst} placeholder='Enter cgst' />
                                        </div>
                                        <div className='col-6'>
                                            <label>SGST</label>
                                            <input type='text' className='form-control' onChange={(event) => { getServicesObj(event, 'sgst') }} value={serviceObj.sgst} placeholder='Enter sgst' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' >Reset</button>&nbsp;
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            {
                                               serviceObj.serviceId == 0 && <button className='btn btn-success btn-sm' onClick={addAllServicesData}>Add Services</button>
                                            }
                                            {
                                                serviceObj.serviceId !== 0 &&<button className='btn btn-warning btn-sm'onClick={updateService} > Update Service</button>
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


    export default Services;
