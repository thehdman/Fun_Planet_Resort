import axios from 'axios';
import * as Constant from "./Constant"


const ApiUrl = process.env.REACT_APP_API_KEY;

const showRoomData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_ROOM);
    return result.data
}

const showRoomTypeData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_MASTER_BY_STATOUS_ROOM_TYPE);
    return result.data
}

const showRoomStatus = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_MASTER_BY_STATOUS_ROOM_STATUS);
    return result.data
}

const addRoomData = async (obj) => {
    debugger;
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_ROOM, obj);
        return result.data;
    }
    catch (error) {
        alert(error.code)
    }
}


const showServicesData = async () => {
    const result = await axios.get(ApiUrl + Constant.Get_All_Service);
   return result.data
}
const addServicesData = async (Obj) => {
    debugger;
    const result = await axios.post(ApiUrl + Constant.ADD_SERVICE,Obj);
    
    try {
        return result.data
        
    } catch (error) {
        alert(error.code)
    }
}
const DeleteService = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.DELETE_SERVICES, obj);
    }
    catch (error) {
        alert(error.code)
    }
}





// servicePage


const editRoom = async (id) => {
    try {
        const result = await axios.get(ApiUrl + Constant.EDIT_ROOM + id);
        return result.data;
    }
    catch (error) {
        alert(error.code)
    }
}

const deleteRoom = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.DELETE_ROOM, obj);
    }
    catch (error) {
        alert(error.code)
    }
}

export { showRoomData, showRoomTypeData, showRoomStatus, addRoomData, editRoom, deleteRoom,showServicesData,addServicesData,DeleteService}
