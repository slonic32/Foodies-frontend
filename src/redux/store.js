import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { categoriesReducer } from './categories/slice';
import { recipesReducer } from './recipes/slice';
import { filtersReducer } from './filters/slice';
import { usersReducer } from './users/slice';
import { favoritesReducer } from './favorites/favoritesSlice';

import { testimonialsReducer } from './testimonials/slice';

import { paginationReducer } from './pagination/slice';


import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export const resetStore = createAction('app/resetStore');

const appReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    recipes: recipesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    testimonials: testimonialsReducer,
    pagination: paginationReducer,
});

const rootReducer = (state, action) => {
    if (action.type === resetStore.type) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
