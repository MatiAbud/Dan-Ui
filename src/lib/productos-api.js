import axios from 'axios';

/*
export const buscarProductoId = async (id)=>{
  const url=`http://localhost:3080/productos/api/productos/${id}`;
  const response = await axios.get(url);
  return response.data;
};
export const buscarTodos = async ()=>{
  const url=`http://localhost:3080/productos/api/productos/todos`;
  const response = await axios.get(url);
  return response.data;
};

export const actualizarProducto = async (id,editingProduct)=>{
  const url=`http://localhost:3080/productos/api/productos/${id}`;
  const response = await axios.put(url,editingProduct);
  return response.data;
};
*/

export const buscarProductoId = async (id) => {
  const url = `http://localhost:3080/productos/api/productos/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return response.json();
};

export const buscarTodos = async () => {
  const url = `http://localhost:3080/productos/api/productos/todos`;
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
