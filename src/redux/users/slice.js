import { createSlice } from '@reduxjs/toolkit';
import {
    fetchOwnProfile,
    fetchOtherProfile,
    followUser,
    unfollowUser,
    fetchFollowers,
    fetchFollowing,
    fetchOwnRecipes,
    fetchFavoriteRecipes,
    fetchUserRecipes,
    fetchUserFollowers,
    deleteOwnRecipe,
    removeFavoriteRecipe,
} from './operations';

const initialState = {
    profile: null,
    isFollowing: false,

    recipes: [],
    favorites: [],
    followers: [],
    following: [],
    meta: null,

    loading: false,
    error: null,

    tabLoading: false,
    tabError: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null;
            state.isFollowing = false;

            state.recipes = [];
            state.favorites = [];
            state.followers = [];
            state.following = [];
            state.meta = null;

            state.loading = false;
            state.error = null;

            state.tabLoading = false;
            state.tabError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ================= PROFILE =================
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

            // ================= OWN RECIPES =================
            .addCase(fetchOwnRecipes.pending, (state) => {
                state.tabLoading = true;
                state.tabError = null;
            })
            .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
                state.recipes = Array.isArray(action.payload?.recipes) ? action.payload.recipes : [];
                state.meta = action.payload?.meta || null;
                state.tabLoading = false;
            })
            .addCase(fetchOwnRecipes.rejected, (state, action) => {
                state.tabLoading = false;
                state.tabError = action.payload;
            })

            // ================= USER RECIPES =================
            .addCase(fetchUserRecipes.pending, (state) => {
                state.tabLoading = true;
                state.tabError = null;
            })
            .addCase(fetchUserRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload?.recipes || [];
                state.meta = action.payload?.meta || null;
                state.tabLoading = false;
            })
            .addCase(fetchUserRecipes.rejected, (state, action) => {
                state.tabLoading = false;
                state.tabError = action.payload;
            })

            // ================= FAVORITES =================
            .addCase(fetchFavoriteRecipes.pending, (state) => {
                state.tabLoading = true;
                state.tabError = null;
            })
            .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
                state.favorites = Array.isArray(action.payload?.recipes) ? action.payload.recipes : [];
                state.meta = action.payload?.meta || null;
                state.tabLoading = false;
            })
            .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
                state.tabLoading = false;
                state.tabError = action.payload;
            })

            // ================= FOLLOWERS =================
            .addCase(fetchFollowers.pending, (state) => {
                state.tabLoading = true;
                state.tabError = null;
            })
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.followers = Array.isArray(action.payload) ? action.payload : [];
                state.tabLoading = false;
            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.tabLoading = false;
                state.tabError = action.payload;
            })

            // ================= USER FOLLOWERS =================
            .addCase(fetchUserFollowers.pending, (state) => {
                state.tabLoading = true;
                state.tabError = null;
            })
            .addCase(fetchUserFollowers.fulfilled, (state, action) => {
                state.followers = Array.isArray(action.payload) ? action.payload : [];
                state.tabLoading = false;
            })
            .addCase(fetchUserFollowers.rejected, (state, action) => {
                state.tabLoading = false;
                state.tabError = action.payload;
            })

            // ================= FOLLOWING =================
            .addCase(fetchFollowing.pending, (state) => {
                state.tabLoading = true;
                state.tabError = null;
            })
            .addCase(fetchFollowing.fulfilled, (state, action) => {
                state.following = Array.isArray(action.payload) ? action.payload : [];
                state.tabLoading = false;
            })
            .addCase(fetchFollowing.rejected, (state, action) => {
                state.tabLoading = false;
                state.tabError = action.payload;
            })

            // ================= DELETE OWN RECIPE =================
            .addCase(deleteOwnRecipe.fulfilled, (state, action) => {
                const id = String(action.payload);

                state.recipes = state.recipes.filter((r) => String(r.id || r._id) !== id);

                if (state.profile) {
                    state.profile.recipesCount = Math.max((state.profile.recipesCount ?? 1) - 1, 0);
                }
            })

            // ================= REMOVE FAVORITE =================
            .addCase(removeFavoriteRecipe.fulfilled, (state, action) => {
                const id = String(action.payload);

                state.favorites = state.favorites.filter((r) => String(r.id || r._id) !== id);

                if (state.profile) {
                    state.profile.favoritesCount = Math.max((state.profile.favoritesCount ?? 1) - 1, 0);
                }
            })

            // ================= FOLLOW =================
            .addCase(followUser.fulfilled, (state, action) => {
                const targetId = String(action.payload);
                const profileId = String(state.profile?.id || state.profile?._id || '');

                if (targetId === profileId) {
                    state.isFollowing = true;

                    if (state.profile) {
                        state.profile.followersCount = (state.profile.followersCount ?? 0) + 1;
                    }
                }

                const follower = state.followers.find((u) => String(u.id || u._id || u.userId) === targetId);
                if (follower) {
                    follower.isFollowing = true;
                }

                const followingUser = state.following.find((u) => String(u.id || u._id || u.userId) === targetId);
                if (followingUser) {
                    followingUser.isFollowing = true;
                }
            })

            // ================= UNFOLLOW =================
            .addCase(unfollowUser.fulfilled, (state, action) => {
                const targetId = String(action.payload);
                const profileId = String(state.profile?.id || state.profile?._id || '');

                if (targetId === profileId) {
                    state.isFollowing = false;

                    if (state.profile) {
                        state.profile.followersCount = Math.max((state.profile.followersCount ?? 1) - 1, 0);
                    }
                }

                const follower = state.followers.find((u) => String(u.id || u._id || u.userId) === targetId);
                if (follower) {
                    follower.isFollowing = false;
                }

                state.following = state.following.filter((u) => String(u.id || u._id || u.userId) !== targetId);
            });
    },
});

export const usersReducer = usersSlice.reducer;
export const { clearProfile } = usersSlice.actions;
