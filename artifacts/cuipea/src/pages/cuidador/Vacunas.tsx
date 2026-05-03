import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { CheckCircle2, Clock, AlertCircle, Syringe, ChevronDown, ChevronUp, Info } from 'lucide-react';

const STATUS_CONFIG = {
  aplicada: { label: 'Aplicada', color: '#A9D5B6', bg: '#A9D5B6/10', icon: CheckCircle2 },
  pendiente: { label: 'Pendiente', color: '#EF8090', bg: '#EF8090/10', icon: AlertCircle },
  proxima: { label: 'Próxima', color: '#F6C95A', bg: '#F6C95A/10', icon: Clock },
  futura: { label: 'No corresponde aún', color: '#D4D4D4', bg: '#F4F4F4', icon: Info },
} as const;

type VacunaStatus = keyof typeof STATUS_CONFIG;

interface Vacuna {
  id: string;
  nombre: string;
  descripcion: string;
  dosis: string;
  edadCorresponde: string;
  fechaAplicacion: string | null;
  status: VacunaStatus;
  importante?: boolean;
  nota?: string;
}

export default function Vacunas() {
  const { pacienteData, pacienteActivo } = useAppContext();
  const vacunas: Vacuna[] = pacienteData.vacunas || [];
  const [filtro, setFiltro] = useState<'todas' | 'pendiente' | 'aplicada'>('todas');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const aplicadas = vacunas.filter(v => v.status === 'aplicada').length;
  const pendientes = vacunas.filter(v => v.status === 'pendiente' || v.status === 'proxima').length;

  const filtradas = vacunas.filter(v => {
    if (filtro === 'todas') return v.status !== 'futura';
    if (filtro === 'pendiente') return v.status === 'pendiente' || v.status === 'proxima';
    return v.status === 'aplicada';
  });

  const FILTROS = [
    { key: 'todas', label: 'Relevantes' },
    { key: 'pendiente', label: `Pendientes (${pendientes})` },
    { key: 'aplicada', label: `Aplicadas (${aplicadas})` },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-[#D4D4D4] sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Calendario de vacunas</h1>
        <p className="text-sm text-[#7A87C2] mt-0.5">Calendario Nacional de Vacunación Argentina</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Stats */}
        <div className="px-4 pt-4 pb-2 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-3 text-center border border-[#D4D4D4] shadow-sm">
            <p className="text-2xl font-black text-[#A9D5B6]">{aplicadas}</p>
            <p className="text-[10px] font-bold text-[#7A87C2] uppercase tracking-wide mt-0.5">Aplicadas</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-[#D4D4D4] shadow-sm">
            <p className="text-2xl font-black text-[#EF8090]">{pendientes}</p>
            <p className="text-[10px] font-bold text-[#7A87C2] uppercase tracking-wide mt-0.5">Pendientes</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-[#D4D4D4] shadow-sm">
            <p className="text-2xl font-black text-[#28325A]">{vacunas.length}</p>
            <p className="text-[10px] font-bold text-[#7A87C2] uppercase tracking-wide mt-0.5">Total</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {FILTROS.map(f => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition ${
                filtro === f.key
                  ? 'bg-[#28325A] text-white shadow-sm'
                  : 'bg-white text-[#7A87C2] border border-[#D4D4D4]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Aviso antigripal si es pendiente */}
        {vacunas.find(v => v.nombre.includes('Antigripal') && (v.status === 'pendiente' || v.status === 'proxima')) && (
          <div className="mx-4 mb-3 bg-[#F6C95A]/15 border-2 border-[#F6C95A]/60 rounded-2xl p-3 flex gap-3 items-start">
            <AlertCircle size={18} className="text-[#B89230] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#28325A] text-sm">Antigripal pendiente</p>
              <p className="text-xs text-[#7A87C2] mt-0.5">Importante para {pacienteActivo === 'mateo' ? 'asmáticos' : 'pacientes con enfermedades crónicas'}. Consultá con el pediatra antes del invierno.</p>
            </div>
          </div>
        )}

        {/* Lista */}
        <div className="px-4 pb-6 space-y-2">
          {filtradas.length === 0 && (
            <div className="text-center py-12 text-[#7A87C2]">
              <Syringe size={32} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No hay vacunas en esta categoría</p>
            </div>
          )}
          {filtradas.map(v => {
            const cfg = STATUS_CONFIG[v.status];
            const StatusIcon = cfg.icon;
            const isExp = expandedId === v.id;
            return (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-[#D4D4D4] shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex items-center gap-3 p-4 text-left"
                  onClick={() => setExpandedId(isExp ? null : v.id)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: cfg.color + '20' }}
                  >
                    <StatusIcon size={18} style={{ color: cfg.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[#28325A] text-sm leading-tight">{v.nombre}</p>
                      {v.importante && (
                        <span className="text-[9px] font-black uppercase tracking-wide bg-[#EF8090]/15 text-[#EF8090] px-1.5 py-0.5 rounded-md">
                          Importante
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7A87C2] mt-0.5">{v.dosis} · {v.edadCorresponde}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-lg"
                      style={{ backgroundColor: cfg.color + '20', color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                    {isExp ? <ChevronUp size={14} className="text-[#D4D4D4]" /> : <ChevronDown size={14} className="text-[#D4D4D4]" />}
                  </div>
                </button>

                {isExp && (
                  <div className="border-t border-[#F4F4F4] px-4 pb-4 pt-3 space-y-2.5">
                    <p className="text-sm text-[#28325A] leading-snug">{v.descripcion}</p>
                    {v.fechaAplicacion && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[#A9D5B6] shrink-0" />
                        <span className="text-[#28325A] font-medium">
                          Aplicada el {new Date(v.fechaAplicacion).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    {v.nota && (
                      <div className="bg-[#F4F4F4] rounded-xl p-3">
                        <p className="text-xs text-[#7A87C2] font-medium leading-snug">{v.nota}</p>
                      </div>
                    )}
                    {(v.status === 'pendiente' || v.status === 'proxima') && (
                      <button className="w-full mt-1 py-2.5 rounded-xl bg-[#28325A] text-white text-sm font-bold">
                        Registrar aplicación
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
