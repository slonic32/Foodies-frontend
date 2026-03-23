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

export const fetchFollowers = createAsyncThunk('users/fetchFollowers', async (token, thunkAPI) => {
    try {
        const res = await axios.get('/users/followers', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const fetchFollowing = createAsyncThunk('users/fetchFollowing', async (token, thunkAPI) => {
    try {
        const res = await axios.get('/users/following', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const fetchOwnRecipes = createAsyncThunk(
    'users/fetchOwnRecipes',
    async ({ token, page = 1, limit = 12 }, thunkAPI) => {
        try {
            const res = await axios.get('/recipes/own', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { page, limit },
            });

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error));
        }
    },
);

export const fetchFavoriteRecipes = createAsyncThunk(
    'users/fetchFavoriteRecipes',
    async ({ token, page = 1, limit = 12 }, thunkAPI) => {
        try {
            const res = await axios.get('/recipes/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { page, limit },
            });

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error));
        }
    },
);

export const deleteOwnRecipe = createAsyncThunk('users/deleteOwnRecipe', async ({ recipeId, token }, thunkAPI) => {
    try {
        await axios.delete(`/recipes/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return recipeId;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const removeFavoriteRecipe = createAsyncThunk(
    'users/removeFavoriteRecipe',
    async ({ recipeId, token }, thunkAPI) => {
        try {
            await axios.delete(`/recipes/${recipeId}/favorite`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return recipeId;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error));
        }
    },
);

export const fetchUserRecipes = createAsyncThunk(
    'users/fetchUserRecipes',
    async ({ id, token, page = 1, limit = 12 }, thunkAPI) => {
        try {
            const res = await axios.get(`/recipes/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { page, limit },
            });

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error));
        }
    },
);

export const fetchUserFollowers = createAsyncThunk('users/fetchUserFollowers', async ({ id, token }, thunkAPI) => {
    try {
        const res = await axios.get(`/users/${id}/followers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});
