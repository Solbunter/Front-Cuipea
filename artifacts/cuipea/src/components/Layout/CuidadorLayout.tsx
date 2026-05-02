import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Home, Calendar, FileText, Book, User, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export function CuidadorLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { pacienteActivo, setPacienteActivo, data } = useAppContext();

  const isConsultation = location.pathname.includes('/cuidador/consulta');

  if (isConsultation) {
    return <Outlet />;
  }

  const pacientes = data.pacientes || [];
  const activo = pacientes.find((p: any) => p.id === pacienteActivo);

  const tabs = [
    { id: 'inicio', path: '/cuidador/inicio', icon: Home, label: 'Inicio' },
    { id: 'turnos', path: '/cuidador/turnos', icon: Calendar, label: 'Turnos' },
    { id: 'documentos', path: '/cuidador/documentos', icon: FileText, label: 'Docs' },
    { id: 'diario', path: '/cuidador/diario', icon: Book, label: 'Diario' },
    { id: 'perfil', path: '/cuidador/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <header className="h-[60px] flex items-center justify-between px-4 bg-white border-b border-[#D4D4D4] shrink-0">
        <div className="font-bold text-[#28325A] text-lg">CUIPEA</div>
        <select 
          value={pacienteActivo} 
          onChange={(e) => setPacienteActivo(e.target.value)}
          className="bg-transparent text-[#28325A] font-medium border-none outline-none focus:ring-0"
        >
          {pacientes.map((p: any) => (
            <option key={p.id} value={p.id}>{p.nombre.split(' ')[0]}</option>
          ))}
        </select>
        <button onClick={() => setDrawerOpen(true)} className="text-[#28325A]">
          <Menu />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-[70px]">
        <Outlet />
      </main>

      {/* Bottom Bar */}
      <nav className="absolute bottom-0 w-full h-[70px] bg-white border-t border-[#D4D4D4] flex items-center justify-around px-2 z-10">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <Link 
              key={tab.id} 
              to={tab.path} 
              className={`flex flex-col items-center justify-center w-16 h-full ${isActive ? 'text-[#28325A]' : 'text-[#D4D4D4]'}`}
            >
              <tab.icon size={24} className="mb-1" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Drawer */}
      {drawerOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[250px] bg-white shadow-xl flex flex-col animate-in slide-in-from-right">
            <div className="p-4 border-b border-[#D4D4D4] flex justify-between items-center">
              <span className="font-bold text-[#28325A]">Menú</span>
              <button onClick={() => setDrawerOpen(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <Link to="/cuidador/indicaciones" onClick={() => setDrawerOpen(false)} className="block px-4 py-3 text-[#28325A]">Indicaciones activas</Link>
              <Link to="/cuidador/medicacion" onClick={() => setDrawerOpen(false)} className="block px-4 py-3 text-[#28325A]">Recordatorios</Link>
              <Link to="/cuidador/crecimiento" onClick={() => setDrawerOpen(false)} className="block px-4 py-3 text-[#28325A]">Crecimiento</Link>
              <Link to="/cuidador/contactos" onClick={() => setDrawerOpen(false)} className="block px-4 py-3 text-[#28325A]">Contactos médicos</Link>
              <Link to="/cuidador/accesos" onClick={() => setDrawerOpen(false)} className="block px-4 py-3 text-[#28325A]">Accesos compartidos</Link>
              <Link to="/cuidador/pack" onClick={() => setDrawerOpen(false)} className="block px-4 py-3 text-[#28325A]">Pack imprimible</Link>
            </div>
            <div className="p-4 border-t border-[#D4D4D4]">
              <Link to="/" onClick={() => setDrawerOpen(false)} className="block text-center text-[#EF8090] font-medium">Cerrar sesión</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
