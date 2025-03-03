"use client";

import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import {ChakraProvider, Spinner} from "@chakra-ui/react";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>Panthota - Personal Book Library</title>
            </head>
            <body>
                <Provider store={store}>
                    <PersistGate loading={<Spinner />} persistor={persistor}>
                        <ChakraProvider>
                            {children}
                        </ChakraProvider>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}