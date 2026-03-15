import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_HOST } from '../../config/backend';

axios.defaults.baseURL = BACKEND_HOST + '/api/';

function getErrorMessage(error) {
    const responseData = error?.response?.data;

    if (typeof responseData === 'string' && responseData.trim()) {
        return responseData;
    }

    if (typeof responseData?.message === 'string' && responseData.message.trim()) {
        return responseData.message;
    }

    if (typeof responseData?.msg === 'string' && responseData.msg.trim()) {
        return responseData.msg;
    }

    if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
        const firstError = responseData.errors[0];
        if (typeof firstError === 'string' && firstError.trim()) {
            return firstError;
        }
        if (typeof firstError?.message === 'string' && firstError.message.trim()) {
            return firstError.message;
        }
    }

    if (typeof error?.message === 'string' && error.message.trim()) {
        return error.message;
    }

    return 'Something went wrong';
}

// add JWT
export function setAuthHeader(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// remove JWT
function clearAuthHeader() {
    axios.defaults.headers.common.Authorization = '';
}

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
    try {
        const res = await axios.post('/auth/register', credentials);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const res = await axios.post('/auth/login', credentials);

        setAuthHeader(res.data.token);

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.get('/auth/logout');
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
        setAuthHeader(persistedToken);

        const res = await axios.get('/auth/current');

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const editUser = createAsyncThunk('auth/editUser', async (formData, thunkAPI) => {
    try {
        const res = await axios.patch('/users/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});
