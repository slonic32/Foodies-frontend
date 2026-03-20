import { BACKEND_HOST } from '../../config/backend';

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectToken = (state) => state.auth.token;

export function selectAuthLoading(state) {
    return state.auth.loading;
}

export const selectAvatar = (state) => {
    if (state.auth.user.avatar) {
        return BACKEND_HOST + '/' + state.auth.user.avatar;
    }
    return null;
};

export function selectAuthError(state) {
    return state.auth.error;
}
