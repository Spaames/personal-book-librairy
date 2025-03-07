import {Box, Button, Flex, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import {FormEvent, useState} from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: FormEvent)=> {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <Box as="header" position="sticky" top={0} width="100%" boxShadow="md" px={4} py={2} zIndex={10}>
            <form onSubmit={handleSubmit}>
                <Flex maxW="90%" mx="auto" gap={2}>
                    <InputGroup flex="1">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Rechercher..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            _focus={{ borderColor: 'blue.400' }}
                            size="lg"
                        />
                    </InputGroup>
                    <Button type="submit" colorScheme="green" size="lg">
                        Rechercher
                    </Button>
                </Flex>
            </form>
        </Box>
    )
}

export default SearchBar;