import React, { useState } from 'react';
import { Thermometer, Eye, Pill, ClipboardList, Plus, Clock, LineChart } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function getIcon(tipo: string) {
  switch (tipo) {
    case 'temperatura': return <Thermometer className="text-[#EF8090]" size={20} />;
    case 'sintoma': return <Eye className="text-[#EF8090]" size={20} />;
    case 'dosis': return <Pill className="text-[#EF8090]" size={20} />;
    default: return <ClipboardList className="text-[#EF8090]" size={20} />;
  }
}

export default function Indicaciones() {
  const { pacienteData, data, updateData, pacienteActivo } = useAppContext();
  const [tab, setTab] = useState<'activas' | 'finalizadas'>('activas');
  const [showRegistrar, setShowRegistrar] = useState<any>(null);
  const [showHistorial, setShowHistorial] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [tempVal, setTempVal] = useState('');
  const [notaVal, setNotaVal] = useState('');
  const [siNo, setSiNo] = useState<'si' | 'no' | null>(null);

  const indicaciones = pacienteData.indicaciones || [];
  const activas = indicaciones.filter((i: any) => i.activa);
  const finalizadas = indicaciones.filter((i: any) => !i.activa);
  const displayed = tab === 'activas' ? activas : finalizadas;

  const guardarRegistro = () => {
    if (!showRegistrar) return;
    const nuevoRegistro = {
      id: `r${Date.now()}`,
      fecha: new Date().toISOString(),
      valor: showRegistrar.tipo === 'temperatura' ? parseFloat(tempVal) || 0 : showRegistrar.tipo === 'sintoma' ? siNo : 'registrado',
      nota: notaVal
    };
    const newData = { ...data };
    const idx = newData.indicaciones.findIndex((i: any) => i.id === showRegistrar.id);
    if (idx !== -1) {
      newData.indicaciones[idx].registros = [...(newData.indicaciones[idx].registros || []), nuevoRegistro];
    }
    updateData(newData);
    setShowRegistrar(null);
    setTempVal('');
    setNotaVal('');
    setSiNo(null);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Indicaciones activas</h1>
        <p className="text-sm text-[#7A87C2] mt-1">Las cosas que el médico te pidió que hagas o midas en casa.</p>
      </div>

      <div className="flex p-4 gap-2">
        <button
          onClick={() => setTab('activas')}
          className={`flex-1 py-2 rounded-full font-semibold transition ${tab === 'activas' ? 'bg-[#EF8090] text-white' : 'bg-[#F4F4F4] text-[#28325A]'}`}
        >
          Activas ({activas.length})
        </button>
        <button
          onClick={() => setTab('finalizadas')}
          className={`flex-1 py-2 rounded-full font-semibold transition ${tab === 'finalizadas' ? 'bg-[#EF8090] text-white' : 'bg-[#F4F4F4] text-[#28325A]'}`}
        >
          Finalizadas ({finalizadas.length})
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {displayed.length === 0 ? (
          <div className="text-center p-10 text-[#7A87C2]">
            <ClipboardList size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay indicaciones {tab}.</p>
          </div>
        ) : (
          displayed.map((ind: any) => (
            <div key={ind.id} className="border border-[#EF8090]/40 rounded-2xl p-4 bg-white shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-[#EF8090]/10 p-2 rounded-full shrink-0 mt-0.5">
                  {getIcon(ind.tipo)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#28325A] leading-snug">{ind.titulo}</h3>
                  <p className="text-xs text-[#7A87C2] mt-1">{ind.frecuencia} • {ind.duracion}</p>
                  {ind.medico && <p className="text-xs text-[#7A87C2]">Indicado por: {ind.medico}</p>}
                </div>
              </div>

              {ind.activa && (
                <div className="bg-[#F4F4F4] rounded-xl p-3 mb-3 text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#28325A] font-medium"><Clock size={14} /> Próxima acción</span>
                  <span className="text-[#EF8090] font-bold">En 2 horas</span>
                </div>
              )}

              {ind.registros?.length > 0 && (
                <div className="mb-3">
                  <p className="text-[10px] text-[#7A87C2] font-bold uppercase tracking-wider mb-2">Últimos registros</p>
                  <div className="space-y-1">
                    {[...ind.registros].slice(-3).reverse().map((r: any) => (
                      <div key={r.id} className="text-sm flex justify-between text-[#28325A] bg-[#F4F4F4] px-3 py-1.5 rounded-lg">
                        <span className="text-[#7A87C2] text-xs">{new Date(r.fecha).toLocaleString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="font-bold">
                          {r.valor}
                          {ind.tipo === 'temperatura' ? '°C' : ''}
                          {r.nota ? ` · ${r.nota}` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ind.activa && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setShowRegistrar(ind)}
                    className="flex-1 bg-[#EF8090] text-white py-3 rounded-xl font-bold hover:brightness-105 transition"
                  >
                    Registrar ahora
                  </button>
                  <button
                    onClick={() => setShowHistorial(ind)}
                    className="flex-1 border-2 border-[#EF8090] text-[#EF8090] py-3 rounded-xl font-bold hover:bg-[#EF8090]/5 transition"
                  >
                    Ver historial
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#EF8090] text-white rounded-full flex items-center justify-center shadow-xl z-20"
      >
        <Plus size={28} />
      </button>

      {/* Modal Registrar */}
      {showRegistrar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom">
            <h2 className="text-xl font-bold text-[#28325A] mb-2">Registrar</h2>
            <p className="text-sm text-[#7A87C2] mb-5">{showRegistrar.titulo}</p>

            {showRegistrar.tipo === 'temperatura' && (
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="37.5"
                    value={tempVal}
                    onChange={e => setTempVal(e.target.value)}
                    className="text-4xl font-bold text-center flex-1 p-4 border-2 border-[#D4D4D4] rounded-2xl focus:border-[#EF8090] outline-none text-[#28325A]"
                    autoFocus
                  />
                  <span className="text-3xl font-bold text-[#28325A]">°C</span>
                </div>
                <textarea
                  placeholder="Notas opcionales (ej: tomó ibuprofeno)"
                  value={notaVal}
                  onChange={e => setNotaVal(e.target.value)}
                  className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090] min-h-[80px] resize-none"
                />
              </div>
            )}

            {showRegistrar.tipo === 'sintoma' && (
              <div className="space-y-4">
                <p className="font-semibold text-[#28325A]">¿Se presentó el síntoma?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSiNo('si')}
                    className={`flex-1 py-4 border-2 rounded-2xl font-bold text-lg transition ${siNo === 'si' ? 'bg-[#EF8090] text-white border-[#EF8090]' : 'border-[#D4D4D4] text-[#28325A]'}`}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setSiNo('no')}
                    className={`flex-1 py-4 border-2 rounded-2xl font-bold text-lg transition ${siNo === 'no' ? 'bg-[#28325A] text-white border-[#28325A]' : 'border-[#D4D4D4] text-[#28325A]'}`}
                  >
                    No
                  </button>
                </div>
                <textarea
                  placeholder="Detallá lo que observaste..."
                  value={notaVal}
                  onChange={e => setNotaVal(e.target.value)}
                  className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090] min-h-[80px] resize-none"
                />
              </div>
            )}

            {(showRegistrar.tipo === 'dosis' || showRegistrar.tipo === 'general') && (
              <div className="space-y-4">
                <div className="bg-[#EF8090]/10 p-4 rounded-2xl text-center">
                  <p className="font-bold text-[#EF8090] text-lg">Confirmar registro</p>
                  <p className="text-sm text-[#28325A] mt-1">{showRegistrar.titulo}</p>
                </div>
                <textarea
                  placeholder="Nota opcional..."
                  value={notaVal}
                  onChange={e => setNotaVal(e.target.value)}
                  className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090] min-h-[80px] resize-none"
                />
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={guardarRegistro}
                className="w-full bg-[#EF8090] text-white py-4 rounded-2xl font-bold text-lg"
              >
                Guardar registro
              </button>
              <button
                onClick={() => setShowRegistrar(null)}
                className="w-full text-[#7A87C2] py-3 font-semibold"
              >
                Posponer 30 min
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Historial */}
      {showHistorial && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] flex flex-col animate-in slide-in-from-bottom">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#28325A]">Historial completo</h2>
                <p className="text-sm text-[#7A87C2]">{showHistorial.titulo}</p>
              </div>
              <button onClick={() => setShowHistorial(null)} className="text-[#7A87C2] p-2">✕</button>
            </div>

            {showHistorial.tipo === 'temperatura' && showHistorial.registros?.length > 0 && (
              <div className="h-[180px] w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={[...showHistorial.registros].map((r: any) => ({ fecha: new Date(r.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }), temp: r.valor }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F4" />
                    <XAxis dataKey="fecha" tick={{ fontSize: 10, fill: '#7A87C2' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[36, 40]} tick={{ fontSize: 10, fill: '#7A87C2' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} formatter={(v: any) => [`${v}°C`, 'Temperatura']} />
                    <Line type="monotone" dataKey="temp" stroke="#EF8090" strokeWidth={2.5} dot={{ r: 5, fill: '#EF8090', stroke: 'white', strokeWidth: 2 }} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-2">
              {[...showHistorial.registros].reverse().map((r: any) => (
                <div key={r.id} className="flex justify-between items-center bg-[#F4F4F4] px-4 py-3 rounded-xl">
                  <div>
                    <p className="text-xs text-[#7A87C2]">{new Date(r.fecha).toLocaleString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                    {r.nota && <p className="text-sm text-[#28325A] mt-0.5">{r.nota}</p>}
                  </div>
                  <span className="font-bold text-[#EF8090]">{r.valor}{showHistorial.tipo === 'temperatura' ? '°C' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Nuevo Form (simple) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom">
            <h2 className="text-xl font-bold text-[#28325A] mb-4">Nueva indicación</h2>
            <p className="text-sm text-[#7A87C2] mb-6">El médico te pidió hacer o medir algo. Cargalo acá para que la app te recuerde.</p>
            <div className="space-y-4">
              <input type="text" placeholder="¿Qué tenés que hacer? Ej: Tomar temperatura cada 4hs" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090]" />
              <select className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090] bg-white">
                <option value="">Tipo de indicación</option>
                <option value="temperatura">Temperatura</option>
                <option value="sintoma">Observar síntoma</option>
                <option value="dosis">Dosis / medicamento</option>
                <option value="general">General</option>
              </select>
              <select className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090] bg-white">
                <option value="">Frecuencia</option>
                <option value="cada 4hs">Cada 4 horas</option>
                <option value="cada 8hs">Cada 8 horas</option>
                <option value="cada 12hs">Cada 12 horas</option>
                <option value="diaria">Una vez por día</option>
              </select>
              <select className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#EF8090] bg-white">
                <option value="">Duración</option>
                <option value="3 días">3 días</option>
                <option value="7 días">7 días</option>
                <option value="14 días">14 días</option>
                <option value="indefinida">Indefinida</option>
              </select>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button onClick={() => setShowForm(false)} className="w-full bg-[#EF8090] text-white py-4 rounded-2xl font-bold text-lg">
                Guardar indicación
              </button>
              <button onClick={() => setShowForm(false)} className="w-full text-[#7A87C2] py-3 font-semibold">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
