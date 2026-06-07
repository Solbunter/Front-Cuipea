import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, Home, Calendar, FileText, Book, User, X,
  Pill, Thermometer, TrendingUp, Users, Package, ChevronRight,
  Shield, LogOut, Settings, Syringe
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import Chatbot from '../CUI/Chatbot';

const DRAWER_SECTIONS = [
  {
    label: 'Salud',
    items: [
      { path: '/cuidador/indicaciones', icon: Thermometer, label: 'Indicaciones activas', color: '#EF8090', badgeKey: 'indicaciones' },
      { path: '/cuidador/medicacion', icon: Pill, label: 'Medicación', color: '#EF8090', badgeKey: null },
      { path: '/cuidador/vacunas', icon: Syringe, label: 'Calendario de vacunas', color: '#A9D5B6', badgeKey: null },
      { path: '/cuidador/crecimiento', icon: TrendingUp, label: 'Crecimiento', color: '#5DB3C1', badgeKey: null },
    ],
  },
  {
    label: 'Equipo y accesos',
    items: [
      { path: '/cuidador/contactos', icon: Users, label: 'Contactos médicos', color: '#A9D5B6', badgeKey: null },
      { path: '/cuidador/accesos', icon: Shield, label: 'Accesos compartidos', color: '#F6C95A', badgeKey: null },
      { path: '/cuidador/pack', icon: Package, label: 'Pack imprimible', color: '#F6C95A', badgeKey: null },
    ],
  },
];

