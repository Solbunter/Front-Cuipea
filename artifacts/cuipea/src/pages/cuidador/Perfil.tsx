import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Edit2, Plus, X } from 'lucide-react';

export default function Perfil() {
  const { pacienteData, data, pacienteActivo, setPacienteActivo } = useAppContext();
  const perfil = pacienteData.perfil;
  const pacientes = data.pacientes || [];

  if (!perfil) return null;

  const edad = new Date().getFullYear() - new Date(perfil.fechaNac).getFullYear();

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      {/* Selector de pacientes tipo tabs */}
      <div className="bg-white p-4 flex gap-3 overflow-x-auto border-b border-[#D4D4D4]">
        {pacientes.map((p: any) => (
          <button
            key={p.id}
            onClick={() => setPacienteActivo(p.id)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition ${
              p.id === pacienteActivo ? 'bg-[#5DB3C1] text-white shadow-md' : 'bg-[#F4F4F4] text-[#7A87C2]'
            }`}
          >
            <User size={16} /> {p.nombre.split(' ')[0]}
          </button>
        ))}
        <button className="px-4 py-2 rounded-xl font-bold bg-[#F4F4F4] text-[#7A87C2] flex items-center gap-1 border border-dashed border-[#D4D4D4]">
          <Plus size={16} /> Agregar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Card Principal */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4D4D4] relative">
          <button className="absolute top-4 right-4 text-[#7A87C2] p-2 hover:bg-[#F4F4F4] rounded-full"><Edit2 size={18} /></button>
          
          <div className="w-20 h-20 bg-[#5DB3C1]/20 rounded-full flex items-center justify-center text-[#5DB3C1] text-3xl font-bold mb-4">
            {perfil.nombre.charAt(0)}
          </div>
          
          <h1 className="text-2xl font-bold text-[#28325A] mb-1">{perfil.nombre}</h1>
          <p className="text-[#7A87C2] font-medium mb-4">{edad} años • Nacimiento: {new Date(perfil.fechaNac).toLocaleDateString('es-AR')}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-[#F4F4F4] pb-2">
              <span className="text-[#7A87C2]">DNI</span>
              <span className="font-bold text-[#28325A]">{perfil.dni}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[#7A87C2]">Obra Social</span>
              <span className="font-bold text-[#28325A]">{perfil.obraSocial}</span>
            </div>
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#D4D4D4]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#28325A]">Diagnóstico Principal</h2>
            <button className="text-[#5DB3C1] text-sm font-bold flex items-center gap-1"><Edit2 size={14} /> Editar</button>
          </div>
          <p className="text-[#28325A] bg-[#F4F4F4] p-3 rounded-xl font-medium">{perfil.diagnostico || 'No registrado'}</p>
        </div>

        {/* Alergias */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#D4D4D4]">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#28325A]">Alergias</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {perfil.alergias.map((a: string) => (
              <span key={a} className="bg-[#EF8090]/10 text-[#EF8090] px-3 py-1.5 rounded-full font-bold text-sm border border-[#EF8090]/30 flex items-center gap-1">
                {a} <X size={14} className="cursor-pointer ml-1" />
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-full font-bold text-sm border border-dashed border-[#D4D4D4] text-[#7A87C2] flex items-center gap-1">
              <Plus size={14} /> Agregar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
