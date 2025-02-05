'use client';

import { actualizarCliente, buscarClienteId , buscarTodos} from "@/lib/clientes-api";
import Link from 'next/link';
import { useState } from "react";


export default function Cliente(){
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editingClient, setEditingClient] = useState(null);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            await handleSearchTodos();
            return;
        }
    
        console.log("Buscando cliente con ID:", searchTerm);
    
        try {
            const data = await buscarClienteId(searchTerm);
            console.log("Cliente encontrado:", data);
            setResults([data]);
        } catch (error) {
            console.error("Error al buscar el cliente:", error);
        }
    };

    const handleSearchTodos = async () => {
        console.log("Buscando todos los clientes");
    
        try {
            const data = await buscarTodos();
            console.log("Clientes encontrados:", data);
            setResults(data);
        } catch (error) {
            console.error("Error al buscar los clientes:", error);
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
    
    const handleSave = () => {
        try{
            actualizarCliente(editingClient.id, editingClient);
        }
        catch (error) {
            console.error("Error:", error);
        }
        console.log("Cliente actualizado:", editingClient);
        setSelectedClient(null);
        setEditingClient(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cliente Page</h1>
        <div className="flex items-center space-x-4 mb-6">
            <input
                type="text"
                placeholder="Buscar cliente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Buscar
            </button>
            <Link href="/clientes/crear">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    Crear nuevo cliente
                </button>
            </Link>
        </div>
    
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
                <label className="block font-semibold">Correo Electronico:</label>
                    <input
                        type="text"
                        value={editingClient.correoElectronico}
                        disabled
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
            </div>
            <div>
                <label className="block font-semibold">Cuit:</label>
                    <input
                        type="number"
                        name="cuit"
                        value={editingClient.cuit}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
            </div>
            <div>
                <label className="block font-semibold">Maximo descubierto:</label>
                    <input
                        type="number"
                        name="maxDescubierto"
                        value={editingClient.maximoDescubierto}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
            </div>
            <div>
                <label className="block font-semibold">Maximas obras en ejecución:</label>
                    <input
                        type="number"
                        name="maxObras"
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
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setEditingClient(null)}
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
        ) : (
            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Correo electronico</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Cuit</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Maximo descubierto</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Maxima obras en ejecución</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Saldo</th>
                    </tr>
                </thead>
            <tbody>
                {results.map(client => (
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
    
        {selectedClient && (
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleEditClick}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                    Editar
                </button>
            </div>
        )}
        </div>
    );
}
