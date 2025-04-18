import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Stack,
    VStack,
    Image,
    Text
} from "@chakra-ui/react";
import { Book } from "@/utils/types";
import { fixAmazonUrl, getStatusName } from "@/utils/functions";

interface BookDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book;
}

export default function BookDetailsModal({ isOpen, onClose, book }: BookDetailsModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{book.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                        <Box boxSize={{ base: "150px", md: "200px" }} flexShrink={0}>
                            <Image
                                src={fixAmazonUrl(book.img)}
                                alt="Book Cover"
                                boxSize="100%"
                                objectFit="cover"
                                borderRadius="md"
                            />
                        </Box>
                        <VStack align="start" spacing={4} flex={1}>
                            <Box>
                                <Text fontWeight="bold">Auteur:</Text>
                                <Text>{book.author}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">EAN:</Text>
                                <Text>{book.ean}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">Nombre de pages:</Text>
                                <Text>{book.pages}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">Status:</Text>
                                <Text>{getStatusName(book.status)}</Text>
                            </Box>
                        </VStack>
                    </Stack>

                    <Box mt={6}>
                        <Text fontWeight="bold" mb={2}>Résumé:</Text>
                        <Text>{book.resume}</Text>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Fermer
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}