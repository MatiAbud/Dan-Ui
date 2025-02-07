import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ConfirmationMessage({ message, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Especificamos el tiempo que queremos para que el mensaje desaparezca automáticamente
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3000 ms = 3 segundos

    // Limpiamos el timer cuando el componente se desmonte o el mensaje se cierre manualmente
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`fixed top-10 inset-x-0 flex justify-center`}
    >
      <div className={`flex items-center gap-3 p-5 rounded-lg shadow-lg text-white 
        ${type === "success" ? "bg-green-500" : "bg-red-500"} w-auto max-w-lg`}
      >
        {type === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
        <span className="text-lg">{message}</span>
        <button className="ml-3 text-white text-xl" onClick={() => setVisible(false)}>✕</button>
      </div>
    </motion.div>
  );
}
