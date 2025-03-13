'use client'


import {Box, Button, Heading} from "@chakra-ui/react";
import {useAppDispatch} from "@/redux/hook";
import {logoutThunk} from "@/redux/features/authSlice";
import {useRouter} from "next/navigation";
import HomeButton from "@/components/HomeButton";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutThunk());
        router.push("/login");
    }

    return (
        <Box>
            <Box textAlign="center" p={4}>
                <Heading as="h1" size="xl">Accueil</Heading>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gridTemplateRows="auto"
                gap={8}
                height={{ base: "auto", md: "90vh" }}
                p={4}
            >
                <HomeButton text={"Library"} colorScheme={"blue"} url={"/library"} />
                <HomeButton text={"Add Book"} colorScheme={"blue"} url={"/addBook"} />
                <HomeButton text={"Wishlist"} colorScheme={"blue"} url={"/wishlist"} />
                <HomeButton text={"Account"} colorScheme={"blue"} url={"/account"} />
            </Box>
        </Box>
    )
}