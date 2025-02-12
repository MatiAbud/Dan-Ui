'use client';

import { actualizarPedido, buscarPedidoPorId, buscarTodosLosPedidos } from "@/lib/pedidos-api"; // Importa las funciones de API
import Link from 'next/link';
import { useState } from "react";

export default function Pedidos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [editingPedido, setEditingPedido] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    // Función para buscar un pedido por ID
    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            await handleSearchTodos();
            return;
        }

        console.log("Buscando pedido con número de pedido:", searchTerm);

        setLoading(true);
        setError('');
        try {
            const data = await buscarPedidoPorId(searchTerm);
            console.log("Pedido encontrado:", data);
            setResults([data]);
        } catch (error) {
            setError("Error al buscar el pedido.");
            console.error("Error al buscar el pedido:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para buscar todos los pedidos
    const handleSearchTodos = async () => {
        console.log("Buscando todos los pedidos");

        setLoading(true);
        setError('');
        try {
            const data = await buscarTodosLosPedidos();
            console.log("Pedidos encontrados:", data);
            setResults(data);
        } catch (error) {
            setError("Error al buscar los pedidos.");
            console.error("Error al buscar los pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (pedido) => {
        setSelectedPedido(pedido);
    };

    const handleEditClick = () => {
        if (selectedPedido) {
            setEditingPedido({ ...selectedPedido });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingPedido((prevPedido) => ({
            ...prevPedido,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setShowConfirmationModal(false); // Cierra el modal
        try {
            await actualizarPedido(editingPedido.id, editingPedido);
            console.log("Pedido actualizado:", editingPedido);

            // Actualiza el estado de los resultados o el pedido seleccionado
            setResults((prevResults) =>
                prevResults.map((pedido) =>
                    pedido.id === editingPedido.id ? editingPedido : pedido
                )
            );
            setSelectedPedido(null);
            setEditingPedido(null);
        } catch (error) {
            setError("Error al guardar el pedido.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar pedido por número"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Buscar"}
                </button>
                <Link href="/pedidos/crear">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Crear nuevo pedido
                    </button>
                </Link>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            {editingPedido ? (
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Editar pedido</h2>
                    {/* Formulario para editar el pedido */}
                    <div>
                        <label className="block font-semibold">Número de pedido:</label>
                        <input
                            type="text"
                            value={editingPedido.id}
                            disabled
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Cliente:</label>
                        <input
                            type="text"
                            name="cliente"
                            value={editingPedido.cliente.nombre}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                    {/* Agregar más campos para editar productos, cantidades, estado, etc. */}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setEditingPedido(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => setShowConfirmationModal(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Número</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Cliente</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((pedido) => (
                            <tr
                                key={pedido.id}
                                className={`hover:bg-gray-50 cursor-pointer ${
                                    selectedPedido?.id === pedido.id ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => handleRowClick(pedido)}
                            >
                                <td className="border border-gray-300 px-4 py-2">{pedido.numero}</td>
                                <td className="border border-gray-300 px-4 py-2">{pedido.cliente.nombre}</td>
                                <td className="border border-gray-300 px-4 py-2">{pedido.fecha}</td>
                                <td className="border border-gray-300 px-4 py-2">{pedido.estado}</td>
                                <td className="border border-gray-300 px-4 py-2">{pedido.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedPedido && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleEditClick}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Editar
                    </button>
                </div>
            )}

            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro?</h2>
                        <p>¿Deseas guardar los cambios realizados en este pedido?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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