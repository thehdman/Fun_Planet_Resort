import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserListResortResort,saveUser ,updateUser,onDeleteUser} from "../services/Api";



const User = () => {


  let [userList, setUserList] = useState([]);
  let [userObj, setUserObj] = useState({
    "userId": 0,
    "userName": "",
    "password": "",
    "role": "",
    "isDeleted": false
  });
  let [isLoader, setIsLoader] = useState(true);
  let [isSaveLoader, setisSaveLoader] = useState(false);

 
  useEffect(() => {
    showUserList();
  }, []);

  const showUserList = () =>{
    getUserListResort().then((data) => {
        setUserList(data);
      setIsLoader(false);
    });
  }

  const reset = () => {
    setUserObj({
        userId: 0,
        userName: "",
        password: "",
        role: "",
        IsDeleted: false,
    });
  };
  const changeFormValue = (event, key) => {
    setUserObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };



const saveAllUser = ()=>{
  saveUser(userObj).then((data)=>{
       if(data.result){
        alert("User Package Save");
        showUserList();
       }else {
        alert(data.message);
       }
  })
}
const saveAllUpdate = ()=>{
  saveUser(userObj).then((data)=>{
       if(data.result){
        alert("Update Package Save");
        showUserList();
       }else {
        alert(data.message);
       }
  })
}

const deleteAllWeddingUser =(userObj)=>{
  onDeleteUser(userObj).then((data)=>{
    if(data.result){
      alert("User Package Delete");
      showUserList();
     }else {
      alert(data.message);
     }
  })
 };


  const onEditUser = (item) => {
    setUserObj((prevObj) => ({
      ...prevObj,
      userId:item.userId,

      userName:item.userName,
      password:item.password,
      role:item.role,
      IsDeleted:item.IsDeleted,
    }));
  };

 
  return (
    <div>
      <div className="row text-center mt-3">
        <div className="col-8  text-center">
          <div className="card text-center">
            <div className="card-header bg-primary  text-center text-white">
                <div className="col-6 text-center">
              <div className="row ">
              <strong>User List</strong>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>User Name</th>
                    <th>Role</th>
                    <th>Password </th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {isLoader && (
                  <tbody>
                    <tr>
                      <td colSpan={9} className="text-center">
                        <div class="spinner-border text-muted"></div>
                        <div class="spinner-border text-primary"></div>
                        <div class="spinner-border text-success"></div>
                        <div class="spinner-border text-info"></div>
                        <div class="spinner-border text-warning"></div>
                        <div class="spinner-border text-danger"></div>
                        <div class="spinner-border text-secondary"></div>
                        <div class="spinner-border text-dark"></div>
                        <div class="spinner-border text-light"></div>
                      </td>
                    </tr>
                  </tbody>
                )}
                {!isLoader && (
                  <tbody>
                    {userList.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1} </td>
                          <td> {item.userName} </td>
                          <td> {item.role}</td>
                          <td>{item.password} </td>
                          <td>
                          <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                onEditUser(item);
                              }}
                            >
                              {" "}
                              Edit
                            </button>
                          </td>
                          <td>
                          <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                deleteAllWeddingUser(item);
                              }}
                            >
                              {" "}
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header bg-primary text-white text-center"><strong>Users List</strong></div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <label>User Name</label>
                  <input
                    type="text" placeholder="User Name"
                    value={userObj.userName}
                    onChange={(event) => {
                      changeFormValue(event, "userName");
                    }}
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <label>Role</label>
                  <input
                    type="text" placeholder="Role"
                    value={userObj.role}
                    onChange={(event) => {
                      changeFormValue(event, "role");
                    }}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Password</label>
                  <input
                    type="text" placeholder="Password"
                    value={userObj.password}
                    onChange={(event) => {
                      changeFormValue(event, "password");
                    }}
                    className="form-control"
                  />
                </div>

                <div className="row pt-2">
                  <div className="col-6 text-center">
                  <button className="btn btn-sm btn-success" onClick={reset}>
                      {" "}
                      Reset
                    </button>
                  </div>
                  <div className="col-6 text-center">
                    {userObj.userId == 0 && (
                      <button
                      className="btn btn-sm btn-success"
                      onClick={saveAllUser}
                    >
                      {isSaveLoader && (
                        <span class="spinner-border spinner-border-sm"></span>
                      )}
                      Save
                    </button>
                    )}
                    {userObj.userId !== 0 && (
                       <button
                       className="btn btn-sm btn-danger"
                       onClick={saveAllUpdate}
                     >
                       Update
                     </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;