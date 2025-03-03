import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-black mb-20 mt-[-70px]">Gestión de Pedidos</h1>
      <div className="flex space-x-4"> 
      <Link href="/clientes">
          <button className="bg-green-500 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-green-600">
            Clientes
          </button>
      </Link>
        <Link href="/productos"> 
          <button className="bg-green-500 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-green-600">
            Productos
          </button>
        </Link>
        <Link href="/pedidos">
        <button className="bg-green-500 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-green-600">
          Pedidos
        </button>
        </Link>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center pb-4">
        <Image src="/ui/logo.png" alt="Descripción de la imagen" width={200} height={140} />
      </div>

      <div className="absolute bottom-4 right-4 text-lg text-black font-semibold">
        <p>Abud, Matías Agustín</p>
        <p>Ducasse, Valentina</p>
      </div>
    </div>
  );
}
