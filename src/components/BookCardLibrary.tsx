import { Book } from "@/utils/types";
import React, { useState } from "react";
import {
    Box,
    Card,
    CardBody,
    HStack,
    Stack,
    VStack,
    Image,
    Text,
    Select,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { fixAmazonUrl, getStatusName } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deleteBookThunk } from "@/redux/features/librarySlice";
import BookDetailsModal from "./BookDetailsModal";

interface BookCardLibraryProps {
    book: Book;
    changeStatus: (book: Book, status: number) => void;
}

export default function BookCardLibrary({ book, changeStatus}: BookCardLibraryProps) {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.user.username);

    return (
        <>
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
                            <Button
                                colorScheme="teal"
                                onClick={onOpen}
                                w="100%"
                            >
                                Voir détails
                            </Button>
                            <Select
                                placeholder={getStatusName(book.status)}
                                w="100%"
                                onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                            >
                                <option value="1">À lire</option>
                                <option value="2">Lu</option>
                                <option value="4">En cours de lecture</option>
                                <option value={"5"}>Abandonné</option>
                            </Select>
                            <Button
                                colorScheme="blue"
                                onClick={() => selectedCategory !== 0 && changeStatus(book, selectedCategory)}
                                w="100%"
                                isDisabled={selectedCategory === 0}
                            >
                                Modifier le status
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => dispatch(deleteBookThunk(book.ean, username))}
                            >
                                Supprimer
                            </Button>
                        </VStack>
                    </Stack>
                </CardBody>
            </Card>

            <BookDetailsModal
                isOpen={isOpen}
                onClose={onClose}
                book={book}
            />
        </>
    );
}