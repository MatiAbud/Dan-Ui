'use client';

import { actualizarCliente, buscarClienteId, buscarTodos , eliminarCliente} from "@/lib/clientes-api";
import Link from 'next/link';
import { useState } from "react";
import ConfirmationMessage from "@/components/ConfirmationMessage";

export default function Cliente() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editingClient, setEditingClient] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType,setMessageType] = useState(null);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            await handleSearchTodos();
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await buscarClienteId(searchTerm);
            setResults([data]);
        } catch (error) {
            console.error("Error al buscar el cliente:", error);
            setError("No se pudo encontrar el cliente. Verifica el ID e intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchTodos = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await buscarTodos();
            setResults(data);
        } catch (error) {
            console.error("Error al buscar los clientes:", error);
            setError("No se pudieron cargar los clientes. Intenta nuevamente más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (client) => {
        setSelectedClient(client);
    };

    const handleEditClick = () => {
        if (selectedClient) {
            setEditingClient({ ...selectedClient });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!editingClient) return;

        setLoading(true);
        setError(null);

        try {
            await actualizarCliente(editingClient.id, editingClient);
            await handleSearchTodos();
             // Refrescar la lista después de guardar
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            setError("No se pudo actualizar el cliente. Intenta nuevamente más tarde.");
        }
        console.log("Cliente actualizado:", editingClient);

        setMessageType("editar");
        setShowMessage(true);
        setSelectedClient(null);
        setEditingClient(null);
        
    };

    const confirmDelete = (cliente) => {
        setSelectedClient(cliente);
        setShowConfirm(true);
      };

      const handleDelete = async () => {
        if (!selectedClient) return;
    
        try{
          await eliminarCliente(selectedClient.id)
          await handleSearchTodos();
        }
        catch(error){
          console.error("Error:", error);
        }
        console.log("Cliente eliminado:", selectedClient);
        
        setMessageType("eliminar");
        setShowMessage(true);
        setShowConfirm(false);
        setSelectedClient(null);
      };
    

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>

            {/* Barra de búsqueda y botones */}
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar cliente por ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
                <Link href="/clientes/crear">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Crear nuevo cliente
                    </button>
                </Link>
            </div>

            {/* Mensajes de error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Formulario de edición */}
            {editingClient ? (
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Editar cliente</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold">ID:</label>
                            <input
                                type="text"
                                value={editingClient.id}
                                disabled
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={editingClient.nombre}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Correo Electrónico:</label>
                            <input
                                type="email"
                                name="correoElectronico"
                                value={editingClient.correoElectronico}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">CUIT:</label>
                            <input
                                type="text"
                                name="cuit"
                                value={editingClient.cuit}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Máximo Descubierto:</label>
                            <input
                                type="number"
                                name="maximoDescubierto"
                                value={editingClient.maximoDescubierto}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Máximas Obras en Ejecución:</label>
                            <input
                                type="number"
                                name="maxObrasEnEjecucion"
                                value={editingClient.maxObrasEnEjecucion}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Saldo:</label>
                            <input
                                type="number"
                                name="saldo"
                                value={editingClient.saldo}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            onClick={() => setEditingClient(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            ) : (
                /* Tabla de resultados */
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Correo Electrónico</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">CUIT</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Máximo Descubierto</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Máximas Obras en Ejecución</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((client) => (
                            <tr
                                key={client.id}
                                className={`hover:bg-gray-50 cursor-pointer ${
                                    selectedClient?.id === client.id ? 'bg-gray-200' : ''
                                }`}
                                onClick={() => handleRowClick(client)}
                            >
                                <td className="border border-gray-300 px-4 py-2">
                                    <span className="text-blue-500">{client.id}</span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{client.nombre}</td>
                                <td className="border border-gray-300 px-4 py-2">{client.correoElectronico}</td>
                                <td className="border border-gray-300 px-4 py-2">{client.cuit}</td>
                                <td className="border border-gray-300 px-4 py-2">{client.maximoDescubierto}</td>
                                <td className="border border-gray-300 px-4 py-2">{client.maxObrasEnEjecucion}</td>
                                <td className="border border-gray-300 px-4 py-2">{client.saldo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Botón de edición */}
            {selectedClient && !editingClient && (
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={() => {
                            if (selectedClient) {
                                localStorage.setItem("clienteId", selectedClient.id);
                                localStorage.setItem("nombre", selectedClient.nombre);
                                console.log("Cliente seleccionado:", selectedClient); 
                                console.log("ID guardado:", selectedClient?.id);
                                setTimeout(() => {
                                    window.location.href = "/ui/clientes/obras";
                                }, 100); // Espera 100ms antes de redirigir
                            }
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Gestionar obras
                    </button>
                    <button
                        onClick={handleEditClick}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => confirmDelete(selectedClient)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                        Eliminar
                    </button>
                </div>
            )}
            {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este cliente?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
)}
            {showMessage && (
                    <ConfirmationMessage
                      message={
                        messageType === "eliminar"
                        ? "¡Cliente eliminado correctamente!"
                        : "¡Cliente actualizado correctamente!"
                      }
                      type="success"
                    />
                  )}
        </div>
    );
}