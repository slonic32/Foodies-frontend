import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipesByCategory, fetchRecipeById, fetchRecipesByFilters } from './operations';
import { fetchRecipeById as fetchRecipeByIdPage, fetchPopularRecipes } from './recipePageOperations';

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [],
        selectedRecipe: null,
        currentRecipe: null,
        popularRecipes: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearCurrentRecipe(state) {
            state.currentRecipe = null;
            state.selectedRecipe = null;
        },
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
            })
            // Fetch recipe by ID (RecipePage)
            .addCase(fetchRecipeByIdPage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipeByIdPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentRecipe = action.payload.data;
            })
            .addCase(fetchRecipeByIdPage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch popular recipes
            .addCase(fetchPopularRecipes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPopularRecipes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.popularRecipes = action.payload.data.recipes;
            })
            .addCase(fetchPopularRecipes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentRecipe } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
