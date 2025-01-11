import axios from "axios"
import axiosInstance from "../utils/AxiosInstance";
export const registerNewUser=(user)=> async dispatch=>{

    dispatch({type:'USER_REGISTER_REQUEST'})
    try{
        const response=await axiosInstance.post('/api/users/register',{user})
        dispatch({type:'USER_REGISTER_SUCCESS'})
    }
    catch(error){
        dispatchEvent({type:'USER_REGISTER_FAILED',payload:error})

    }

}