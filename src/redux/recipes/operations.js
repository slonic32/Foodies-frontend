import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const fetchRecipesByCategory = createAsyncThunk(
    'recipes/fetchByCategory',
    async (category, thunkAPI) => {
        try {
            let response;
            if (category && category.toLowerCase() !== 'all') {
                response = await axios.get(`/recipes?category=${category}`);
            } else {
                response = await axios.get('/recipes');
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`/recipes/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchRecipesByFilters = createAsyncThunk(
    'recipes/fetchByFilters',
    async (filters, thunkAPI) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`/recipes?${queryParams}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);