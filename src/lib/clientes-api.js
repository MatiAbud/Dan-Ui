
export const buscarTodos = async ()=>{
  const url=`http://localhost/clientes/api/clientes/todos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return response.json();
};

export const buscarClienteId = async (id)=>{
  const url=`http://localhost/clientes/api/clientes/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.statusText}`);
    }
  return response.json();
};

export const crearCliente = async (client)=>{
  const url=`http://localhost/clientes/api/clientes`;
  const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      
      body: JSON.stringify(client),
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar el producto: ${response.statusText}`);
    }
    return response.json();
};

export const actualizarCliente = async (id, editingClient)=>{
  const url=`http://localhost/clientes/api/clientes/${id}`;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      
      body: JSON.stringify(editingClient),
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar el producto: ${response.statusText}`);
    }
    return response.json();
};

export const eliminarCliente = async (id)=>{
    const url=`http://localhost/clientes/api/clientes/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        
        body: JSON.stringify(id),
      });
    
      if (!response.ok) {
        throw new Error(`Error al eliminar el producto: ${response.statusText}`);
      }
      return response.json();
};
