import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, NotebookPen, Star, X, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIAS = ['Síntoma físico', 'Emoción / conducta', 'Hito positivo', 'Efecto del medicamento', 'Otro'];

function NuevoRegistroModal({ onClose, onGuardar }: { onClose: () => void; onGuardar: (entrada: any) => void }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [intensidad, setIntensidad] = useState<number | null>(null);
  const [categoria, setCategoria] = useState('');
  const [mostrar, setMostrar] = useState(false);

  const guardar = () => {
    if (!titulo.trim()) return;
    onGuardar({
      titulo,
      descripcion,
      intensidad: categoria === 'Hito positivo' ? null : intensidad,
      mostrarEnConsulta: mostrar,
      categoria,
    });
  };

  const esHito = categoria === 'Hito positivo';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center p-5 border-b border-[#D4D4D4]">
          <h2 className="text-xl font-bold text-[#28325A]">Nueva entrada al diario</h2>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Categoría */}
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">¿Qué querés anotar?</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoria(cat)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-bold border-2 transition text-left leading-tight ${
                    categoria === cat
                      ? cat === 'Hito positivo' ? 'bg-[#F6C95A] border-[#F6C95A] text-[#28325A]'
                      : 'bg-[#EF8090] border-[#EF8090] text-white'
                      : 'border-[#D4D4D4] text-[#28325A] bg-white'
                  }`}
                >
                  {cat === 'Hito positivo' ? '⭐ ' : ''}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Título *</label>
            <input
              type="text"
              placeholder={esHito ? 'Ej: Leyó un libro sola' : 'Ej: Dolor de cabeza fuerte'}
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#A9D5B6]"
              autoFocus
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Describí más (opcional)</label>
            <textarea
              placeholder={esHito ? 'Contá cómo fue...' : 'Cuándo empezó, qué hiciste, cómo siguió...'}
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#A9D5B6] min-h-[90px] resize-none"
            />
          </div>

          {/* Intensidad — solo si no es hito */}
          {!esHito && categoria && (
            <div>
              <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">
                Intensidad / impacto en el día
              </label>
              <div className="flex gap-2 justify-between">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setIntensidad(n)}
                    className={`flex-1 py-3 rounded-xl font-bold text-lg transition border-2 ${
                      intensidad === n
                        ? n <= 2 ? 'bg-[#A9D5B6] border-[#A9D5B6] text-white'
                        : n === 3 ? 'bg-[#F6C95A] border-[#F6C95A] text-[#28325A]'
                        : 'bg-[#EF8090] border-[#EF8090] text-white'
                        : 'border-[#D4D4D4] text-[#28325A]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-[#D4D4D4] font-bold mt-1 px-1">
                <span>Leve</span><span>Muy alto</span>
              </div>
            </div>
          )}

          {/* Mostrar en consulta */}
          <button
            onClick={() => setMostrar(!mostrar)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 transition ${
              mostrar ? 'border-[#EF8090] bg-[#EF8090]/5' : 'border-[#D4D4D4] bg-white'
            }`}
          >
            <Star size={20} className={mostrar ? 'text-[#EF8090] fill-[#EF8090]' : 'text-[#D4D4D4]'} />
            <div className="text-left">
              <p className={`font-bold text-sm ${mostrar ? 'text-[#EF8090]' : 'text-[#28325A]'}`}>
                {mostrar ? 'Se mostrará en la próxima consulta' : 'Marcar para mostrar en consulta'}
              </p>
              <p className="text-xs text-[#7A87C2]">Aparecerá en Modo Consulta</p>
            </div>
          </button>
        </div>

        <div className="p-5 pt-0 flex flex-col gap-3">
          <button
            onClick={guardar}
            disabled={!titulo.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition ${titulo.trim() ? 'bg-[#A9D5B6] text-[#28325A] shadow-sm' : 'bg-[#F4F4F4] text-[#D4D4D4]'}`}
          >
            Guardar entrada
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-3 font-semibold">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function EntradaDetalle({ entrada, onClose }: { entrada: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {entrada.intensidad && (
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 ${entrada.intensidad >= 4 ? 'bg-[#EF8090] text-white' : entrada.intensidad >= 3 ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#A9D5B6]/30 text-[#4A9A60]'}`}>
                Intensidad: {entrada.intensidad}/5
              </span>
            )}
            <h2 className="text-xl font-bold text-[#28325A] leading-snug">{entrada.titulo}</h2>
            <p className="text-sm text-[#7A87C2] mt-1">{new Date(entrada.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <button onClick={onClose} className="ml-3"><X size={22} className="text-[#7A87C2]" /></button>
        </div>

        {entrada.descripcion && (
          <p className="text-[#28325A] bg-[#F4F4F4] p-4 rounded-2xl leading-relaxed">{entrada.descripcion}</p>
        )}

        {entrada.mostrarEnConsulta && (
          <div className="mt-4 flex items-center gap-2 text-sm text-[#EF8090] font-bold bg-[#EF8090]/10 px-4 py-3 rounded-xl">
            <Star size={16} fill="currentColor" /> Marcado para mostrar en consulta
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 bg-[#F4F4F4] text-[#7A87C2] py-3 rounded-xl font-bold">Cerrar</button>
          <button className="flex-1 border-2 border-[#EF8090] text-[#EF8090] py-3 rounded-xl font-bold">
            {entrada.mostrarEnConsulta ? 'Quitar de consulta' : 'Sumar a consulta'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Diario() {
  const { pacienteData, data, updateData, pacienteActivo } = useAppContext();
  const diario = [...(pacienteData.diario || [])].reverse();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const guardarEntrada = (entrada: any) => {
    const nueva = {
      id: `d${Date.now()}`,
      pacienteId: pacienteActivo,
      fecha: new Date().toISOString().split('T')[0],
      ...entrada,
    };
    const newData = { ...data, diario: [...(data.diario || []), nueva] };
    updateData(newData);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Diario de observaciones</h1>
        <p className="text-sm text-[#7A87C2] mt-1 leading-snug">Anotá cómo durmió, cambios de humor o síntomas. Todo suma.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {diario.length === 0 ? (
          <div className="text-center p-10 text-[#7A87C2] flex flex-col items-center">
            <NotebookPen size={48} className="mb-4 opacity-30" />
            <p className="font-medium">Todavía no anotaste nada.</p>
            <p className="text-sm mt-1">Tocá el + para empezar.</p>
          </div>
        ) : diario.map((nota: any, idx: number) => (
          <button
            key={nota.id}
            onClick={() => setSelected(nota)}
            className="w-full text-left relative pl-6 pb-5 border-l-2 border-[#A9D5B6] last:border-0 last:pb-0"
          >
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-[#A9D5B6] rounded-full border-2 border-white"></div>

            <div className="bg-[#F4F4F4] hover:bg-[#EEEEEE] transition rounded-2xl p-4 -mt-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#7A87C2]">
                  {new Date(nota.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
                {nota.intensidad && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${nota.intensidad >= 4 ? 'bg-[#EF8090] text-white' : nota.intensidad >= 3 ? 'bg-[#F6C95A] text-[#28325A]' : 'bg-[#A9D5B6]/30 text-[#4A9A60]'}`}>
                    {nota.intensidad}/5
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[#28325A] text-base leading-snug">{nota.titulo}</h3>
              {nota.descripcion && (
                <p className="text-sm text-[#28325A]/70 mt-1 line-clamp-2">{nota.descripcion}</p>
              )}
              {nota.mostrarEnConsulta && (
                <div className="mt-2 text-xs font-bold text-[#EF8090] flex items-center gap-1">
                  <Star size={11} fill="currentColor" /> Para la próxima consulta
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#A9D5B6] text-[#28325A] rounded-full flex items-center justify-center shadow-xl z-20"
      >
        <Plus size={30} />
      </button>

      {showForm && <NuevoRegistroModal onClose={() => setShowForm(false)} onGuardar={guardarEntrada} />}
      {selected && <EntradaDetalle entrada={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
