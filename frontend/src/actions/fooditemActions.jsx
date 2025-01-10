import axios from 'axios';
import axiosInstance from "../utils/AxiosInstance";


export const getAllFoodItems = async () => {
  try {
    
    const response = await axiosInstance.get("/api/fooditems/getallfooditems");
    //console.log(response.data);
    return response.data;

  } catch (error) {
    
    console.error(error);
  }
  
};

