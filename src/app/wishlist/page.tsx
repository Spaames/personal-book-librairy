'use client'


import {Box} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "@/redux/hook";

export default function Page() {
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.user.username);


    return (
        <Box minH="100vh">
            <Box>
                {/*component*/}
            </Box>
        </Box>
    )
}