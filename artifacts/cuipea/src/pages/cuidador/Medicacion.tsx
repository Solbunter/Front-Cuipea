import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Pill, Plus, Clock, CheckCircle2, Circle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

function proximaToma(horarios: string[]): string {
  if (!horarios?.length) return '';
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const sorted = [...horarios]
    .map(h => {
      const [hh, mm] = h.split(':').map(Number);
      return { label: h, mins: hh * 60 + (mm || 0) };
    })
    .sort((a, b) => a.mins - b.mins);
  const next = sorted.find(h => h.mins > nowMins) || sorted[0];
  const diffMins = next.mins > nowMins ? next.mins - nowMins : (24 * 60 - nowMins) + next.mins;
  const hrs = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return hrs > 0 ? `en ${hrs}h ${mins > 0 ? `${mins}min` : ''}` : `en ${mins} min`;
}

export default function Medicacion() {
  const { pacienteData } = useAppContext();
  const medicaciones = pacienteData.medicacion || [];
  const [tomadas, setTomadas] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleTomada = (key: string) =>
    setTomadas(prev => ({ ...prev, [key]: !prev[key] }));

  const tomaDeHoy = medicaciones.flatMap((med: any) =>
    (med.horarios || []).map((h: string) => ({ med, horario: h, key: `${med.id}_${h}` }))
  ).sort((a: any, b: any) => a.horario.localeCompare(b.horario));

  const pendientes = tomaDeHoy.filter((t: any) => !tomadas[t.key]);
  const completadas = tomaDeHoy.filter((t: any) => tomadas[t.key]);

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      <div className="bg-white p-4 border-b border-[#D4D4D4] sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Medicación</h1>
        <p className="text-sm text-[#7A87C2] mt-0.5">{medicaciones.length} medicamento{medicaciones.length !== 1 ? 's' : ''} activo{medicaciones.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24">

        {/* Resumen del día */}
        <div className="bg-white rounded-2xl p-4 border border-[#D4D4D4] shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#28325A] text-sm">Tomas de hoy</h2>
            <span className="text-xs font-bold text-[#A9D5B6]">{completadas.length}/{tomaDeHoy.length} completadas</span>
          </div>
          {/* Barra de progreso */}
          <div className="h-2 bg-[#F4F4F4] rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#A9D5B6] rounded-full transition-all duration-500"
              style={{ width: tomaDeHoy.length > 0 ? `${(completadas.length / tomaDeHoy.length) * 100}%` : '0%' }}
            />
          </div>
          <div className="space-y-2">
            {tomaDeHoy.map((t: any) => (
              <button
                key={t.key}
                onClick={() => toggleTomada(t.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition ${
                  tomadas[t.key]
                    ? 'bg-[#A9D5B6]/10 border-[#A9D5B6]/40'
                    : 'bg-white border-[#D4D4D4] hover:border-[#EF8090]/40'
                }`}
              >
                {tomadas[t.key]
                  ? <CheckCircle2 size={20} className="text-[#A9D5B6] shrink-0" />
                  : <Circle size={20} className="text-[#D4D4D4] shrink-0" />
                }
                <div className="flex-1 text-left">
                  <p className={`font-bold text-sm leading-tight ${tomadas[t.key] ? 'text-[#A9D5B6] line-through' : 'text-[#28325A]'}`}>
                    {t.med.droga}
                  </p>
                  <p className="text-xs text-[#7A87C2]">{t.med.dosis}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${tomadas[t.key] ? 'bg-[#A9D5B6]/20 text-[#4A9A60]' : 'bg-[#F4F4F4] text-[#28325A]'}`}>
                  {t.horario}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Medicamentos */}
        <div>
          <h2 className="font-bold text-[#28325A] text-sm mb-3 px-1">Detalle por medicamento</h2>
          <div className="space-y-3">
            {medicaciones.map((med: any) => {
              const isExp = expanded === med.id;
              const prox = proximaToma(med.horarios);
              return (
                <div key={med.id} className="bg-white rounded-2xl shadow-sm border border-[#D4D4D4] overflow-hidden">
                  <button
                    className="w-full p-4 flex items-center gap-3 text-left"
                    onClick={() => setExpanded(isExp ? null : med.id)}
                  >
                    <div className="w-10 h-10 bg-[#EF8090]/15 rounded-xl flex items-center justify-center shrink-0">
                      <Pill size={20} className="text-[#EF8090]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#28325A] leading-tight">{med.droga}</p>
                      <p className="text-xs text-[#EF8090] font-semibold">{med.dosis}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-[#7A87C2] font-medium">Próxima</p>
                      <p className="text-xs font-bold text-[#28325A]">{prox}</p>
                    </div>
                    {isExp ? <ChevronUp size={16} className="text-[#D4D4D4] shrink-0" /> : <ChevronDown size={16} className="text-[#D4D4D4] shrink-0" />}
                  </button>

                  {isExp && (
                    <div className="border-t border-[#F4F4F4] px-4 pb-4 pt-3 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-[#28325A]">
                        <Clock size={15} className="text-[#7A87C2] shrink-0" />
                        <span className="font-medium">{med.frecuencia}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(med.horarios || []).map((h: string) => (
                          <span key={h} className="bg-[#F4F4F4] text-[#28325A] font-bold text-sm px-3 py-1.5 rounded-xl border border-[#D4D4D4]">
                            {h}
                          </span>
                        ))}
                      </div>
                      {med.indicaciones && (
                        <div className="bg-[#F6C95A]/10 border border-[#F6C95A]/40 rounded-xl p-3 flex gap-2">
                          <AlertCircle size={15} className="text-[#B89230] shrink-0 mt-0.5" />
                          <p className="text-xs text-[#28325A] font-medium leading-snug">{med.indicaciones}</p>
                        </div>
                      )}
                      <button className="text-xs font-bold text-[#7A87C2] hover:text-[#28325A] transition">
                        Ver historial de tomas →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Placeholder */}
        <div className="border border-dashed border-[#D4D4D4] rounded-2xl p-4 text-center">
          <p className="text-xs text-[#7A87C2] font-medium">Próximamente: notificaciones de recordatorio en el celular</p>
        </div>

      </div>

      <button className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#EF8090] text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-110 z-20">
        <Plus size={28} />
      </button>
    </div>
  );
}
