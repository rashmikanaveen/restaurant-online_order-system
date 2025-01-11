import axiosInstance from "../utils/AxiosInstance";

export const registerNewUser = (user) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST' });
  try {
    const response = await axiosInstance.post('/api/users/register', user); // Send user directly
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAILED', payload: error.response.data.message });
  }
};