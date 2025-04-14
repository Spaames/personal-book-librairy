import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from "@/redux/store";
import {User} from "@/utils/types";
import {deleteBookSuccess} from "@/redux/features/librarySlice";

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
        startThunk(state) {
            state.loading = true;
            state.error = null;
        },
        failureThunk(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        loginSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.user.username = action.payload;
            state.isAuthenticated = true;
        },
        registerSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.error = null;
            state.user.username = "";
            state.isAuthenticated = false;
        },
        deleteAccountSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.user.username = "";
            state.isAuthenticated = false;
        },
    },
});

export const {
    startThunk, failureThunk,
    loginSuccess, registerSuccess, logoutSuccess, deleteAccountSuccess,
} = authSlice.actions;

/*
-----
    THUNK : API SLICE OPERATIONS
-----
*/

export const loginThunk = (username: string, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            dispatch(loginSuccess(data.username));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: Login'));
    }
}

export const registerThunk = (username: string, firstName: string, lastName: string, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, firstName, lastName, password }),
        });

        const data = await response.json();
        if(response.ok) {
            dispatch(registerSuccess(data.username));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (error) {
        console.log(error);
        dispatch(failureThunk("Error w THUNK : register"));
    }
}

export const logoutThunk = () : AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/logout', {
            method: 'GET',
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            dispatch(logoutSuccess());
        } else {
            dispatch(failureThunk('Error: cannot logout (try)'));
        }
    } catch (error) {
        console.log(error);
        dispatch(failureThunk('Error w THUNK: logout'));
    }
}

export const deleteAccountThunk = (username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/deleteAccount', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(deleteAccountSuccess(data.username));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (error) {
        console.error(error);
        dispatch(failureThunk('Error w THUNK: deleteAccount'));
    }
}




export default authSlice.reducer;