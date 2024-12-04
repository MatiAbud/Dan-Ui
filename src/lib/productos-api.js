import axios from 'axios';
//llama al back

export const buscarProductoId = async (id)=>{
  const url=`http://localhost:3080/productos/api/productos/${id}`; //mapeo atraves del gateway 
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
  const response = await axios.put(url, editingProduct);
  return response.data;
};

export const crearProducto = async (product) => {
  const url = `http://localhost:3080/productos/api/productos`;
  try {
    const response = await axios.post(url, product);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error.message); // Mensaje del error
    if (error.response) {
      console.error("Response data:", error.response.data); // Respuesta del servidor (si existe)
      console.error("Response status:", error.response.status); // Código de estado HTTP
      console.error("Response headers:", error.response.headers); // Headers de respuesta
    } else if (error.request) {
      console.error("Request data:", error.request); // Datos enviados (si el servidor no respondió)
    } else {
      console.error("Error desconocido:", error); // Otros errores
    }
    throw error; // Opcional: relanzar el error para manejarlo en otro lugar
  }
};

export const borrarProducto = async (id) => {
  const url = `http://localhost:3080/productos/api/productos/${id}`;
  const response = await axios.delete(url);
  return response.data;
};
