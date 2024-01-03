import React, { useEffect, useState } from 'react';
import { getMasterList } from '../../services/Api'

const Master = () => {
    
    let [masterdata, setMastereData] = useState([]); 
    
    useEffect(() => {
        getMasterList().then((data) => {
            setMastereData(data);
        })
    }, []);
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-8'>
                    <div className='card'>
                            <div className='card-header bg-success'>
                                Master List
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>status</th>
                                            <th>statusFor</th>
                                            <th>Edit</th>
                                            <th>Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            masterdata.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1} </td>
                                                    <td> {item.status} </td>
                                                    <td> {item.statusFor}</td>
                                                    <td><button className='btn btn-sm btn-primary' > Edit</button> </td>
                                                        <td> <button className='btn btn-sm btn-danger'> Delete</button></td>
                                                </tr>)
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Master;
