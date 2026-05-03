import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Edit2, Plus, X, Check, Heart, Shield, Calendar } from 'lucide-react';

function EditModal({ title, value, onClose, onSave }: { title: string; value: string; onClose: () => void; onSave: (v: string) => void }) {
  const [val, setVal] = useState(value);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-5 animate-in slide-in-from-bottom space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[#28325A] text-lg">{title}</h2>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>
        <textarea
          value={val}
          onChange={e => setVal(e.target.value)}
          rows={3}
          className="w-full p-4 bg-[#F4F4F4] border-2 border-transparent focus:border-[#28325A] rounded-2xl text-[#28325A] text-sm outline-none resize-none"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#D4D4D4] text-[#7A87C2] font-bold">Cancelar</button>
          <button onClick={() => { onSave(val); onClose(); }} className="flex-1 py-3 rounded-xl bg-[#28325A] text-white font-bold flex items-center justify-center gap-2">
            <Check size={16} /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Perfil() {
  const { pacienteData, data, pacienteActivo, setPacienteActivo, updateData } = useAppContext();
  const perfil = pacienteData.perfil;
  const pacientes = data.pacientes || [];
  const cuidador = data.cuidador;
  const [editDiag, setEditDiag] = useState(false);
  const [editingAlergia, setEditingAlergia] = useState(false);
  const [newAlergia, setNewAlergia] = useState('');

  if (!perfil) return null;

  const edad = new Date().getFullYear() - new Date(perfil.fechaNac).getFullYear();

  const saveDiagnostico = (val: string) => {
    const updated = (data.pacientes || []).map((p: any) =>
      p.id === pacienteActivo ? { ...p, diagnostico: val } : p
    );
    updateData({ ...data, pacientes: updated });
  };

  const removeAlergia = (a: string) => {
    const updated = (data.pacientes || []).map((p: any) =>
      p.id === pacienteActivo ? { ...p, alergias: p.alergias.filter((al: string) => al !== a) } : p
    );
    updateData({ ...data, pacientes: updated });
  };

  const addAlergia = () => {
    if (!newAlergia.trim()) return;
    const updated = (data.pacientes || []).map((p: any) =>
      p.id === pacienteActivo ? { ...p, alergias: [...(p.alergias || []), newAlergia.trim()] } : p
    );
    updateData({ ...data, pacientes: updated });
    setNewAlergia('');
    setEditingAlergia(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      {/* Selector de pacientes */}
      <div className="bg-white px-4 pt-4 pb-3 flex gap-2 overflow-x-auto border-b border-[#D4D4D4]">
        {pacientes.map((p: any) => (
          <button
            key={p.id}
            onClick={() => setPacienteActivo(p.id)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition text-sm ${
              p.id === pacienteActivo ? 'bg-[#28325A] text-white shadow-sm' : 'bg-[#F4F4F4] text-[#7A87C2]'
            }`}
          >
            <User size={14} /> {p.nombre.split(' ')[0]}
          </button>
        ))}
        <button className="px-4 py-2 rounded-xl font-bold bg-[#F4F4F4] text-[#7A87C2] flex items-center gap-1.5 border border-dashed border-[#D4D4D4] text-sm whitespace-nowrap">
          <Plus size={14} /> Agregar niño/a
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-6">

        {/* Card principal del paciente */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#D4D4D4] overflow-hidden">
          {/* Header con bloques */}
          <div className="bg-[#28325A] px-5 pt-5 pb-8 relative overflow-hidden">
            <div className="absolute top-[-16px] right-[-16px] w-24 h-24 rotate-[20deg] bg-[#EEC5DD] opacity-20" style={{ borderRadius: 10 }} />
            <div className="absolute bottom-[-10px] right-[50px] w-14 h-14 -rotate-[10deg] bg-[#F6C95A] opacity-20" style={{ borderRadius: 7 }} />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white text-2xl font-black border border-white/30">
                {perfil.nombre.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white leading-tight">{perfil.nombre}</h1>
                <p className="text-white/70 text-sm font-medium mt-0.5">{edad} años</p>
              </div>
            </div>
          </div>

          {/* Datos del paciente */}
          <div className="px-5 py-4 -mt-3 relative z-10">
            <div className="bg-white rounded-2xl border border-[#D4D4D4] divide-y divide-[#F4F4F4] shadow-sm">
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#7A87C2]" />
                  <span className="text-sm text-[#7A87C2]">Nacimiento</span>
                </div>
                <span className="font-bold text-[#28325A] text-sm">{new Date(perfil.fechaNac).toLocaleDateString('es-AR')}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[#7A87C2]" />
                  <span className="text-sm text-[#7A87C2]">DNI</span>
                </div>
                <span className="font-bold text-[#28325A] text-sm">{perfil.dni}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#7A87C2]" />
                  <span className="text-sm text-[#7A87C2]">Obra Social</span>
                </div>
                <span className="font-bold text-[#28325A] text-sm">{perfil.obraSocial}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#D4D4D4]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-[#28325A] text-sm">Diagnóstico Principal</h2>
            <button onClick={() => setEditDiag(true)} className="text-[#5DB3C1] text-xs font-bold flex items-center gap-1">
              <Edit2 size={12} /> Editar
            </button>
          </div>
          <p className="text-[#28325A] bg-[#F4F4F4] p-3 rounded-xl text-sm font-medium leading-snug">
            {perfil.diagnostico || 'No registrado'}
          </p>
        </div>

        {/* Alergias */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#D4D4D4]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#28325A] text-sm flex items-center gap-2">
              <Heart size={14} className="text-[#EF8090]" /> Alergias
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {perfil.alergias?.map((a: string) => (
              <span key={a} className="bg-[#EF8090]/10 text-[#EF8090] px-3 py-1.5 rounded-full font-bold text-sm border border-[#EF8090]/30 flex items-center gap-1.5">
                {a}
                <button onClick={() => removeAlergia(a)} className="hover:text-[#c0505f] transition">
                  <X size={13} />
                </button>
              </span>
            ))}
            {editingAlergia ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={newAlergia}
                  onChange={e => setNewAlergia(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addAlergia()}
                  placeholder="Ej: Ibuprofeno"
                  className="border-2 border-[#EF8090] rounded-full px-3 py-1 text-sm outline-none w-32 text-[#28325A]"
                />
                <button onClick={addAlergia} className="text-[#A9D5B6]"><Check size={18} /></button>
                <button onClick={() => setEditingAlergia(false)} className="text-[#D4D4D4]"><X size={18} /></button>
              </div>
            ) : (
              <button
                onClick={() => setEditingAlergia(true)}
                className="px-3 py-1.5 rounded-full font-bold text-sm border border-dashed border-[#D4D4D4] text-[#7A87C2] flex items-center gap-1 hover:border-[#EF8090] hover:text-[#EF8090] transition"
              >
                <Plus size={13} /> Agregar
              </button>
            )}
          </div>
        </div>

        {/* Cuidador */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#D4D4D4]">
          <h2 className="font-bold text-[#28325A] text-sm mb-3">Cuidador/a principal</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EEC5DD]/40 rounded-xl flex items-center justify-center font-black text-[#28325A] text-lg">
              {cuidador?.nombre?.charAt(0) || 'M'}
            </div>
            <div>
              <p className="font-bold text-[#28325A] text-sm">{cuidador?.nombre || 'María Fernández'}</p>
              <p className="text-xs text-[#7A87C2]">{cuidador?.email || 'Cuidadora principal'}</p>
            </div>
          </div>
        </div>

      </div>

      {editDiag && (
        <EditModal
          title="Diagnóstico Principal"
          value={perfil.diagnostico || ''}
          onClose={() => setEditDiag(false)}
          onSave={saveDiagnostico}
        />
      )}
    </div>
  );
}
