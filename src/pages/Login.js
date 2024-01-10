import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getLogin } from "../services/Api";


const Login = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let [loginObj, setLoginObj] = useState({ email: '', password: '' });
    let [isFormSubmitted, setisFormSubmitted] = useState(false);
    
    useEffect(() => {
        getAllLogin();
    }, [])

    const getAllLogin=()=>{
        getLogin(loginObj).then((data) => {
            setisFormSubmitted(true);
            if (data.result) {
                alert("Login Successfully")
            } else {
                alert(data.message)
            }
        })
    }

    const changeFormValues = (event, key)=>{
        setLoginObj(prevObj => ({...prevObj, [key]:event.target.value}) )
    }

    return (
        <div className='container-fluid mt-3'>
            <div className='row justify-content-center mt-3'>
                <div className='col-lg-4'>
                    <div className='card  shadow'>
                        <div className='card-header bg-primary text-center'>
                            <strong className='text-white'>Login</strong>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='mb-3'>
                                    <label className='form-label text-start'><strong>Email</strong></label>
                                    <input type='email' className='form-control' placeholder='Enter Email' onChange={(e)=>changeFormValues(e,'email')} />
                                </div>
                                <div className='text-danger'>
                                    {
                                        isFormSubmitted && loginObj.email == '' && <span>Email is Required</span>
                                    }
                                    {
                                        isFormSubmitted && emailRegex && loginObj.email !== '' && <span>Email is Not Proper</span>
                                    }

                                </div>
                                <div className='mb-3'>
                                    <label className='form-label text-start'> <strong>Password</strong></label>
                                    <input type='password' className='form-control' placeholder='Enter Password' onChange={(e)=>changeFormValues(e,'password')}/>
                                </div>
                                <div className='text-danger'>
                                    {
                                        isFormSubmitted && loginObj.password == '' && <span>Password is Required</span>
                                    }

                                </div>

                                <div className='row'>
                                    <div className='col-12 text-center'>
                                        <button className='btn btn-primary pt-2' type='submit' onClick={getAllLogin}>Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;