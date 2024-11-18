import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-500 to-red-900">
      <h1 className="text-5xl font-bold text-white mb-20 mt-[-70px]">Gestión de Pedidos</h1>
      <div className="flex space-x-4"> 
        <button className="px-6 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Clientes
        </button>
        <Link href="/productos/page.js"> 
          <button className="px-6 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            Productos
          </button>
        </Link>
        <button className="px-6 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Pedidos
        </button>
      </div>
    </div>
  );
}
