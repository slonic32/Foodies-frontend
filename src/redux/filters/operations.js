import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIngredients = createAsyncThunk(
    'filters/fetchIngredients',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('ingredients');
            return data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ingredients');
        }
    }
);

export const fetchAreas = createAsyncThunk(
    'filters/fetchAreas',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('areas');
            return data || [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch areas');
        }
    }
);
