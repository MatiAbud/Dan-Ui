import axios from 'axios';

export const buscarTodos = async ()=>{
    const url=`http://localhost:8080/clientes/todos`;
    const response = await axios.get(url);
    return response.data;
};

export const buscarClienteId = async (id)=>{
    const url=`http://localhost:8080/clientes/id`;
    const response = await axios.get(url);
    return response.data;
};

export const crearCliente = async (client)=>{
    const url=`http://localhost:8080/clientes`;
    const response = await axios.post(url, client);
    return response.data;
};

export const actualizarCliente = async (id, editingClient)=>{
    const url=`http://localhost:8080/clientes/id`;
    const response = await axios.post(url, editingClient);
    return response.data;
};

export const eliminarCliente = async (client)=>{
    const url=`http://localhost:8080/clientes/id`;
    const response = await axios.post(url, client);
    return response.data;
};
