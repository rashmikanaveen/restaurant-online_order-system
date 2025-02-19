import axios from "axios"
import axiosInstance from "../utils/AxiosInstance";
import Cookies from 'js-cookie';


export const userLogin = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    try {
        const response = await axiosInstance.post('/api/users/login', user); // Send user directly
        Cookies.set('userInfo', JSON.stringify(response.data), { expires: 7 });
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
        window.location.href = '/';
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error.response.data.message });
    }
};


export const userLogout=()=> async dispatch=>{

    dispatch({type:'USER_LOGOUT'})
    Cookies.remove('userInfo');
    localStorage.removeItem('cartItems');
    window.location.href = '/';

}

export const getAllUsers = async () => {
    
    try {
      const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await  axiosInstance.get("/api/adminActions/getAllUsers", config);
      //console.log(response.data);
      return response.data;
      
    } catch (error) {
      throw error;
    }
  };