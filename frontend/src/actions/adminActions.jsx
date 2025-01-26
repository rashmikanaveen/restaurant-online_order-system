import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";

export const registerNewUser = (user) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST' });
  try {
    const response = await axiosInstance.post('/api/users/register', user); // Send user directly
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
    window.location.href = '/Login';
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAILED', payload: error.response.data.message });
  }
};

export const deleteUserAction =  async(id) => {
  try {
    const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //console.log(id);

    const response = await axiosInstance.delete(`/api/adminActions/deleteuser/${id}`, config);
    //console.log(response.data);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}


export const getNumberOfOrdersGivenUser = async (id) => {
  try {
    const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(id)
    const response = await axiosInstance.get(`/api/adminActions/getNumberOfFoodOrdersGivenUser/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}





