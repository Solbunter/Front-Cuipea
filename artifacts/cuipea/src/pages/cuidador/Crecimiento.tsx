import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, Info, X, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

// Percentiles OMS simplificados para niñas 5-9 años (peso en kg)
const PERCENTILES_PESO_F = [
  { age: 5, p3: 14.3, p50: 18.2, p97: 23.4 },
  { age: 6, p3: 16.1, p50: 20.7, p97: 27.1 },
  { age: 7, p3: 17.9, p50: 23.2, p97: 31.2 },
  { age: 8, p3: 19.8, p50: 26.0, p97: 36.0 },
  { age: 9, p3: 21.8, p50: 29.0, p97: 41.2 },
];

// Percentiles OMS simplificados para niños 2-5 años (peso en kg)
const PERCENTILES_PESO_M = [
  { age: 2, p3: 9.7, p50: 12.2, p97: 15.3 },
  { age: 3, p3: 11.3, p50: 14.3, p97: 18.3 },
  { age: 4, p3: 12.7, p50: 16.3, p97: 21.0 },
  { age: 5, p3: 14.1, p50: 18.3, p97: 24.2 },
];

function NuevaMedicionModal({ onClose, onGuardar }: { onClose: () => void; onGuardar: (m: any) => void }) {
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [nota, setNota] = useState('');

  const guardar = () => {
    if (!peso && !talla) return;
    onGuardar({ peso: parseFloat(peso) || 0, talla: parseFloat(talla) || 0, notas: nota });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#28325A]">Nueva medición</h2>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">Peso (kg)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  placeholder="25.0"
                  value={peso}
                  onChange={e => setPeso(e.target.value)}
                  className="w-full p-4 pr-10 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] text-xl font-bold text-center outline-none focus:border-[#5DB3C1]"
                  autoFocus
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A87C2] font-semibold">kg</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">Talla (cm)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  placeholder="132"
                  value={talla}
                  onChange={e => setTalla(e.target.value)}
                  className="w-full p-4 pr-12 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] text-xl font-bold text-center outline-none focus:border-[#5DB3C1]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A87C2] font-semibold">cm</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">Notas (opcional)</label>
            <input
              type="text"
              placeholder="Ej: Control anual en Garrahan"
              value={nota}
              onChange={e => setNota(e.target.value)}
              className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#5DB3C1]"
            />
          </div>

          <div className="bg-[#5DB3C1]/10 p-4 rounded-2xl text-sm text-[#28325A] flex items-start gap-2">
            <Info size={16} className="text-[#5DB3C1] shrink-0 mt-0.5" />
            <p>Medición del <strong>{new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>. Podés cambiar la fecha después.</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={guardar}
            disabled={!peso && !talla}
            className={`w-full py-4 rounded-2xl font-bold text-lg ${(peso || talla) ? 'bg-[#5DB3C1] text-white' : 'bg-[#F4F4F4] text-[#D4D4D4]'}`}
          >
            Guardar medición
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-3 font-semibold">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#D4D4D4] rounded-xl px-3 py-2 shadow-md text-xs">
        <p className="font-bold text-[#28325A] mb-1">{`${label} años`}</p>
        {payload.map((p: any) => p.value != null && (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name === 'paciente' ? `Paciente: ${p.value}` : `${p.name}: ${p.value}`} kg
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Crecimiento() {
  const { pacienteData, data, updateData, pacienteActivo } = useAppContext();
  const [tab, setTab] = useState<'peso' | 'talla'>('peso');
  const [showForm, setShowForm] = useState(false);

  const perfil = pacienteData.perfil;
  const mediciones = (pacienteData.crecimiento || []).sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  const sexo = perfil?.sexo || 'F';
  const percentilesBase = sexo === 'F' ? PERCENTILES_PESO_F : PERCENTILES_PESO_M;

  // Build chart data: merge percentiles with patient measurements by approximate age
  const getAgeAtDate = (fechaNac: string, fecha: string) => {
    const nacimiento = new Date(fechaNac);
    const medicion = new Date(fecha);
    return parseFloat(((medicion.getTime() - nacimiento.getTime()) / (365.25 * 24 * 3600 * 1000)).toFixed(1));
  };

  const chartData = percentilesBase.map(p => {
    const medicion = mediciones.find((m: any) => {
      const edad = getAgeAtDate(perfil?.fechaNac || '2018-01-01', m.fecha);
      return Math.abs(edad - p.age) < 0.7;
    });
    return {
      ...p,
      paciente: tab === 'peso' ? (medicion?.peso || null) : (medicion?.talla || null),
      label: `${p.age}a`,
    };
  });

  const ultima = mediciones[mediciones.length - 1];

  const guardarMedicion = (medicion: any) => {
    const nueva = {
      id: `cr${Date.now()}`,
      pacienteId: pacienteActivo,
      fecha: new Date().toISOString().split('T')[0],
      ...medicion,
    };
    const newData = { ...data, crecimiento: [...(data.crecimiento || []), nueva] };
    updateData(newData);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Crecimiento</h1>
        {ultima && (
          <p className="text-sm text-[#7A87C2] mt-0.5">
            Última medición: {ultima.peso} kg · {ultima.talla} cm
          </p>
        )}
      </div>

      <div className="flex p-4 gap-2">
        <button onClick={() => setTab('peso')} className={`flex-1 py-2 rounded-full font-bold transition ${tab === 'peso' ? 'bg-[#5DB3C1] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Peso (kg)
        </button>
        <button onClick={() => setTab('talla')} className={`flex-1 py-2 rounded-full font-bold transition ${tab === 'talla' ? 'bg-[#5DB3C1] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}>
          Talla (cm)
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24">

        {/* Gráfico */}
        {tab === 'peso' ? (
          <div className="bg-white border border-[#D4D4D4] rounded-3xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#28325A]">Curva de peso (OMS)</h3>
              <TrendingUp size={16} className="text-[#5DB3C1]" />
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F4" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#7A87C2' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#7A87C2' }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="p97" stroke="#D4D4D4" strokeWidth={1} dot={false} strokeDasharray="5 5" name="p97" />
                  <Line type="monotone" dataKey="p50" stroke="#A9D5B6" strokeWidth={2} dot={false} name="p50" />
                  <Line type="monotone" dataKey="p3" stroke="#D4D4D4" strokeWidth={1} dot={false} strokeDasharray="5 5" name="p3" />
                  <Line type="monotone" dataKey="paciente" stroke="#5DB3C1" strokeWidth={3} connectNulls dot={{ r: 5, fill: '#5DB3C1', strokeWidth: 2, stroke: 'white' }} name="paciente" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-[#5DB3C1]"><span className="w-4 h-0.5 bg-[#5DB3C1] inline-block rounded"></span> Paciente</span>
              <span className="flex items-center gap-1 text-[#A9D5B6]"><span className="w-4 h-0.5 bg-[#A9D5B6] inline-block rounded"></span> P50 (mediana)</span>
              <span className="flex items-center gap-1 text-[#D4D4D4]"><span className="w-6 h-0.5 bg-[#D4D4D4] inline-block rounded border-dashed"></span> P3/P97</span>
            </div>
            <div className="mt-3 bg-[#F4F4F4] p-3 rounded-xl flex items-start gap-2 text-xs text-[#7A87C2]">
              <Info size={14} className="shrink-0 mt-0.5" />
              <p>Próximamente: tablas específicas por condición (NF1, prematuros, trisomía 21).</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#D4D4D4] rounded-3xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#28325A]">Talla a lo largo del tiempo</h3>
              <TrendingUp size={16} className="text-[#5DB3C1]" />
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mediciones.map((m: any) => ({ fecha: new Date(m.fecha).toLocaleDateString('es-AR', { month: 'short', year: '2-digit' }), talla: m.talla }))} margin={{ top: 5, right: 15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F4" />
                  <XAxis dataKey="fecha" tick={{ fontSize: 10, fill: '#7A87C2' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#7A87C2' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} formatter={(v: any) => [`${v} cm`, 'Talla']} />
                  <Line type="monotone" dataKey="talla" stroke="#5DB3C1" strokeWidth={3} dot={{ r: 5, fill: '#5DB3C1', strokeWidth: 2, stroke: 'white' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Historial */}
        <div>
          <h3 className="font-bold text-[#28325A] mb-3">Historial de mediciones</h3>
          <div className="space-y-2">
            {[...mediciones].reverse().map((m: any) => (
              <div key={m.id} className="flex justify-between items-center bg-[#F4F4F4] p-3 rounded-2xl">
                <div>
                  <p className="font-bold text-[#28325A] text-sm">{new Date(m.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  {m.notas && <p className="text-xs text-[#7A87C2] mt-0.5">{m.notas}</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#5DB3C1]">
                    {tab === 'peso' ? `${m.peso} kg` : `${m.talla} cm`}
                  </p>
                  <p className="text-[10px] text-[#7A87C2]">
                    {tab === 'peso' ? `${m.talla} cm` : `${m.peso} kg`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#5DB3C1] text-white rounded-full flex items-center justify-center shadow-xl z-20 hover:brightness-105"
      >
        <Plus size={30} />
      </button>

      {showForm && <NuevaMedicionModal onClose={() => setShowForm(false)} onGuardar={guardarMedicion} />}
    </div>
  );
}
