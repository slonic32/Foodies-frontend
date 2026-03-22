import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_HOST } from '../../config/backend';

axios.defaults.baseURL = BACKEND_HOST + '/api/';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/categories');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
