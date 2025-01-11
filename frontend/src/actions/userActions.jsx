import axios from "axios"
import axiosInstance from "../utils/AxiosInstance";
import Cookies from 'js-cookie';

export const userLogin=(user)=> async dispatch=>{

    dispatch({type:'USER_LOGIN_REQUEST'})
    try{
        const response=await axiosInstance.post('/api/users/login',{user})
        //console.log(response.data)
        Cookies.set('userInfo', JSON.stringify(response.data), { expires: 7 });
        dispatch({type:'USER_LOGIN_SUCCESS',payload:response.data})
        window.location.href = '/';
    }
    catch(error){
        dispatch({type:'USER_LOGIN_FAILED',payload:error})

    }

}