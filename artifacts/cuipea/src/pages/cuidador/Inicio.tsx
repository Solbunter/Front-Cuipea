import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { Activity, Calendar, Thermometer, FileText, ChevronRight, Plus, Syringe, X } from 'lucide-react';

const VACUNAS = [
  { vacuna: 'BCG', edad: 'Recién nacido' },
  { vacuna: 'Hepatitis B', edad: 'Recién nacido' },
  { vacuna: 'Pentavalente (1)', edad: '2 meses' },
  { vacuna: 'Antipolio (1)', edad: '2 meses' },
  { vacuna: 'Neumococo (1)', edad: '2 meses' },
  { vacuna: 'Pentavalente (2)', edad: '4 meses' },
  { vacuna: 'Antipolio (2)', edad: '4 meses' },
  { vacuna: 'Neumococo (2)', edad: '4 meses' },
  { vacuna: 'Pentavalente (3)', edad: '6 meses' },
  { vacuna: 'Antipolio (3)', edad: '6 meses' },
  { vacuna: 'Triple Viral (1)', edad: '12 meses' },
  { vacuna: 'Varicela', edad: '15 meses' },
  { vacuna: 'Hepatitis A', edad: '12 meses' },
  { vacuna: 'Triple Viral (refuerzo)', edad: '5-6 años', proximaParaLucia: true },
  { vacuna: 'DTP refuerzo', edad: '5-6 años' },
  { vacuna: 'VPH', edad: '11 años' },
];

