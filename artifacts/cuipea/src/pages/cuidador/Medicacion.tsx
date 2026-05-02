import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Pill, Plus, Clock, AlertCircle } from 'lucide-react';

export default function Medicacion() {
  const { pacienteData } = useAppContext();
  const medicaciones = pacienteData.medicacion || [];

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Recordatorios de medicación</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {medicaciones.length === 0 ? (
          <div className="text-center p-8 text-[#7A87C2]">
            No hay medicación cargada.
          </div>
        ) : (
          medicaciones.map((med: any) => (
            <div key={med.id} className="border-2 border-[#EF8090]/30 rounded-2xl p-4 bg-[#EF8090]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#EF8090]"></div>
              
              <div className="flex justify-between items-start ml-2 mb-3">
                <div>
                  <h3 className="font-bold text-[#28325A] text-xl leading-tight mb-1">{med.droga}</h3>
                  <p className="text-sm font-semibold text-[#EF8090]">{med.dosis}</p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm text-[#EF8090]">
                  <Pill size={24} />
                </div>
              </div>
              
              <div className="ml-2 bg-white rounded-xl p-3 flex flex-wrap gap-2 items-center text-sm font-medium text-[#28325A]">
                <Clock size={16} className="text-[#7A87C2]" />
                {med.frecuencia}. Horarios: 
                {med.horarios.map((h: string) => (
                  <span key={h} className="bg-[#F4F4F4] px-2 py-0.5 rounded-md font-bold">{h}</span>
                ))}
              </div>
              
              <div className="ml-2 mt-3 flex justify-end">
                <button className="text-xs font-bold text-[#7A87C2] flex items-center gap-1 hover:text-[#28325A]">
                  Ver historial completo
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#EF8090] text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-110">
        <Plus size={32} />
      </button>
    </div>
  );
}
