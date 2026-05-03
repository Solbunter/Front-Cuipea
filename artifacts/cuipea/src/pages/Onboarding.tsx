import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveData } from '../data/store';
import { ChevronRight, Calendar, FileText, BookOpen, Share2, Stethoscope } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: '#28325A',
    accent: '#7A87C2',
    icon: null,
    logo: true,
    title: 'Bienvenida a CUIPEA',
    subtitle: 'Cuidados Pediátricos Avanzados',
    body: 'La app que centraliza toda la información médica de tu hijo/a para que nada se pierda, nada se olvide y el equipo médico siempre esté al tanto.',
    cta: null,
  },
  {
    id: 2,
    bg: '#F4F4F4',
    accent: '#7A87C2',
    icon: Calendar,
    iconBg: '#7A87C2',
    title: 'Turnos y consultas',
    subtitle: null,
    body: 'Registrá todos los turnos médicos, preparate con preguntas antes de cada consulta y guardá la ficha de lo que dijo el médico para no olvidar nada.',
    bullets: [
      'Próximos y pasados turnos organizados',
      'Preparar preguntas antes de ir',
      'Ficha de consulta editable',
      'Modo Consulta: toda la info en 90 segundos',
    ],
  },
  {
    id: 3,
    bg: '#F4F4F4',
    accent: '#EF8090',
    icon: BookOpen,
    iconBg: '#EF8090',
    title: 'Diario y documentos',
    subtitle: null,
    body: 'Llevá un registro diario de síntomas, emociones y eventos importantes. Guardá todos los estudios y recetas en un solo lugar.',
    bullets: [
      'Diario de síntomas con intensidad',
      'Marcar entradas para mostrar al médico',
      'Estudios, recetas e informes guardados',
      'Filtros rápidos por tipo de documento',
    ],
  },
  {
    id: 4,
    bg: '#F4F4F4',
    accent: '#5DB3C1',
    icon: Share2,
    iconBg: '#5DB3C1',
    title: 'Compartir con el equipo médico',
    subtitle: null,
    body: 'Generá accesos temporales para que los médicos, la escuela o familiares puedan ver lo que necesitan, sin acceder a todo.',
    bullets: [
      'Accesos con fecha de vencimiento',
      'Control de qué información se comparte',
      'Pack imprimible para guardia o escuela',
      'QR de acceso rápido para el médico',
    ],
  },
  {
    id: 5,
    bg: '#A9D5B6',
    accent: '#28325A',
    icon: Stethoscope,
    iconBg: '#28325A',
    title: '¡Todo listo!',
    subtitle: null,
    body: 'CUIPEA es tu compañera en el cuidado pediátrico. Empezá registrando el perfil de tu hijo/a.',
    cta: 'Empezar',
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  function handleNext() {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      finish();
    }
  }

  function finish() {
    saveData('onboardingDone', true);
    navigate('/');
  }

  const slide = slides[current];
  const isLast = current === slides.length - 1;
  const isFirst = current === 0;

  return (
    <div
      className="flex flex-col h-full transition-colors duration-500"
      style={{ backgroundColor: slide.bg }}
    >
      {/* Skip */}
      {!isLast && (
        <div className="flex justify-end px-5 pt-5 shrink-0">
          <button
            onClick={finish}
            className="text-sm font-bold opacity-50 px-3 py-1.5 rounded-xl"
            style={{ color: isFirst ? 'white' : '#7A87C2' }}
          >
            Saltar
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-7 pb-4 gap-6">
        {/* First slide — logo grande */}
        {slide.logo && (
          <div className="flex flex-col items-center gap-4">
            <img
              src="/cuipea-logo.png"
              alt="CUIPEA"
              className="w-64 h-auto object-contain brightness-0 invert"
            />
            <div className="w-16 h-1 rounded-full bg-white/30" />
          </div>
        )}

        {/* Other slides — icon */}
        {slide.icon && (
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: slide.iconBg + '20', border: `2px solid ${slide.iconBg}40` }}
          >
            <slide.icon size={44} style={{ color: slide.iconBg }} strokeWidth={1.5} />
          </div>
        )}

        {/* Text */}
        <div className="text-center">
          {slide.subtitle && (
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: slide.accent }}>
              {slide.subtitle}
            </p>
          )}
          <h1
            className="font-bold text-2xl leading-tight mb-3"
            style={{ color: isFirst ? 'white' : '#28325A' }}
          >
            {slide.title}
          </h1>
          <p
            className="text-sm leading-relaxed font-medium"
            style={{ color: isFirst ? 'rgba(255,255,255,0.75)' : '#7A87C2' }}
          >
            {slide.body}
          </p>
        </div>

        {/* Bullets */}
        {'bullets' in slide && slide.bullets && (
          <div className="w-full space-y-2.5 mt-1">
            {slide.bullets.map((b: string, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-[10px] font-bold"
                  style={{ backgroundColor: slide.accent }}
                >
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-[#28325A] leading-snug">{b}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom: dots + button */}
      <div className="shrink-0 px-6 pb-8 pt-2 flex flex-col items-center gap-5">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                backgroundColor: isFirst
                  ? i === current ? 'white' : 'rgba(255,255,255,0.3)'
                  : i === current ? slide.accent : '#D4D4D4',
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          style={{
            backgroundColor: isFirst ? 'white' : slide.accent,
            color: isFirst ? '#28325A' : 'white',
          }}
        >
          {isLast ? ('cta' in slide && slide.cta ? slide.cta : 'Comenzar') : 'Siguiente'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
