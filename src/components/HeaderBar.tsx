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
    Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logoutThunk } from "@/redux/features/authSlice";

export default function HeaderBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const dispatch = useAppDispatch();
    const router = useRouter();

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
                    <Image src="/logo.png" alt="Logo" boxSize="32px" fallback={<Box fontSize="2xl">📚</Box>} />
                    {!isMobile && <Heading size="md">Home</Heading>}
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
