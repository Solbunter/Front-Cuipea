import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, ShieldAlert, GraduationCap, Users, Stethoscope, Copy, X } from 'lucide-react';

export default function Accesos() {
  const { pacienteData } = useAppContext();
  const accesos = pacienteData.accesos || [];
  const [showQrModal, setShowQrModal] = useState<any>(null);

  const handleCreateAccess = (tipo: string) => {
    setShowQrModal({
      tipo,
      url: `https://cuipea.app/acceso/${tipo}-${Math.floor(Math.random() * 1000)}`
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Accesos compartidos</h1>
        <p className="text-sm text-[#7A87C2] mt-1">Dale acceso temporal a otras personas.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Accesos Activos */}
        <section>
          <h2 className="font-bold text-[#28325A] mb-3">Activos ahora</h2>
          {accesos.length === 0 ? (
            <p className="text-sm text-[#7A87C2]">No hay accesos activos.</p>
          ) : (
            <div className="space-y-3">
              {accesos.map((a: any) => (
                <div key={a.id} className="border border-[#D4D4D4] rounded-xl p-3 bg-white flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#28325A]">{a.nombre}</p>
                    <p className="text-xs text-[#7A87C2]">Vence: {new Date(a.vencimiento).toLocaleDateString('es-AR')}</p>
                  </div>
                  <button className="text-xs font-bold text-[#EF8090] bg-[#EF8090]/10 px-3 py-1.5 rounded-lg">
                    Revocar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Generar Nuevos */}
        <section>
          <h2 className="font-bold text-[#28325A] mb-3">Compartir nuevo acceso</h2>
          <div className="grid grid-cols-2 gap-3">
            
            <button onClick={() => handleCreateAccess('medico')} className="border-2 border-[#7A87C2]/30 bg-[#7A87C2]/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:bg-[#7A87C2]/10 transition">
              <div className="bg-[#7A87C2] text-white p-3 rounded-full"><Stethoscope size={24} /></div>
              <span className="font-bold text-[#28325A] text-sm">Médico</span>
              <span className="text-[10px] text-[#7A87C2]">Historial completo</span>
            </button>

            <button onClick={() => handleCreateAccess('emergencia')} className="border-2 border-[#EF8090]/30 bg-[#EF8090]/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:bg-[#EF8090]/10 transition">
              <div className="bg-[#EF8090] text-white p-3 rounded-full"><ShieldAlert size={24} /></div>
              <span className="font-bold text-[#28325A] text-sm">Guardia</span>
              <span className="text-[10px] text-[#7A87C2]">24hs • Lo urgente</span>
            </button>

            <button onClick={() => handleCreateAccess('escuela')} className="border-2 border-[#F6C95A]/30 bg-[#F6C95A]/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:bg-[#F6C95A]/10 transition">
              <div className="bg-[#F6C95A] text-white p-3 rounded-full"><GraduationCap size={24} /></div>
              <span className="font-bold text-[#28325A] text-sm">Escuela</span>
              <span className="text-[10px] text-[#7A87C2]">Alergias y contactos</span>
            </button>

            <button onClick={() => handleCreateAccess('cuidador')} className="border-2 border-[#A9D5B6]/30 bg-[#A9D5B6]/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:bg-[#A9D5B6]/10 transition">
              <div className="bg-[#A9D5B6] text-white p-3 rounded-full"><Users size={24} /></div>
              <span className="font-bold text-[#28325A] text-sm">Familiar</span>
              <span className="text-[10px] text-[#7A87C2]">Cuidado compartido</span>
            </button>

          </div>
        </section>

      </div>

      {showQrModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 flex flex-col items-center relative animate-in zoom-in-95">
            <button onClick={() => setShowQrModal(null)} className="absolute top-4 right-4 text-[#7A87C2]">
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-bold text-[#28325A] mb-2 text-center capitalize">Acceso {showQrModal.tipo}</h2>
            <p className="text-sm text-[#7A87C2] text-center mb-6">Mostrale este QR para que lo escanee desde su celular.</p>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#D4D4D4] mb-6">
              <QRCodeSVG value={showQrModal.url} size={200} />
            </div>

            <button className="w-full bg-[#F4F4F4] text-[#28325A] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#E5E5E5]">
              <Copy size={18} /> Copiar link de acceso
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
