"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/utils/axiosClient";

export default function PhonesBox() {
    const [phones, setPhones] = useState<any[]>([]);
    const [numero, setNumero] = useState("");
    const [tipo, setTipo] = useState("celular");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPhones();
        // eslint-disable-next-line
    }, []);

    async function fetchPhones() {
        try {
            const response = await axiosClient.get('/phones', { withCredentials: true });
            setPhones(response.data);
        } catch (error) {
            console.error("Error al cargar los teléfonos:", error);
        }
    }

    async function handleAddPhone(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosClient.post('/phones', { numero, tipo }, { withCredentials: true });
            setNumero("");
            setTipo("celular");
            fetchPhones();
        } catch (error) {
            alert("Error al agregar el teléfono");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeletePhone(id: number) {
        if (!confirm("¿Seguro que deseas eliminar este teléfono?")) return;
        setLoading(true);
        try {
            await axiosClient.delete(`/phones/${id}`, { withCredentials: true });
            setPhones(phones.filter(phone => phone.id !== id));
        } catch (error) {
            alert("Error al eliminar el teléfono");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full sm:w-[420px] md:w-[500px] mt-10 p-6 rounded shadow-lg bg-neutral-900 text-white border border-neutral-700 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Mis teléfonos</h2>
            <ul className="mb-6">
                {phones.length === 0 && <li className="text-neutral-400">No tienes teléfonos registrados.</li>}
                {phones.map(phone => (
                    <li key={phone.id} className="flex justify-between items-center mb-2">
                        <span>
                            {phone.numero} <span className="text-sm text-neutral-400">({phone.tipo})</span>
                        </span>
                        <button
                            className="text-red-400 hover:underline"
                            onClick={() => handleDeletePhone(phone.id)}
                            disabled={loading}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddPhone} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={numero}
                    onChange={e => setNumero(e.target.value.replace(/\D/, ""))}
                    placeholder="Ej: 51508056"
                    required
                    minLength={8}
                    maxLength={8}
                    pattern="[2-7][0-9]{7}"
                    title="Debe ser un número de 8 dígitos que empiece de 2 a 7"
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white placeholder-neutral-500"
                    disabled={loading}
                />
                <select
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                    className="border border-neutral-700 rounded px-3 py-2 bg-neutral-800 text-white"
                    disabled={loading}
                >
                    <option value="celular">Celular</option>
                    <option value="casa">Casa</option>
                    <option value="trabajo">Trabajo</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700"
                    disabled={loading}
                >
                    Agregar teléfono
                </button>
            </form>
        </div>
    );
}