import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function Login() {
  const [tab, setTab] = useState<'mail' | 'qr'>('mail');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] p-6">
      <div className="mt-12 mb-8 text-center">
        <div className="text-3xl font-bold text-[#28325A] tracking-tight">CUIPEA <span className="text-[#7A87C2] font-normal">Profesionales</span></div>
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-sm border border-[#D4D4D4] flex mb-6">
        <button 
          onClick={() => setTab('mail')}
          className={`flex-1 py-3 rounded-2xl font-bold transition ${tab === 'mail' ? 'bg-[#7A87C2] text-white shadow-md' : 'text-[#7A87C2]'}`}
        >
          Iniciar sesión
        </button>
        <button 
          onClick={() => setTab('qr')}
          className={`flex-1 py-3 rounded-2xl font-bold transition ${tab === 'qr' ? 'bg-[#7A87C2] text-white shadow-md' : 'text-[#7A87C2]'}`}
        >
          Escanear QR
        </button>
      </div>

      {tab === 'mail' ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4D4D4] space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#28325A] mb-1">Email</label>
            <input type="email" placeholder="dra.lozano@hospital.com" className="w-full p-4 bg-[#F4F4F4] rounded-xl outline-none border-2 border-transparent focus:border-[#7A87C2]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#28325A] mb-1">Contraseña</label>
            <input type="password" placeholder="••••••••" className="w-full p-4 bg-[#F4F4F4] rounded-xl outline-none border-2 border-transparent focus:border-[#7A87C2]" />
          </div>
          
          <button className="w-full bg-[#7A87C2] text-white py-4 rounded-xl font-bold mt-2 shadow-md hover:bg-[#7A87C2]/90">
            Ingresar
          </button>
          
          <div className="text-center mt-4">
            <Link to="/medico/paciente" className="text-xs text-[#EF8090] font-bold underline">
              [Prototipo: Simular ingreso directo]
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4D4D4] flex flex-col items-center">
          <p className="text-center text-[#28325A] font-medium mb-6">Pedile al cuidador que te muestre su código QR de acceso.</p>
          
          <div className="w-48 h-48 bg-[#F4F4F4] rounded-2xl border-2 border-dashed border-[#D4D4D4] flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#7A87C2]/10 flex items-center justify-center">
              <span className="text-[#7A87C2] font-bold text-sm">Cámara mockeada</span>
            </div>
          </div>

          <Link to="/medico/paciente" className="w-full bg-[#7A87C2] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#7A87C2]/90 text-center">
            Simular escaneo exitoso
          </Link>
        </div>
      )}
    </div>
  );
}
