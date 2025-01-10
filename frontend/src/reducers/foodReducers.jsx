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