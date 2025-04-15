'use client';

import {
    Box,
    Flex,
    IconButton,
    Button,
    Heading,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    useBreakpointValue,
    Spacer,
    VStack,
    HStack,
    useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { logoutThunk } from "@/redux/features/authSlice";

export default function HeaderBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode(); // Hook pour gérer le mode sombre/clair

    const handleLogout =  () => {
        dispatch(logoutThunk());
        router.push('/login');
    };

    const goHome = () => {
        router.push('/home');
    };

    return (
        <Box as="header" px={4} py={3} boxShadow="md" position="sticky" top={0} zIndex={100}>
            <Flex align="center" justify="space-between">
                <HStack cursor="pointer" onClick={goHome} _hover={{bg: "gray.700", borderRadius: "md", transition: "0.2s"}}>
                    <Box fontSize="2xl">📚</Box>
                    {!isMobile && <Heading size="md">Accueil</Heading>}
                </HStack>

                {isMobile ? (
                    <>
                        <IconButton
                            aria-label="Menu"
                            icon={<HamburgerIcon />}
                            variant="ghost"
                            onClick={onOpen}
                        />
                        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                            <DrawerOverlay />
                            <DrawerContent bg="gray.800" color="white">
                                <DrawerHeader display="flex" justifyContent="space-between" alignItems="center">
                                    Menu
                                    <IconButton
                                        aria-label="Close menu"
                                        icon={<CloseIcon />}
                                        onClick={onClose}
                                        variant="ghost"
                                    />
                                </DrawerHeader>
                                <DrawerBody>
                                    <VStack align="start" spacing={4} mt={4}>
                                        <Button variant="ghost" onClick={goHome}>Accueil</Button>
                                        <Button colorScheme="red" onClick={handleLogout}>Déconnexion</Button>
                                    </VStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : (
                    <Flex align="center" gap={4}>
                        {/* Button to toggle color mode */}
                        <IconButton
                            aria-label="Toggle dark/light mode"
                            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            onClick={toggleColorMode}
                            variant="ghost"
                        />
                        <Spacer />
                        <Button colorScheme="red" variant="solid" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
}
