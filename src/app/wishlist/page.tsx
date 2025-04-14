'use client'


import {Box} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {useEffect} from "react";
import {getWishlistThunk, removeBookThunk} from "@/redux/features/wishlistSlice";
import BookCardWishlist from "@/components/BookCardWishlist";
import {Book} from "@/utils/types";
import {addBookThunk} from "@/redux/features/librarySlice";
import HeaderBar from "@/components/HeaderBar";

export default function Page() {
    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.books);
    const username = useAppSelector((state) => state.auth.user.username);

    useEffect(() => {
        dispatch(getWishlistThunk(username));
    }, [dispatch, username]);

    const handleChangeStatus = (book: Book) => {
        dispatch(addBookThunk(book, username));
        dispatch(removeBookThunk(book.ean, username));
    }

    return (
        <Box minH="100vh">
            <HeaderBar/>
            <Box>
                {wishlist.map((book, index) => (
                    <BookCardWishlist key={index} book={book} changeStatus={handleChangeStatus} />
                ))}
            </Box>
        </Box>
    )
}