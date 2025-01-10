import { configureStore } from '@reduxjs/toolkit';
import { getAllFoodItemsReducer } from './reducers/foodReducers';

const store = configureStore({
  reducer: {
    getAllFoodItems: getAllFoodItemsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;