/* ── CUI FAB ─────────────────────────────────────────────────────── */
function CuiFab({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="absolute right-4 shadow-lg z-20"
      style={{ bottom: 82 }}
      aria-label="Abrir CUI"
    >
      <div className="bg-[#28325A] rounded-2xl w-14 h-14 flex items-center justify-center relative overflow-hidden">
        {/* mini decorative blocks */}
        <div className="absolute top-[-4px] right-[-4px] w-7 h-5 bg-[#EEC5DD] opacity-30 rotate-[20deg]" style={{ borderRadius: 4 }} />
        <div className="absolute bottom-[-3px] left-[-4px] w-5 h-4 bg-[#F6C95A] opacity-25 rotate-[-15deg]" style={{ borderRadius: 3 }} />
        {/* CUI mini face */}
        <svg width="28" height="36" viewBox="0 0 80 100" fill="none" className="relative z-10">
          <path d="M62,14 C62,14 18,14 14,50 C14,50 18,86 62,86"
            stroke="white" strokeWidth="18" strokeLinecap="round" fill="none" />
          <rect x="18" y="29" width="19" height="13" rx="4" fill="#EEC5DD"
            transform="rotate(-14 27 35)" />
          <rect x="20" y="57" width="19" height="13" rx="4" fill="#F6C95A"
            transform="rotate(10 29 63)" />
        </svg>
      </div>
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-[#28325A]"
        animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

export function CuidadorLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  const { pacienteActivo, setPacienteActivo, data, pacienteData } = useAppContext();

  const isConsultation = location.pathname.includes('/cuidador/consulta');
  if (isConsultation) return <Outlet />;

  const pacientes = data.pacientes || [];
  const cuidador = data.cuidador;
  const indicacionesActivas = pacienteData.indicaciones?.filter((i: any) => i.activa).length || 0;

  const tabs = [
    { id: 'inicio',     path: '/cuidador/inicio',     icon: Home,     label: 'Inicio'  },
    { id: 'turnos',     path: '/cuidador/turnos',     icon: Calendar, label: 'Turnos'  },
    { id: 'documentos', path: '/cuidador/documentos', icon: FileText, label: 'Docs'    },
    { id: 'diario',     path: '/cuidador/diario',     icon: Book,     label: 'Diario'  },
    { id: 'perfil',     path: '/cuidador/perfil',     icon: User,     label: 'Perfil'  },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <header className="h-[80px] flex items-center px-4 bg-white border-b border-[#D4D4D4] shrink-0 relative">
        <div className="shrink-0 relative">
          <select
            value={pacienteActivo}
            onChange={(e) => setPacienteActivo(e.target.value)}
            className="appearance-none bg-[#EEC5DD]/40 text-[#28325A] font-bold text-sm border-none outline-none focus:ring-0 rounded-2xl pl-3 pr-7 py-2 cursor-pointer"
            style={{ WebkitAppearance: 'none' }}
          >
            {pacientes.map((p: any) => (
              <option key={p.id} value={p.id}>{p.nombre.split(' ')[0]}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#28325A] text-xs">▾</span>
        </div>

        <Link to="/cuidador/inicio" className="absolute left-1/2 -translate-x-1/2">
          <img src="/cuipea-logo.png" alt="CUIPEA" className="w-48 h-auto object-contain" />
        </Link>

        <div className="ml-auto shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-[#28325A] text-white p-2.5 rounded-xl relative"
          >
            <Menu size={20} />
            {indicacionesActivas > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF8090] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {indicacionesActivas}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-[70px]">
        <Outlet />
      </main>

      {/* CUI FAB */}
      {!chatOpen && <CuiFab onClick={() => setChatOpen(true)} />}

      {/* Bottom Bar */}
      <nav className="absolute bottom-0 w-full h-[70px] bg-white border-t border-[#E8EAF0] flex items-center justify-around px-1 z-10">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.id !== 'inicio' && location.pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className="flex flex-col items-center justify-center w-16 h-full gap-1 relative"
            >
              <div className={`flex items-center justify-center w-10 h-8 rounded-2xl transition-all duration-200 ${isActive ? 'bg-[#28325A]' : 'bg-transparent'}`}>
                <tab.icon
                  size={20}
                  className={`transition-colors ${isActive ? 'text-white' : 'text-[#8892B0]'}`}
                />
              </div>
              <span className={`text-[10px] font-bold leading-none transition-colors ${isActive ? 'text-[#28325A]' : 'text-[#8892B0]'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Chatbot overlay */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 z-40"
              onClick={() => setChatOpen(false)}
            />
            <Chatbot key="chat" onClose={() => setChatOpen(false)} />
          </>
        )}
      </AnimatePresence>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />

          <div className="absolute right-0 top-0 bottom-0 w-[285px] bg-white shadow-2xl flex flex-col overflow-hidden">

            {/* Drawer header — navy con bloques */}
            <div className="bg-[#28325A] px-5 pt-5 pb-6 relative overflow-hidden shrink-0">
              <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rotate-[20deg] bg-[#EEC5DD] opacity-20" style={{ borderRadius: 12 }} />
              <div className="absolute bottom-[-10px] right-[60px] w-16 h-16 -rotate-[12deg] bg-[#F6C95A] opacity-20" style={{ borderRadius: 8 }} />

              <div className="flex justify-between items-start relative z-10">
                <img
                  src="/cuipea-logo.png"
                  alt="CUIPEA"
                  className="h-6 w-auto object-contain brightness-0 invert"
                />
                <button onClick={() => setDrawerOpen(false)} className="p-1 text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 relative z-10">
                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Cuidador/a</p>
                <p className="text-white font-bold text-base leading-tight">{cuidador?.nombre || 'María Fernández'}</p>
              </div>

              {/* Patient switcher */}
              <div className="mt-4 relative z-10">
                <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-2">Paciente activo</p>
                <div className="flex gap-2">
                  {pacientes.map((p: any) => (
                    <button
                      key={p.id}
                      onClick={() => setPacienteActivo(p.id)}
                      className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition ${
                        p.id === pacienteActivo
                          ? 'bg-white text-[#28325A]'
                          : 'bg-white/15 text-white/80 hover:bg-white/25'
                      }`}
                    >
                      {p.nombre.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Links by section */}
            <div className="flex-1 overflow-y-auto py-3">
              {DRAWER_SECTIONS.map((section) => (
                <div key={section.label} className="mb-1">
                  <p className="text-[10px] font-bold text-[#D4D4D4] uppercase tracking-wider px-5 py-2">
                    {section.label}
                  </p>
                  {section.items.map(({ path, icon: Icon, label, color, badgeKey }) => {
                    const badge = badgeKey === 'indicaciones' ? indicacionesActivas : 0;
                    const isActive = location.pathname === path;
                    return (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 transition ${isActive ? 'bg-[#F4F4F4]' : 'hover:bg-[#F9F9F9]'}`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: color + '20' }}
                        >
                          <Icon size={17} style={{ color }} />
                        </div>
                        <span className="flex-1 font-semibold text-sm text-[#28325A]">{label}</span>
                        {badge > 0 && (
                          <span className="bg-[#EF8090] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                            {badge}
                          </span>
                        )}
                        <ChevronRight size={14} className="text-[#D4D4D4] shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              ))}

              {/* Configuración */}
              <div className="mt-1 border-t border-[#F4F4F4] pt-1">
                <p className="text-[10px] font-bold text-[#D4D4D4] uppercase tracking-wider px-5 py-2">Cuenta</p>
                <Link
                  to="/cuidador/perfil"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F9F9F9] transition"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#7A87C2]/15">
                    <Settings size={17} className="text-[#7A87C2]" />
                  </div>
                  <span className="flex-1 font-semibold text-sm text-[#28325A]">Configuración del perfil</span>
                  <ChevronRight size={14} className="text-[#D4D4D4] shrink-0" />
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 p-4 border-t border-[#F4F4F4]">
              <Link
                to="/"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center gap-2 text-[#EF8090] font-bold py-2.5 rounded-xl hover:bg-[#EF8090]/5 transition w-full"
              >
                <LogOut size={16} />
                Cerrar sesión
              </Link>
              <p className="text-center text-[10px] text-[#D4D4D4] mt-2">MVP1 v1.4 · Prototipo validación</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
