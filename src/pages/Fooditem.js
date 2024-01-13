
import React, { useEffect, useState } from 'react';
import { getFoodItemType, addFoodItem } from "../services/Api"

const Fooditem = () => {

    let [foodType, setFoodType] = useState([]);
    let [foodItemObj, setFoodItemObj] = useState({
        "foodItemTypeId": 0,
        "foodItemName": "",
        "isDeleted": false
    })

    useEffect(() => {

        showFoodItemType();

    }, []);

    const showFoodItemType = () => {
        getFoodItemType().then((data) => {
            setFoodType(data);

        })

    }
    const addAllFoodData = () => {
        addFoodItem(foodItemObj).then((data) => {
            debugger;
            if (data.result) {
                debugger;
                alert('Food Added Successfully')
            
                showFoodItemType();
                
            
            }
            else {
                alert(data.message)
            }

        })

    }





    const changeFormValue = (event, key) => {
        setFoodItemObj(preObj => ({ ...preObj, [key]: event.target.value }))
    }






    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <strong className='text-white'>Food Item Type List</strong>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Item Name</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            foodType.map((item, index) => {
                                                return (<tr>
                                                    <td>{index + 1} </td>
                                                    <td> {item.foodItemName} </td>

                                                </tr>)
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <strong className='text-white'>Add Food Item Type</strong>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Item Name</label>
                                        <input type='text' className='form-control' placeholder='Add Food Type'  value={foodItemObj.foodItemName} onChange={(event) => changeFormValue(event, 'foodItemName')} />

                                    </div>
                                </div>

                                <div className='row pt-2'>
                                    <div className='col'>
                                        <button className='btn btn-success btn-sm' onClick={addAllFoodData}>Add</button>
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

export default Fooditem;