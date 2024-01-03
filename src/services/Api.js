import axios from "axios";
import * as constant from './Constant';

const getMasterList = async () => {     
    const apiUrl = process.env.REACT_APP_API_KEY;
    console.log(apiUrl);
    const result = await axios.get(apiUrl + constant.GET_ALL_MASTER);
    return result.data;
}

export {getMasterList};