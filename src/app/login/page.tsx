'use client'

import {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {useRouter} from "next/navigation";
import {Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Link, Text} from "@chakra-ui/react";
import {loginThunk} from "@/redux/features/authSlice";
import NextLink from "next/link";

const Page = () => {
    //form field
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { error, loading, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginThunk(username, password));
    }

    //redirect if we successfully logged
    if (isAuthenticated) {
        router.push('/home');
    }

    return (
        <Flex minHeight="100vh" align="center" justify="center">
            <Box
                p={8}
                maxWidth="400px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Box textAlign="center" mb={6}>
                    <Heading>Login</Heading>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {error && (
                            <Alert status="error" mb={4}>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        <FormControl id="email" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            colorScheme="teal"
                            type="submit"
                            width="full"
                            isLoading={loading}
                        >
                            Se Connecter
                        </Button>
                    </Stack>
                </form>
                <Text mt={4} textAlign="center">
                    Vous n'avez pas encore de compte?{" "}
                    <Link as={NextLink} href="/register" color="teal.500" fontWeight="bold">
                        Créer votre compte plutôt
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
};

export default Page;