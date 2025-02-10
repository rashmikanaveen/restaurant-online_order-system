
import Cookies from 'js-cookie';
import axiosInstance from "../utils/AxiosInstance";

export const placeOrder = (token, total) => async (dispatch) => {
  dispatch({ type: 'PLACE_ORDER_REQUEST' });

  try {
    console.log('Fetching current user');
    const currentUser = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null;

    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    console.log('Fetching cart items');
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    const orderData = {
      token,
      total,
      userId: currentUser._id,
      cartItems,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };

    //console.log('Sending order data to server', orderData);
    const response = await axiosInstance.post('/api/orders/placeorder', orderData,config);
    //console.log('Response received:', response.data);
    //console.log('response.data');
    dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error placing order:', error.message);
    dispatch({ type: 'PLACE_ORDER_FAILED', payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};




export const getUserOrders = () => async (dispatch) => {
  const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
  const currentUser = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null;
  
  dispatch({ type: 'GET_USER_ORDER_REQUEST' });
  try {
    const userid=currentUser._id
    //console.log(userid)
    const response = await axiosInstance.get(`/api/users/getUserOrders/${userid}`,config); // Send user directly
    //console.log(response.data)
    dispatch({ type: 'GET_USER_ORDER_SUCCESS', payload: response.data });
    
  } catch (error) {
    dispatch({ type: 'GET_USER_ORDER_FAILED', payload: error.response.data.message });
  }
};




export const getAllOrders = () => async (dispatch) => {
  const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
  dispatch({ type: 'GET_ALL_ORDER_REQUEST' });
  try {
    const response = await axiosInstance.get('/api/adminActions/getAllOrders',config); // Send user directly
    dispatch({ type: 'GET_ALL_ORDER_SUCCESS', payload: response.data });
    
  } catch (error) {
    dispatch({ type: 'GET_ALL_ORDER_FAILED', payload: error.response.data.message });
  }
};


export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  const token = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')).token : null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: 'UPDATE_ORDER_STATUS_REQUEST' });
  try {
    const response = await axiosInstance.post(`/api/adminActions/updateOrderStatus/${orderId}`, {},config);
    dispatch({ type: 'UPDATE_ORDER_STATUS_SUCCESS', payload: response.data });
    window.location.reload();
  }
  catch (error) {
    dispatch({ type: 'UPDATE_ORDER_STATUS_FAILED', payload: error.response.data.message });
  }
}