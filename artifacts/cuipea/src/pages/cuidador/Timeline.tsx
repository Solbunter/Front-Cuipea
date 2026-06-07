import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../contexts/AppContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

/* ── TYPES ─────────────────────────────────────────────────────────── */
type TipoEvento = 'hito' | 'diagnostico' | 'consulta' | 'estudio' | 'medicacion' | 'diario' | 'crecimiento';

interface Evento {
  id: string;
  fecha: string;
  tipo: TipoEvento;
  titulo: string;
  subtitulo?: string;
  color: string;
  emoji: string;
  detalle?: string;
  badge?: string;
}

/* ── CONFIG ─────────────────────────────────────────────────────────── */
const TIPO_CONFIG: Record<TipoEvento, { label: string; color: string; emoji: string }> = {
  hito:       { label: 'Hito',       color: '#A9D5B6', emoji: '🎂' },
  diagnostico:{ label: 'Diagnóstico',color: '#28325A', emoji: '🏥' },
  consulta:   { label: 'Consulta',   color: '#F6C95A', emoji: '📅' },
  estudio:    { label: 'Estudio',    color: '#7A87C2', emoji: '🔬' },
  medicacion: { label: 'Medicación', color: '#EF8090', emoji: '💊' },
  diario:     { label: 'Diario',     color: '#5DB3C1', emoji: '📓' },
  crecimiento:{ label: 'Crecimiento',color: '#EEC5DD', emoji: '📏' },
};

const FILTROS = [
  { key: 'todo',       label: 'Todo' },
  { key: 'consulta',   label: 'Consultas' },
  { key: 'estudio',    label: 'Estudios' },
  { key: 'medicacion', label: 'Medicación' },
  { key: 'diario',     label: 'Diario' },
];

/* ── HELPERS ─────────────────────────────────────────────────────────  */
function fmtFecha(iso: string) {
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}
function mesAnio(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
}
function calcEdad(fechaNac: string) {
  const hoy = new Date();
  const nac = new Date(fechaNac + 'T00:00:00');
  let años = hoy.getFullYear() - nac.getFullYear();
  if (hoy < new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate())) años--;
  return años;
}

