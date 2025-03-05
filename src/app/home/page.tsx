'use client'


import {Button} from "@chakra-ui/react";
import {useAppDispatch} from "@/redux/hook";
import {logoutThunk} from "@/redux/features/authSlice";
import {useRouter} from "next/navigation";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutThunk());
        router.push("/login");
    }

    return (
        <Button
            colorScheme="red"
            type="submit"
            width="full"
            onClick={handleLogout}
        >
            logout
        </Button>
    )
}