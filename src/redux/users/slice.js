import { createSlice } from '@reduxjs/toolkit';
import { fetchOwnProfile, fetchOtherProfile, followUser, unfollowUser } from './operations';

const initialState = {
    profile: null,
    isFollowing: false,
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null;
            state.isFollowing = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOwnProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOwnProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.isFollowing = false;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchOwnProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchOtherProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOtherProfile.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
                state.isFollowing = action.payload.isFollowing;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchOtherProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(followUser.fulfilled, (state) => {
                state.isFollowing = true;
                if (state.profile) {
                    state.profile.followersCount = (state.profile.followersCount ?? 0) + 1;
                }
            })
            .addCase(unfollowUser.fulfilled, (state) => {
                state.isFollowing = false;
                if (state.profile) {
                    state.profile.followersCount = Math.max((state.profile.followersCount ?? 1) - 1, 0);
                }
            });
    },
});

export const usersReducer = usersSlice.reducer;
export const { clearProfile } = usersSlice.actions;
