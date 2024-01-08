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

const getAllOffer = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_OFFER);
    return result.data
  };

const getAllBooking = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_BOOKING);
    return result.data.data;
};

      const getServiceList = async () => {
         const result = await axios.get(ApiUrl + Constant.GET_ALL_SERVICE);
         return result.data;
       };

       const saveOffer = async (obj) => { 
        try {
          const result = await axios.post(ApiUrl + Constant.ADD_ALL_OFFER, obj);
          return result.data;
        } catch (error) { 
          alert(error.code);
        }
      };

      const saveBooking = async (obj) => {
        try {
          const result = await axios.post(ApiUrl + Constant.ADD_ALL_BOOKING,obj);
            return result.data;
          } catch (error) { 
            alert(error.code);
          }
        };

      const onDelete = async (obj) => {
        const isDel = window.confirm("Are You Sure You Want To Delete");
          const result = await axios.post(ApiUrl + Constant.DELETE_ALL_OFFER, obj);
          return result.data;          
      };
      

      const deleteBooking = async (id) => {
        const isDelete = window.confirm("Are You Sure want to Delete");
          const result = await axios.post(ApiUrl + Constant.DELETE_ALL_BOOKING+id);
          return result.data;
      };

      const updateOffer = async (obj) => {
        const result = await axios.post(ApiUrl + Constant.UPADTE_ALL_OFFER, obj);
        return result.data;
      };

      const updateBooking = async (obj) => {
        const result = await axios.post(ApiUrl + Constant.UPADTE_ALL_BOOKING, obj);
        return result.data;
      };



      const onEditBooking = async (id) => {
        const result = await axios.post(ApiUrl + Constant.EDIT_ALL_BOOKING + id)
          return result.data.data;
      };

      

export { showRoomData, showRoomTypeData, showRoomStatus, addRoomData, editRoom, deleteRoom, getAllOffer, getAllBooking, getServiceList, saveOffer, onDelete, updateOffer, saveBooking, deleteBooking, onEditBooking, updateBooking}
