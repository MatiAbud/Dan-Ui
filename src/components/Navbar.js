"use client";

// src/components/Navbar.js
export default function Navbar() {
  return (
    <div className="navbar">
      <span className="text-white font-bold uppercase">DAN</span>
      <style jsx>{`
        .navbar {
          background-color: #1f2937; /* Color similar al de la barra lateral */
          color: white;
          padding: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
