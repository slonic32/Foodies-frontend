import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipeById = createAsyncThunk('recipePage/fetchRecipeById', async (id, thunkAPI) => {
    try {
        const { data } = await axios.get(`/recipes/${id}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchPopularRecipes = createAsyncThunk('recipePage/fetchPopularRecipes', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/recipes/popular', { params: { limit: 4 } });
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
