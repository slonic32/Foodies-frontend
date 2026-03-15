import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';

import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export const resetStore = createAction('app/resetStore');

const appReducer = combineReducers({
    auth: authReducer,
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
