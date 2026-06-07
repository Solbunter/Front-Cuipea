import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './contexts/AppContext';
import { MobileFrame } from './components/Layout/MobileFrame';
import { CuidadorLayout } from './components/Layout/CuidadorLayout';
import NotificationSystem from './components/NotificationSystem';

import RolSelector from './pages/RolSelector';
import Onboarding from './pages/Onboarding';
import Inicio from './pages/cuidador/Inicio';
import Turnos from './pages/cuidador/Turnos';
import Documentos from './pages/cuidador/Documentos';
import Diario from './pages/cuidador/Diario';
import Perfil from './pages/cuidador/Perfil';
import Indicaciones from './pages/cuidador/Indicaciones';
import Medicacion from './pages/cuidador/Medicacion';
import Crecimiento from './pages/cuidador/Crecimiento';
import Contactos from './pages/cuidador/Contactos';
import Accesos from './pages/cuidador/Accesos';
import Pack from './pages/cuidador/Pack';
import Vacunas from './pages/cuidador/Vacunas';
import Timeline from './pages/cuidador/Timeline';
import Consulta from './pages/cuidador/Consulta';
import PrepararConsulta from './pages/cuidador/PrepararConsulta';
import Login from './pages/medico/Login';
import PacienteMedico from './pages/medico/PacienteMedico';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL?.replace(/\/$/, '')}>
          <MobileFrame>
            <Routes>
              <Route path="/" element={<RolSelector />} />
              <Route path="/onboarding" element={<Onboarding />} />

              <Route element={<CuidadorLayout />}>
                <Route path="/cuidador/inicio" element={<Inicio />} />
                <Route path="/cuidador/turnos" element={<Turnos />} />
                <Route path="/cuidador/documentos" element={<Documentos />} />
                <Route path="/cuidador/diario" element={<Diario />} />
                <Route path="/cuidador/perfil" element={<Perfil />} />
                <Route path="/cuidador/indicaciones" element={<Indicaciones />} />
                <Route path="/cuidador/medicacion" element={<Medicacion />} />
                <Route path="/cuidador/crecimiento" element={<Crecimiento />} />
                <Route path="/cuidador/contactos" element={<Contactos />} />
                <Route path="/cuidador/accesos" element={<Accesos />} />
                <Route path="/cuidador/pack" element={<Pack />} />
                <Route path="/cuidador/vacunas" element={<Vacunas />} />
                <Route path="/cuidador/timeline" element={<Timeline />} />
                <Route path="/cuidador/consulta" element={<Consulta />} />
                <Route path="/cuidador/consulta/preparar" element={<PrepararConsulta />} />
              </Route>

              <Route path="/medico/login" element={<Login />} />
              <Route path="/medico/paciente" element={<PacienteMedico />} />
            </Routes>
            <NotificationSystem />
          </MobileFrame>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
