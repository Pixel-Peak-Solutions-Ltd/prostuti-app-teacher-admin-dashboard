import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { baseApi } from "./api/baseApi";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import courseReducer from "./features/course/courseSlice";

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken', 'user']
};

const persistCourseIds = {
    key: 'courseAndLessonId',
    storage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCourseCreateReducer = persistReducer(persistCourseIds, courseReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        // courseDetails: courseReducer,
        courseAndLessonId: persistedCourseCreateReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // ignoring the checker for serializableCheck error for redux persist actions
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);