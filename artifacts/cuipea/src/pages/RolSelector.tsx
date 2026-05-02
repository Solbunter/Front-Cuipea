import React from 'react';
import { Link } from 'react-router-dom';

export default function RolSelector() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-12">
      <div>
        <div className="text-[60px] font-bold text-[#28325A] tracking-tight leading-none mb-2">CUIPEA</div>
        <p className="text-[#7A87C2] font-medium text-lg">Cuidados pediátricos avanzados</p>
      </div>

      <div className="w-full space-y-4">
        <Link 
          to="/cuidador/inicio" 
          className="block w-full py-4 rounded-xl bg-[#28325A] text-white font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Soy cuidador/a
        </Link>
        <Link 
          to="/medico/login" 
          className="block w-full py-4 rounded-xl bg-[#7A87C2] text-white font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Soy médico/a (mail)
        </Link>
        <Link 
          to="/medico/paciente" 
          className="block w-full py-4 rounded-xl border-2 border-[#7A87C2] text-[#7A87C2] font-semibold text-lg hover:bg-gray-50 transition-colors"
        >
          Soy médico/a (escaneé un QR)
        </Link>
      </div>
    </div>
  );
}
