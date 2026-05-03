import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Thermometer, Eye, Pill, ClipboardList, Clock, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotificationSystem() {
  const { pacienteData } = useAppContext();
  const [activeToast, setActiveToast] = useState<any>(null);
  const [shown, setShown] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  // Show demo notification after 5s on cuidador pages, then every 45s
  useEffect(() => {
    const isCuidador = location.pathname.startsWith('/cuidador/');
    if (!isCuidador) return;

    const indicaciones = pacienteData.indicaciones?.filter((i: any) => i.activa) || [];
    if (indicaciones.length === 0) return;

    // Pick one not yet shown
    const unshown = indicaciones.filter((i: any) => !shown.has(i.id));
    if (unshown.length === 0) return;

    const delay = shown.size === 0 ? 5000 : 45000;

    const timer = setTimeout(() => {
      const ind = unshown[0];
      setActiveToast(ind);
    }, delay);

    return () => clearTimeout(timer);
  }, [location.pathname, shown]);

  const dismiss = () => {
    if (activeToast) {
      setShown(prev => new Set([...prev, activeToast.id]));
      setActiveToast(null);
    }
  };

  const registrar = () => {
    dismiss();
    navigate('/cuidador/indicaciones');
  };

  if (!activeToast) return null;

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'temperatura': return <Thermometer className="text-[#EF8090]" size={20} />;
      case 'sintoma': return <Eye className="text-[#EF8090]" size={20} />;
      case 'dosis': return <Pill className="text-[#EF8090]" size={20} />;
      default: return <ClipboardList className="text-[#EF8090]" size={20} />;
    }
  };

  return (
    <div className="absolute top-3 left-3 right-3 z-50 animate-in slide-in-from-top fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-[#EF8090]/20 p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-[#EF8090]/10 p-2 rounded-full mt-0.5 shrink-0">
            {getIcon(activeToast.tipo)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-[#EF8090] uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Clock size={10} /> Es hora de registrar
            </div>
            <h3 className="font-bold text-[#28325A] text-sm leading-tight">{activeToast.titulo}</h3>
          </div>
          <button onClick={dismiss} className="text-[#D4D4D4] hover:text-[#7A87C2] shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={registrar}
            className="flex-1 bg-[#EF8090] text-white py-2 rounded-xl text-sm font-bold shadow-sm"
          >
            Registrar
          </button>
          <button
            onClick={dismiss}
            className="flex-1 bg-[#F4F4F4] text-[#7A87C2] py-2 rounded-xl text-sm font-bold"
          >
            Posponer
          </button>
        </div>
      </div>
    </div>
  );
}
