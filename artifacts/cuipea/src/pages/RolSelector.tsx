import React from 'react';
import { Link } from 'react-router-dom';

export default function RolSelector() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-10">
      <div className="flex flex-col items-center">
        <img
          src="/cuipea-logo.png"
          alt="CUIPEA"
          className="h-28 w-auto object-contain mb-3"
        />
        <p className="text-[#7A87C2] font-medium text-base">Cuidados pediátricos avanzados</p>
      </div>

      <div className="w-full space-y-3">
        <Link
          to="/cuidador/inicio"
          className="block w-full py-4 rounded-2xl bg-[#28325A] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-sm"
        >
          Soy cuidador/a
        </Link>
        <Link
          to="/medico/login"
          className="block w-full py-4 rounded-2xl bg-[#7A87C2] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-sm"
        >
          Soy médico/a (mail)
        </Link>
        <Link
          to="/medico/paciente"
          className="block w-full py-4 rounded-2xl border-2 border-[#7A87C2] text-[#7A87C2] font-bold text-lg hover:bg-[#F4F4F4] transition-colors"
        >
          Soy médico/a (escaneé un QR)
        </Link>
      </div>

      <p className="text-xs text-[#D4D4D4]">MVP1 v1.4 · Prototipo validación</p>
    </div>
  );
}
