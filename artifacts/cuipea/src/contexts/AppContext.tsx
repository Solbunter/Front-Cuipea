import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadData, saveData } from '../data/store';
import { initializeSeedData } from '../data/seed';

type AppContextType = {
  pacienteActivo: string;
  setPacienteActivo: (id: string) => void;
  data: any;
  updateData: (newData: any) => void;
  pacienteData: any;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [pacienteActivo, setPacienteActivoState] = useState<string>('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    initializeSeedData();
    setPacienteActivoState(loadData('pacienteActivo', 'lucia'));
    setData(loadData('data', {}));
    setIsReady(true);
  }, []);

  const setPacienteActivo = (id: string) => {
    setPacienteActivoState(id);
    saveData('pacienteActivo', id);
  };

  const updateData = (newData: any) => {
    setData(newData);
    saveData('data', newData);
  };

  if (!isReady || !data) return null;

  const pacienteData = {
    perfil: data.pacientes.find((p: any) => p.id === pacienteActivo),
    turnos: data.turnos?.filter((t: any) => t.pacienteId === pacienteActivo) || [],
    estudios: data.estudios?.filter((e: any) => e.pacienteId === pacienteActivo) || [],
    diario: data.diario?.filter((d: any) => d.pacienteId === pacienteActivo) || [],
    indicaciones: data.indicaciones?.filter((i: any) => i.pacienteId === pacienteActivo) || [],
    medicacion: data.medicacion?.filter((m: any) => m.pacienteId === pacienteActivo) || [],
    crecimiento: data.crecimiento?.filter((c: any) => c.pacienteId === pacienteActivo) || [],
    accesos: data.accesos?.filter((a: any) => a.pacienteId === pacienteActivo) || [],
    vacunas: data.vacunas?.filter((v: any) => v.pacienteId === pacienteActivo) || [],
  };

  return (
    <AppContext.Provider value={{ pacienteActivo, setPacienteActivo, data, updateData, pacienteData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
