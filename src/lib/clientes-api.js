
export const buscarTodos = async ()=>{
  const url=`http://localhost/clientes/api/clientes/todos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return response.json();
};

export const buscarClientesUsuario = async (idUsuario)=>{
  const url=`http://localhost/clientes/api/usuarios/cliente/${idUsuario}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el clietne de usuario: ${response.statusText}`);
  }
  return response.json();
};

export const buscarObrasCliente = async (id)=>{
  const url=`http://localhost/clientes/api/obras/clientes/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener las obras: ${response.statusText}`);
  }
  return response.json();
};

export const buscarClienteId = async (id)=>{
  const url=`http://localhost/clientes/api/clientes/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error(`Error al obtener el cliente: ${response.statusText}`);
    }
  return response.json();
};

export const buscarClienteNombre = async (nombre)=>{
  const url=`http://localhost/clientes/api/clientes/${nombre}`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error(`Error al obtener el cliente: ${response.statusText}`);
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

export const crearObra = async (obra)=>{
  const url=`http://localhost/clientes/api/obras`;
  const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      
      body: JSON.stringify(obra),
    });
  
    if (!response.ok) {
      throw new Error(`Error al crear la obra: ${response.statusText}`);
    }
    return response.json();
};

export const asociarObra = async (idObra, idCliente) =>{
  const url=`http://localhost/clientes/api/obras/${idObra}/${idCliente}`
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!response.ok) {
    throw new Error(`Error al asociar la obra: ${response.statusText}`);
  }
  return response.json();
}

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

export const actualizarUsuarioHabilitado = async (id, editingUser)=>{
  const url=`http://localhost/clientes/api/usuarios/${id}`;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      
      body: JSON.stringify(editingUser),
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar el usuario: ${response.statusText}`);
    }
    return response.json();
};

export const eliminarUsuarioHabilitado = async (id)=>{
    const url=`http://localhost/clientes/api/usuarios/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        
        body: JSON.stringify(id),
      });
    
      if (!response.ok) {
        throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
      }
      return response.json();
};


export const agregarUsuarioHabilitado = async (usuario)=>{
  const url=`http://localhost/clientes/api/usuarios`;
  const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      
      body: JSON.stringify(usuario),
    });
  
    if (!response.ok) {
      throw new Error(`Error al crear el usuario: ${response.statusText}`);
    }
    return response.json();
};

export const buscarTodosUsuariosHabilitados = async ()=>{
  const url=`http://localhost/clientes/api/usuarios/todos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener los usuarios: ${response.statusText}`);
  }
  return response.json();
};

export const obtenerUsuarioActual = async () => {
  const url = `http://localhost/clientes/api/usuarios/actual`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al obtener el usuario actual: ${response.statusText}`);
  }
  return response.json();
};



export const habilitarObra = async (id)=>{
  const url=`http://localhost/clientes/api/obras/${id}/habilitar`;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar el estado: ${response.statusText}`);
    }
    return response.json();
};

export const finalizarObra = async (id)=>{
  const url=`http://localhost/clientes/api/obras/${id}/finalizar`;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar el estado: ${response.statusText}`);
    }
    return response.json();
};

export const pendienteObra = async (id)=>{
  const url=`http://localhost/clientes/api/obras/${id}/pendiente`;
  const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar el estado: ${response.statusText}`);
    }
    return response.json();
};