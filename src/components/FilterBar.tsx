import React from "react";
import {Box, Button, Flex} from "@chakra-ui/react";

interface FilterBarProps {
    filterBook: (status: number) => void;
}

export default function FilterBar( { filterBook }: FilterBarProps ) {


    return (
        <Box as="header" position="sticky" top={0} width="100%" boxShadow="md" px={4} py={2} zIndex={10}>
            <Flex maxW="90%" mx="auto" gap={2}>
                <Button
                onClick={() => {filterBook(5)}}
                >
                    Tous
                </Button>
                <Button
                onClick={() => {filterBook(1)}}
                >
                    A lire
                </Button>
                <Button
                onClick={() => {filterBook(2)}}
                >
                    Lu
                </Button>
                <Button
                onClick={() => {filterBook(4)}}
                >
                    En cours de lecture
                </Button>
            </Flex>
        </Box>
    )
}