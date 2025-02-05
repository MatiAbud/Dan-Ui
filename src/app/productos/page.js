'use client';

import { actualizarProducto, buscarProductoId, buscarTodos, borrarProducto } from "@/lib/productos-api";
import Link from 'next/link';
import { useState } from 'react';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);


  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      await handleSearchTodos();
      return;
    }

    console.log("Buscando producto con ID:", searchTerm);

    try {
      const data = await buscarProductoId(searchTerm);   
      console.log("Producto encontrado:", data);
      setResults([data]);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
    }
  };

  const handleSearchTodos = async () => {
    console.log("Buscando todos los productos");

    try {
      const data = await buscarTodos();   
      console.log("Productos encontrados:", data);
      setResults(data);
    } catch (error) {
      console.error("Error al buscar los productos:", error);
    }
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleEditClick = () => {
    if (selectedProduct) {
      setEditingProduct({ ...selectedProduct });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try{
      actualizarProducto(editingProduct.id, editingProduct);
    }
    catch (error) {
      console.error("Error:", error);
    }
    console.log("Producto actualizado:", editingProduct);
    setSelectedProduct(null);
    setEditingProduct(null);
  };

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (!selectedProduct) return;

    try{
      borrarProducto(selectedProduct.id)
    }
    catch(error){
      console.error("Error:", error);
    }
    console.log("Producto eliminado:", selectedProduct);

    alert("Producto eliminado correctamente");
    setShowConfirm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos Page</h1>
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por número o nombre de producto"
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
        <Link href="/productos/crear">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Crear nuevo producto
          </button>
        </Link>
      </div>
      
      {editingProduct ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Editar Producto</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">ID:</label>
              <input
                type="text"
                value={editingProduct.id}
                disabled
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={editingProduct.nombre}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Categoría:</label>
              <input
                type="text"
                value={editingProduct.categoria}
                disabled
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Descripción:</label>
              <input
                type="text"
                name="descripcion"
                value={editingProduct.descripcion}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Precio:</label>
              <input
                type="number"
                name="precio"
                value={editingProduct.precio}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Stock Actual:</label>
              <input
                type="number"
                name="stockActual"
                value={editingProduct.stockActual}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Stock Mínimo:</label>
              <input
                type="number"
                name="stockMinimo"
                value={editingProduct.stockMinimo}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">Descuento Promocional:</label>
              <input
                type="number"
                name="descuentoPromocional"
                value={editingProduct.descuentoPromocional}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingProduct(null)}
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
        </div>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Stock Actual</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Stock Mínimo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Descuento Promocional</th>
            </tr>
          </thead>
          <tbody>
            {results.map(product => (
              <tr
                key={product.id}
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedProduct?.id === product.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleRowClick(product)}
              >
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-blue-500">{product.id}</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{product.categoria}</td>
                <td className="border border-gray-300 px-4 py-2">{product.descripcion}</td>
                <td className="border border-gray-300 px-4 py-2">{product.precio}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stockActual}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stockMinimo}</td>
                <td className="border border-gray-300 px-4 py-2">{product.descuentoPromocional}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedProduct && (
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleEditClick}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Editar
          </button>
          <button
            onClick={() => confirmDelete(selectedProduct)}
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
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
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
    </div>
  );
}
