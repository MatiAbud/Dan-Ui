'use client';

import { buscarObrasCliente, } from "@/lib/clientes-api";
import Link from 'next/link';
import { useState, useEffect } from "react";

export default function Obra() {
    const [results, setResults] = useState([]);
    const [selectedObra, setSelectedObra] = useState(null);
    const [editingObra, setEditingObra] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType,setMessageType] = useState(null);
    const [clienteId, setClienteId] = useState(null);

    useEffect(() => {
        const storedClienteId = localStorage.getItem("clienteId");
        if (storedClienteId) {
            setClienteId(storedClienteId);
        }
        handleSearch(clienteId);
    }, []);

    const handleSearch = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await buscarObrasCliente(id);
            setResults(data);
        } catch (error) {
            console.error("Error al buscar las obra:", error);
            setError("No se pudieron cargar las obras. Intenta nuevamente más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (obra) => {
        setSelectedObra(obra);
    };

    const handleEditClick = () => {
        if (selectedObra) {
            setEditingObra({ ...selectedObra });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de obras</h1>

            {/* Barra de búsqueda y botones */}
            <div className="flex items-center space-x-4 mb-6">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Crear nueva obra
                    </button>
            </div>

            {/* Mensajes de error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Dirección</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Presupuesto</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((obra) => (
                            <tr
                                key={obra.id}
                                className={`hover:bg-gray-50 cursor-pointer ${
                                    selectedObra?.id === obra.id ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => handleRowClick(obra)}
                            >
                                <td className="border border-gray-300 px-4 py-2">
                                    <span className="text-blue-500">{obra.id}</span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{obra.direccion}</td>
                                <td className="border border-gray-300 px-4 py-2">{obra.estado}</td>
                                <td className="border border-gray-300 px-4 py-2">{obra.presupuesto}</td>
                                <td className="border border-gray-300 px-4 py-2">{obra.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            {/* Botón de edición */}
            {selectedObra && !editingObra && (
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={handleEditClick}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Cambiar estado
                    </button>
                </div>
            )}
        </div>
    );
}