import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_HOST } from '../../config/backend';

axios.defaults.baseURL = BACKEND_HOST + '/api/';

export const fetchRecipesByCategory = createAsyncThunk(
    'recipes/fetchByCategory',
    async ({ categoryId, area, ingredient, page = 1, limit = 10 } = {}, thunkAPI) => {
        try {
            const params = { page, limit };
            if (categoryId && categoryId !== 'all') {
                params.category = categoryId;
            }
            if (area) {
                params.area = area;
            }
            if (ingredient) {
                params.ingredient = ingredient;
            }
            const response = await axios.get('recipes', { params });
            return {
                recipes: response.data.data.recipes,
                pagination: response.data.data.meta,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`recipes/${id}`);
        return response.data.data.recipes;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchRecipesByFilters = createAsyncThunk('recipes/fetchByFilters', async (filters = {}, thunkAPI) => {
    try {
        const response = await axios.get('recipes', { params: filters });
        return {
            recipes: response.data.data.recipes,
            pagination: response.data.data.meta,
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
