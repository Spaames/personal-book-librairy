"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {useAppDispatch} from "@/redux/hook";
import {registerThunk} from "@/redux/features/authSlice";

export default function RegisterPage() {
    // State for form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Clear the error and proceed with registration logic
        setError("");
        try {
            dispatch(registerThunk(username, firstName, lastName, password));
            router.push("/login");
        } catch {
            setError("Error while registering in DB");
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
                    <Heading>Register</Heading>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {error && (
                            <Alert status="error" mb={4}>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="lastName" isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="confirm-password" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
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
                            Register
                        </Button>
                    </Stack>
                </form>
                <Text mt={4} textAlign="center">
                    Already have an account?{" "}
                    <Link as={NextLink} href="/login" color="teal.500" fontWeight="bold">
                        Sign in instead
                    </Link>
                </Text>
            </Box>
        </Flex>
    );
}