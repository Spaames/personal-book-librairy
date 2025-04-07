'use client'

import {Box} from "@chakra-ui/react";
import FilterBar from "@/components/FilterBar";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {useEffect, useState} from "react";
import {Book} from "@/utils/types";
import BookCardLibrary from "@/components/BookCardLibrary";
import {getLibrary, updateStatusThunk} from "@/redux/features/librarySlice";
export default function Page(){
    const [filteredLibrary, setFilteredLibrary] = useState<Book[]>([]);
    const dispatch = useAppDispatch();

    const library = useAppSelector((state) => state.library.books);
    const username = useAppSelector((state) => state.auth.user.username);

    useEffect(() => {
        dispatch(getLibrary(username));
    }, [dispatch, username]);

    useEffect(() => {
        setFilteredLibrary(library);
    }, [library]);


    const filterStatus = (status: number): Book[] => {
        return library.filter((book) => book.status === status);
    }

    const handleFilter= (status: number) => {
        if (status === 5) {
            setFilteredLibrary(library);
            return;
        }
        setFilteredLibrary(filterStatus(status));
    }

    const handleChangeStatus = (book: Book, status: number) => {
        dispatch(updateStatusThunk(book.ean, status, username));
    }

    return (
        <Box minH="100vh" p={4}>
            <FilterBar filterBook={handleFilter} />
            <Box>
                {filteredLibrary.map((book, index) => (
                    <BookCardLibrary book={book} key={index} changeStatus={handleChangeStatus} />
                ))}
            </Box>
        </Box>
    )
}