import axios from 'axios';
import * as Constant from "./Constant"


const ApiUrl = process.env.REACT_APP_API_KEY;

const showRoomData = async () => {
    try {
        const result = await axios.get(ApiUrl + Constant.GET_ALL_ROOM);
        return result.data
    }
    catch (error) {
        alert(error.code)
    }
}
const getFoodItemType = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_FOOD);
    return result.data

}
const addFoodItem = async (Obj) => {
    const result = await axios.post(ApiUrl + Constant.ADD_FOOD_ITEM, Obj)
    
     return result.data 
}

const getAllVisit = async (Obj) => {
    const result = await axios.post(ApiUrl + Constant.GET_ALL_VISIT,Obj);
    return result.data
    
}

const addVisitdata = async (Obj) => {
    const result = await axios.post(ApiUrl + Constant.ADD_VISIT_DATA,Obj)
    
    return result.data 
}

const getAllService = async()=> {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_SERVICES);
    return result.data

}

const getsingalvisit = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_SINGALVISIT, id) 
    return result.data
}






export {showRoomData ,getFoodItemType,addFoodItem,getAllVisit,addVisitdata,getAllService,getsingalvisit}