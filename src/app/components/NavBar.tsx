"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import axiosClient from '@/utils/axiosClient';
import { usePathname } from 'next/navigation';
import axios from 'axios';

export default function NavBar() {
    const pathname = usePathname();
    const navLinks = [
        { href: '/', label: 'Inicio' },
        { href: '/caballeros', label: 'Caballeros' },
        { href: '/damas', label: 'Damas' },
        { href: '/ofertas', label: 'Ofertas' },
    ];
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        console.log("useEffect ejecutado, session:", session);
        if (session?.user) {
            console.log("session.user existe:", session.user);
            const googleId = (session.user as any).googleId;
            console.log("googleId:", googleId);
            if (googleId) {
                console.log("Enviando petición a /users");
                console.log("Datos enviados:", {
                    googleId,
                    email: session.user.email,
                    nombre: session.user.name,
                    foto: session.user.image
                });
                axiosClient.post('/users', {
                    googleId,
                    email: session.user.email,
                    nombre: session.user.name,
                    foto: session.user.image
                }, { withCredentials: true }) // <- importante para que el navegador acepte la cookie
                    .then(res => {
                        console.log("Respuesta del backend:", res);
                        // Ya no necesitas guardar el token en localStorage ni en cookies manualmente
                    })
                    .catch((err) => {
                        console.error("Error en la petición a /users:", err);
                    });
            }
        }
    }, [session?.user]);

    const handleLogout = async () => {
        try {
            await axiosClient.post('/users/logout', {}, { withCredentials: true });
            signOut();
            console.log("Sesión cerrada correctamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/LOGO-04.png" width={100} height={100} alt="Logo" />
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {session?.user ? (
                        <>
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <Image
                                    className="w-8 h-8 rounded-full"
                                    src={session.user.image ?? "/default-avatar.png"}
                                    alt="user photo"
                                    width={32}
                                    height={32}
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-16">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{session.user.name}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{session.user.email}</span>
                                    </div>
                                    <ul className="py-2">
                                        <li>
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Mi Perfil</Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={() => signIn('google')}
                            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Iniciar sesión
                        </button>
                    )}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`block py-2 px-3 rounded-sm md:p-0
                    ${pathname === link.href
                                            ? 'text-blue-700 bg-blue-100 md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                                            : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        }`}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
