import {Book} from "@/utils/types";
import React, {useState} from "react";
import {Box, Card, CardBody, HStack, Stack, VStack, Image, Text, Select, Button} from "@chakra-ui/react";

interface BookCardLibraryProps {
    book: Book;
    changeStatus: (book: Book, status: number) => void;
}

export default function BookCardSearch({ book, changeStatus}: BookCardLibraryProps) {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    return (
        <Card mb={3}>
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
                                src={book.img}
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
                            placeholder="Changer le status"
                            w="100%"
                            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                        >
                            <option value="1">À lire</option>
                            <option value="2">Lu</option>
                            <option value="4">En cours de lecture</option>
                        </Select>
                        <Button
                            colorScheme="blue"
                            onClick={() => selectedCategory !== 0 && changeStatus(book, selectedCategory)}
                            w="100%"
                            isDisabled={selectedCategory === 0}
                        >
                            Modifier le status
                        </Button>
                    </VStack>
                </Stack>
            </CardBody>
        </Card>
    );
}