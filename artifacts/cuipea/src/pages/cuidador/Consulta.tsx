import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Printer, Share2, FileEdit, AlertTriangle, FileText, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Consulta() {
  const { pacienteData, pacienteActivo } = useAppContext();
  const perfil = pacienteData.perfil;

  if (!perfil) return null;

  const edad = new Date().getFullYear() - new Date(perfil.fechaNac).getFullYear();
  const indicacionesActivas = pacienteData.indicaciones?.filter((i: any) => i.activa) || [];
  const proximoTurno = pacienteData.turnos?.find((t: any) => t.estado === 'pendiente' && t.tipo === 'medico');
  const ultimosEstudios = pacienteData.estudios?.slice(0, 3) || [];
  const notasDiarioImportantes = pacienteData.diario?.filter((d: any) => d.intensidad && d.intensidad >= 3).slice(0, 3) || [];
  
  const sumadosVos = [
    ...(pacienteData.estudios?.filter((e: any) => e.mostrarEnConsulta) || []),
    ...(pacienteData.diario?.filter((d: any) => d.mostrarEnConsulta) || [])
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-24">
      <div className="bg-[#7A87C2] p-6 pb-8 text-white rounded-b-[32px] shadow-md">
        <h1 className="text-3xl font-bold mb-1">{perfil.nombre}, {edad} años</h1>
        <p className="text-white/80 font-medium text-sm flex items-center gap-2">
          <Activity size={16} /> Diseñado para leerse en 90 segundos
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        
        {/* Diagnóstico */}
        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-2">Diagnóstico Principal</h2>
          <p className="text-2xl font-bold text-[#28325A]">{perfil.diagnostico || 'Sin diagnóstico registrado'}</p>
        </div>

        {/* Alergias */}
        <div className="bg-[#EF8090]/10 p-4 rounded-2xl border border-[#EF8090]/30">
          <h2 className="text-xs uppercase tracking-wider text-[#EF8090] font-bold mb-2 flex items-center gap-2">
            <AlertTriangle size={14} /> Alergias
          </h2>
          {perfil.alergias?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {perfil.alergias.map((a: string) => (
                <span key={a} className="bg-[#EF8090] text-white px-3 py-1 rounded-full font-semibold text-sm">
                  {a}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[#28325A] font-medium">Sin alergias conocidas</p>
          )}
        </div>

        {/* Medicación */}
        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-3">Medicación Actual</h2>
          <div className="space-y-2">
            {pacienteData.medicacion?.filter((m: any) => m.activa).map((m: any) => (
              <div key={m.id} className="bg-white p-3 rounded-xl shadow-sm border border-[#D4D4D4] flex justify-between items-center">
                <span className="font-bold text-[#28325A]">{m.droga}</span>
                <span className="text-[#7A87C2] font-medium">{m.dosis} • {m.frecuencia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicaciones Activas */}
        {indicacionesActivas.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border-2 border-[#EF8090] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#EF8090]"></div>
            <h2 className="text-xs uppercase tracking-wider text-[#EF8090] font-bold mb-3">Seguimiento en casa (Activo)</h2>
            <div className="space-y-3">
              {indicacionesActivas.map((ind: any) => (
                <div key={ind.id} className="border-b border-[#D4D4D4] pb-3 last:border-0 last:pb-0">
                  <p className="font-bold text-[#28325A]">{ind.titulo}</p>
                  <p className="text-sm text-[#7A87C2]">{ind.registros?.length || 0} registros en los últimos {ind.duracion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximo Turno */}
        {proximoTurno && (
          <div className="bg-[#F6C95A]/20 p-4 rounded-2xl border border-[#F6C95A]/50">
            <h2 className="text-xs uppercase tracking-wider text-[#B89230] font-bold mb-2">Próximo Turno</h2>
            <p className="font-bold text-[#28325A]">{proximoTurno.especialista}</p>
            <p className="text-sm text-[#28325A]">{new Date(proximoTurno.fecha).toLocaleDateString('es-AR')} • {proximoTurno.hora}</p>
          </div>
        )}

        {/* Sumaste Vos */}
        {sumadosVos.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-3">Sumaste para mostrar hoy:</h2>
            <div className="space-y-2">
              {sumadosVos.map((item: any) => (
                <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-[#7A87C2] flex items-start gap-3">
                  <FileText className="text-[#7A87C2] mt-0.5 shrink-0" size={18} />
                  <div>
                    <p className="font-bold text-[#28325A] leading-tight">{item.titulo}</p>
                    <p className="text-xs text-[#7A87C2]">{item.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 sm:absolute bg-white border-t border-[#D4D4D4] p-4 flex gap-2 z-20">
        <button 
          onClick={() => window.print()}
          className="flex flex-col items-center justify-center flex-1 py-2 text-[#7A87C2] hover:bg-[#F4F4F4] rounded-xl transition"
        >
          <Printer size={24} className="mb-1" />
          <span className="text-xs font-bold">PDF</span>
        </button>
        <button className="flex flex-col items-center justify-center flex-1 py-2 text-[#7A87C2] hover:bg-[#F4F4F4] rounded-xl transition">
          <Share2 size={24} className="mb-1" />
          <span className="text-xs font-bold">Compartir</span>
        </button>
        <Link 
          to="/cuidador/consulta/preparar"
          className="flex flex-col items-center justify-center flex-[2] bg-[#7A87C2] text-white py-2 rounded-xl hover:bg-[#7A87C2]/90 transition"
        >
          <FileEdit size={24} className="mb-1" />
          <span className="text-xs font-bold">Preparar</span>
        </Link>
      </div>
    </div>
  );
}
