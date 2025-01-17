import axios from 'axios';
import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";


export const getAllFoodItems = async () => {
  try {
    const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axiosInstance.get("/api/fooditems/getallfooditems",config);
    //console.log(response.data);
    return response.data;

  } catch (error) {
    
    console.error(error);
  }
  
};

export const addNewFoodItem =(newFood) =>dispatch =>{
  dispatch({type:"ADD_FOODITEM_REQUEST"})
  try{
    const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(newFood);
    const response = axiosInstance.post("/api/adminActions/addnewfooditem",newFood,config);
    dispatch({type:"ADD_FOODITEM_SUCCESS",payload:response.data});


  }
  catch(error){
    //console.error(error);
    dispatch({type:"ADD_FOODITEM_FAILED",payload:error});
  }



}