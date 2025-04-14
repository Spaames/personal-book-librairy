"use client";

import { useState, FormEvent } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Link,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {useAppDispatch} from "@/redux/hook";
import {registerThunk} from "@/redux/features/authSlice";
import AlertInfo from "@/components/AlertInfo";

export default function RegisterPage() {
    // State for form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);
    const dispatch = useAppDispatch();

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({message: "Passwords do not match", type: "error"});
            return;
        }

        // Clear the error and proceed with registration logic
        setAlert(null);
        try {
            dispatch(registerThunk(username, firstName, lastName, password));
            setAlert({message: "Successfully registered", type: "success"});
        } catch {
            setAlert({message: "Error with the api call", type: "error"});
        }
    };

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
                    <Heading>Créer son compte</Heading>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {alert && <AlertInfo text={alert.message} type={alert.type} />}
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>Prénom</FormLabel>
                            <Input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="lastName" isRequired>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                        <FormControl id="confirm-password" isRequired>
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            colorScheme="teal"
                            type="submit"
                            width="full"
                        >
                            Créer son compte
                        </Button>
                    </Stack>
                </form>
                <Text mt={4} textAlign="center">
                    Vous avez déjà un compte{" "}
                    <Link as={NextLink} href="/login" color="teal.500" fontWeight="bold">
                        Connectez vous plutôt
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
}