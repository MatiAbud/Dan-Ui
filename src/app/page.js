import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white-500 to-white-900">
      <h1 className="text-5xl font-bold text-black mb-20 mt-[-70px]">Gestión de Pedidos</h1>
      <div className="flex space-x-4"> 
      <Link href="/clientes">
          <button className="px-6 py-3 bg-white text-black-700 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            Clientes
          </button>
      </Link>
        <Link href="/productos"> 
          <button className="px-6 py-3 bg-white text-black-700 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            Productos
          </button>
        </Link>
        <Link href="/pedidos">
        <button className="px-6 py-3 bg-white text-black-700 font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Pedidos
        </button>
        </Link>
      </div>
    </div>
  );
}
