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
                <HomeButton text={"Ma Librairie"} colorScheme={"blue"} url={"/library"} />
                <HomeButton text={"Ajouter un Livre"} colorScheme={"blue"} url={"/addBookLib"} />
                <HomeButton text={"Liste de Souhait"} colorScheme={"blue"} url={"/wishlist"} />
                <HomeButton text={"Mon Compte"} colorScheme={"blue"} url={"/account"} />
            </Box>
        </Box>
    )
}