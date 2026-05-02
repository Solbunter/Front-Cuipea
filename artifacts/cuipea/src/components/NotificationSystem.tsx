import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Thermometer, Eye, Pill, ClipboardList, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationSystem() {
  const { pacienteData } = useAppContext();
  const [activeToast, setActiveToast] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Only run if there are active indications
    const indicaciones = pacienteData.indicaciones?.filter((i: any) => i.activa) || [];
    if (indicaciones.length === 0) return;

    const interval = setInterval(() => {
      // Pick one to mock
      const ind = indicaciones[currentIndex % indicaciones.length];
      setActiveToast(ind);
      setCurrentIndex(prev => prev + 1);
    }, 30000); // Every 30 seconds show a notification

    return () => clearInterval(interval);
  }, [pacienteData.indicaciones, currentIndex]);

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
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[380px] z-50 animate-in slide-in-from-top fade-in">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EF8090]/20 p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-[#EF8090]/10 p-2 rounded-full mt-1 shrink-0">
            {getIcon(activeToast.tipo)}
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#EF8090] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock size={10} /> Es hora de registrar
            </div>
            <h3 className="font-bold text-[#28325A] text-sm leading-tight">{activeToast.titulo}</h3>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setActiveToast(null);
              navigate('/cuidador/indicaciones');
            }}
            className="flex-1 bg-[#EF8090] text-white py-2 rounded-xl text-sm font-bold shadow-sm hover:brightness-95"
          >
            Registrar
          </button>
          <button 
            onClick={() => setActiveToast(null)}
            className="flex-1 bg-[#F4F4F4] text-[#7A87C2] py-2 rounded-xl text-sm font-bold hover:bg-[#E5E5E5]"
          >
            Posponer
          </button>
        </div>
      </div>
    </div>
  );
}
