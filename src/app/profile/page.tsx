"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/");
        }
    }, [status, router]);

    return (
        <div>
            <h1>Mi Perfil</h1>
            <p>Bienvenido, {session?.user?.name}</p>
            <p>Email: {session?.user?.email}</p>
        </div>
    );
}