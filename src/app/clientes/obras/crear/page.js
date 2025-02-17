'use client';

import { asociarObra, crearObra } from '@/lib/clientes-api';
import Link from 'next/link'; 
//import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmationMessage from '@/components/ConfirmationMessage';

export default function NewObra() {
  const [direccion, setDireccion] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [presupuesto, setPresupuesto] = useState(0);
  const [esRemodelacion, setRemodelacion] = useState(false);
  const [estado, setEstado] = useState("PENDIENTE");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");
  //const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const handleCreate = async () => {
    if (lat < 0 || lng < 0 || presupuesto < 0) {
      setError("Los valores no pueden ser negativos.");
      return;
    }

    if (!direccion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const newObra = {
      direccion,
      lat,
      lng,
      presupuesto,
      esRemodelacion,
      estado,
    };

    setLoading(true);
    setError(null);

    try {
      const obraCreada = await crearObra(newObra);
      console.log("Obra creada:", newObra);
      //router.push('/clientes'); // Redirigir a la lista de clientes
      await asociarObra(obraCreada.id,localStorage.getItem("clienteId"));
      console.log("Obra asociada");
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo crear la obra. Intenta nuevamente más tarde.");
    } finally {
      setDireccion(null);
      setLat(0);
      setLng(0);
      setEstado("PENDIENTE");
      setPresupuesto(0);
      setRemodelacion(false);
      setShowMessage(true);
      setLoading(false);
    }
    
  };

  return (
    <div className="max-w-4xl space-x-4 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Obra</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Dirección:</label>
          <input
            type="text"
            placeholder="Direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Latitud:</label>
          <input
            type="number"
            placeholder="Latitud"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Longitud:</label>
          <input
            type="number"
            placeholder="Longitud"
            value={lng}
            onChange={(e) => setLng(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Presupuesto:</label>
          <input
            type="number"
            placeholder="Presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Tipo:</label>
          <select
            value={esRemodelacion}
            onChange={(e) => {
              setRemodelacion(e.target.value === "true"); // Convertir el valor en string a booleano
              console.log("Nuevo tipo seleccionado:", e.target.value === "true");
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled hidden>Seleccione un estado</option>
            <option value="false">Nueva</option> {/* true como string */}
            <option value="true">Remodelación</option> {/* false como string */}
          </select>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <Link href="/clientes/obras">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Volver a Gestion de Obras
          </button>
        </Link>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
        >
          {loading ? "Guardando..." : "Guardar Obra"}
        </button>
      </div>
      {showMessage && (
                    <ConfirmationMessage
                      message="¡Obra creada correctamente!"
                      type="success"
                    />
                  )}
    </div>
  );
}