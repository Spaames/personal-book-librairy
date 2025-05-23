"use client"

import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/redux/hook";
import {logoutThunk} from "@/redux/features/authSlice";
import {persistor} from "@/redux/store";
import {useEffect} from "react";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            dispatch(logoutThunk());
            await persistor.flush();
            await persistor.purge();
            router.push('/login');
        }

        handleLogout();

    }, [dispatch, router]);
}