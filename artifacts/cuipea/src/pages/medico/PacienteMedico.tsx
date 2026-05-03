import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Printer, AlertTriangle, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PacienteMedico() {
  const { data } = useAppContext();
  // Forzamos ver a Lucía para el mock médico
  const perfil = data.pacientes.find((p: any) => p.id === 'lucia');
  
  if (!perfil) return null;
  const edad = new Date().getFullYear() - new Date(perfil.fechaNac).getFullYear();

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-24">
      {/* Banner de acceso */}
      <div className="bg-[#28325A] text-white px-4 py-2 text-[10px] uppercase tracking-wider font-bold flex justify-between">
        <span>Compartido por: María F.</span>
        <span>Vence: 30/05/2026</span>
      </div>

      <div className="bg-[#28325A] p-6 pb-8 text-white shadow-md relative overflow-hidden">
        {/* Bloques decorativos marca */}
        <div className="absolute top-[-20px] right-[-20px] w-36 h-36 rotate-[18deg] bg-[#EEC5DD] opacity-20" style={{ borderRadius: 14 }} />
        <div className="absolute bottom-[-16px] right-[60px] w-20 h-20 -rotate-[12deg] bg-[#F6C95A] opacity-20" style={{ borderRadius: 10 }} />
        <h1 className="text-3xl font-bold mb-1 relative z-10">{perfil.nombre}, {edad} años</h1>
        <p className="text-white/70 font-medium text-sm mt-1 mb-4 relative z-10">
          Última visita con vos: 10/02/2026
        </p>
        <div className="bg-white/15 p-3 rounded-xl text-sm font-semibold border border-white/20 relative z-10">
          Cambios desde la última visita:
          <ul className="mt-1 font-normal opacity-90 pl-4 list-disc marker:text-[#F6C95A]">
            <li>2 estudios nuevos</li>
            <li>5 entradas de diario (intensidad alta)</li>
            <li>12 mediciones de fiebre</li>
          </ul>
        </div>
      </div>

      {/* Tabs Médicos */}
      <div className="bg-white border-b border-[#D4D4D4] flex overflow-x-auto sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-3 font-bold border-b-2 border-[#7A87C2] text-[#7A87C2] whitespace-nowrap">Resumen</div>
        <div className="px-4 py-3 font-bold text-[#D4D4D4] whitespace-nowrap">Documentos</div>
        <div className="px-4 py-3 font-bold text-[#D4D4D4] whitespace-nowrap">Diario</div>
        <div className="px-4 py-3 font-bold text-[#D4D4D4] whitespace-nowrap">Crecimiento</div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Contenido (Similar a Modo Consulta pero sin botones de editar) */}
        
        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-2">Diagnóstico Principal</h2>
          <p className="text-2xl font-bold text-[#28325A]">{perfil.diagnostico}</p>
        </div>

        <div className="bg-[#EF8090]/10 p-4 rounded-2xl border border-[#EF8090]/30">
          <h2 className="text-xs uppercase tracking-wider text-[#EF8090] font-bold mb-2 flex items-center gap-2">
            <AlertTriangle size={14} /> Alergias
          </h2>
          <div className="flex flex-wrap gap-2">
            {perfil.alergias.map((a: string) => (
              <span key={a} className="bg-[#EF8090] text-white px-3 py-1 rounded-full font-semibold text-sm">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-3">Medicación Actual</h2>
          <div className="space-y-2">
            {data.medicacion?.filter((m: any) => m.pacienteId === 'lucia' && m.activa).map((m: any) => (
              <div key={m.id} className="bg-white p-3 rounded-xl shadow-sm border border-[#D4D4D4] flex justify-between items-center">
                <span className="font-bold text-[#28325A]">{m.droga}</span>
                <span className="text-[#7A87C2] font-medium">{m.dosis} • {m.frecuencia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lo que el paciente sumó para hoy */}
        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#7A87C2] font-bold mb-3">Marcado por el cuidador para hoy:</h2>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-xl shadow-sm border-l-4 border-l-[#F6C95A] border border-[#D4D4D4] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#28325A] leading-tight text-sm">Resonancia de cerebro y columna</p>
                <p className="text-xs text-[#7A87C2]">10/02/2026</p>
              </div>
              <button className="p-2 text-[#7A87C2] hover:bg-[#F4F4F4] rounded-full">
                <Download size={18} />
              </button>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border-l-4 border-l-[#EF8090] border border-[#D4D4D4]">
              <p className="font-bold text-[#28325A] leading-tight text-sm">Dolor de cabeza fuerte</p>
              <p className="text-xs text-[#7A87C2] mt-1">Hace 3 días • Intensidad: 4/5</p>
              <p className="text-sm mt-2 text-[#28325A]">Dolor de cabeza fuerte a la tarde, le di paracetamol. Volvió a la escuela al día siguiente.</p>
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 sm:absolute bg-white border-t border-[#D4D4D4] p-4 flex gap-2 z-20">
        <button 
          onClick={() => window.print()}
          className="flex items-center justify-center w-full py-4 text-[#7A87C2] font-bold border-2 border-[#7A87C2] hover:bg-[#F4F4F4] rounded-xl transition gap-2"
        >
          <Printer size={20} />
          Exportar Historia Clínica a PDF
        </button>
      </div>
    </div>
  );
}
