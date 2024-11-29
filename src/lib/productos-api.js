import axios from 'axios';


export const buscarProductoId = async (id)=>{
  const url=`http://localhost/productos/api/productos/${id}`;
  const response = await axios.get(url);
  return response.data;
};
export const buscarTodos = async ()=>{
  const url=`http://localhost/productos/api/productos/todos`;
  const response = await axios.get(url);
  return response.data;
};
export const actualizarProducto = async (id,editingProduct)=>{
  const url=`http://localhost/productos/api/productos/${id}`;
  const response = await axios.put(url,editingProduct);
  return response.data;
};