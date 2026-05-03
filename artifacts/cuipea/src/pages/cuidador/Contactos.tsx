import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Plus, Phone, Mail, Star, X } from 'lucide-react';

export default function Contactos() {
  const { data } = useAppContext();
  const allContactos = data.contactos || [];
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold text-[#28325A]">Contactos médicos</h1>
        <p className="text-sm text-[#7A87C2] mt-1">El equipo que cuida a {data.pacientes?.find(() => true)?.nombre?.split(' ')[0] || 'tu hijo/a'}.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {allContactos.length === 0 ? (
          <div className="text-center p-10 text-[#7A87C2]">
            <p className="font-medium">No hay contactos cargados.</p>
            <p className="text-sm mt-1">Tocá el + para agregar al equipo médico.</p>
          </div>
        ) : allContactos.map((contacto: any) => (
          <div key={contacto.id} className="border border-[#D4D4D4] rounded-2xl p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#28325A] text-lg leading-tight">{contacto.nombre}</h3>
                  {contacto.esDeCabecera && (
                    <div className="bg-[#F6C95A]/20 text-[#B89230] p-1 rounded-full shrink-0">
                      <Star size={14} fill="currentColor" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-[#7A87C2] font-medium mt-0.5">{contacto.especialidad}</p>
                {contacto.esDeCabecera && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-[#B89230] bg-[#F6C95A]/20 px-2 py-0.5 rounded-md uppercase tracking-wide">De cabecera</span>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              {contacto.telefono && (
                <a
                  href={`tel:${contacto.telefono}`}
                  className="flex-1 bg-[#F4F4F4] text-[#28325A] py-2.5 rounded-xl flex justify-center items-center gap-2 font-bold text-sm hover:bg-[#E5E5E5] transition"
                >
                  <Phone size={16} className="text-[#7A87C2]" /> Llamar
                </a>
              )}
              {contacto.mail && (
                <a
                  href={`mailto:${contacto.mail}`}
                  className="flex-1 bg-[#F4F4F4] text-[#28325A] py-2.5 rounded-xl flex justify-center items-center gap-2 font-bold text-sm hover:bg-[#E5E5E5] transition"
                >
                  <Mail size={16} className="text-[#7A87C2]" /> Mail
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#28325A] text-white rounded-full flex items-center justify-center shadow-xl z-20"
      >
        <Plus size={28} />
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#28325A]">Agregar contacto</h2>
              <button onClick={() => setShowForm(false)}><X size={22} className="text-[#7A87C2]" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Nombre (ej: Dra. Patricia Lozano)" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#28325A]" />
              <input type="text" placeholder="Especialidad" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#28325A]" />
              <input type="tel" placeholder="Teléfono" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#28325A]" />
              <input type="email" placeholder="Mail" className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#28325A]" />
              <label className="flex items-center gap-3 p-4 border-2 border-[#D4D4D4] rounded-2xl cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-[#28325A]" />
                <span className="font-semibold text-[#28325A]">Es médico de cabecera</span>
              </label>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <button onClick={() => setShowForm(false)} className="w-full bg-[#28325A] text-white py-4 rounded-2xl font-bold text-lg">
                Guardar contacto
              </button>
              <button onClick={() => setShowForm(false)} className="w-full text-[#7A87C2] py-3 font-semibold">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
