import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BACKEND_HOST } from '../../config/backend';

axios.defaults.baseURL = BACKEND_HOST + '/api/';

export const fetchTestimonials = createAsyncThunk('testimonials/fetchAll', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('testimonials');

        return data?.data || data || [];
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message || 'Failed to fetch testimonials',
        );
    }
});
