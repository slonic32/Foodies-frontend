import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTestimonials = createAsyncThunk('testimonials/fetchAll', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('http://foodies-backend-rmi4.onrender.com/api/testimonials');

        return data?.data || data || [];
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message || 'Failed to fetch testimonials',
        );
    }
});
