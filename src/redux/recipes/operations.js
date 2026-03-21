import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('recipes/fetchCategories', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/categories');
        console.log('Categories response:', res.data);
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
        console.log('Areas response:', res.data);
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
        console.log('Ingredients response:', res.data);
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
