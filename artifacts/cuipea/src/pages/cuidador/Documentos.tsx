import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { FileText, Plus, File, Image as ImageIcon } from 'lucide-react';

export default function Documentos() {
  const { pacienteData } = useAppContext();
  const [filtro, setFiltro] = useState('Todos');
  
  const estudios = pacienteData.estudios || [];
  
  const filtros = ['Todos', 'Estudios', 'Recetas', 'Informes'];
  
  const displayed = filtro === 'Todos' ? estudios : estudios.filter((e: any) => e.tipo === filtro || e.tipo === filtro.slice(0,-1));

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Documentos y Estudios</h1>
      </div>

      <div className="px-4 py-3 overflow-x-auto whitespace-nowrap flex gap-2 border-b border-[#D4D4D4]">
        {filtros.map(f => (
          <button 
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold shrink-0 transition ${filtro === f ? 'bg-[#28325A] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {displayed.map((doc: any) => (
          <div key={doc.id} className="flex gap-4 p-4 border border-[#D4D4D4] rounded-2xl bg-white shadow-sm hover:border-[#28325A] cursor-pointer">
            <div className="bg-[#7A87C2]/10 p-3 rounded-xl h-fit text-[#7A87C2]">
              {doc.tipo === 'Receta' ? <FileText size={24} /> : <ImageIcon size={24} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-[#7A87C2] tracking-wider bg-[#F4F4F4] px-2 py-0.5 rounded-md mb-1 block w-fit">{doc.tipo}</span>
                <span className="text-xs text-[#7A87C2] font-semibold">{new Date(doc.fecha).toLocaleDateString('es-AR')}</span>
              </div>
              <h3 className="font-bold text-[#28325A] leading-tight mb-1">{doc.titulo}</h3>
              {doc.mostrarEnConsulta && (
                <span className="inline-block mt-2 text-xs font-bold text-[#EF8090] bg-[#EF8090]/10 px-2 py-1 rounded-md">
                  Marcado para próxima consulta
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#28325A] text-white rounded-full flex items-center justify-center shadow-lg">
        <Plus size={32} />
      </button>
    </div>
  );
}
