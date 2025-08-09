import React from "react";

export default function Footer() {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800 w-full">
            <div className="mx-auto max-w-screen-xl text-center">
                <p className="my-6 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Venta de tenis de marca a precios accesibles. Encuentra tu par perfecto y camina con estilo.
                </p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white text-xs sm:text-base">
                    <li>
                        <a href="#" className="mr-2 sm:mr-4 hover:underline md:mr-6">Acerca de nosotros</a>
                    </li>
                    <li>
                        <a href="#" className="mr-2 sm:mr-4 hover:underline md:mr-6">Síguenos</a>
                    </li>
                    <li>
                        <a href="#" className="mr-2 sm:mr-4 hover:underline md:mr-6">FAQs</a>
                    </li>
                    <li>
                        <a href="#" className="mr-2 sm:mr-4 hover:underline md:mr-6">Contacto</a>
                    </li>
                </ul>
                <span className="text-xs sm:text-sm text-gray-500 sm:text-center dark:text-gray-400 block">
                    © 2025 <a href="/" className="hover:underline">Flip Flop™</a>. Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
}
