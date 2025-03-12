'use client'

import {
    Box,
    Button,
    Card,
    CardBody,
    HStack,
    Image,
    Select,
    Text,
    VStack
} from "@chakra-ui/react";
import SearchBar from "@/components/SearchBar";
import {useState} from "react";
import {Book, BookSearch} from "@/utils/types";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addBookThunk} from "@/redux/features/librarySlice";

export default function Page() {
    const [searchResults, setSearchResults] = useState<BookSearch[]>([]);
    const username = useAppSelector(state => state.auth.user.username);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const dispatch = useAppDispatch();

    //call external api to check books
    const handleSearch = async (query: string) => {
        if (!query) return;
        try {
            const response = await fetch(`http://127.0.0.1:5000/search?query=${query}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    };

    //fix url of book's cover. Sometimes it's from babelio, others it's from amazon (so I don't need to add https://www.babelio.com/ before)
    //Since I add it automatically for now, I remove it
    const fixAmazonUrl = (url: string): string => {
        if (url.includes("amazon")) {
            return url.substring(23);
        }
        return url;
    }

    //get all data for the specific book, add the selected status and push it to the library in DB
    const handleAddBook = async (url: string) => {
        const response = await fetch(`http://127.0.0.1:5000/book?query=${url}`);
        const data = await response.json();
        const book: Book = {
            ean: data.ean,
            title: data.title,
            author: data.author,
            resume: data.resume,
            img: data.img,
            pages: data.pages,
            status: selectedCategory,
        }
        dispatch(addBookThunk(book, username));
    }


    return (
        <Box minH="100vh">
            <SearchBar onSearch={handleSearch} />
            <Box>
                {searchResults.map((book, index) => (
                    <Card key={index} mb={3}>
                        <CardBody>
                            <HStack spacing={2} justifyContent="space-between" w="100%">
                                <HStack spacing={4}>
                                    <Box>
                                        <Image src={fixAmazonUrl(book.img)} alt="Book Cover" />
                                    </Box>
                                    <VStack align="start">
                                        <Text fontSize="lg" fontWeight="bold">{book.title}</Text>
                                        <Text fontSize="md">{book.author}</Text>
                                    </VStack>
                                </HStack>
                                <HStack spacing={4}>
                                    <Select
                                        placeholder="Choisir une catégorie"
                                        w="200px"
                                        onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                                    >
                                        <option value="1">À lire</option>
                                        <option value="2">Lu</option>
                                        <option value="3">À acheter</option>
                                        <option value="4">En cours de lecture</option>
                                    </Select>
                                    <Button colorScheme="blue" onClick={() => {handleAddBook(book.book_url)}}>
                                        Ajouter à la bibliothèque
                                    </Button>
                                </HStack>
                            </HStack>
                        </CardBody>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}