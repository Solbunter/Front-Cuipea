import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, NotebookPen } from 'lucide-react';

export default function Diario() {
  const { pacienteData } = useAppContext();
  const diario = pacienteData.diario || [];

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Diario de observaciones</h1>
        <p className="text-sm text-[#7A87C2] mt-1 leading-snug">Anotá cómo durmió, cambios de humor o síntomas. Todo suma.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {diario.length === 0 ? (
          <div className="text-center p-8 text-[#7A87C2] flex flex-col items-center">
            <NotebookPen size={48} className="mb-4 opacity-50" />
            <p>Todavía no anotaste nada.</p>
          </div>
        ) : (
          diario.map((nota: any) => (
            <div key={nota.id} className="relative pl-6 pb-6 border-l-2 border-[#A9D5B6] last:border-0 last:pb-0">
              <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#A9D5B6] rounded-full border-2 border-white"></div>
              
              <div className="bg-[#F4F4F4] rounded-2xl p-4 shadow-sm relative -top-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#7A87C2]">{new Date(nota.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                  {nota.intensidad && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${nota.intensidad >= 4 ? 'bg-[#EF8090] text-white' : 'bg-[#F6C95A] text-[#28325A]'}`}>
                      Intensidad: {nota.intensidad}/5
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-[#28325A] text-lg mb-1 leading-tight">{nota.titulo}</h3>
                <p className="text-sm text-[#28325A]/80">{nota.descripcion}</p>
                
                {nota.mostrarEnConsulta && (
                  <div className="mt-3 text-xs font-bold text-[#EF8090] flex items-center gap-1">
                    ★ Se mostrará en Modo Consulta
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#A9D5B6] text-[#28325A] rounded-full flex items-center justify-center shadow-lg hover:brightness-95">
        <Plus size={32} />
      </button>
    </div>
  );
}
