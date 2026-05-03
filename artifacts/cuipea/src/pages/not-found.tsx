import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white px-6 text-center gap-6 relative overflow-hidden">
      <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rotate-[20deg] bg-[#EEC5DD] opacity-30" style={{ borderRadius: 16 }} />
      <div className="absolute bottom-[60px] left-[-20px] w-28 h-28 -rotate-[15deg] bg-[#F6C95A] opacity-20" style={{ borderRadius: 12 }} />

      <div className="w-20 h-20 bg-[#EF8090]/10 rounded-3xl flex items-center justify-center relative z-10">
        <AlertCircle size={40} className="text-[#EF8090]" />
      </div>

      <div className="relative z-10">
        <p className="text-[#7A87C2] text-sm font-bold uppercase tracking-widest mb-2">Error 404</p>
        <h1 className="text-2xl font-bold text-[#28325A] mb-3 leading-tight">Esta pantalla no existe</h1>
        <p className="text-[#7A87C2] text-sm leading-relaxed">
          La página que buscás no está disponible en este prototipo.
        </p>
      </div>

      <Link
        to="/"
        className="relative z-10 bg-[#28325A] text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:opacity-90 transition active:scale-95"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
