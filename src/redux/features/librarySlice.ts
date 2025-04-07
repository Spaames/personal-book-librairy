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
        getLibrarySuccess(state, action: PayloadAction<Book[]>) {
            state.loading = false;
            state.error = null;
            state.books = action.payload;
        },
        deleteBookSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.books = state.books.filter((book) => book.ean !== action.payload);
        },
        updateBookStatusSuccess(state, action: PayloadAction<Book>) {
            state.loading = false;
            state.error = null;
            const book = state.books.find(b => b.ean === action.payload.ean);
            if (book) {
                book.status = action.payload.status;
            }
        },
    },
});

export const {
    startThunk, failureThunk,
    addBookSuccess, getLibrarySuccess, deleteBookSuccess, updateBookStatusSuccess,
} = librarySlice.actions;

/*
-----
    THUNK : API SLICE OPERATIONS
-----
*/

export const addBookThunk = (book: Book, username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/addBookLib', {
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
        dispatch(failureThunk('Error w THUNK: addBookLib'))
    }
}

export const getLibrary = (username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/getLibrary', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(getLibrarySuccess(data.books));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: getLibrary'))
    }
}

export const deleteBookThunk = (bookEan: string, username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/deleteBookLib', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bookEan, username})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(deleteBookSuccess(data.ean));
        } else {
            dispatch(failureThunk(data.message));
        }
    }
    catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: deleteBookThunk'))
    }
}

export const updateStatusThunk = (bookEan: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/updateStatusBookLib', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bookEan})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(updateBookStatusSuccess(data.book));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: updateStatusThunk'))
    }
}


export default librarySlice.reducer;