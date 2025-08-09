"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PhonesBox from "./PhonesBox";
import AddressesBox from "./AddressesBox";

export default function ProfilePage() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/");
        }
    }, [status, router]);

    return (
        <div className="flex flex-row justify-center gap-20 mt-5">

            <AddressesBox />
            <PhonesBox />

        </div>
    );
}