'use client';

import ConfirmationMessage from "@/components/ConfirmationMessage";
import { buscarClientesUsuario, buscarObrasCliente, buscarTodosUsuariosHabilitados } from "@/lib/clientes-api";
import { crearPedido } from "@/lib/pedidos-api";
import { buscarTodosP } from "@/lib/productos-api";
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function CrearPedido() {
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [obras, setObras] = useState([]);
    const [formData, setFormData] = useState({
        cliente: {},
        detalle: [],
        total: 0,
        estado: "ACEPTADO",
        obra: {}
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const usuariosData = await buscarTodosUsuariosHabilitados();
                setUsuarios(usuariosData);
                const productosData = await buscarTodosP();
                setProductos(productosData);
            } catch (err) {
                console.error("Error al obtener usuarios", err);
            }
        }
        fetchData();
    }, []);


    const handleUsuarioChange = async (e) => {
        const usuarioId = parseInt(e.target.value);
        setUsuarioSeleccionado(usuarioId);

        try {
            const cliente = await buscarClientesUsuario(usuarioId);

            const clientes = cliente ? [cliente] : [];

            clientes.map(cliente => console.log(cliente)); 
            setClientes(clientes);
        } catch (err) {
            console.error("Error al obtener clientes", err);
        }
    };

    const handleClienteChange = async (e) => {
        const clienteSeleccionado = clientes.find(c => c.id === parseInt(e.target.value));
        if (!clienteSeleccionado) {
            setFormData(prevData => ({ ...prevData, cliente: {}, obra: {} }));
            setObras([]);
            return;
        }
        setFormData(prevData => ({ ...prevData, cliente: clienteSeleccionado, obra: {} }));
        try {
            const obrasData = await buscarObrasCliente(clienteSeleccionado.id);
            setObras(obrasData);
        } catch (err) {
            console.error("Error al obtener obras del cliente", err);
            setObras([]);
        }
    };

    const handleObraChange = (e) => {
        const obraSeleccionada = obras.find(f => f.id === parseInt(e.target.value));
        setFormData(prevData => ({ ...prevData, obra: obraSeleccionada || {} }));
    };

    const handleObservacionesChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            observaciones: e.target.value
        }));
    };

    const handleDetalleChange = (index, e) => {
        const { name, value } = e.target;
        let detallesActualizados = [...formData.detalle];
        detallesActualizados[index] = { ...detallesActualizados[index], [name]: value };

        if (name === "cantidad" || name === "descuento") {
            const precioUnitario = parseFloat(detallesActualizados[index].producto.precio || 0);
            const cantidad = parseInt(detallesActualizados[index].cantidad || 1);
            const descuento = parseFloat(detallesActualizados[index].descuento || 0);
            detallesActualizados[index].precioFinal = (precioUnitario * cantidad) - descuento;
        }

        const total = detallesActualizados.reduce((sum, detalle) => sum + (detalle.precioFinal || 0), 0)

        setFormData(prevData => ({
            ...prevData, 
            detalle: detallesActualizados,
            total:total }));
    };

    const agregarDetalle = () => {
        setFormData(prevData => ({
            ...prevData,
            detalle: [...prevData.detalle, { producto: {}, cantidad: 1, precioUnitario: 0, descuento: 0, precioFinal: 0 }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        console.log("Datos enviados:", formData); // Verifica antes de enviar
    
        try {
            await crearPedido(formData);
            console.log("Pedido creado exitosamente");
        } catch (error) {
            setError("Error al crear el pedido.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
            setShowMessage(true);
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Pedido</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Usuario:</label>
                    <select value={usuarioSeleccionado || ""} onChange={handleUsuarioChange} className="border p-2 w-full" required>
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block font-semibold">Cliente:</label>
                    <select value={formData.cliente.id || ""} onChange={handleClienteChange} className="border p-2 w-full" required>
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Obras:</label>
                    <select value={formData.obra.id || ""} onChange={handleObraChange} className="border p-2 w-full" required>
                        <option value="">Seleccione una obra</option>
                        {obras.map(obra => (
                            <option key={obra.id} value={obra.id}>{obra.direccion}</option>
                        ))}
                    </select>
                </div>

                <input 
                    type="text" 
                    className="border p-2 w-full rounded-md" 
                    placeholder="Ingrese observaciones..." 
                    value={formData.observaciones || ""}
                    onChange={handleObservacionesChange}
                />

                <div>
                    <h2 className="text-xl font-bold mb-2">Detalles del Pedido</h2>
                    {formData.detalle.map((detalle, index) => (
                        <div key={index} className="space-y-2 border p-2 rounded-lg">
                            <label>Producto:</label>
                            <select name="producto" onChange={(e) => {
                                const productoSeleccionado = productos.find(p => p.id === parseInt(e.target.value));
                                handleDetalleChange(index, { target: { name: 'producto', value: productoSeleccionado } });
                            }} className="border p-2 w-full" required>
                                <option value="">Seleccione un producto</option>
                                {productos.map(producto => (
                                    <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                ))}
                            </select>
                            <label>Cantidad:</label>
                            <input type="number" name="cantidad" value={detalle.cantidad} onChange={(e) => handleDetalleChange(index, e)} className="border p-2 w-full" required />
                            <label>Descuento:</label>
                            <input type="number" name="descuento" value={detalle.descuento} onChange={(e) => handleDetalleChange(index, e)} className="border p-2 w-full" />
                            <p>Precio Final: {detalle.precioFinal}</p>
                        </div>
                    ))}
                    <button type="button" onClick={agregarDetalle} className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2">Agregar Producto</button>
                </div>

                <div className="flex justify-end space-x-4">
                    <Link href="/pedidos">
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
                    </Link>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
                        {loading ? "Creando..." : "Crear Pedido"}
                    </button>
                </div>
            </form>
            {error && <div className="text-red-500">{error}</div>}
                  {showMessage && (
                          <ConfirmationMessage
                            message="¡Pedido creado correctamente!"
                            type="success"
                          />
                        )}
        </div>
    );
}
