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
export {showRoomData,showServicesData, addServicesData}

// servicePage


