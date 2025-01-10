import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllFoodItems = createAsyncThunk(
  'foodItems/getAllFoodItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/fooditems/getallfooditems');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);