export default function Inicio() {
  const { pacienteData, pacienteActivo, data } = useAppContext();
  const cuidador = data.cuidador;
  const perfil = pacienteData.perfil;
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [showVacunaModal, setShowVacunaModal] = useState(false);

  if (!perfil) return null;

  const indicacionesActivas = pacienteData.indicaciones?.filter((i: any) => i.activa) || [];
  const proximoTurno = pacienteData.turnos?.find((t: any) => t.estado === 'pendiente' && t.tipo === 'medico');
  const ultimasMediciones = pacienteData.crecimiento?.slice(-1)[0];
  const showVacuna = pacienteActivo === 'lucia';

  const novedades = [
    ...(pacienteData.diario?.map((d: any) => ({ ...d, _tipo: 'Diario', _color: '#A9D5B6' })) || []),
    ...(pacienteData.estudios?.map((e: any) => ({ ...e, _tipo: 'Estudio', _color: '#F6C95A' })) || []),
    ...(pacienteData.turnos?.filter((t: any) => t.estado === 'realizado').map((t: any) => ({ ...t, _tipo: 'Turno', titulo: `Consulta con ${t.especialista}`, _color: '#EEC5DD' })) || []),
  ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, 8);

  return (
    <div className="bg-[#F4F4F4] min-h-full pb-6 relative">
      <div className="bg-white px-6 pt-5 pb-10 rounded-b-[32px] shadow-sm relative overflow-hidden">
        {/* Bloque decorativo marca */}
        <div className="absolute top-[-24px] right-[-24px] w-32 h-32 rotate-[20deg] bg-[#EEC5DD] opacity-50" style={{ borderRadius: 14 }} />
        <div className="absolute top-[20px] right-[60px] w-14 h-14 rotate-[10deg] bg-[#F6C95A] opacity-35" style={{ borderRadius: 8 }} />
        <p className="text-[#7A87C2] text-sm font-medium mb-1 relative z-10">{new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1 className="text-2xl font-bold text-[#28325A] relative z-10">Hola, {cuidador?.nombre?.split(' ')[0]}.</h1>
        <p className="text-[#28325A]/60 mt-1 font-medium relative z-10">Cuidando a {perfil.nombre.split(' ')[0]}.</p>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        {/* Card Modo Consulta */}
        <Link to="/cuidador/consulta" className="block bg-[#28325A] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
            <Activity size={100} />
          </div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            Abrir Modo Consulta <ChevronRight size={20} />
          </h2>
          <p className="text-white/70 text-sm max-w-[80%]">Toda la info clave lista para mostrarle al doctor en 90 segundos.</p>
        </Link>

        {/* Próximo Turno */}
        {proximoTurno && (
          <Link to="/cuidador/turnos" className="block bg-[#F6C95A] p-5 rounded-2xl shadow-sm text-[#28325A]">
            <div className="flex items-center gap-2 mb-2 text-[#B89230] font-bold text-xs uppercase tracking-wide">
              <Calendar size={14} /> Próximo turno
            </div>
            <p className="font-bold text-lg leading-tight">{proximoTurno.especialista}</p>
            <p className="text-sm font-medium mt-1 opacity-70">
              {new Date(proximoTurno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })} · {proximoTurno.hora} · {proximoTurno.lugar}
            </p>
          </Link>
        )}

        {/* Indicaciones Activas */}
        {indicacionesActivas.length > 0 && (
          <Link to="/cuidador/indicaciones" className="block bg-[#EF8090] text-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wide opacity-90">
              <Thermometer size={14} /> Indicaciones activas
            </div>
            <p className="font-bold text-lg">{indicacionesActivas.length} seguimiento{indicacionesActivas.length > 1 ? 's' : ''} activo{indicacionesActivas.length > 1 ? 's' : ''}</p>
            <div className="mt-3 bg-white/20 px-3 py-2 rounded-xl text-sm font-semibold flex justify-between items-center">
              <span>Próxima acción</span>
              <span>En 2 hs →</span>
            </div>
          </Link>
        )}

        {/* Vacuna */}
        {showVacuna && (
          <button onClick={() => setShowVacunaModal(true)} className="block w-full text-left bg-white border border-[#D4D4D4] p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#5DB3C1] font-bold text-xs uppercase tracking-wide">
              <Syringe size={14} /> Próxima vacuna sugerida
            </div>
            <p className="font-bold text-[#28325A]">Triple Viral (Refuerzo)</p>
            <p className="text-sm text-[#7A87C2] mt-1">Sugerida a los 6 años · {perfil.nombre.split(' ')[0]} cumple en 3 meses.</p>
          </button>
        )}

        {/* Crecimiento */}
        <Link to="/cuidador/crecimiento" className="block bg-[#5DB3C1] text-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wide opacity-90">
            <Activity size={14} /> Crecimiento
          </div>
          {ultimasMediciones ? (
            <>
              <p className="font-bold text-lg">{ultimasMediciones.peso} kg · {ultimasMediciones.talla} cm</p>
              <p className="text-sm font-medium mt-1 opacity-90">Última medición: {new Date(ultimasMediciones.fecha).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })} · Próximo control en 6 meses.</p>
            </>
          ) : (
            <p className="font-bold">Sin mediciones cargadas aún.</p>
          )}
        </Link>
      </div>

      {/* Últimas novedades */}
      {novedades.length > 0 && (
        <div className="mt-6 px-4">
          <h3 className="font-bold text-[#28325A] mb-3">Últimas novedades</h3>
          <div className="space-y-2">
            {novedades.map((item: any) => (
              <div key={item.id} className="flex gap-3 bg-white p-3 rounded-2xl border border-[#D4D4D4] shadow-sm">
                <div className="w-1 rounded-full shrink-0" style={{ backgroundColor: item._color }}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: item._color !== '#EEC5DD' ? item._color : '#C48FB8' }}>{item._tipo}</span>
                    <span className="text-[10px] text-[#D4D4D4] shrink-0 ml-2">{new Date(item.fecha).toLocaleDateString('es-AR')}</span>
                  </div>
                  <p className="font-semibold text-[#28325A] text-sm truncate">{item.titulo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder futuro */}
      <div className="mx-4 mt-4 bg-[#D4D4D4]/30 border border-dashed border-[#D4D4D4] p-4 rounded-2xl text-center">
        <p className="text-xs text-[#7A87C2] font-medium">Próximamente: compartir cuidado con co-administradores</p>
      </div>

      {/* FAB */}
      <div className="fixed bottom-[90px] right-4 z-30">
        {showFabMenu && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end mb-2 animate-in slide-in-from-bottom-5">
            {[
              { label: 'Nuevo turno', icon: Calendar, color: '#F6C95A', to: '/cuidador/turnos' },
              { label: 'Subir estudio', icon: FileText, color: '#7A87C2', to: '/cuidador/documentos' },
              { label: 'Anotar en diario', icon: Activity, color: '#A9D5B6', to: '/cuidador/diario' },
              { label: 'Nueva indicación', icon: Thermometer, color: '#EF8090', to: '/cuidador/indicaciones' },
            ].map(({ label, icon: Icon, color, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setShowFabMenu(false)}
                className="bg-white text-[#28325A] px-4 py-2.5 rounded-full font-bold shadow-md border border-[#D4D4D4] flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap"
              >
                <Icon size={16} style={{ color }} />
                {label}
              </Link>
            ))}
          </div>
        )}
        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className={`w-14 h-14 text-white rounded-full flex items-center justify-center shadow-xl transition-all ${showFabMenu ? 'bg-[#EF8090] rotate-45' : 'bg-[#28325A]'}`}
        >
          <Plus size={30} />
        </button>
      </div>

      {showFabMenu && (
        <div className="fixed inset-0 z-20" onClick={() => setShowFabMenu(false)} />
      )}

      {/* Modal Vacunas */}
      {showVacunaModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center p-5 border-b border-[#D4D4D4]">
              <div>
                <h2 className="text-xl font-bold text-[#28325A]">Calendario de vacunación</h2>
                <p className="text-xs text-[#7A87C2] mt-0.5">Calendario Nacional Argentina (simplificado)</p>
              </div>
              <button onClick={() => setShowVacunaModal(false)} className="p-2 text-[#7A87C2]"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {VACUNAS.map((v, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-xl ${v.proximaParaLucia ? 'bg-[#5DB3C1]/15 border border-[#5DB3C1]' : 'bg-[#F4F4F4]'}`}>
                  <div>
                    <p className={`font-bold text-sm ${v.proximaParaLucia ? 'text-[#5DB3C1]' : 'text-[#28325A]'}`}>{v.vacuna}</p>
                    {v.proximaParaLucia && <p className="text-[10px] text-[#5DB3C1] font-bold uppercase">← Próxima para {perfil.nombre.split(' ')[0]}</p>}
                  </div>
                  <span className="text-xs font-medium text-[#7A87C2] bg-white px-2 py-1 rounded-lg">{v.edad}</span>
                </div>
              ))}
              <p className="text-xs text-[#7A87C2] text-center pt-2">Próximamente: libreta de vacunación con histórico</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
