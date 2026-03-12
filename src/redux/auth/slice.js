import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refresh, editUser } from './operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

function handlePending(state) {
    state.loading = true;
    state.error = null;
}

function handleRejected(state, action) {
    state.loading = false;
    state.error = action.payload;
}

const emptyUser = {
    name: null,
    email: null,
    avatar: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: { ...emptyUser },
        token: null,

        isLoggedIn: false,
        isRefreshing: false,
        loading: false,
        error: null,
    },
    reducers: {
        updateToken(state, action) {
            state.token = action.payload.token;
        },
        updateTokenError(state) {
            state.user = { ...emptyUser };
            state.token = null;

            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                const user = action.payload.user || {};
                state.user.name = user.name ?? null;
                state.user.email = user.email ?? null;

                state.user.avatar = user.avatar ?? null;

                state.token = null;

                state.isLoggedIn = false;
                state.error = null;
                state.loading = false;
            })
            .addCase(register.pending, handlePending)
            .addCase(register.rejected, handleRejected)
            .addCase(login.fulfilled, (state, action) => {
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;

                state.user.avatar = action.payload.user.avatar;

                state.token = action.payload.token;

                state.isLoggedIn = true;
                state.error = null;
                state.loading = false;
            })
            .addCase(login.pending, handlePending)
            .addCase(login.rejected, handleRejected)

            .addCase(logout.fulfilled, (state) => {
                state.user = { ...emptyUser };
                state.token = null;

                state.isLoggedIn = false;
                state.error = null;
                state.loading = false;
            })
            .addCase(logout.pending, handlePending)
            .addCase(logout.rejected, handleRejected)
            .addCase(refresh.pending, (state) => {
                state.isRefreshing = true;
                state.loading = true;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;

                state.user.avatar = action.payload.avatar;

                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.error = null;
                state.loading = false;
            })
            .addCase(refresh.rejected, (state) => {
                state.user = { ...emptyUser };
                state.token = null;

                state.isLoggedIn = false;
                state.error = null;
                state.loading = false;
                state.isRefreshing = false;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user.avatar = action.payload.user.avatar;

                state.error = null;
                state.loading = false;
            })
            .addCase(editUser.pending, handlePending)
            .addCase(editUser.rejected, handleRejected);
    },
});

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

const persistedReducer = persistReducer(authPersistConfig, authSlice.reducer);
export const authReducer = persistedReducer;

export const { updateToken, updateTokenError } = authSlice.actions;
