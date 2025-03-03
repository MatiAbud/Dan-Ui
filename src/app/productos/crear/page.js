'use client'; // Esto es necesario para componentes cliente en Next.js

import { crearProducto } from "@/lib/productos-api";
import { CATEGORIAS } from '@/util/categorias';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmationMessage from "@/components/ConfirmationMessage";

export default function NewProduct() {
  const [productName, setProductName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stockActual, setStockActual] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);
  const [descuentoPromocional, setDescuentoPromocional] = useState(0);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCreate = () => {
    setShowMessage(false);
    if (stockActual < 0 || stockMinimo < 0 || precio < 0) {
      setError("Los valores no pueden ser negativos.");
      return;
    }

    const newProduct = {
      nombre: productName,
      categoria: selectedCategoria,
      descripcion: descripcion,
      precio:precio,
      stockActual: stockActual,
      stockMinimo: stockMinimo,
      descuentoPromocional: descuentoPromocional,
    };

    setLoading(true);
    setError(null);

    try {
      crearProducto(newProduct);

      console.log("Producto creado:", newProduct);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo crear el producto. Intenta nuevamente más tarde.");
    } finally {

      setProductName('');
      setSelectedCategoria('');
      setDescripcion('');
      setPrecio(0);
      setStockActual(0);
      setStockMinimo(0);
      setDescuentoPromocional(0);
      setShowMessage(true);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
      
      {/* Formulario para crear un nuevo producto */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Nombre:</label>
          <input
            type="text"
            placeholder="Insertar nombre de producto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Categoría:</label>
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {Object.entries(CATEGORIAS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Descripción:</label>
          <input
            type="text"
            placeholder="Insertar descripción del producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Precio:</label>
          <input
            type="number"
            placeholder="Insertar precio del producto"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Stock Minimo:</label>
          <input
            type="number"
            placeholder="Insertar stock minimo del producto"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Descuento Promocional:</label>
          <input
            type="number"
            placeholder="Insertar descuento del producto"
            value={descuentoPromocional}
            onChange={(e) => setDescuentoPromocional(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <Link href="/productos">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Volver
          </button>
        </Link>
      </div>
      {showMessage && (
              <ConfirmationMessage
                message="¡Producto creado correctamente!"
                type="success"
              />
            )}
    </div>
  );
}
