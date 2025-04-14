'use client';

import {
    Box,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {deleteAccountThunk, logoutThunk} from "@/redux/features/authSlice";
import {useRouter} from "next/navigation";
import HeaderBar from "@/components/HeaderBar";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const username = useAppSelector(state => state.auth.user.username);

    const handleDelete = () => {
        dispatch(deleteAccountThunk(username));
        dispatch(logoutThunk());
        router.push('/login');
    }


    return (
        <Box>
            <HeaderBar/>
            <Box textAlign="center" mt={10}>
                <Button
                    onClick={onOpen}
                    colorScheme="red"
                    size="lg"
                    _hover={{ opacity: 0.8 }}
                    boxShadow="lg"
                >
                    Supprimer mon compte
                </Button>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Supprimer votre compte</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                Cette action est <b>irréversible</b>. Voulez-vous vraiment supprimer votre compte ?
                            </Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>
                                Annuler
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete}>
                                Confirmer la suppression
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
}
