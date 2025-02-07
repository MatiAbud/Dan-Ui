'use client';

import { crearCliente } from '@/lib/clientes-api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewClient() {
  const [nombre, setNombre] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [cuit, setCuit] = useState('');
  const [maximoDescubierto, setMaximoDescubierto] = useState(0);
  const [maxObrasEnEjecucion, setMaxObrasEnEjecucion] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (maximoDescubierto < 0 || maxObrasEnEjecucion < 0 || saldo < 0) {
      setError("Los valores no pueden ser negativos.");
      return;
    }

    if (!nombre || !correoElectronico || !cuit) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const newClient = {
      nombre,
      correoElectronico,
      cuit,
      maximoDescubierto,
      maxObrasEnEjecucion,
      saldo,
    };

    setLoading(true);
    setError(null);

    try {
      await crearCliente(newClient);
      console.log("Cliente creado:", newClient);
      router.push('/clientes'); // Redirigir a la lista de clientes
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo crear el cliente. Intenta nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Cliente</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Nombre:</label>
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Correo Electrónico:</label>
          <input
            type="email"
            placeholder="Correo del cliente"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">CUIT:</label>
          <input
            type="text"
            placeholder="CUIT del cliente"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Máximo Descubierto:</label>
          <input
            type="number"
            placeholder="Descubierto máximo"
            value={maximoDescubierto}
            onChange={(e) => setMaximoDescubierto(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Máximo Obras en Ejecución:</label>
          <input
            type="number"
            placeholder="Máximo obras"
            value={maxObrasEnEjecucion}
            onChange={(e) => setMaxObrasEnEjecucion(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Saldo:</label>
          <input
            type="number"
            placeholder="Saldo inicial"
            value={saldo}
            onChange={(e) => setSaldo(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <Link href="/clientes">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Volver a Clientes
          </button>
        </Link>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
        >
          {loading ? "Guardando..." : "Guardar Cliente"}
        </button>
      </div>
    </div>
  );
}