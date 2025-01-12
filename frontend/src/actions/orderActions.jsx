import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from "../utils/AxiosInstance";

export const placeOrder = (token, total) => async (dispatch) => {
  dispatch({ type: 'PLACE_ORDER_REQUEST' });

  try {
    const currentUser = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null;

    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    const orderData = {
      token,
      total,
      userId: currentUser._id,
      cartItems,
    };

    const response = await axiosInstance.post('/api/orders/placeorder', orderData);
    dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PLACE_ORDER_FAILED', payload: error.message });
  }
};