import { createSlice } from '@reduxjs/toolkit';
import { fetchTestimonials } from './operations';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const testimonialsSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonials.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const testimonialsReducer = testimonialsSlice.reducer;
