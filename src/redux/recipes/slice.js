import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipesByCategory, fetchRecipeById, fetchRecipesByFilters } from './operations';

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [],
        selectedRecipe: null,
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Fetch recipes by category
            .addCase(fetchRecipesByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload.recipes;
            })
            .addCase(fetchRecipesByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch recipe by ID
            .addCase(fetchRecipeById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.selectedRecipe = action.payload;
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch recipes by filters
            .addCase(fetchRecipesByFilters.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipesByFilters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload.recipes;
            })
            .addCase(fetchRecipesByFilters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const recipesReducer = recipesSlice.reducer;