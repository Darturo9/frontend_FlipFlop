import { useState } from "react";
import axiosClient from "@/utils/axiosClient";

export function useAddresses() {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchAddresses() {
        try {
            const response = await axiosClient.get('/addresses', { withCredentials: true });
            setAddresses(response.data);
        } catch (error) {
            console.error("Error al cargar las direcciones:", error);
        }
    }

    async function addAddress(data: any) {
        setLoading(true);
        try {
            await axiosClient.post('/addresses', data, { withCredentials: true });
            await fetchAddresses();
        } finally {
            setLoading(false);
        }
    }

    async function deleteAddress(id: number) {
        setLoading(true);
        try {
            await axiosClient.delete(`/addresses/${id}`, { withCredentials: true });
            setAddresses(addresses.filter(address => address.id !== id));
        } finally {
            setLoading(false);
        }
    }

    return {
        addresses,
        loading,
        fetchAddresses,
        addAddress,
        deleteAddress,
        setAddresses,
    };
}