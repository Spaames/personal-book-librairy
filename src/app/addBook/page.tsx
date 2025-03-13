'use client'

import {
    Box,
    Button,
    Card,
    CardBody,
    HStack,
    Image,
    Select, Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import SearchBar from "@/components/SearchBar";
import {useState} from "react";
import {Book, BookSearch} from "@/utils/types";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addBookThunk} from "@/redux/features/librarySlice";
import AlertInfo from "@/components/AlertInfo";

export default function Page() {
    const [searchResults, setSearchResults] = useState<BookSearch[]>([]);
    const username = useAppSelector(state => state.auth.user.username);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
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
        if (selectedCategory === -1) {
            console.log("selectedCategory", selectedCategory);
            setAlert({message: "Please select a category", type: "error"});
            return;
        }
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
                status: selectedCategory,
            }
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
                    <Card key={index} mb={3}>
                        <CardBody>
                            <Stack
                                direction={{ base: "column", md: "row" }}
                                spacing={4}
                                justifyContent="space-between"
                                w="100%"
                            >
                                <HStack spacing={4} align="flex-start">
                                    <Box boxSize={{ base: "100px", md: "150px" }} flexShrink={0}>
                                        <Image
                                            src={fixAmazonUrl(book.img)}
                                            alt="Book Cover"
                                            boxSize="100%"
                                            objectFit="cover"
                                            borderRadius="md"
                                        />
                                    </Box>
                                    <VStack align="start" spacing={2} flex={1}>
                                        <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                                            {book.title}
                                        </Text>
                                        <Text fontSize="md" noOfLines={1}>
                                            {book.author}
                                        </Text>
                                    </VStack>
                                </HStack>
                                <VStack align="stretch" spacing={2} mt={{ base: 4, md: 0 }}>
                                    <Select
                                        placeholder="Choisir une catégorie"
                                        w="100%"
                                        onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                                    >
                                        <option value="1">À lire</option>
                                        <option value="2">Lu</option>
                                        <option value="3">À acheter</option>
                                        <option value="4">En cours de lecture</option>
                                    </Select>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => handleAddBook(book.book_url)}
                                        w="100%"
                                    >
                                        Ajouter à la bibliothèque
                                    </Button>
                                </VStack>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}