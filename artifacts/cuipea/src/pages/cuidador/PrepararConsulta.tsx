import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, Search, FileText } from 'lucide-react';

export default function PrepararConsulta() {
  const { pacienteData } = useAppContext();
  const navigate = useNavigate();

  const [sumados, setSumados] = useState([
    ...(pacienteData.estudios?.filter((e: any) => e.mostrarEnConsulta) || []),
    ...(pacienteData.diario?.filter((d: any) => d.mostrarEnConsulta) || [])
  ]);

  const removeSumado = (id: string) => {
    setSumados(sumados.filter(s => s.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-[#F4F4F4]">
      <div className="bg-white p-4 border-b border-[#D4D4D4] flex items-center gap-3 shrink-0">
        <button onClick={() => navigate(-1)}><X size={24} className="text-[#28325A]" /></button>
        <h1 className="text-xl font-bold text-[#28325A]">Preparar Consulta</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        <section>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-3 px-1">Va a aparecer por defecto</h2>
          <div className="bg-white rounded-2xl border border-[#D4D4D4] overflow-hidden">
            <div className="p-3 border-b border-[#F4F4F4] text-[#28325A] font-medium text-sm flex items-center gap-2">
              <Check size={16} className="text-[#A9D5B6]" /> Nombre, edad, diagnóstico
            </div>
            <div className="p-3 border-b border-[#F4F4F4] text-[#28325A] font-medium text-sm flex items-center gap-2">
              <Check size={16} className="text-[#A9D5B6]" /> Alergias y Medicación actual
            </div>
            <div className="p-3 border-b border-[#F4F4F4] text-[#28325A] font-medium text-sm flex items-center gap-2">
              <Check size={16} className="text-[#A9D5B6]" /> Indicaciones activas vigentes
            </div>
            <div className="p-3 text-[#28325A] font-medium text-sm flex items-center gap-2">
              <Check size={16} className="text-[#A9D5B6]" /> Últimos 3 estudios
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-3 px-1">Sumaste vos</h2>
          
          {sumados.length === 0 ? (
            <div className="text-center p-6 bg-white border border-dashed border-[#D4D4D4] rounded-2xl text-[#7A87C2] text-sm">
              No agregaste nada extra todavía.
            </div>
          ) : (
            <div className="space-y-2">
              {sumados.map((item: any) => (
                <div key={item.id} className="bg-white p-3 rounded-xl border border-[#7A87C2] flex items-center gap-3">
                  <FileText className="text-[#7A87C2]" size={20} />
                  <div className="flex-1">
                    <p className="font-bold text-[#28325A] leading-tight text-sm">{item.titulo}</p>
                    <p className="text-xs text-[#7A87C2]">{item.fecha}</p>
                  </div>
                  <button onClick={() => removeSumado(item.id)} className="p-2 text-[#EF8090] bg-[#EF8090]/10 rounded-full hover:bg-[#EF8090]/20">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="w-full mt-3 py-3 border-2 border-dashed border-[#7A87C2] text-[#7A87C2] font-bold rounded-xl flex items-center justify-center gap-2 bg-white hover:bg-[#F4F4F4]">
            <Search size={18} /> Explorar app para sumar algo
          </button>
        </section>

      </div>

      <div className="p-4 bg-white border-t border-[#D4D4D4] shrink-0">
        <Link to="/cuidador/consulta" className="w-full py-4 bg-[#28325A] text-white font-bold rounded-xl flex justify-center text-lg shadow-md hover:bg-[#28325A]/90">
          Listo, así lo voy a mostrar
        </Link>
      </div>
    </div>
  );
}
