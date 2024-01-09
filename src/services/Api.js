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

const getQuotationList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_WEDDINGQUOTATION);
    return result.data
}
 
const getServiceDataList = async()=>{
    const result = await axios.get(ApiUrl + Constant.GET_ALL_SERVICEDATA_List);
    return result.data
}

const getWeddingPackagesList = async()=>{
    const result = await axios.get(ApiUrl + Constant.GET_ALL_WEDDINGPACKAGE);
    return result.data

}

const addAllWeddingQuotation = async(obj)=>{
    try{
    const result = await axios.post(ApiUrl +Constant.ADD_WEDDING_QUOTATION,obj);
    return result.data
}catch(error){
    alert(error.data)
}
}
const editQuotationList =async(obj)=>{
 const result = await axios.get(ApiUrl +Constant.EDIT_QUOTATION_List,obj);
 return result.data
}

const deleteQuotationList = async(obj)=>{
    const isDelete = window.confirm('Are You Sure Want To Delete');
    const result = await axios.post(ApiUrl +Constant.DELETE_QUOTATION_List,obj);
    return result.data;
}




export { showRoomData, getQuotationList,getServiceDataList, getWeddingPackagesList, addAllWeddingQuotation, editQuotationList, deleteQuotationList }