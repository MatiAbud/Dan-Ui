'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    actualizarUsuarioHabilitado,
    agregarUsuarioHabilitado,
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
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
                    const data = await buscarTodosUsuariosHabilitados(storedClienteId);
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
        if (!storedClienteId) return;

        setLoading(true);
        setError(null);
        try {
            const data = await agregarUsuarioHabilitado(nuevoUsuario);
            setUsuarios([...usuarios, data]);
            setNuevoUsuario({
                nombre: '',
                apellido: '',
                dni: '',
                correoElectronico: '',
                cliente_id: storedClienteId // Asegurarse de que cliente_id esté correctamente configurado
            });
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            setError("Error al agregar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const eliminarUsuario = async (id) => {
        if (!storedClienteId) return;

        setLoading(true);
        setError(null);
        try {
            await eliminarUsuarioHabilitado(id);
            const data = await buscarTodosUsuariosHabilitados(storedClienteId);
            setUsuarios(data);
            setEditingUsuario(null);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setError("Error al eliminar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (usuario) => {
        setEditingUsuario({ ...usuario });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!storedClienteId || !editingUsuario) return;

        setLoading(true);
        setError(null);
        try {
            await actualizarUsuarioHabilitado(editingUsuario.id, editingUsuario);
            const data = await buscarTodosUsuariosHabilitados(storedClienteId);
            setUsuarios(data);
            setEditingUsuario(null);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setError("Error al actualizar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
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
                        <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{usuario.nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{usuario.apellido}</td>
                            <td className="border border-gray-300 px-4 py-2">{usuario.dni}</td>
                            <td className="border border-gray-300 px-4 py-2">{usuario.correoElectronico}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => handleEditClick(usuario)} className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition mr-2">Editar</button>
                                <button onClick={() => eliminarUsuario(usuario.id)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

                <button type="button" onClick={editingUsuario ? handleSave : agregarUsuario} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    {editingUsuario ? "Guardar" : "Agregar Usuario"}
                </button>
            </form>
        </div>
    );
}
