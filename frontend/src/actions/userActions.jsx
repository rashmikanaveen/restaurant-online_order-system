import axios from "axios"
import axiosInstance from "../utils/AxiosInstance";

export const userLogin=(user)=> async dispatch=>{

    dispatch({type:'USER_LOGIN_REQUEST'})
    try{
        const response=await axiosInstance.post('/api/users/login',{user})
        console.log(response.data)
        dispatch({type:'USER_LOGIN_SUCCESS',payload:response.data})
    }
    catch(error){
        dispatch({type:'USER_LOGIN_FAILED',payload:error})

    }

}