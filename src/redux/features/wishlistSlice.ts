import {Book, User} from "@/utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "@/redux/store";


interface WishlistState {
    books: Book[];
    user: User;
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    books: [],
    user: {username: ""},
    loading: false,
    error: null,
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        startThunk(state){
            state.loading = true;
            state.error = null
        },
        failureThunk(state, action: PayloadAction<string>){
            state.loading = false;
            state.error = action.payload;
        },
        addBookWishSuccess(state, action: PayloadAction<Book>) {
            state.loading = false;
            state.error = null;
            state.books.push(action.payload);
        },
        getWishlistSuccess(state, action: PayloadAction<Book[]>) {
            state.loading = false;
            state.error = null;
            state.books = action.payload;
        },
        removeBookSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = null;
            state.books = state.books.filter((book) => book.ean !== action.payload);
        },
    }
});

export const {
    startThunk, failureThunk,
    addBookWishSuccess, removeBookSuccess, getWishlistSuccess
} = wishlistSlice.actions;

/*
---
    THUNK : API SLICE OPERATIONS
---
 */

export const addBookWishThunk = (book: Book, username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/addBookWish', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({book, username})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(addBookWishSuccess(data.book));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: addBookWishThunk'))
    }
}

export const getWishlistThunk = (username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/getWishlist', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(getWishlistSuccess(data.books));
        } else {
            dispatch(failureThunk(data.message));
        }
    } catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: getWishlist'))
    }
}

export const removeBookThunk = (bookEan: string, username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startThunk());
        const response = await fetch('/api/deleteBookWish', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bookEan, username})
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(removeBookSuccess(data.ean));
        } else {
            dispatch(failureThunk(data.message));
        }
    }
    catch (e) {
        console.error(e);
        dispatch(failureThunk('Error w THUNK: removeBookThunk'))
    }
}

export default wishlistSlice.reducer;