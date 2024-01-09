import axios from 'axios';
import * as Constant from "./Constant"


const ApiUrl = process.env.REACT_APP_API_KEY;

const showRoomData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_ROOM);
    return result.data
}

const SaveFoodItem = async (foodItem) => {
    return await axios.post(ApiUrl + Constant.ADD_FOOD_ITEM, foodItem).then((res => res.data))
}

const getFoodItemTypes = async () => {
    return await axios.get(ApiUrl + Constant.GET_ALL_FOOD_ITEM_TYPE).then(res => res.data)
}
const getFoodItemList = async () => {
    return await axios.get(ApiUrl + Constant.GET_FOOD_ITEM_LIST).then(res => res.data)
}

const deleteFoodItem = async (item) => {
    return await axios.post(ApiUrl + Constant.DELETE_FOOD_ITEM, item).then(res => res.data)
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


     





const getQuotationList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_WEDDINGQUOTATION);
    return result.data
}

const getServiceDataList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_SERVICEDATA_List);
    return result.data
}

const getWeddingPackagesList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_WEDDINGPACKAGE);
    return result.data

}

const addAllWeddingQuotation = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_WEDDING_QUOTATION, obj);
        return result.data
    } catch (error) {
        alert(error.data)
    }
}

const editQuotationList = async (obj) => {
    const result = await axios.get(ApiUrl + Constant.EDIT_QUOTATION_List, obj);
    return result.data
}

const deleteQuotationList = async (obj) => {
    const isDelete = window.confirm('Are You Sure Want To Delete');
    const result = await axios.post(ApiUrl + Constant.DELETE_QUOTATION_List, obj);
    return result.data;
}


const showServicesData = async () => {
    const result = await axios.get(ApiUrl + Constant.Get_All_Service);
    return result.data
}
const addServicesData = async (Obj) => {
    debugger;
    const result = await axios.post(ApiUrl + Constant.ADD_SERVICE, Obj);

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
    }
}
const onDeleteMaster = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.DELETE_MASTER, obj);
        return result.data
    } catch (error) {
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


const onDeleteWedding = async (obj) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.post(ApiUrl + Constant.DELETE_WEDDING, obj);
        return result.data
    }
}

const getWedding = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_WEDDING);
    return result.data
}

const addWeddingService = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_WEDDING, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }


}
const updateWedding = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.UPDATE_WEDDING, obj);
        return result.data
    } catch (error) {
    }
}
const updateService = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.UPDATE_WEDDING, obj);
        return result.data
    } catch (error) {
    }
}
const deleteRoom = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.DELETE_ROOM, obj);
        return result.data
    }
    catch (error) {
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

const getServiceListBooking = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_SERVICE_BOOKING);
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
        const result = await axios.post(ApiUrl + Constant.ADD_ALL_BOOKING, obj);
        return result.data;
    } catch (error) {
        alert(error.code);
    }
};

const onDeleteOffer = async (obj) => {
    const isDel = window.confirm("Are You Sure You Want To Delete");
    const result = await axios.post(ApiUrl + Constant.DELETE_ALL_OFFER, obj);
    return result.data;
};


const deleteBooking = async (id) => {
    const isDelete = window.confirm("Are You Sure want to Delete");
    const result = await axios.post(ApiUrl + Constant.DELETE_ALL_BOOKING + id);
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



export { showRoomData,SaveRoomtype, showRoomTypeData,getAllRoomType, UpdateRoomtype,showRoomStatus, addRoomData, editRoom, deleteRoom, getWedding, addWeddingService, updateService, onDeleteWedding, getMasterList, addMaster, updateMaster, onDeleteMaster, saveOffer, onDeleteOffer, updateOffer, getAllOffer, getServiceListBooking, saveBooking, deleteBooking, onEditBooking, updateBooking, getAllBooking, updateWedding, showServicesData, addServicesData, DeleteService, SaveFoodItem, getFoodItemTypes, getFoodItemList, deleteFoodItem , getQuotationList, getServiceDataList, getWeddingPackagesList, addAllWeddingQuotation, editQuotationList, deleteQuotationList,getShowEnquiry,getUserList,getReferenceList, getSubjectList,getEnquiryStatusList,saveEnquiry,onEditEnquiry,deleteenquiry,updateenquiry }
