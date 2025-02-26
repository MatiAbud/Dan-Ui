//llama al back
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export const buscarProductoId = async (id)=>{
  const url = `http://localhost:3080/productos/api/productos/id?id=${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return response.json();
};

export const buscarProductoNombre = async (nombre)=>{
  const url = `http://localhost:3080/productos/api/productos/nombre?nombre=${nombre}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return response.json();
};

export const buscarTodosP = async ()=>{
  const url = `http://localhost/productos/api/productos/todos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener los productos: ${response.statusText}`);
  }
  return response.json();
};

export const actualizarProducto = async (id, editingProduct) => {
  const url = `http://localhost/productos/api/productos/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    
    body: JSON.stringify(editingProduct),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar el producto: ${response.statusText}`);
  }
  return response.json();
};

export const provision = async (stockUpdate) => {
  const url = `http://localhost/productos/api/productos/provision`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    
    body: JSON.stringify(stockUpdate),
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar el producto: ${response.statusText}`);
  }
  return response.json();
};


export const crearProducto = async (product) => {
  const url = `http://localhost/productos/api/productos`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Error al crear el producto: ${response.statusText}`);
  }

  return response.json();
};

export const borrarProducto = async (id) => {
  const url = `http://localhost/productos/api/productos/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar el producto: ${response.statusText}`);
  }
  
};



