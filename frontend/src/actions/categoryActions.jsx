import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";

export const getCategories = () => async (dispatch) => {
  
  try {
    dispatch({ type: "GET_CATEGORIES_REQUEST" });
    const { data } = await axiosInstance.get(
      "/api/fooditems/getCategories"
    );
    //console.log(data);
    dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_CATEGORIES_FAILED", payload: error.message });
  }
};

export const addCategory = (category) => async (dispatch) => {
  const currentUser = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null;
  const config = {
    headers: {
      Authorization: `Bearer ${currentUser.token}`,
    },
  };
  try {
    dispatch({ type: "ADD_CATEGORY_REQUEST" });
    const { data } = await axiosInstance.post(
      "/api/adminActions/addCategory",
      { name: category },
      config
    );
    dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: data });
    window.location.reload();
  } catch (error) {
    dispatch({ type: "ADD_CATEGORY_FAILED", payload: error.message });
  }
};
