import axios from 'axios';
import * as Constant from "./Constant"


const ApiUrl = process.env.REACT_APP_API_KEY;

const showRoomData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_ROOM);
    return result.data
}

const SaveFoodItem=async(foodItem)=>{
    return await axios.post(ApiUrl+Constant.ADD_FOOD_ITEM,foodItem).then((res=>res.data))
}

const getFoodItemTypes=async()=>{
    return await axios.get(ApiUrl+Constant.GET_ALL_FOOD_ITEM_TYPE).then(res=>res.data)
}
const getFoodItemList=async()=>{
    return await axios.get(ApiUrl+Constant.GET_FOOD_ITEM_LIST).then(res=>res.data)
}

const deleteFoodItem=async(item)=>{
    return await axios.post(ApiUrl+Constant.DELETE_FOOD_ITEM,item).then(res=>res.data)
}


export { showRoomData,SaveFoodItem,getFoodItemTypes,getFoodItemList,deleteFoodItem }