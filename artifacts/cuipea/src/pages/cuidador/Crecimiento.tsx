import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, Info } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Scatter } from 'recharts';

export default function Crecimiento() {
  const { pacienteData } = useAppContext();
  const [tab, setTab] = useState<'peso' | 'talla'>('peso');
  
  const mediciones = pacienteData.crecimiento || [];
  
  // Percentiles hardcodeados para prototipo (simplificados)
  const percentiles = [
    { age: 5, p3: 15.3, p50: 19.2, p97: 24.2, paciente: mediciones.find((m:any) => m.peso <= 19)?.peso },
    { age: 6, p3: 17.3, p50: 21.7, p97: 28.1, paciente: mediciones.find((m:any) => m.peso > 19 && m.peso <= 22)?.peso },
    { age: 7, p3: 19.1, p50: 24.2, p97: 31.7, paciente: mediciones.find((m:any) => m.peso > 22 && m.peso <= 24)?.peso },
    { age: 8, p3: 21.2, p50: 27.0, p97: 36.2, paciente: mediciones.find((m:any) => m.peso > 24)?.peso }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Crecimiento</h1>
      </div>

      <div className="flex p-4 gap-2">
        <button onClick={() => setTab('peso')} className={`flex-1 py-2 rounded-full font-bold transition ${tab === 'peso' ? 'bg-[#5DB3C1] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Peso
        </button>
        <button onClick={() => setTab('talla')} className={`flex-1 py-2 rounded-full font-bold transition ${tab === 'talla' ? 'bg-[#5DB3C1] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Talla
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Gráfico */}
        <div className="bg-white border border-[#D4D4D4] rounded-3xl p-4 shadow-sm">
          <h3 className="font-bold text-[#28325A] mb-4 text-center">Curva de {tab} (OMS)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={percentiles} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F4" />
                <XAxis dataKey="age" tick={{fontSize: 12, fill: '#7A87C2'}} tickLine={false} axisLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#7A87C2'}} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="p97" stroke="#D4D4D4" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="p50" stroke="#7A87C2" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p3" stroke="#D4D4D4" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="paciente" stroke="#5DB3C1" strokeWidth={3} dot={{r: 5, fill: '#5DB3C1', strokeWidth: 2, stroke: 'white'}} connectNulls />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 bg-[#F4F4F4] p-3 rounded-xl flex items-start gap-2 text-xs text-[#7A87C2]">
            <Info size={16} className="shrink-0 mt-0.5" />
            <p>Próximamente: posibilidad de cargar tablas específicas por condición (ej. curvas para NF1 o prematuros).</p>
          </div>
        </div>

        {/* Historial */}
        <div>
          <h3 className="font-bold text-[#28325A] mb-3 px-1">Historial de mediciones</h3>
          <div className="space-y-2">
            {[...mediciones].reverse().map((m: any) => (
              <div key={m.id} className="flex justify-between items-center bg-[#F4F4F4] p-3 rounded-xl">
                <div>
                  <p className="font-bold text-[#28325A]">{new Date(m.fecha).toLocaleDateString('es-AR')}</p>
                  {m.notas && <p className="text-xs text-[#7A87C2] mt-0.5">{m.notas}</p>}
                </div>
                <div className="text-right font-bold text-[#5DB3C1]">
                  {tab === 'peso' ? `${m.peso} kg` : `${m.talla} cm`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#5DB3C1] text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-110">
        <Plus size={32} />
      </button>
    </div>
  );
}
