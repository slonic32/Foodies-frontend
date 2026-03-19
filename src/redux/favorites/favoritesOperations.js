import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserFavorites = createAsyncThunk(
    'favorites/fetchUserFavorites',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('/recipes/favorites');
            return data.data.recipes.map((r) => r.id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async (recipeId, thunkAPI) => {
        try {
            await axios.post(`/recipes/${recipeId}/favorite`);
            return recipeId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteFavorite = createAsyncThunk(
    'favorites/deleteFavorite',
    async (recipeId, thunkAPI) => {
        try {
            await axios.delete(`/recipes/${recipeId}/favorite`);
            return recipeId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
