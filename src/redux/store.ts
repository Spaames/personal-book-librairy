import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/redux/features/authSlice";
import libraryReducer from "@/redux/features/librarySlice";
import wishlistReducer from "@/redux/features/wishlistSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "library", "wishlist"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    library: libraryReducer,
    wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;