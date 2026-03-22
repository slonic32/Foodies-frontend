import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchAreas, fetchIngredients, createRecipe, fetchRecipesByCategory, fetchRecipeById, fetchRecipesByFilters } from './operations';

function handlePending(state) {
    state.loading = true;
    state.error = null;
}

function handleRejected(state, action) {
    state.loading = false;
    state.error = action.payload;
}
import { fetchRecipeById as fetchRecipeByIdPage, fetchPopularRecipes } from './recipePageOperations';

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        categories: [],
        areas: [],
        ingredients: [],
        loading: false,
        error: null,
        createSuccess: false,
        createdRecipe: null,
        items: [],
        selectedRecipe: null,
        currentRecipe: null,
        popularRecipes: [],
        isLoading: false,
    },
    reducers: {
        resetCreateSuccess(state) {
            state.createSuccess = false;
            state.createdRecipe = null;
        },
        clearCurrentRecipe(state) {
            state.currentRecipe = null;
            state.selectedRecipe = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, handlePending)
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCategories.rejected, handleRejected)

            .addCase(fetchAreas.pending, handlePending)
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.areas = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchAreas.rejected, handleRejected)

            .addCase(fetchIngredients.pending, handlePending)
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, handleRejected)

            .addCase(createRecipe.pending, handlePending)
            .addCase(createRecipe.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.createSuccess = true;
                state.createdRecipe = action.payload?.data ?? action.payload ?? null;
            })
            .addCase(createRecipe.rejected, handleRejected)
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

export const { resetCreateSuccess, clearCurrentRecipe } = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
