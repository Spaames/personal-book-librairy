import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from "@/redux/store";

interface User {
    username: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {username: ""},
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
});

export const {

} = authSlice.actions;


//THUNK

export default authSlice.reducer;