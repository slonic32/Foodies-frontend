import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { categoriesReducer } from './categories/slice';
import { recipesReducer } from './recipes/slice';

import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        recipes: recipesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
