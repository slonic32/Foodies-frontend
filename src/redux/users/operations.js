import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_HOST } from '../../config/backend';

axios.defaults.baseURL = `${BACKEND_HOST}/api`;

function getErrorMessage(error) {
    const responseData = error?.response?.data;

    if (typeof responseData === 'string' && responseData.trim()) {
        return responseData;
    }

    if (typeof responseData?.message === 'string' && responseData.message.trim()) {
        return responseData.message;
    }

    return error?.message || 'Something went wrong';
}

export const fetchOwnProfile = createAsyncThunk('users/fetchOwnProfile', async (token, thunkAPI) => {
    try {
        const res = await axios.get('/users/current', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const fetchOtherProfile = createAsyncThunk('users/fetchOtherProfile', async ({ id, token }, thunkAPI) => {
    try {
        const [profileRes, followingRes] = await Promise.all([
            axios.get(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            axios.get('/users/following', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        ]);

        const followingList = followingRes.data || [];
        const isFollowing = followingList.some((item) => String(item.id || item._id) === String(id));

        return {
            profile: profileRes.data,
            isFollowing,
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const followUser = createAsyncThunk('users/followUser', async ({ id, token }, thunkAPI) => {
    try {
        await axios.post(
            `/users/follow/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const unfollowUser = createAsyncThunk('users/unfollowUser', async ({ id, token }, thunkAPI) => {
    try {
        await axios.delete(`/users/follow/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});
