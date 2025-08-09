"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";

export default function AddressesBox() {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [departamento, setDepartamento] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [zona, setZona] = useState("");
    const [direccion, setDireccion] = useState("");
    const [referencia, setReferencia] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAddresses();
        // eslint-disable-next-line
    }, []);

    async function fetchAddresses() {
        try {
            const response = await axiosClient.get('/addresses', { withCredentials: true });
            console.log(response.data);
            setAddresses(Array.isArray(response.data) ? response.data : response.data.addresses || []);
        } catch (error) {
            console.error("Error al cargar las direcciones:", error);
        }
    }

    async function handleAddAddress(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosClient.post('/addresses', {
                departamento, municipio, zona, direccion, referencia
            }, { withCredentials: true });
            setDepartamento("");
            setMunicipio("");
            setZona("");
            setDireccion("");
            setReferencia("");
            fetchAddresses();
        } catch (error) {
            alert("Error al agregar la dirección");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteAddress(id: number) {
        if (!confirm("¿Seguro que deseas eliminar esta dirección?")) return;
        setLoading(true);
        try {
            await axiosClient.delete(`/addresses/${id}`, { withCredentials: true });
            setAddresses(addresses.filter(address => address.id !== id));
        } catch (error) {
            alert("Error al eliminar la dirección");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full sm:w-[420px] md:w-[500px] mt-10 p-6 rounded shadow-lg bg-neutral-900 text-white border border-neutral-700 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Mis direcciones</h2>
            <ul className="mb-6">
                {addresses.length === 0 && <li className="text-neutral-400">No tienes direcciones registradas.</li>}
                {addresses.map(address => (
                    <li key={address.id} className="flex flex-col mb-4 border-b border-neutral-700 pb-2">
                        <span className="font-semibold">{address.direccion}</span>
                        <span className="text-sm text-neutral-400">
                            {address.zona}, {address.municipio}, {address.departamento}
                        </span>
                        {address.referencia && (
                            <span className="text-xs text-neutral-500">Referencia: {address.referencia}</span>
                        )}
                        <button
                            className="text-red-400 hover:underline self-end mt-1"
                            onClick={() => handleDeleteAddress(address.id)}
                            disabled={loading}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddAddress} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={departamento}
                    onChange={e => setDepartamento(e.target.value)}
                    placeholder="Departamento"
                    required
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white placeholder-neutral-500"
                    disabled={loading}
                />
                <input
                    type="text"
                    value={municipio}
                    onChange={e => setMunicipio(e.target.value)}
                    placeholder="Municipio"
                    required
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white placeholder-neutral-500"
                    disabled={loading}
                />
                <input
                    type="text"
                    value={zona}
                    onChange={e => setZona(e.target.value)}
                    placeholder="Zona"
                    required
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white placeholder-neutral-500"
                    disabled={loading}
                />
                <input
                    type="text"
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                    placeholder="Dirección"
                    required
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white placeholder-neutral-500"
                    disabled={loading}
                />
                <input
                    type="text"
                    value={referencia}
                    onChange={e => setReferencia(e.target.value)}
                    placeholder="Referencia (opcional)"
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white placeholder-neutral-500"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700"
                    disabled={loading}
                >
                    Agregar dirección
                </button>
            </form>
        </div>
    );
}