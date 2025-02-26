'use client';

import {buscarPedidoPorId, buscarTodosLosPedidos, buscarPedidosEstado, buscarPedidosCliente, entregarPedido, cancelarPedido } from "@/lib/pedidos-api"; // Importa las funciones de API
import Link from 'next/link';
import { useState } from "react";

export default function Pedidos() {
    const [searchEstado, setSearchEstado] = useState('');
    const [searchCliente, setSearchCliente] = useState('');
    const [results, setResults] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [selectedEstado, setSelectedEstado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalDetalles, setModalDetalles] = useState(false);
    const [modalEstado, setModalEstado] = useState(false);

    // Función para buscar un pedido por ID
    const handleSearch = async () => {
        if (searchEstado.trim() === '' ) {
            if(searchCliente.trim() === ''){
                await handleSearchTodos();
                return;
            }
            else{
                setLoading(true);
                setError(null);
                console.log("Buscando pedidos de cliente:", searchCliente);
                try{
                    const data = await buscarPedidosCliente(searchCliente);
                    console.log("Pedidos encontrado:", data);
                    setResults([data]);
                }
                catch(error){
                    console.error("Error al buscar pedidos", error);
                }
                finally{
                    setLoading(false);
                    setSearchCliente(null);
                }
            }
        }
        else{
            setLoading(true);
            setError(null);
            console.log("Buscando pedidos con estado:", searchEstado);
            try{
                const data = await buscarPedidosEstado(searchEstado);
                console.log("Pedidos encontrado:", data);
                setResults([data]);
            }
            catch(error){
                console.error("Error al buscar pedidos", error);
            }
            finally{
                setLoading(false);
                setSearchEstado(null);
            }
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

    const cerrarModal = () => {
        setModalDetalles(false);
        setSelectedPedido(null);
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingPedido((prevPedido) => ({
            ...prevPedido,
            [name]: value,
        }));
    };

    const handleCambioEstado = async () =>{
        try{
            console.log("antes if");
            if(selectedEstado == "ENTREGADO"){
                console.log("entre al if");
                entregarPedido(selectedPedido.id);
            }
            else if (selectedEstado== "CANCELADO"){
                cancelarPedido(selectedPedido.id)
            }
            handleSearchTodos();
        }
        catch(error){
            setError("Error al cambiar estado del pedido.");
            console.error("Error:", error);
        }
        finally{
            setSelectedEstado(null);
            setSelectedPedido(null);
            setModalEstado(false);
        }
    }
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
            <div className="flex items-center space-x-4 mb-6">
                <input
                type="number"
                placeholder="Buscar pedido por cliente"
                value={searchCliente}
                onChange={(e) => {
                    setSearchCliente(e.target.value);
                    if (e.target.value !== "") {
                        setSearchEstado(""); // Borra la selección del select
                    }
                }}
                disabled={searchEstado !== ""}
                className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={searchEstado}
                    onChange={(e) => {
                        setSearchEstado(e.target.value);
                        if (e.target.value !== "") {
                            setSearchCliente(""); // Borra el input si se selecciona un estado
                        }
                    }}
                    disabled={searchCliente !== ""}
                    className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Seleccionar estado</option> {/* Opción vacía inicial */}
                    <option value="ACEPTADO">Aceptado</option>
                    <option value="RECHAZADO">Rechazado</option>
                    <option value="ENTREGADO">Entregado</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>
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
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left w-1/8">Número</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Cliente</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Fecha</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-1/5">Estado</th>
                            <th className="border border-gray-300 px-4 py-2 text-left w-7/40">Total</th>
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
                                <td className="border border-gray-300 px-4 py-2 w-1/7">{pedido.numeroPedido}</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/4">{pedido.cliente.nombre}</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/5">{pedido.fecha}</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/5">{pedido.estado}</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/5">{pedido.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            {modalDetalles && selectedPedido && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                    <h2 className="text-xl font-bold mb-4">Detalles del Pedido</h2>
                    <p><strong>Número:</strong> {selectedPedido.numeroPedido}</p>
                    <p><strong>Cliente:</strong> {selectedPedido.cliente.nombre}</p>
                    <p><strong>Fecha:</strong> {selectedPedido.fecha}</p>
                    <p><strong>Estado:</strong> {selectedPedido.estado}</p>
                    <p><strong>Total:</strong> ${selectedPedido.total}</p>
                    <p><strong>Dirección de obra:</strong> {selectedPedido.obra.direccion}</p>
                    <p><strong>observaciones:</strong> {selectedPedido.observaciones}</p>

                    <h3 className="text-lg font-semibold mt-4">Productos</h3>
                        <table className="border-collapse border border-gray-300 w-full mt-2">
                        <thead>
                            <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-2 py-1">Producto</th>
                            <th className="border border-gray-300 px-2 py-1">Cantidad</th>
                            <th className="border border-gray-300 px-2 py-1">Precio</th>
                            <th className="border border-gray-300 px-2 py-1">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedPedido.detalle.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-2 py-1">{item.producto.nombre}</td>
                                <td className="border border-gray-300 px-2 py-1">{item.cantidad}</td>
                                <td className="border border-gray-300 px-2 py-1">${item.producto.precio}</td>
                                <td className="border border-gray-300 px-2 py-1">${item.precioFinal}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>


                    <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={cerrarModal}
                    >
                    Cerrar
                    </button>
                </div>
                </div>
            )}
            {selectedPedido && (
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={() => setModalDetalles(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Más detalles
                    </button>
                    
                    <button
                        onClick={() => setModalEstado(true)}
                        disabled={selectedPedido.estado !== "EN_PREPARACION"}
                        className={`px-4 py-2 rounded-lg transition 
                            ${selectedPedido.estado !== "EN_PREPARACION" 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                    >
                        Actualizar estado
                    </button>

                </div>
            )}
            {modalEstado && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                                <h2 className="text-xl font-bold mb-4">Seleccione nuevo estado</h2>
                                <select
                                    value={selectedEstado}
                                    onChange={(e) => setSelectedEstado(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                    <option value="ENTREGADO">Entregado</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                        onClick={()=> handleCambioEstado()}
                                    >
                                    Guardar
                                    </button>                               
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        onClick={()=> {setModalEstado(false);
                                            setSelectedPedido(null);
                                        }}
                                        >
                                    Cancelar
                                    </button>
                                </div>
                            </div>
                            </div>
                        )}
        </div>
    );
}