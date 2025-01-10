import { configureStore } from '@reduxjs/toolkit';
import { getAllFoodItemsReducer } from './reducers/foodReducers';

const rootReducer = {
  getAllFoodItems: getAllFoodItemsReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;