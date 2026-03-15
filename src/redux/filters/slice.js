import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients, fetchAreas } from './operations';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        ingredients: {
            items: [],
            isLoading: false,
            error: null,
        },
        areas: {
            items: [],
            isLoading: false,
            error: null,
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch ingredients
            .addCase(fetchIngredients.pending, (state) => {
                state.ingredients.isLoading = true;
                state.ingredients.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients.isLoading = false;
                state.ingredients.error = null;
                state.ingredients.items = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.ingredients.isLoading = false;
                state.ingredients.error = action.payload;
            })
            // Fetch areas
            .addCase(fetchAreas.pending, (state) => {
                state.areas.isLoading = true;
                state.areas.error = null;
            })
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.areas.isLoading = false;
                state.areas.error = null;
                state.areas.items = action.payload;
            })
            .addCase(fetchAreas.rejected, (state, action) => {
                state.areas.isLoading = false;
                state.areas.error = action.payload;
            });
    },
});

export const filtersReducer = filtersSlice.reducer;
