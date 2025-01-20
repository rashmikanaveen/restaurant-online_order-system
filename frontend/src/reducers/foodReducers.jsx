import { createSlice } from '@reduxjs/toolkit';
import { getAllFoodItems } from '../actions/fooditemActions';

const foodItemsSlice = createSlice({
  name: 'foodItems',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFoodItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFoodItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllFoodItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllFoodItemsReducer = foodItemsSlice.reducer;


export const addNewFoodItemReducer = (state = { }, action) => {
  switch (action.type) {
    case 'ADD_FOODITEM_REQUEST':
      return { 
        loading: true,
        ...state
       };
    case 'ADD_FOODITEM_SUCCESS':
      return { 
        loading: false, 
        success: true };
    case 'ADD_FOODITEM_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const editItemReducer = (state = { }, action) => {
  switch (action.type) {
    case 'EDIT_FOODITEM_REQUEST':
      return { 
        loading: true,
        ...state
       };
    case 'EDIT_FOODITEM_SUCCESS':
      return { 
        loading: false, 
        success: true };
    case 'EDIT_FOODITEM_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}