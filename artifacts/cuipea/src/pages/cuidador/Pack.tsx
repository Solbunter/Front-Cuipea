import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Printer, CheckSquare } from 'lucide-react';

export default function Pack() {
  const { pacienteData } = useAppContext();
  const perfil = pacienteData.perfil;

  if (!perfil) return null;

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Pack imprimible</h1>
        <p className="text-sm text-[#7A87C2] mt-1">El digital es para vos. Esta hoja es para la abuela, la maestra, la guardia.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        <div className="bg-[#F6C95A]/10 border-2 border-[#F6C95A] rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#F6C95A]/20 rounded-bl-full"></div>
          
          <h2 className="text-lg font-bold text-[#28325A] mb-4">¿Qué incluye?</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckSquare className="text-[#F6C95A] mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-bold text-[#28325A]">Ficha de emergencia</p>
                <p className="text-sm text-[#7A87C2]">Nombre, diagnóstico, alergias y contactos médicos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckSquare className="text-[#F6C95A] mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-bold text-[#28325A]">Medicación actual</p>
                <p className="text-sm text-[#7A87C2]">Tabla con horarios para que la llenen a mano si se la dan.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckSquare className="text-[#F6C95A] mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-bold text-[#28325A]">Documentos marcados</p>
                <p className="text-sm text-[#7A87C2]">Estudios y recetas que elegiste incluir.</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-4 border-2 border-dashed border-[#D4D4D4] rounded-2xl font-bold text-[#7A87C2] hover:bg-[#F4F4F4]">
          Personalizar qué incluir
        </button>

      </div>

      <div className="p-4 bg-white border-t border-[#D4D4D4] shrink-0">
        <button 
          onClick={() => window.print()}
          className="w-full bg-[#F6C95A] text-[#28325A] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:brightness-95"
        >
          <Printer size={20} /> Generar PDF
        </button>
      </div>
    </div>
  );
}
