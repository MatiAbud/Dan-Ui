'use client';

import { buscarObrasCliente, habilitarObra, finalizarObra, pendienteObra } from "@/lib/clientes-api";
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Obra() {
    const [results, setResults] = useState([]);
    const [selectedObra, setSelectedObra] = useState(null);
    const [editingObra, setEditingObra] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clienteId, setClienteId] = useState(null);
    const [nombre, setNombre] = useState('');

    // Estado del modal
    const [showModal, setShowModal] = useState(false);
    const [selectedEstado, setSelectedEstado] = useState("");

    useEffect(() => {
        const storedClienteId = localStorage.getItem("clienteId");
        const storedNombre =localStorage.getItem("nombre");
        if (storedClienteId) {
            setClienteId(storedClienteId);
            setNombre(storedNombre)
            handleSearch(storedClienteId);
        }
    }, []);

    const handleSearch = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await buscarObrasCliente(id);
            setResults(data);
        } catch (error) {
            console.error("Error al buscar las obras:", error);
            setError("No se pudieron cargar las obras. Intenta nuevamente más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (obra) => {
        setSelectedObra(obra);
    };

    const handleCambioEstado = () => {
        if (selectedObra) {
            setShowModal(true); // Mostrar modal
        }
    };

    const handleGuardarEstado = async () => {
        console.log(selectedEstado);
        if(selectedEstado == "pendiente"){
            await pendienteObra(selectedObra.id);
        }
        else if(selectedEstado=="habilitada"){
            await habilitarObra(selectedObra.id);
        }
        else{
            await finalizarObra(selectedObra.id);
        }
        setShowModal(false);
        handleSearch(clienteId);

    };

    return (    
        <div className="max-w-4xl mx-auto p-4 flex-1">
            <h1 className="text-2xl font-bold mb-4">Gestión de obras: {nombre || "Sin nombre"}</h1>
            <Link href="/clientes/obras/crear">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition mb-4">
                            Asignar Obra
                        </button>
                    </Link>
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
                            <td className="border border-gray-300 px-4 py-2">{obra.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{obra.direccion}</td>
                            <td className="border border-gray-300 px-4 py-2">{obra.estado}</td>
                            <td className="border border-gray-300 px-4 py-2">{obra.presupuesto}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {obra.tipo === true ?  "Remodelación" : "Nueva"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedObra && (
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={handleCambioEstado}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Cambiar estado
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Seleccionar Estado</h2>
                        <select
                            value={selectedEstado}
                            onChange={(e) => {setSelectedEstado(e.target.value);
                                console.log("Nuevo estado seleccionado:", e.target.value);
                                }
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled hidden>Seleccione un estado</option>
                            <option value="habilitada">Habilitada</option>
                            <option value="finalizada">Finalizada</option>
                            <option value="pendiente">Pendiente</option>
                        </select>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardarEstado}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
