import { createSlice } from '@reduxjs/toolkit';
import { fetchUserFavorites, addFavorite, deleteFavorite } from './favoritesOperations';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchUserFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                if (!state.items.includes(action.payload)) {
                    state.items.push(action.payload);
                }
            })
            .addCase(deleteFavorite.fulfilled, (state, action) => {
                state.items = state.items.filter((id) => id !== action.payload);
            });
    },
});

export const favoritesReducer = favoritesSlice.reducer;
