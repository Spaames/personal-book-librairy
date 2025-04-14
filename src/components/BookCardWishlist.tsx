import {Book} from "@/utils/types";
import React from "react";
import {Box, Card, CardBody, HStack, Stack, VStack, Image, Text, Button} from "@chakra-ui/react";
import {fixAmazonUrl} from "@/utils/functions";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {removeBookThunk} from "@/redux/features/wishlistSlice";

interface BookCardWishlistProps {
    book: Book;
    changeStatus: (book: Book) => void;
}

export default function BookCardWishlist({ book, changeStatus}: BookCardWishlistProps) {
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.user.username);

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
                            colorScheme="blue"
                            onClick={() =>  changeStatus(book)}
                            w="100%"
                        >
                            Ajouter à la librarie
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => dispatch(removeBookThunk(book.ean, username))}
                        >
                            Supprimer
                        </Button>
                    </VStack>
                </Stack>
            </CardBody>
        </Card>
    );
}