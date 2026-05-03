import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Home, Calendar, FileText, Book, User, X, Pill, Thermometer, TrendingUp, Users, Package, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export function CuidadorLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { pacienteActivo, setPacienteActivo, data, pacienteData } = useAppContext();

  const isConsultation = location.pathname.includes('/cuidador/consulta');
  if (isConsultation) return <Outlet />;

  const pacientes = data.pacientes || [];

  const indicacionesActivas = pacienteData.indicaciones?.filter((i: any) => i.activa).length || 0;

  const tabs = [
    { id: 'inicio', path: '/cuidador/inicio', icon: Home, label: 'Inicio' },
    { id: 'turnos', path: '/cuidador/turnos', icon: Calendar, label: 'Turnos' },
    { id: 'documentos', path: '/cuidador/documentos', icon: FileText, label: 'Docs' },
    { id: 'diario', path: '/cuidador/diario', icon: Book, label: 'Diario' },
    { id: 'perfil', path: '/cuidador/perfil', icon: User, label: 'Perfil' },
  ];

  const drawerLinks = [
    { path: '/cuidador/indicaciones', icon: Thermometer, label: 'Indicaciones activas', badge: indicacionesActivas > 0 ? indicacionesActivas : null },
    { path: '/cuidador/medicacion', icon: Pill, label: 'Recordatorios de medicación', badge: null },
    { path: '/cuidador/crecimiento', icon: TrendingUp, label: 'Crecimiento', badge: null },
    { path: '/cuidador/contactos', icon: Users, label: 'Contactos médicos', badge: null },
    { path: '/cuidador/accesos', icon: Users, label: 'Accesos compartidos', badge: null },
    { path: '/cuidador/pack', icon: Package, label: 'Pack imprimible', badge: null },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <header className="h-[80px] flex items-center px-4 bg-white border-b border-[#D4D4D4] shrink-0 relative">
        {/* Izquierda: selector de paciente como pill */}
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

        {/* Centro: logo */}
        <Link to="/cuidador/inicio" className="absolute left-1/2 -translate-x-1/2">
          <img src="/cuipea-logo.png" alt="CUIPEA" className="w-48 h-auto object-contain" />
        </Link>

        {/* Derecha: menú */}
        <div className="ml-auto shrink-0">
          <button onClick={() => setDrawerOpen(true)} className="bg-[#7A87C2]/20 text-[#7A87C2] p-2.5 rounded-xl relative">
            <Menu size={20} />
            {indicacionesActivas > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF8090] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {indicacionesActivas}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-[70px]">
        <Outlet />
      </main>

      {/* Bottom Bar */}
      <nav className="absolute bottom-0 w-full h-[70px] bg-white border-t border-[#D4D4D4] flex items-center justify-around px-2 z-10">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.id !== 'inicio' && location.pathname.startsWith(tab.path));
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive ? 'text-[#28325A]' : 'text-[#D4D4D4]'}`}
            >
              <tab.icon size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[10px] font-bold ${isActive ? 'text-[#28325A]' : 'text-[#D4D4D4]'}`}>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Drawer */}
      {drawerOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[270px] bg-white shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="p-4 border-b border-[#D4D4D4] flex justify-between items-center">
              <img src="/cuipea-logo.png" alt="CUIPEA" className="h-6 w-auto object-contain" />
              <button onClick={() => setDrawerOpen(false)} className="p-1 text-[#7A87C2]">
                <X size={20} />
              </button>
            </div>

            {/* Patient switcher */}
            <div className="px-4 py-3 border-b border-[#F4F4F4]">
              <p className="text-[10px] font-bold text-[#D4D4D4] uppercase tracking-wider mb-2">Paciente activo</p>
              <div className="flex gap-2">
                {pacientes.map((p: any) => (
                  <button
                    key={p.id}
                    onClick={() => setPacienteActivo(p.id)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${
                      p.id === pacienteActivo ? 'bg-[#28325A] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'
                    }`}
                  >
                    {p.nombre.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-2">
              {drawerLinks.map(({ path, icon: Icon, label, badge }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 text-[#28325A] hover:bg-[#F4F4F4] transition"
                >
                  <Icon size={18} className="text-[#7A87C2] shrink-0" />
                  <span className="flex-1 font-medium text-sm">{label}</span>
                  {badge && (
                    <span className="bg-[#EF8090] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                  <ChevronRight size={14} className="text-[#D4D4D4]" />
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-[#D4D4D4]">
              <Link
                to="/"
                onClick={() => setDrawerOpen(false)}
                className="block text-center text-[#EF8090] font-bold py-2 hover:bg-[#EF8090]/5 rounded-xl transition"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
