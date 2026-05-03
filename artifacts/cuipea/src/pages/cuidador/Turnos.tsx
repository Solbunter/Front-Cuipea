import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import {
  Plus, Calendar as CalendarIcon, Clock, MapPin, Stethoscope, X,
  ChevronLeft, Check, MessageSquare, Repeat, FileEdit, ChevronRight
} from 'lucide-react';

// ─── Registrar ficha de consulta ────────────────────────────────────────────
function RegistrarFichaModal({
  turno,
  onClose,
  onSave,
}: {
  turno: any;
  onClose: () => void;
  onSave: (ficha: { queDijo: string; queTengoQueHacer: string; proximosPasos: string }) => void;
}) {
  const [queDijo, setQueDijo] = useState('');
  const [queTengoQueHacer, setQueTengoQueHacer] = useState('');
  const [proximosPasos, setProximosPasos] = useState('');

  const canSave = queDijo.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-[#D4D4D4] shrink-0">
          <button onClick={onClose} className="p-1 text-[#7A87C2]">
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-[#28325A] text-lg leading-tight">Registrar consulta</h2>
            <p className="text-sm text-[#7A87C2]">{turno.especialista} · {turno.especialidad}</p>
          </div>
          <button onClick={onClose} className="p-1 text-[#D4D4D4]">
            <X size={20} />
          </button>
        </div>

        {/* Banner fecha */}
        <div className="mx-5 mt-4 bg-[#7A87C2]/10 rounded-2xl p-3 flex items-center gap-2 shrink-0">
          <CalendarIcon size={15} className="text-[#7A87C2] shrink-0" />
          <p className="text-sm font-semibold text-[#28325A]">
            {new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {turno.hora}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Qué dijo el médico — obligatorio */}
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2 flex items-center gap-1">
              <MessageSquare size={12} /> ¿Qué dijo el médico? <span className="text-[#EF8090]">*</span>
            </label>
            <textarea
              value={queDijo}
              onChange={(e) => setQueDijo(e.target.value)}
              placeholder="Ej: El médico dijo que los nódulos se mantienen estables. Ajustó la dosis de Selumetinib a 25mg cada 12hs..."
              rows={4}
              className="w-full p-4 bg-[#F4F4F4] border-2 border-transparent focus:border-[#7A87C2] rounded-2xl text-[#28325A] text-sm leading-relaxed outline-none resize-none placeholder:text-[#D4D4D4]"
            />
          </div>

          {/* Qué tengo que hacer */}
          <div>
            <label className="block text-xs font-bold text-[#F6C95A] uppercase tracking-wider mb-2 flex items-center gap-1">
              <Check size={12} /> ¿Qué tengo que hacer?
            </label>
            <textarea
              value={queTengoQueHacer}
              onChange={(e) => setQueTengoQueHacer(e.target.value)}
              placeholder="Ej: Sacar turno para resonancia en 3 meses. Pedir receta de Selumetinib antes del 20..."
              rows={3}
              className="w-full p-4 bg-[#F4F4F4] border-2 border-transparent focus:border-[#F6C95A] rounded-2xl text-[#28325A] text-sm leading-relaxed outline-none resize-none placeholder:text-[#D4D4D4]"
            />
          </div>

          {/* Próximos pasos */}
          <div>
            <label className="block text-xs font-bold text-[#A9D5B6] uppercase tracking-wider mb-2">
              Próximos pasos
            </label>
            <textarea
              value={proximosPasos}
              onChange={(e) => setProximosPasos(e.target.value)}
              placeholder="Ej: Control en 3 meses. Si aparece dolor de cabeza o vómitos, consultar antes..."
              rows={3}
              className="w-full p-4 bg-[#F4F4F4] border-2 border-transparent focus:border-[#A9D5B6] rounded-2xl text-[#28325A] text-sm leading-relaxed outline-none resize-none placeholder:text-[#D4D4D4]"
            />
          </div>

          {/* Preguntas preparadas (read-only) */}
          {turno.preguntas?.length > 0 && (
            <div className="border border-[#D4D4D4] rounded-2xl overflow-hidden">
              <div className="px-4 py-2.5 bg-[#F4F4F4] text-xs font-bold text-[#7A87C2] uppercase tracking-wider">
                Preguntas que preparaste ({turno.preguntas.length})
              </div>
              {turno.preguntas.map((p: string, i: number) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-t border-[#F4F4F4]">
                  <Check size={14} className="text-[#A9D5B6] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#28325A] font-medium">{p}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-[#D4D4D4] space-y-2 shrink-0">
          <button
            onClick={() => canSave && onSave({ queDijo, queTengoQueHacer, proximosPasos })}
            disabled={!canSave}
            className={`w-full py-4 rounded-2xl font-bold text-base transition ${canSave ? 'bg-[#28325A] text-white shadow-md' : 'bg-[#D4D4D4] text-white cursor-not-allowed'}`}
          >
            Guardar ficha de consulta
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-2 font-semibold text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Ver / editar ficha existente ────────────────────────────────────────────
function TurnoDetalle({
  turno,
  onClose,
  onRegistrarFicha,
  onPrepararPreguntas,
}: {
  turno: any;
  onClose: () => void;
  onRegistrarFicha: () => void;
  onPrepararPreguntas: () => void;
}) {
  const [tab, setTab] = useState<'ficha' | 'preguntas'>('ficha');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[88vh] flex flex-col animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-[#D4D4D4] shrink-0">
          <button onClick={onClose} className="p-1 text-[#7A87C2]">
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-[#28325A] text-lg leading-tight">{turno.especialista}</h2>
            <p className="text-sm text-[#7A87C2]">{turno.especialidad}</p>
          </div>
          <span
            className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
              turno.estado === 'realizado'
                ? 'bg-[#A9D5B6]/30 text-[#4A9A60]'
                : 'bg-[#F6C95A]/30 text-[#B89230]'
            }`}
          >
            {turno.estado === 'realizado' ? 'Realizado' : 'Pendiente'}
          </span>
        </div>

        {/* Info básica */}
        <div className="px-5 py-3 bg-[#F4F4F4] flex flex-wrap gap-3 text-sm shrink-0">
          <div className="flex items-center gap-1.5 text-[#28325A] font-semibold">
            <CalendarIcon size={14} className="text-[#7A87C2]" />
            {turno.esRecurrente
              ? `Todos los ${turno.dia}s`
              : new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5 text-[#28325A] font-semibold">
            <Clock size={14} className="text-[#7A87C2]" /> {turno.hora}
          </div>
          {turno.lugar && (
            <div className="flex items-center gap-1.5 text-[#28325A] font-semibold">
              <MapPin size={14} className="text-[#7A87C2]" /> {turno.lugar}
            </div>
          )}
        </div>

        {/* Tabs si es realizado */}
        {turno.estado === 'realizado' && turno.ficha && (
          <div className="flex border-b border-[#D4D4D4] px-5 shrink-0">
            <button
              onClick={() => setTab('ficha')}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition ${tab === 'ficha' ? 'border-[#7A87C2] text-[#7A87C2]' : 'border-transparent text-[#D4D4D4]'}`}
            >
              Ficha de consulta
            </button>
            <button
              onClick={() => setTab('preguntas')}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition ${tab === 'preguntas' ? 'border-[#7A87C2] text-[#7A87C2]' : 'border-transparent text-[#D4D4D4]'}`}
            >
              Preguntas ({turno.preguntas?.length || 0})
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* ── Realizado CON ficha ── */}
          {turno.estado === 'realizado' && turno.ficha && tab === 'ficha' && (
            <>
              <div className="bg-[#7A87C2]/10 p-4 rounded-2xl border-l-4 border-[#7A87C2]">
                <p className="text-[10px] font-bold text-[#7A87C2] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MessageSquare size={12} /> Qué dijo el médico
                </p>
                <p className="text-[#28325A] font-medium leading-relaxed text-sm">{turno.ficha.queDijo}</p>
              </div>
              {turno.ficha.queTengoQueHacer && (
                <div className="bg-[#F6C95A]/10 p-4 rounded-2xl border-l-4 border-[#F6C95A]">
                  <p className="text-[10px] font-bold text-[#B89230] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Check size={12} /> Qué tengo que hacer
                  </p>
                  <p className="text-[#28325A] font-medium leading-relaxed text-sm">{turno.ficha.queTengoQueHacer}</p>
                </div>
              )}
              {turno.ficha.proximosPasos && (
                <div className="bg-[#A9D5B6]/10 p-4 rounded-2xl border-l-4 border-[#A9D5B6]">
                  <p className="text-[10px] font-bold text-[#4A9A60] uppercase tracking-wider mb-2">Próximos pasos</p>
                  <p className="text-[#28325A] font-medium leading-relaxed text-sm">{turno.ficha.proximosPasos}</p>
                </div>
              )}
            </>
          )}

          {/* ── Realizado CON ficha — tab preguntas ── */}
          {turno.estado === 'realizado' && turno.ficha && tab === 'preguntas' && (
            <div className="space-y-2">
              {turno.preguntas?.length > 0
                ? turno.preguntas.map((p: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#F4F4F4] rounded-xl">
                      <Check size={16} className="text-[#A9D5B6] mt-0.5 shrink-0" />
                      <p className="text-[#28325A] font-medium text-sm">{p}</p>
                    </div>
                  ))
                : <p className="text-[#7A87C2] text-center py-4 font-medium">No había preguntas preparadas.</p>}
            </div>
          )}

          {/* ── Realizado SIN ficha — prompt para registrar ── */}
          {turno.estado === 'realizado' && !turno.ficha && (
            <div className="flex flex-col items-center text-center py-6 gap-5">
              <div className="w-20 h-20 bg-[#7A87C2]/10 rounded-full flex items-center justify-center">
                <FileEdit size={36} className="text-[#7A87C2]" />
              </div>
              <div>
                <h3 className="font-bold text-[#28325A] text-lg mb-1">Sin ficha registrada</h3>
                <p className="text-[#7A87C2] font-medium text-sm leading-relaxed max-w-xs mx-auto">
                  Registrá qué dijo el médico, qué tenés que hacer y los próximos pasos para no olvidar nada.
                </p>
              </div>
              <button
                onClick={onRegistrarFicha}
                className="flex items-center gap-2 bg-[#28325A] text-white font-bold px-8 py-4 rounded-2xl shadow-md hover:opacity-90 transition"
              >
                <FileEdit size={18} />
                Registrar qué pasó
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* ── Pendiente ── */}
          {turno.estado === 'pendiente' && (
            <>
              {turno.preguntas?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-3">Preguntas preparadas</p>
                  <div className="space-y-2">
                    {turno.preguntas.map((p: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[#F6C95A]/10 rounded-xl border border-[#F6C95A]/30">
                        <MessageSquare size={16} className="text-[#B89230] mt-0.5 shrink-0" />
                        <p className="text-[#28325A] font-medium text-sm">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-3">Llevar a la consulta</p>
                <div className="space-y-2">
                  {['Receta del mes (Selumetinib)', 'Últimas fotos de manchas'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-xl">
                      <div className="w-5 h-5 rounded border-2 border-[#D4D4D4] bg-white shrink-0" />
                      <p className="text-[#28325A] font-medium text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#EF8090]/10 border border-[#EF8090]/30 p-4 rounded-2xl">
                <p className="font-bold mb-1 text-[#EF8090] text-sm">Recordá:</p>
                <p className="font-medium leading-relaxed text-sm text-[#28325A]">
                  Podés abrir "Modo Consulta" desde Inicio para mostrarle toda la info clave al médico en 90 segundos.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer acciones */}
        {turno.estado === 'realizado' && !turno.ficha && (
          <div className="p-5 border-t border-[#D4D4D4] shrink-0">
            <button
              onClick={onRegistrarFicha}
              className="w-full bg-[#28325A] text-white py-4 rounded-2xl font-bold shadow-md"
            >
              Registrar ficha de consulta
            </button>
          </div>
        )}
        {turno.estado === 'pendiente' && (
          <div className="p-5 border-t border-[#D4D4D4] flex gap-3 shrink-0">
            <button
              onClick={onPrepararPreguntas}
              className="flex-1 bg-[#28325A] text-white py-3.5 rounded-2xl font-bold"
            >
              {turno.preguntas?.length > 0 ? `Editar preguntas (${turno.preguntas.length})` : 'Preparar preguntas'}
            </button>
            <button className="flex-1 border-2 border-[#EF8090] text-[#EF8090] py-3.5 rounded-2xl font-bold">
              Cancelar turno
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Preparar preguntas ───────────────────────────────────────────────────────
function PrepararPreguntasModal({
  turno,
  onClose,
  onSave,
}: {
  turno: any;
  onClose: () => void;
  onSave: (preguntas: string[]) => void;
}) {
  const [preguntas, setPreguntas] = useState<string[]>(turno.preguntas?.length ? [...turno.preguntas] : ['']);
  const [inputActual, setInputActual] = useState('');

  function agregarPregunta() {
    const texto = inputActual.trim();
    if (!texto) return;
    setPreguntas((prev) => [...prev.filter(Boolean), texto]);
    setInputActual('');
  }

  function eliminarPregunta(i: number) {
    setPreguntas((prev) => prev.filter((_, idx) => idx !== i));
  }

  const sugeridas = [
    '¿Cuándo hacemos el próximo control?',
    '¿Hay que ajustar la dosis?',
    '¿A qué síntomas tengo que prestarle atención?',
    '¿Necesita algún estudio nuevo?',
    '¿Tiene restricciones en la escuela o actividad física?',
    '¿Cómo va evolucionando en comparación con el último control?',
  ];

  const preguntasActivas = preguntas.filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-[#D4D4D4] shrink-0">
          <button onClick={onClose} className="p-1 text-[#7A87C2]">
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-[#28325A] text-lg">Preparar preguntas</h2>
            <p className="text-sm text-[#7A87C2]">{turno.especialista} · {new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })}</p>
          </div>
          <button onClick={onClose} className="p-1 text-[#D4D4D4]"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Campo libre para nueva pregunta */}
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">
              Escribí tus preguntas
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputActual}
                onChange={(e) => setInputActual(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && agregarPregunta()}
                placeholder="Ej: ¿Cuándo es el próximo control?"
                className="flex-1 p-4 bg-[#F4F4F4] border-2 border-transparent focus:border-[#F6C95A] rounded-2xl text-[#28325A] text-sm outline-none"
              />
              <button
                onClick={agregarPregunta}
                disabled={!inputActual.trim()}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition ${inputActual.trim() ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#F4F4F4] text-[#D4D4D4]'}`}
              >
                <Plus size={22} />
              </button>
            </div>
          </div>

          {/* Lista de preguntas agregadas */}
          {preguntasActivas.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[#28325A] uppercase tracking-wider mb-2">
                Tu lista ({preguntasActivas.length})
              </p>
              <div className="space-y-2">
                {preguntasActivas.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#F6C95A]/10 border border-[#F6C95A]/40 rounded-2xl p-3.5">
                    <MessageSquare size={15} className="text-[#B89230] mt-0.5 shrink-0" />
                    <p className="flex-1 text-sm font-medium text-[#28325A] leading-snug">{p}</p>
                    <button onClick={() => eliminarPregunta(i)} className="text-[#D4D4D4] hover:text-[#EF8090] transition shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preguntas sugeridas */}
          <div>
            <p className="text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-3">Sugerencias rápidas</p>
            <div className="space-y-2">
              {sugeridas.filter((s) => !preguntasActivas.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => setPreguntas((prev) => [...prev.filter(Boolean), s])}
                  className="w-full text-left flex items-center gap-3 p-3.5 bg-[#F4F4F4] rounded-2xl hover:bg-[#7A87C2]/10 transition"
                >
                  <Plus size={15} className="text-[#7A87C2] shrink-0" />
                  <p className="text-sm font-medium text-[#28325A]">{s}</p>
                </button>
              ))}
              {sugeridas.filter((s) => !preguntasActivas.includes(s)).length === 0 && (
                <p className="text-sm text-[#7A87C2] text-center py-2">¡Todas las sugerencias ya están agregadas!</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-[#D4D4D4] space-y-2 shrink-0">
          <button
            onClick={() => onSave(preguntasActivas)}
            className="w-full bg-[#28325A] text-white py-4 rounded-2xl font-bold shadow-md"
          >
            Guardar {preguntasActivas.length > 0 ? `${preguntasActivas.length} pregunta${preguntasActivas.length > 1 ? 's' : ''}` : 'lista vacía'}
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-2 font-semibold text-sm">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// ─── Formulario nuevo turno ───────────────────────────────────────────────────
function NuevoTurnoForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#28325A]">Nuevo turno</h2>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Especialista', placeholder: 'Ej: Dra. Patricia Lozano', type: 'text' },
            { label: 'Especialidad', placeholder: 'Ej: Neurología infantil', type: 'text' },
            { label: 'Lugar', placeholder: 'Ej: Hospital Garrahan', type: 'text' },
            { label: 'Motivo (opcional)', placeholder: 'Ej: Control trimestral', type: 'text' },
          ].map(({ label, placeholder, type }) => (
            <div key={label}>
              <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">{label}</label>
              <input type={type} placeholder={placeholder} className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#F6C95A]" />
            </div>
          ))}
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
          <label className="flex items-center gap-3 p-4 border-2 border-[#D4D4D4] rounded-2xl cursor-pointer hover:border-[#7A87C2] transition">
            <Repeat size={18} className="text-[#7A87C2]" />
            <div>
              <p className="font-bold text-[#28325A] text-sm">Turno recurrente</p>
              <p className="text-xs text-[#7A87C2]">Se repite cada semana o mes</p>
            </div>
            <input type="checkbox" className="ml-auto w-5 h-5 accent-[#7A87C2]" />
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <button onClick={onClose} className="w-full bg-[#F6C95A] text-[#28325A] py-4 rounded-2xl font-bold text-lg shadow-md">
            Guardar turno
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-3 font-semibold">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function Turnos() {
  const { pacienteData, pacienteActivo, data, updateData } = useAppContext();
  const [tab, setTab] = useState<'proximos' | 'pasados' | 'recurrentes'>('proximos');
  const [selected, setSelected] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [showPreguntas, setShowPreguntas] = useState(false);

  const turnos: any[] = pacienteData.turnos || [];
  const proximos = turnos.filter((t) => t.estado === 'pendiente' && !t.esRecurrente);
  const pasados = turnos.filter((t) => t.estado === 'realizado');
  const recurrentes = turnos.filter((t) => t.esRecurrente || t.estado === 'recurrente');
  const displayed = tab === 'proximos' ? proximos : tab === 'pasados' ? pasados : recurrentes;

  function handleGuardarFicha(ficha: { queDijo: string; queTengoQueHacer: string; proximosPasos: string }) {
    if (!selected) return;
    const allTurnos: any[] = data.turnos || [];
    const updated = allTurnos.map((t: any) =>
      t.id === selected.id ? { ...t, ficha } : t
    );
    updateData({ turnos: updated });
    const updatedSelected = { ...selected, ficha };
    setSelected(updatedSelected);
    setShowRegistrar(false);
  }

  function handleGuardarPreguntas(preguntas: string[]) {
    if (!selected) return;
    const allTurnos: any[] = data.turnos || [];
    const updated = allTurnos.map((t: any) =>
      t.id === selected.id ? { ...t, preguntas } : t
    );
    updateData({ turnos: updated });
    setSelected({ ...selected, preguntas });
    setShowPreguntas(false);
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Turnos médicos</h1>
      </div>

      {/* Tabs */}
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
            {label}{count > 0 && <span className="ml-0.5 opacity-70"> ({count})</span>}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {displayed.length === 0 ? (
          <div className="text-center p-10 text-[#7A87C2]">
            <CalendarIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No hay turnos {tab === 'proximos' ? 'próximos' : tab === 'pasados' ? 'pasados' : 'fijos'}.</p>
          </div>
        ) : displayed.map((turno) => (
          <button
            key={turno.id}
            onClick={() => setSelected(turno)}
            className="w-full text-left border border-[#D4D4D4] rounded-2xl p-4 bg-white shadow-sm hover:border-[#F6C95A] hover:shadow-md transition"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-[#F6C95A]/20 p-2.5 rounded-full text-[#B89230] shrink-0">
                <Stethoscope size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#28325A] text-base leading-tight">{turno.especialista}</h3>
                <p className="text-sm text-[#7A87C2]">{turno.especialidad}</p>
              </div>
              {turno.estado === 'realizado' && turno.ficha && (
                <span className="text-[10px] font-bold text-[#4A9A60] bg-[#A9D5B6]/30 px-2 py-1 rounded-full shrink-0">Con ficha</span>
              )}
              {turno.estado === 'realizado' && !turno.ficha && (
                <span className="text-[10px] font-bold text-[#7A87C2] bg-[#7A87C2]/10 px-2 py-1 rounded-full shrink-0 flex items-center gap-0.5">
                  <FileEdit size={10} /> Registrar
                </span>
              )}
            </div>

            <div className="bg-[#F4F4F4] rounded-xl p-3 space-y-1.5 text-sm text-[#28325A]">
              <div className="flex items-center gap-2 font-semibold">
                <CalendarIcon size={13} className="text-[#7A87C2] shrink-0" />
                {turno.esRecurrente
                  ? `Todos los ${turno.dia}s`
                  : new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-[#7A87C2] shrink-0" /> {turno.hora}
              </div>
              {turno.lugar && (
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#7A87C2] shrink-0" />
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

      {/* FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#F6C95A] text-[#28325A] rounded-full flex items-center justify-center shadow-xl z-20"
      >
        <Plus size={30} />
      </button>

      {/* Modals */}
      {selected && !showRegistrar && !showPreguntas && (
        <TurnoDetalle
          turno={selected}
          onClose={() => setSelected(null)}
          onRegistrarFicha={() => setShowRegistrar(true)}
          onPrepararPreguntas={() => setShowPreguntas(true)}
        />
      )}
      {selected && showRegistrar && (
        <RegistrarFichaModal
          turno={selected}
          onClose={() => setShowRegistrar(false)}
          onSave={handleGuardarFicha}
        />
      )}
      {selected && showPreguntas && (
        <PrepararPreguntasModal
          turno={selected}
          onClose={() => setShowPreguntas(false)}
          onSave={handleGuardarPreguntas}
        />
      )}
      {showForm && <NuevoTurnoForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
