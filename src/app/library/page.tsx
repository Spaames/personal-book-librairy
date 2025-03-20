'use client'

import {Box, Text} from "@chakra-ui/react";
import FilterBar from "@/components/FilterBar";
import {useAppSelector} from "@/redux/hook";
import {useEffect, useState} from "react";
import {Book} from "@/utils/types";
import BookCardSearch from "@/components/BookCardSearch";

export default function Page(){
    const [filteredLibrary, setFilteredLibrary] = useState<Book[]>([]);

    const library = useAppSelector((state) => state.library.books);

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

    return (
        <Box minH="100vh" p={4}>
            <FilterBar filterBook={handleFilter} />
            <Box>
                {filteredLibrary.map((book, index) => (
                    <Text key={index}>{book.title}</Text>
                ))}
            </Box>
        </Box>
    )
}