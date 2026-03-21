import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchAreas, fetchIngredients, createRecipe } from './operations';

function handlePending(state) {
    state.loading = true;
    state.error = null;
}

function handleRejected(state, action) {
    state.loading = false;
    state.error = action.payload;
}

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
    },
    reducers: {
        resetCreateSuccess(state) {
            state.createSuccess = false;
            state.createdRecipe = null;
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
            .addCase(createRecipe.rejected, handleRejected);
    },
});

export const { resetCreateSuccess } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
