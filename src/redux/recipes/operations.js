import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('recipes/fetchCategories', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/categories');
        return res.data;
    } catch (error) {
        console.error('Categories error:', error);
        if (error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchAreas = createAsyncThunk('recipes/fetchAreas', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/areas');
        return res.data;
    } catch (error) {
        console.error('Areas error:', error);
        if (error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchIngredients = createAsyncThunk('recipes/fetchIngredients', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/ingredients');
        return res.data;
    } catch (error) {
        console.error('Ingredients error:', error);
        if (error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createRecipe = createAsyncThunk('recipes/createRecipe', async (formData, thunkAPI) => {
    try {
        const res = await axios.post('/recipes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        if (error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue(error.message);
    }
});
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
