import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Printer, CheckSquare, Square, AlertTriangle, Pill, User, Phone, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function Pack() {
  const { pacienteData, data } = useAppContext();
  const perfil = pacienteData.perfil;
  const [preview, setPreview] = useState(false);
  const [opciones, setOpciones] = useState({
    fichaEmergencia: true,
    medicacion: true,
    contactos: true,
    documentosMarcados: true,
    diarioMarcado: false,
  });

  if (!perfil) return null;

  const edad = new Date().getFullYear() - new Date(perfil.fechaNac).getFullYear();
  const medicacionActiva = pacienteData.medicacion?.filter((m: any) => m.activa) || [];
  const contactos = pacienteData.contactos || [];
  const docsMarcados = pacienteData.estudios?.filter((e: any) => e.mostrarEnConsulta) || [];
  const diarioMarcado = pacienteData.diario?.filter((d: any) => d.mostrarEnConsulta) || [];

  const toggle = (k: keyof typeof opciones) =>
    setOpciones(prev => ({ ...prev, [k]: !prev[k] }));

  const SECCIONES = [
    { key: 'fichaEmergencia', label: 'Ficha de emergencia', desc: 'Nombre, diagnóstico, alergias y contactos urgentes.' },
    { key: 'medicacion', label: 'Medicación actual', desc: `${medicacionActiva.length} medicamento${medicacionActiva.length !== 1 ? 's' : ''} con horarios.` },
    { key: 'contactos', label: 'Contactos médicos', desc: `${contactos.length} profesionale${contactos.length !== 1 ? 's' : ''} de referencia.` },
    { key: 'documentosMarcados', label: 'Documentos marcados', desc: `${docsMarcados.length} documento${docsMarcados.length !== 1 ? 's' : ''} seleccionado${docsMarcados.length !== 1 ? 's' : ''}.` },
    { key: 'diarioMarcado', label: 'Notas del diario', desc: `${diarioMarcado.length} entrada${diarioMarcado.length !== 1 ? 's' : ''} marcada${diarioMarcado.length !== 1 ? 's' : ''} para mostrar.` },
  ] as const;

  const seleccionadas = SECCIONES.filter(s => opciones[s.key]).length;

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      <div className="bg-white p-4 border-b border-[#D4D4D4] sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Pack imprimible</h1>
        <p className="text-sm text-[#7A87C2] mt-0.5">La hoja para la guardia, la escuela o la abuela.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">

        {/* Qué incluir */}
        <div className="bg-white rounded-2xl border border-[#D4D4D4] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#F4F4F4]">
            <h2 className="font-bold text-[#28325A]">¿Qué incluir?</h2>
            <p className="text-xs text-[#7A87C2] mt-0.5">{seleccionadas} sección{seleccionadas !== 1 ? 'es' : ''} seleccionada{seleccionadas !== 1 ? 's' : ''}</p>
          </div>
          {SECCIONES.map(({ key, label, desc }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="w-full flex items-start gap-3 px-4 py-3.5 border-b border-[#F9F9F9] last:border-0 hover:bg-[#F9F9F9] transition text-left"
            >
              {opciones[key]
                ? <CheckSquare size={20} className="text-[#F6C95A] shrink-0 mt-0.5" />
                : <Square size={20} className="text-[#D4D4D4] shrink-0 mt-0.5" />
              }
              <div>
                <p className={`font-bold text-sm ${opciones[key] ? 'text-[#28325A]' : 'text-[#D4D4D4]'}`}>{label}</p>
                <p className="text-xs text-[#7A87C2] mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Preview toggle */}
        <button
          onClick={() => setPreview(!preview)}
          className="w-full flex items-center justify-between bg-white border border-[#D4D4D4] rounded-2xl px-4 py-3.5 shadow-sm"
        >
          <span className="font-bold text-[#28325A] text-sm">Vista previa del pack</span>
          {preview ? <ChevronUp size={18} className="text-[#7A87C2]" /> : <ChevronDown size={18} className="text-[#7A87C2]" />}
        </button>

        {preview && (
          <div className="bg-white border-2 border-[#F6C95A]/40 rounded-2xl p-5 space-y-5 shadow-sm">
            {/* Header del pack */}
            <div className="border-b-2 border-[#F6C95A] pb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A87C2] mb-1">Ficha de {perfil.nombre.split(' ')[0]}</p>
              <h2 className="text-2xl font-black text-[#28325A]">{perfil.nombre}</h2>
              <p className="text-sm text-[#7A87C2] font-medium">{edad} años · DNI {perfil.dni} · {perfil.obraSocial}</p>
            </div>

            {opciones.fichaEmergencia && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#EF8090] flex items-center gap-1 mb-2">
                  <AlertTriangle size={11} /> URGENTE / ALERGIAS
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {perfil.alergias?.map((a: string) => (
                    <span key={a} className="bg-[#EF8090] text-white text-xs font-bold px-2.5 py-1 rounded-full">{a}</span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-[#28325A]">Diagnóstico: <span className="font-normal">{perfil.diagnostico}</span></p>
              </div>
            )}

            {opciones.medicacion && medicacionActiva.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A87C2] flex items-center gap-1 mb-2">
                  <Pill size={11} /> MEDICACIÓN
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] text-[#7A87C2] font-bold uppercase border-b border-[#F4F4F4]">
                      <th className="text-left pb-1">Medicamento</th>
                      <th className="text-left pb-1">Dosis</th>
                      <th className="text-left pb-1">Horarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicacionActiva.map((m: any) => (
                      <tr key={m.id} className="border-b border-[#F9F9F9]">
                        <td className="py-1.5 font-bold text-[#28325A]">{m.droga}</td>
                        <td className="py-1.5 text-[#7A87C2]">{m.dosis}</td>
                        <td className="py-1.5 text-[#28325A] font-medium">{(m.horarios || []).join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {opciones.contactos && contactos.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A87C2] flex items-center gap-1 mb-2">
                  <Phone size={11} /> CONTACTOS MÉDICOS
                </p>
                <div className="space-y-1">
                  {contactos.slice(0, 3).map((c: any) => (
                    <div key={c.id} className="flex justify-between text-sm">
                      <span className="font-bold text-[#28325A]">{c.nombre}</span>
                      <span className="text-[#7A87C2]">{c.telefono}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {opciones.documentosMarcados && docsMarcados.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A87C2] flex items-center gap-1 mb-2">
                  <FileText size={11} /> DOCUMENTOS
                </p>
                {docsMarcados.map((d: any) => (
                  <p key={d.id} className="text-xs text-[#28325A] font-medium">• {d.titulo} ({new Date(d.fecha).toLocaleDateString('es-AR')})</p>
                ))}
              </div>
            )}

            <div className="border-t border-[#F4F4F4] pt-3 text-[10px] text-[#D4D4D4] text-center">
              Generado con CUIPEA · {new Date().toLocaleDateString('es-AR')}
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 p-4 bg-white border-t border-[#D4D4D4]">
        <button
          onClick={() => window.print()}
          className="w-full bg-[#F6C95A] text-[#28325A] py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:brightness-95 active:scale-95 transition"
        >
          <Printer size={20} /> Generar e imprimir PDF
        </button>
      </div>
    </div>
  );
}
