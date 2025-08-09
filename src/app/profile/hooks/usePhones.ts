import { useState } from "react";
import axiosClient from "@/utils/axiosClient";

export function usePhones() {
    const [phones, setPhones] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchPhones() {
        try {
            const response = await axiosClient.get('/phones', { withCredentials: true });
            setPhones(response.data);
        } catch (error) {
            console.error("Error al cargar los teléfonos:", error);
        }
    }

    async function addPhone(data: any) {
        setLoading(true);
        try {
            await axiosClient.post('/phones', data, { withCredentials: true });
            await fetchPhones();
        } finally {
            setLoading(false);
        }
    }

    async function deletePhone(id: number) {
        setLoading(true);
        try {
            await axiosClient.delete(`/phones/${id}`, { withCredentials: true });
            setPhones(phones.filter(phone => phone.id !== id));
        } finally {
            setLoading(false);
        }
    }

    return {
        phones,
        loading,
        fetchPhones,
        addPhone,
        deletePhone,
        setPhones,
    };
}