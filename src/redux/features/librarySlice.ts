import {Book, User} from "@/utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/redux/store";

interface LibraryState {
    books: Book[];
    user: User;
    loading: boolean;
    error: string | null;
}

const initialState: LibraryState = {
    books: [],
    user: {username: ""},
    loading: false,
    error: null,
}

const librarySlice = createSlice({
    name: "library",
    initialState,
    reducers: {
        startThunk(state) {
            state.loading = true;
            state.error = null;
        },
        failureThunk(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addBookSuccess(state, action: PayloadAction<Book>) {
            state.loading = false;
            state.error = null;
            state.books.push(action.payload);
        },
    },
});

export const {
    startThunk, failureThunk,
    addBookSuccess,
} = librarySlice.actions;

/*
-----
    THUNK : API SLICE OPERATIONS
-----
*/

export const addBookThunk = (book: Book, username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/addBook', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({book, username})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(addBookSuccess(data.book));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: addBook'))
    }
}


export default librarySlice.reducer;