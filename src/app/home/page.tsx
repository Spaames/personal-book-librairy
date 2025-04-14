'use client'


import {Box} from "@chakra-ui/react";
import HomeButton from "@/components/HomeButton";
import HeaderBar from "@/components/HeaderBar";

export default function Page() {

    return (
        <Box>
            <HeaderBar/>
            <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gridTemplateRows="auto"
                gap={8}
                height={{ base: "auto", md: "90vh" }}
                p={4}
            >
                <HomeButton text={"Library"} colorScheme={"blue"} url={"/library"} />
                <HomeButton text={"Add Book"} colorScheme={"blue"} url={"/addBookLib"} />
                <HomeButton text={"Wishlist"} colorScheme={"blue"} url={"/wishlist"} />
                <HomeButton text={"Account"} colorScheme={"blue"} url={"/account"} />
            </Box>
        </Box>
    )
}