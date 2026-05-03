import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Stethoscope, X, ChevronLeft, Check, MessageSquare, Repeat } from 'lucide-react';

function TurnoDetalle({ turno, onClose }: { turno: any; onClose: () => void }) {
  const [tab, setTab] = useState<'ficha' | 'preguntas'>('ficha');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom">
        <div className="flex items-center gap-3 p-5 border-b border-[#D4D4D4]">
          <button onClick={onClose} className="p-1 text-[#7A87C2]"><ChevronLeft size={22} /></button>
          <div className="flex-1">
            <h2 className="font-bold text-[#28325A] text-lg leading-tight">{turno.especialista}</h2>
            <p className="text-sm text-[#7A87C2]">{turno.especialidad}</p>
          </div>
          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${turno.estado === 'realizado' ? 'bg-[#A9D5B6]/30 text-[#4A9A60]' : 'bg-[#F6C95A]/30 text-[#B89230]'}`}>
            {turno.estado === 'realizado' ? 'Realizado' : 'Pendiente'}
          </span>
        </div>

        {/* Info básica */}
        <div className="px-5 py-4 bg-[#F4F4F4] flex gap-4 text-sm">
          <div className="flex items-center gap-2 text-[#28325A] font-semibold">
            <CalendarIcon size={15} className="text-[#7A87C2]" />
            {turno.esRecurrente ? `Todos los ${turno.dia}s` : new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2 text-[#28325A] font-semibold">
            <Clock size={15} className="text-[#7A87C2]" /> {turno.hora}
          </div>
          {turno.lugar && <div className="flex items-center gap-2 text-[#28325A] font-semibold">
            <MapPin size={15} className="text-[#7A87C2]" /> {turno.lugar}
          </div>}
        </div>

        {/* Tabs si hay ficha */}
        {turno.estado === 'realizado' && turno.ficha && (
          <div className="flex border-b border-[#D4D4D4] px-5">
            <button onClick={() => setTab('ficha')} className={`py-3 px-4 text-sm font-bold border-b-2 transition ${tab === 'ficha' ? 'border-[#7A87C2] text-[#7A87C2]' : 'border-transparent text-[#D4D4D4]'}`}>
              Ficha de consulta
            </button>
            <button onClick={() => setTab('preguntas')} className={`py-3 px-4 text-sm font-bold border-b-2 transition ${tab === 'preguntas' ? 'border-[#7A87C2] text-[#7A87C2]' : 'border-transparent text-[#D4D4D4]'}`}>
              Preguntas ({turno.preguntas?.length || 0})
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {turno.estado === 'realizado' && turno.ficha && tab === 'ficha' ? (
            <>
              <div className="bg-[#7A87C2]/10 p-4 rounded-2xl border-l-4 border-[#7A87C2]">
                <p className="text-[10px] font-bold text-[#7A87C2] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MessageSquare size={12} /> Qué dijo el médico
                </p>
                <p className="text-[#28325A] font-medium leading-relaxed">{turno.ficha.queDijo}</p>
              </div>
              {turno.ficha.queTengoQueHacer && (
                <div className="bg-[#F6C95A]/10 p-4 rounded-2xl border-l-4 border-[#F6C95A]">
                  <p className="text-[10px] font-bold text-[#B89230] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Check size={12} /> Qué tengo que hacer
                  </p>
                  <p className="text-[#28325A] font-medium leading-relaxed">{turno.ficha.queTengoQueHacer}</p>
                </div>
              )}
              {turno.ficha.proximosPasos && (
                <div className="bg-[#A9D5B6]/10 p-4 rounded-2xl border-l-4 border-[#A9D5B6]">
                  <p className="text-[10px] font-bold text-[#4A9A60] uppercase tracking-wider mb-2">Próximos pasos</p>
                  <p className="text-[#28325A] font-medium leading-relaxed">{turno.ficha.proximosPasos}</p>
                </div>
              )}
            </>
          ) : turno.estado === 'realizado' && turno.ficha && tab === 'preguntas' ? (
            <div className="space-y-2">
              {turno.preguntas?.length > 0 ? turno.preguntas.map((p: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#F4F4F4] rounded-xl">
                  <Check size={16} className="text-[#A9D5B6] mt-0.5 shrink-0" />
                  <p className="text-[#28325A] font-medium">{p}</p>
                </div>
              )) : <p className="text-[#7A87C2] text-center py-4">No había preguntas preparadas.</p>}
            </div>
          ) : turno.estado === 'pendiente' ? (
            <>
              {turno.preguntas?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-3">Preguntas preparadas</p>
                  <div className="space-y-2">
                    {turno.preguntas.map((p: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[#F6C95A]/10 rounded-xl border border-[#F6C95A]/30">
                        <MessageSquare size={16} className="text-[#B89230] mt-0.5 shrink-0" />
                        <p className="text-[#28325A] font-medium">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-3">Llevar a la consulta</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-xl">
                    <div className="w-5 h-5 rounded border-2 border-[#D4D4D4] flex items-center justify-center bg-white shrink-0"></div>
                    <p className="text-[#28325A] font-medium text-sm">Receta del mes (Selumetinib)</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-xl">
                    <div className="w-5 h-5 rounded border-2 border-[#D4D4D4] flex items-center justify-center bg-white shrink-0"></div>
                    <p className="text-[#28325A] font-medium text-sm">Últimas fotos de manchas</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#EF8090]/10 border border-[#EF8090]/30 p-4 rounded-2xl text-sm text-[#28325A]">
                <p className="font-bold mb-1 text-[#EF8090]">Recordá:</p>
                <p className="font-medium leading-relaxed">Podés abrir "Modo Consulta" desde Inicio para mostrarle toda la info clave al médico en 90 segundos.</p>
              </div>
            </>
          ) : (
            <div className="text-center py-6 text-[#7A87C2]">
              <p className="font-medium">No hay ficha de esta consulta.</p>
            </div>
          )}
        </div>

        {turno.estado === 'pendiente' && (
          <div className="p-5 border-t border-[#D4D4D4] flex gap-3">
            <button className="flex-1 bg-[#28325A] text-white py-3.5 rounded-xl font-bold">
              Preparar preguntas
            </button>
            <button className="flex-1 border-2 border-[#EF8090] text-[#EF8090] py-3.5 rounded-xl font-bold">
              Cancelar turno
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NuevoTurnoForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#28325A]">Nuevo turno</h2>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Especialista</label>
            <input type="text" placeholder="Ej: Dra. Patricia Lozano" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Especialidad</label>
            <input type="text" placeholder="Ej: Neurología infantil" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Fecha</label>
              <input type="date" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Hora</label>
              <input type="time" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Lugar</label>
            <input type="text" placeholder="Ej: Hospital Garrahan" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Motivo (opcional)</label>
            <input type="text" placeholder="Ej: Control trimestral" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
          </div>
          <label className="flex items-center gap-3 p-4 border-2 border-[#D4D4D4] rounded-2xl cursor-pointer">
            <Repeat size={18} className="text-[#7A87C2]" />
            <div>
              <p className="font-bold text-[#28325A] text-sm">Turno recurrente</p>
              <p className="text-xs text-[#7A87C2]">Se repite cada semana o mes</p>
            </div>
            <input type="checkbox" className="ml-auto w-5 h-5 accent-[#7A87C2]" />
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <button onClick={onClose} className="w-full bg-[#F6C95A] text-[#28325A] py-4 rounded-2xl font-bold text-lg">
            Guardar turno
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-3 font-semibold">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default function Turnos() {
  const { pacienteData } = useAppContext();
  const [tab, setTab] = useState<'proximos' | 'pasados' | 'recurrentes'>('proximos');
  const [selected, setSelected] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const turnos = pacienteData.turnos || [];

  const proximos = turnos.filter((t: any) => t.estado === 'pendiente');
  const pasados = turnos.filter((t: any) => t.estado === 'realizado');
  const recurrentes = turnos.filter((t: any) => t.esRecurrente || t.estado === 'recurrente');

  const displayed = tab === 'proximos' ? proximos : tab === 'pasados' ? pasados : recurrentes;

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Turnos médicos</h1>
      </div>

      <div className="flex p-4 gap-2 border-b border-[#D4D4D4]">
        {[
          { key: 'proximos', label: 'Próximos', count: proximos.length },
          { key: 'pasados', label: 'Pasados', count: pasados.length },
          { key: 'recurrentes', label: 'Fijos', count: recurrentes.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setTab(key as any)}
            className={`flex-1 py-2 text-sm rounded-full font-bold transition ${tab === key ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}
          >
            {label} {count > 0 && <span className="ml-0.5 opacity-70">({count})</span>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {displayed.length === 0 ? (
          <div className="text-center p-10 text-[#7A87C2]">
            <CalendarIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No hay turnos {tab === 'proximos' ? 'próximos' : tab === 'pasados' ? 'pasados' : 'fijos'}.</p>
          </div>
        ) : displayed.map((turno: any) => (
          <button
            key={turno.id}
            onClick={() => setSelected(turno)}
            className="w-full text-left border border-[#D4D4D4] rounded-2xl p-4 bg-white shadow-sm hover:border-[#F6C95A] hover:shadow-md transition"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-[#F6C95A]/20 p-2 rounded-full text-[#B89230] shrink-0 mt-0.5">
                <Stethoscope size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#28325A] text-base leading-tight">{turno.especialista}</h3>
                <p className="text-sm text-[#7A87C2]">{turno.especialidad}</p>
              </div>
              {turno.estado === 'realizado' && turno.ficha && (
                <span className="text-[10px] font-bold text-[#4A9A60] bg-[#A9D5B6]/30 px-2 py-1 rounded-full shrink-0">Con ficha</span>
              )}
            </div>

            <div className="bg-[#F4F4F4] rounded-xl p-3 space-y-1.5 text-sm text-[#28325A]">
              <div className="flex items-center gap-2 font-semibold">
                <CalendarIcon size={14} className="text-[#7A87C2] shrink-0" />
                {turno.esRecurrente || turno.estado === 'recurrente'
                  ? `Todos los ${turno.dia}s`
                  : new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#7A87C2] shrink-0" /> {turno.hora}
              </div>
              {turno.lugar && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#7A87C2] shrink-0" />
                  <span className="truncate">{turno.lugar}</span>
                </div>
              )}
            </div>

            {turno.preguntas?.length > 0 && turno.estado === 'pendiente' && (
              <div className="mt-2 text-xs font-bold text-[#F6C95A] bg-[#F6C95A]/10 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <MessageSquare size={12} /> {turno.preguntas.length} pregunta{turno.preguntas.length > 1 ? 's' : ''} preparada{turno.preguntas.length > 1 ? 's' : ''}
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#F6C95A] text-[#28325A] rounded-full flex items-center justify-center shadow-xl z-20"
      >
        <Plus size={30} />
      </button>

      {selected && <TurnoDetalle turno={selected} onClose={() => setSelected(null)} />}
      {showForm && <NuevoTurnoForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
