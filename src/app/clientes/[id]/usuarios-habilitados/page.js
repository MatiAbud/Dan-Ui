// src/app/clientes/[id]/usuarios-habilitados/page.js
'use client';

import { actualizarUsuarioHabilitado, agregarUsuarioHabilitado, buscarTodosUsuariosHabilitados, eliminarUsuarioHabilitado } from '@/lib/usuarios-habilitados-api';
import { useParams, useRouter } from 'next/navigation'; // Importa useRouter
import { useEffect, useState } from 'react';

export default function UsuariosHabilitados() {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        correoElectronico: ''
    });
    const [editingUsuario, setEditingUsuario] = useState(null); // Nuevo estado para la edición
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter(); // Inicializa useRouter

    useEffect(() => {
        const cargarUsuarios = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await buscarTodosUsuariosHabilitados(params.id);
                setUsuarios(data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
                setError("Error al cargar usuarios. Intente nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        cargarUsuarios();
    }, [params.id]);

    const agregarUsuario = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await agregarUsuarioHabilitado(params.id, nuevoUsuario);
            setUsuarios([...usuarios, data]);
            setNuevoUsuario({
                nombre: '',
                apellido: '',
                dni: '',
                correoElectronico: ''
            });
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            setError("Error al agregar usuario. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const eliminarUsuario = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await eliminarUsuarioHabilitado(params.id, id);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
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
        setLoading(true);
        setError(null);
        try {
            await actualizarUsuarioHabilitado(params.id, editingUsuario.id, editingUsuario);
            const data = await buscarTodosUsuariosHabilitados(params.id);
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

                <button type="button" onClick={editingUsuario ? handleSave : agregarUsuario} disabled={loading} className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${loading && 'opacity-50'}`}>
                    {loading ? (editingUsuario ? "Guardando..." : "Agregando...") : (editingUsuario ? "Guardar" : "Agregar Usuario")}
                </button>
                {editingUsuario && (
                    <button type="button" onClick={() => setEditingUsuario(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-2">Cancelar</button>
                )}
            </form>
        </div>
    );
}