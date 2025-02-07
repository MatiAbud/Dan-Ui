// pedidos-api.js

export const buscarPedidoPorId = async (id) => {
    const url = `http://localhost/pedidos/api/pedidos/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener el pedido: ${response.statusText}`);
    }
    return response.json();
  };
  
  export const buscarTodosLosPedidos = async () => {
    const url = `http://localhost/pedidos/api/pedidos/todos`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener los pedidos: ${response.statusText}`);
    }
    return response.json();
  };
  
  export const crearPedido = async (pedido) => {  // 'pedido' object
    const url = `http://localhost/pedidos/api/pedidos`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*' // Only for development, remove in production
      },
      body: JSON.stringify(pedido),
    });
    if (!response.ok) {
      throw new Error(`Error al crear el pedido: ${response.statusText}`);
    }
    return response.json();
  };
  
  export const actualizarPedido = async (id, pedido) => { // 'pedido' object
    const url = `http://localhost/pedidos/api/pedidos/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*' // Only for development
      },
      body: JSON.stringify(pedido),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar el pedido: ${response.statusText}`);
    }
    return response.json();
  };
  
  export const borrarPedido = async (id) => {
    const url = `http://localhost/pedidos/api/pedidos/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*' // Only for development
      },
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el pedido: ${response.statusText}`);
    }
  };
  
  
  // Example of a 'pedido' object structure (adapt to your API)
  const ejemploPedido = {
    clienteId: 123, // ID of the customer
    productos: [
      { productoId: 456, cantidad: 2 },
      { productoId: 789, cantidad: 1 },
    ],
    fecha: "2024-10-27", // Order date
    total: 150.00,      // Total amount
    estado: "Pendiente", // Order status (e.g., "Pendiente", "Enviado", "Entregado")
    direccionEnvio: {  // Shipping address
        calle: "Calle Principal 123",
        ciudad: "Ciudad Ejemplo",
        codigoPostal: "12345"
    }
    // ... other relevant fields
  };