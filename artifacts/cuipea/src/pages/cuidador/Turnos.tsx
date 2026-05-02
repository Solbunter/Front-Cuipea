import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, User, Stethoscope } from 'lucide-react';

export default function Turnos() {
  const { pacienteData } = useAppContext();
  const [tab, setTab] = useState<'proximos' | 'pasados' | 'recurrentes'>('proximos');
  
  const turnos = pacienteData.turnos || [];
  
  const proximos = turnos.filter((t: any) => t.estado === 'pendiente' && !t.esRecurrente);
  const pasados = turnos.filter((t: any) => t.estado === 'realizado');
  const recurrentes = turnos.filter((t: any) => t.esRecurrente);

  const displayed = tab === 'proximos' ? proximos : tab === 'pasados' ? pasados : recurrentes;

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF]">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Turnos médicos</h1>
      </div>

      <div className="flex p-4 gap-2 border-b border-[#D4D4D4]">
        <button onClick={() => setTab('proximos')} className={`flex-1 py-2 text-sm rounded-full font-bold transition ${tab === 'proximos' ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Próximos
        </button>
        <button onClick={() => setTab('pasados')} className={`flex-1 py-2 text-sm rounded-full font-bold transition ${tab === 'pasados' ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Pasados
        </button>
        <button onClick={() => setTab('recurrentes')} className={`flex-1 py-2 text-sm rounded-full font-bold transition ${tab === 'recurrentes' ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Fijos
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayed.length === 0 ? (
          <div className="text-center p-8 text-[#7A87C2]">
            No hay turnos {tab}.
          </div>
        ) : (
          displayed.map((turno: any) => (
            <div key={turno.id} className="border border-[#D4D4D4] rounded-2xl p-4 bg-white shadow-sm cursor-pointer hover:border-[#F6C95A] transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#F6C95A]/20 p-2 rounded-full text-[#B89230]">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#28325A] text-lg leading-tight">{turno.especialista}</h3>
                    <p className="text-sm text-[#7A87C2]">{turno.especialidad}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F4F4F4] rounded-xl p-3 space-y-2 text-sm text-[#28325A]">
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarIcon size={16} className="text-[#7A87C2]" /> 
                  {turno.esRecurrente ? `Todos los ${turno.dia}s` : new Date(turno.fecha).toLocaleDateString('es-AR')}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#7A87C2]" /> {turno.hora}
                </div>
                {turno.lugar && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#7A87C2]" /> <span className="truncate">{turno.lugar}</span>
                  </div>
                )}
              </div>

              {turno.preguntas && turno.preguntas.length > 0 && (
                <div className="mt-3 text-sm font-semibold text-[#EF8090]">
                  {turno.preguntas.length} preguntas preparadas
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#F6C95A] text-[#28325A] rounded-full flex items-center justify-center shadow-lg">
        <Plus size={32} />
      </button>
    </div>
  );
}
