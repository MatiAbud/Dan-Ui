'use client';

import ConfirmationMessage from "@/components/ConfirmationMessage";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

import {
    actualizarUsuarioHabilitado,
    agregarUsuarioHabilitado,
    buscarTodosUsuariosCliente,
    buscarTodosUsuariosHabilitados,
    eliminarUsuarioHabilitado
} from '@/lib/clientes-api'; 

export default function UsuariosHabilitados() {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        correoElectronico: '',
        cliente_id: '' // Inicialmente vacío, lo actualizaremos después
    });
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType,setMessageType] = useState(null);
    const [storedClienteId, setStoredClienteId] = useState(null); // Inicia con null
    const router = useRouter(); 

    useEffect(() => {
        const clienteId = localStorage.getItem("clienteId");
        setStoredClienteId(clienteId ? Number(clienteId) : null); // Asignar el valor a storedClienteId
    }, []);

    useEffect(() => {
        if (storedClienteId) {
            // Cuando storedClienteId esté listo, actualizamos nuevoUsuario
            setNuevoUsuario((prevState) => ({
                ...prevState,
                cliente_id: storedClienteId
            }));

            // Cargar los usuarios habilitados
            const cargarUsuarios = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await buscarTodosUsuariosCliente(storedClienteId);
                    setUsuarios(data);
                } catch (error) {
                    console.error('Error al cargar usuarios:', error);
                    setError("Error al cargar usuarios. Intente nuevamente.");
                } finally {
                    setLoading(false);
                }
            };

            cargarUsuarios();
        }
    }, [storedClienteId]);

    const agregarUsuario = async () => {
        setLoading(true);
        setError(null);
        setShowMessage(false);
        try {
            const data = await agregarUsuarioHabilitado(nuevoUsuario);
            setUsuarios([...usuarios, data]);
            setNuevoUsuario({
                nombre: '',
                apellido: '',
                dni: '',
                correoElectronico: '',
                cliente_id: storedClienteId
            });
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            setError("Error al agregar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
            setMessageType('crear');
            setShowMessage(true);
        }
    };

    const eliminarUsuario = async () => {
        setLoading(true);
        setError(null);
        setShowMessage(false);
        try {
            await eliminarUsuarioHabilitado(selectedUsuario.id);
            const data = await buscarTodosUsuariosCliente(storedClienteId);
            setUsuarios(data);
            setEditingUsuario(null);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setError("Error al eliminar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
            setMessageType('eliminar');
            setShowMessage(true);
        }
    };

    const handleEditClick = () => {
        setEditingUsuario({ ...selectedUsuario });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const handleRowClick = (usuario) => {
        setSelectedUsuario(usuario);
    };

    const handleSave = async () => {
        setShowMessage(false);
        setLoading(true);
        setError(null);
        try {
            await actualizarUsuarioHabilitado(editingUsuario.id, editingUsuario);
            const data = await buscarTodosUsuariosCliente(storedClienteId);
            setUsuarios(data);
            setEditingUsuario(null);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setError("Error al actualizar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
            setMessageType('editar')
            setShowMessage(true);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Usuarios Habilitados</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Apellido</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">DNI</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Correo Electrónico</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id} className={`hover:bg-gray-50 cursor-pointer ${
                            selectedUsuario?.id === usuario.id ? 'bg-gray-200' : ''
                        }`}
                        onClick={() => handleRowClick(usuario)}
                        >
                            <td className="border border-gray-300 px-4 py-2">{usuario.nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{usuario.apellido}</td>
                            <td className="border border-gray-300 px-4 py-2">{usuario.dni}</td>
                            <td className="border border-gray-300 px-4 py-2">{usuario.correoElectronico}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end space-x-4">
                <button onClick={() => handleEditClick()} 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                        Editar
                </button>
                <button onClick={() => eliminarUsuario()} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        Eliminar
                </button>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-2">
                {editingUsuario ? "Editar Usuario" : "Agregar Usuario"}
            </h3>

            <form>
                {editingUsuario && (
                    <input type="hidden" name="id" value={editingUsuario.id} />
                )}
                <input type="text" name="nombre" placeholder="Nombre" value={editingUsuario?.nombre || nuevoUsuario.nombre} onChange={editingUsuario ? handleInputChange : (e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full mb-2" required />
                <input type="text" name="apellido" placeholder="Apellido" value={editingUsuario?.apellido || nuevoUsuario.apellido} onChange={editingUsuario ? handleInputChange : (e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full mb-2" required />
                <input type="text" name="dni" placeholder="DNI" value={editingUsuario?.dni || nuevoUsuario.dni} onChange={editingUsuario ? handleInputChange : (e) => setNuevoUsuario({ ...nuevoUsuario, dni: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full mb-2" required />
                <input type="email" name="correoElectronico" placeholder="Correo Electrónico" value={editingUsuario?.correoElectronico || nuevoUsuario.correoElectronico} onChange={editingUsuario ? handleInputChange : (e) => setNuevoUsuario({ ...nuevoUsuario, correoElectronico: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full mb-2" required />

                <div className="mt-4 flex justify-end space-x-4">
                    <button type="button" onClick={editingUsuario ? handleSave : agregarUsuario} disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        {editingUsuario ? "Guardar" : "Guardar"}
                    </button>
                    <Link href="/clientes">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                            Volver
                        </button>
                    </Link>
                </div>

            </form>

            {showMessage && (
            <ConfirmationMessage
                message={
                messageType === "eliminar"
                    ? "¡Usuario eliminado correctamente!"
                    : messageType === "crear"
                    ? "¡Usuario creado correctamente!"
                    : "¡Usuario actualizado correctamente!"
                }
                type="success"
            />
            )}
        </div>
    );
}
