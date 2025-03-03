'use client'

import {ReactNode, useEffect, useState} from "react"
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";

export function ChakraProviders( { children }: { children: ReactNode}) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <ChakraProvider theme={theme}>
            {mounted && children}
        </ChakraProvider>
    )
}