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
// ---------------------------------
const getWeddingList = async () => {
    try {
        const result = await axios.get(ApiUrl + Constant.GET_All_PACKAGES);
        return result.data
    }
    catch (error) {
        alert(error.code)
    }
}
// ----------------------------------

const getUserList = async () => {
    try {
        const result = await axios.get(ApiUrl + Constant.Get_All_User);
        return result.data
    }
    catch (error) {
        alert(error.code)
    }
}

// const getWeddingList = async () => {
//     const result = await axios.get(ApiUrl + Constant.GET_All_PACKAGES);
//    return result.data
//   }

const saveWedding = async (Obj) => {
   
    try {
      const result = await axios.post(
        ApiUrl + Constant.Save_Wedding,
        Obj
      );
      return result.data
      
    } catch (error) {
     
      
      alert(error.code);
    }
  };

  const onDeleteWeddingPackages = async (id) => {
    const isDelte = window.confirm("Are You Sure want to Delete");
    if (isDelte) {
      const result = await axios.post(
        ApiUrl + Constant.ON_DELETE_WEDDING +
        id
      );return result.data
   
    }};

   
      const updateWedding = async (Obj) => {
   
        try {
          const result = await axios.post(
            ApiUrl + Constant.SAVE_Update_WEDDING,
            Obj
          );
          return result.data
          
        } catch (error) {
         
          
          alert(error.code);
        }
      };

    //   ---------------------------------------
    // ----------------------------------------

   
      const saveUser = async (Obj) => {
   
        try {
          const result = await axios.post(
            ApiUrl + Constant.Save_User,
            Obj
          );
          return result.data
          
        } catch (error) {
         
          
          alert(error.code);
        }
      };

      const updateUser = async (Obj) => {
   
        try {
          const result = await axios.post(
            ApiUrl + Constant.SAVE_Update_User,
            Obj
          );
          return result.data
          
        } catch (error) {
         
          
          alert(error.code);
        }
      };

      const onDeleteUser = async (Obj) => {
        const isDelte = window.confirm("Are You Sure want to Delete");
        if (isDelte) {
          const result = await axios.post(
            ApiUrl + Constant.ON_DELETE_User ,
            Obj
          );return result.data
       
        }};
       
export {showRoomData , getWeddingList ,getUserList,saveWedding,onDeleteWeddingPackages,updateWedding,saveUser,updateUser,onDeleteUser}