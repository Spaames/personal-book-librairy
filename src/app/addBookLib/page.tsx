'use client'

import {
    Box,
} from "@chakra-ui/react";
import SearchBar from "@/components/SearchBar";
import {useState} from "react";
import {Book, BookSearch} from "@/utils/types";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addBookThunk} from "@/redux/features/librarySlice";
import AlertInfo from "@/components/AlertInfo";
import BookCardSearch from "@/components/BookCardSearch";

export default function Page() {
    const [searchResults, setSearchResults] = useState<BookSearch[]>([]);
    const username = useAppSelector(state => state.auth.user.username);
    const dispatch = useAppDispatch();
    const [alert, setAlert] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);

    //call external api to check books
    const handleSearch = async (query: string) => {
        if (!query) return;
        setAlert(null);
        try {
            const response = await fetch(`http://127.0.0.1:5000/search?query=${query}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            setAlert({message: "Failed to call api", type: "error"});
            console.error('Erreur lors de la recherche:', error);
        }
    };

    //get all data for the specific book, add the selected status and push it to the library in DB
    const handleAddBook = async (url: string, status: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/book?query=${url}`);
            const data = await response.json();
            const book: Book = {
                ean: data.ean,
                title: data.title,
                author: data.author,
                resume: data.resume,
                img: data.img,
                pages: data.pages,
                status: status, //handle by the components now
            }
            console.log(book);
            console.log(username);
            dispatch(addBookThunk(book, username));
            setAlert({message: "Book added :)", type: "success"});
        } catch (error) {
            setAlert({message: "Failed to add book (api)", type: "error"});
            console.log(error);
        }

    }


    return (
        <Box minH="100vh" p={4}>
            <SearchBar onSearch={handleSearch} />
            <Box>
                {alert && <AlertInfo text={alert.message} type={alert.type} />}
                {searchResults.map((book, index) => (
                    <BookCardSearch key={index} book={book} onAddBook={handleAddBook} />
                ))}
            </Box>
        </Box>
    )
}