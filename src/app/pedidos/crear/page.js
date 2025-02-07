'use client';

import { crearPedido } from "@/lib/pedidos-api"; // Importa la función de API para crear pedidos
import Link from 'next/link';
import { useState } from "react";

export default function CrearPedido() {
    const [formData, setFormData] = useState({
        clienteId: '', // ID del cliente
        productos: [], // Lista de productos
        fecha: new Date().toISOString().split('T')[0], // Fecha actual por defecto
        total: 0, // Total del pedido
        estado: "Pendiente", // Estado inicial del pedido
        direccionEnvio: { // Dirección de envío
            calle: '',
            ciudad: '',
            codigoPostal: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDireccionChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            direccionEnvio: {
                ...prevData.direccionEnvio,
                [name]: value,
            },
        }));
    };

    const handleProductoChange = (index, e) => {
        const { name, value } = e.target;
        const nuevosProductos = [...formData.productos];
        nuevosProductos[index] = {
            ...nuevosProductos[index],
            [name]: value,
        };
        setFormData((prevData) => ({
            ...prevData,
            productos: nuevosProductos,
        }));
    };

    const agregarProducto = () => {
        setFormData((prevData) => ({
            ...prevData,
            productos: [...prevData.productos, { productoId: '', cantidad: 1 }],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const nuevoPedido = await crearPedido(formData);
            console.log("Pedido creado:", nuevoPedido);
            // Redirigir a la página de pedidos o mostrar un mensaje de éxito
            window.location.href = '/pedidos';
        } catch (error) {
            setError("Error al crear el pedido.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Pedido</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">ID del Cliente:</label>
                    <input
                        type="text"
                        name="clienteId"
                        value={formData.clienteId}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Fecha:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Total:</label>
                    <input
                        type="number"
                        name="total"
                        value={formData.total}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Estado:</label>
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        required
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Dirección de Envío</h2>
                    <div>
                        <label className="block font-semibold">Calle:</label>
                        <input
                            type="text"
                            name="calle"
                            value={formData.direccionEnvio.calle}
                            onChange={handleDireccionChange}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Ciudad:</label>
                        <input
                            type="text"
                            name="ciudad"
                            value={formData.direccionEnvio.ciudad}
                            onChange={handleDireccionChange}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Código Postal:</label>
                        <input
                            type="text"
                            name="codigoPostal"
                            value={formData.direccionEnvio.codigoPostal}
                            onChange={handleDireccionChange}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            required
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Productos</h2>
                    {formData.productos.map((producto, index) => (
                        <div key={index} className="space-y-2">
                            <div>
                                <label className="block font-semibold">ID del Producto:</label>
                                <input
                                    type="text"
                                    name="productoId"
                                    value={producto.productoId}
                                    onChange={(e) => handleProductoChange(index, e)}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Cantidad:</label>
                                <input
                                    type="number"
                                    name="cantidad"
                                    value={producto.cantidad}
                                    onChange={(e) => handleProductoChange(index, e)}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={agregarProducto}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-2"
                    >
                        Agregar Producto
                    </button>
                </div>
                <div className="flex justify-end space-x-4">
                    <Link href="/pedidos">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Cancelar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Creando..." : "Crear Pedido"}
                    </button>
                </div>
            </form>

            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}