/* ── BUILD EVENTS ────────────────────────────────────────────────────  */
function buildEventos(pacienteData: any, pacienteActivo: string): Evento[] {
  const { perfil, turnos, estudios, diario, medicacion, crecimiento } = pacienteData;
  const eventos: Evento[] = [];

  // Nacimiento
  if (perfil?.fechaNac) {
    eventos.push({
      id: 'nac',
      fecha: perfil.fechaNac,
      tipo: 'hito',
      titulo: `Nació ${perfil.nombre.split(' ')[0]}`,
      subtitulo: `Hoy tiene ${calcEdad(perfil.fechaNac)} años`,
      color: '#A9D5B6', emoji: '🎂',
    });
  }

  // Diagnóstico (fecha estimada para prototipo)
  if (perfil?.diagnostico) {
    const diagFecha = pacienteActivo === 'lucia' ? '2021-06-15' : '2025-08-10';
    eventos.push({
      id: 'diag',
      fecha: diagFecha,
      tipo: 'diagnostico',
      titulo: perfil.diagnostico,
      subtitulo: 'Diagnóstico confirmado',
      color: '#28325A', emoji: '🏥',
      badge: 'Diagnóstico principal',
    });
  }

  // Medicaciones
  medicacion?.forEach((m: any) => {
    if (!m.fechaInicio) return;
    eventos.push({
      id: m.id + '_med',
      fecha: m.fechaInicio,
      tipo: 'medicacion',
      titulo: `Inicio de ${m.droga}`,
      subtitulo: `${m.dosis} · ${m.frecuencia}`,
      color: '#EF8090', emoji: '💊',
      badge: m.activa ? 'Activa' : 'Finalizada',
    });
  });

  // Turnos realizados
  turnos?.filter((t: any) => t.estado === 'realizado').forEach((t: any) => {
    eventos.push({
      id: t.id + '_turn',
      fecha: t.fecha,
      tipo: 'consulta',
      titulo: `Consulta: ${t.especialista}`,
      subtitulo: t.especialidad,
      detalle: t.ficha?.queDijo,
      color: '#F6C95A', emoji: '📅',
      badge: t.ficha ? 'Con ficha' : undefined,
    });
  });

  // Estudios
  estudios?.forEach((e: any) => {
    eventos.push({
      id: e.id + '_est',
      fecha: e.fecha,
      tipo: 'estudio',
      titulo: e.titulo,
      subtitulo: e.tipo,
      detalle: e.nota || undefined,
      color: '#7A87C2', emoji: e.tipo === 'Receta' ? '📋' : '🔬',
      badge: e.tipo,
    });
  });

  // Diario destacado (para mostrar al médico o intensidad ≥ 3)
  diario?.filter((d: any) => d.mostrarEnConsulta || (d.intensidad != null && d.intensidad >= 3)).forEach((d: any) => {
    eventos.push({
      id: d.id + '_dia',
      fecha: d.fecha,
      tipo: 'diario',
      titulo: d.titulo,
      subtitulo: d.descripcion?.slice(0, 90) + (d.descripcion?.length > 90 ? '…' : ''),
      color: '#5DB3C1', emoji: '📓',
      badge: d.mostrarEnConsulta ? 'Para el médico' : `Intensidad ${d.intensidad}/5`,
    });
  });

  // Último control de crecimiento
  if (crecimiento?.length > 0) {
    const last = [...crecimiento].sort((a: any, b: any) => a.fecha.localeCompare(b.fecha)).pop();
    if (last) {
      eventos.push({
        id: last.id + '_cr',
        fecha: last.fecha,
        tipo: 'crecimiento',
        titulo: `${last.peso} kg · ${last.talla} cm`,
        subtitulo: last.notas || 'Último control de crecimiento',
        color: '#EEC5DD', emoji: '📏',
      });
    }
  }

  return eventos.sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/* ── EVENTO CARD ────────────────────────────────────────────────────── */
function EventoCard({ ev, index }: { ev: Evento; index: number }) {
  const [open, setOpen] = useState(false);
  const cfg = TIPO_CONFIG[ev.tipo];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 280, damping: 24 }}
      className="flex gap-3 items-start"
    >
      {/* Node */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 36 }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm text-base shrink-0 z-10"
          style={{ backgroundColor: ev.color + (ev.tipo === 'diagnostico' ? 'FF' : '30'),
                   border: `2px solid ${ev.color}60` }}
        >
          {ev.emoji}
        </div>
        <div className="w-[2px] flex-1 mt-1" style={{ backgroundColor: ev.color + '30', minHeight: 24 }} />
      </div>

      {/* Card */}
      <button
        className="flex-1 mb-4 text-left bg-white rounded-2xl border border-[#ECEEF4] shadow-sm overflow-hidden"
        onClick={() => ev.detalle && setOpen(!open)}
      >
        <div className="px-4 py-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-bold text-sm text-[#28325A] leading-snug flex-1">{ev.titulo}</p>
            {ev.detalle && (
              open ? <ChevronUp size={15} className="text-[#B0B5C8] shrink-0 mt-0.5" />
                   : <ChevronDown size={15} className="text-[#B0B5C8] shrink-0 mt-0.5" />
            )}
          </div>
          {ev.subtitulo && (
            <p className="text-xs text-[#7A87C2] font-medium leading-snug">{ev.subtitulo}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[10px] text-[#B0B5C8] font-medium">{fmtFecha(ev.fecha)}</span>
            {ev.badge && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: ev.color + '25', color: ev.tipo === 'diagnostico' ? '#28325A' : ev.color !== '#EEC5DD' ? ev.color : '#B0689A' }}
              >
                {ev.badge}
              </span>
            )}
          </div>
        </div>
        {open && ev.detalle && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#ECEEF4] px-4 py-3"
            style={{ backgroundColor: ev.color + '12' }}
          >
            <p className="text-xs text-[#28325A] leading-relaxed font-medium">{ev.detalle}</p>
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────────── */
export default function Timeline() {
  const { pacienteData, pacienteActivo } = useAppContext();
  const [filtro, setFiltro] = useState('todo');
  const perfil = pacienteData.perfil;

  const todos = useMemo(
    () => buildEventos(pacienteData, pacienteActivo),
    [pacienteData, pacienteActivo]
  );

  const filtrados = filtro === 'todo' ? todos : todos.filter(e => e.tipo === filtro);

  // Group by mes/año
  const grupos: { mesAnio: string; eventos: Evento[] }[] = [];
  filtrados.forEach(ev => {
    const ma = mesAnio(ev.fecha);
    const last = grupos[grupos.length - 1];
    if (last && last.mesAnio === ma) last.eventos.push(ev);
    else grupos.push({ mesAnio: ma, eventos: [ev] });
  });

  const nombre = perfil?.nombre?.split(' ')[0] || 'Paciente';

  return (
    <div className="bg-[#F4F4F8] min-h-full">
      {/* Header */}
      <div className="bg-[#28325A] px-5 pt-6 pb-10 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-28 h-20 rotate-[20deg] bg-[#EEC5DD] opacity-20" style={{ borderRadius: 12 }} />
        <div className="absolute bottom-[-10px] right-[55px] w-16 h-14 rotate-[-12deg] bg-[#F6C95A] opacity-18" style={{ borderRadius: 8 }} />
        <div className="absolute top-[30px] left-[-15px] w-14 h-12 rotate-[25deg] bg-[#5DB3C1] opacity-15" style={{ borderRadius: 8 }} />
        <h1 className="text-white font-black text-2xl relative z-10">Historia de {nombre}</h1>
        <p className="text-white/55 text-sm font-medium mt-1 relative z-10">
          {todos.length} eventos registrados
        </p>
      </div>

      {/* Stats strip */}
      <div className="-mt-4 mx-4 bg-white rounded-2xl shadow-sm border border-[#ECEEF4] px-4 py-3 flex justify-around relative z-10 mb-4">
        {[
          { label: 'Consultas',  n: todos.filter(e => e.tipo === 'consulta').length,   color: '#F6C95A' },
          { label: 'Estudios',   n: todos.filter(e => e.tipo === 'estudio').length,    color: '#7A87C2' },
          { label: 'Medicación', n: todos.filter(e => e.tipo === 'medicacion').length, color: '#EF8090' },
          { label: 'Diario',     n: todos.filter(e => e.tipo === 'diario').length,     color: '#5DB3C1' },
        ].map(s => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="font-black text-xl" style={{ color: s.color }}>{s.n}</span>
            <span className="text-[10px] font-bold text-[#B0B5C8] uppercase tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="px-4 mb-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {FILTROS.map(f => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={filtro === f.key
              ? { backgroundColor: '#28325A', color: 'white' }
              : { backgroundColor: 'white', color: '#7A87C2', border: '1.5px solid #ECEEF4' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-4 pb-8">
        {grupos.length === 0 && (
          <div className="text-center py-12 text-[#B0B5C8] font-medium text-sm">
            No hay eventos de este tipo registrados.
          </div>
        )}

        {grupos.map((g, gi) => (
          <div key={g.mesAnio} className="mb-2">
            {/* Month header */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.04 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-px flex-1 bg-[#E0E2EC]" />
              <span className="text-[11px] font-bold text-[#B0B5C8] uppercase tracking-wider whitespace-nowrap px-1 capitalize">
                {g.mesAnio}
              </span>
              <div className="h-px flex-1 bg-[#E0E2EC]" />
            </motion.div>

            {/* Events */}
            {g.eventos.map((ev, i) => (
              <EventoCard key={ev.id} ev={ev} index={gi * 4 + i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
