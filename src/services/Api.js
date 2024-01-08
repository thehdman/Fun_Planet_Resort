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


const getMasterList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_MASTER);
    return result.data
}

const addMaster = async (obj) => {
    try {

        const result = await axios.post(ApiUrl + Constant.ADD_MASTER, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }

}

const updateMaster = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.UPDATE_MASTER, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const onDelete = async (obj) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.post(ApiUrl + Constant.DELETE_MASTER, obj);
        return result.data
    }
}

const getWedding= async () => {
    const result = await axios.get(ApiUrl + Constant.GET_WEDDING);
    return result.data
}

const addWeddingService = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_WEDDING,obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }


}

const updateService = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.UPDATE_WEDDING,obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const onDeleteWedding = async (obj) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.post(ApiUrl + Constant.DELETE_WEDDING, obj);
        return result.data
    }
}

export { showRoomData}
export {getMasterList, addMaster, onDelete, updateMaster} 
export {getWedding,addWeddingService,updateService,onDeleteWedding}