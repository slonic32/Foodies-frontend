import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPagination: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setCurrentPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        resetPagination: () => initialState,
    },
});

export const { setPagination, setCurrentPage, setLimit, resetPagination } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
