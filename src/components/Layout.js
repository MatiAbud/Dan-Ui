import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-4 overflow-y-auto h-screen">
            {children}  {/* Aquí van los pedidos */}
      </div>
    </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        main {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
