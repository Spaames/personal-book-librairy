'use client'

import {Box, Card, CardBody, HStack, Image, Text, VStack} from "@chakra-ui/react";
import SearchBar from "@/components/SearchBar";
import {useState} from "react";
import {BookSearch} from "@/utils/types";

export default function Page() {
    const [searchResults, setSearchResults] = useState<BookSearch[]>([]);

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

    const fixAmazonUrl = (url: string): string => {
        if (url.includes("amazon")) {
            return url.substring(23);
        }
        return url;
    }


    return (
        <Box minH="100vh">
            <SearchBar onSearch={handleSearch} />
            <Box>
                {searchResults.map((book, index) => (
                    <Card key={index} mb={3}>
                        <CardBody>
                            <HStack spacing={2}>
                                <Box mr={6}>
                                    <Image src={fixAmazonUrl(book.img)} alt='Book Cover' />
                                </Box>
                                <VStack spacing={2}>
                                    <Text fontSize='lg' fontWeight={"bold"}>{book.title}</Text>
                                    <Text fontSize='md' textAlign={"left"}>{book.author}</Text>
                                </VStack>
                            </HStack>
                        </CardBody>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}