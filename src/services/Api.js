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
const getLogin = async (obj) =>{
        const result = await axios.post(ApiUrl + Constant.GET_LOGIN,obj);
        return result.data
}   

export {showRoomData, getLogin}