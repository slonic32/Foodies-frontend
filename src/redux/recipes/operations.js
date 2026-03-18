import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipesByCategory = createAsyncThunk(
    'recipes/fetchByCategory',
    async ({ categoryId, page = 1, limit = 10 } = {}, thunkAPI) => {
        try {
            const params = { page, limit };
            if (categoryId && categoryId !== 'all') {
                params.category = categoryId;
            }
            const response = await axios.get('http://localhost:3000/api/recipes', { params });
            return response.data.data.recipes;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/recipes/${id}`);
            return response.data.data.recipes;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchRecipesByFilters = createAsyncThunk(
    'recipes/fetchByFilters',
    async (filters = {}, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:3000/api/recipes', { params: filters });
            return response.data.data.recipes;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);