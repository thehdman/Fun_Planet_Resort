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


const  getAllRoomType = async ()=>
{
    const result=await axios.get(ApiUrl + Constant.GET_ALL_ROOM_TYPE)
   return result.data
}

const SaveRoomtype = async (obj) => {
 
        const result = await axios.post(ApiUrl + Constant.GET_ALL_USER,obj);
        return result.data;
    
}
        const UpdateRoomtype = async (obj) => {
            
            const result = await axios.post(ApiUrl + Constant.GET_ALL_UPDATE, obj);
            return result.data;
        }
        const getShowEnquiry = async (obj) => {
            try {
                const result = await axios.post(ApiUrl + Constant.GET_ALL_ENQUIRY,obj);
                return result.data;
            } catch (error) {
               alert(error.code)
            }
        }
        const getUserList = async () => {
            const result = await axios.get(ApiUrl + Constant.GET_ALL_ENQUIRY_USER);
            return result.data;
        }

        const getReferenceList = async () => {
            const result = await axios.get(ApiUrl + Constant.GET_ALL_REFERENCE);
           return result.data;
        }
        const getSubjectList = async () => {
            const result = await axios.get(ApiUrl + Constant.GET_ALL_SUBJECTLIST);
            return result.data;
        }

        const getEnquiryStatusList = async () => {
            const result = await axios.get(ApiUrl + Constant.GET_ALL_ENQUIRYSTATUS);
            return result.data;
        }

        const saveEnquiry = async (obj) => {
            const result = await axios.post(ApiUrl + Constant.SAVE_ENQUIRY,obj);
            return result.data;
           
        }

        const onEditEnquiry = async (id) => {
            const result = await axios.post(ApiUrl + Constant.EDIT_ENQUIRY +id);
           return result.data;
          }

          const deleteenquiry = async (obj) =>{
            const isDelte = window.confirm('Are you sure you want to delete');
            if (isDelte) {
                const result = await axios.post(ApiUrl + Constant.DELETE_ENQUIRY, obj);
                return result.data;
                   
            }   
        }

        const updateenquiry = async (obj) => {
            const result = await axios.post(ApiUrl + Constant.UPDATE_ENQUIRY, obj );       
            return result.data;
               
        }


     


export {showRoomData,getAllRoomType,SaveRoomtype,UpdateRoomtype,getShowEnquiry,getUserList,getReferenceList, getSubjectList,getEnquiryStatusList,saveEnquiry,onEditEnquiry,deleteenquiry,updateenquiry}


