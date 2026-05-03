import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveData } from '../data/store';
import { ChevronRight, Calendar, BookOpen, Share2, Check } from 'lucide-react';

type Slide = {
  id: number;
  accent: string;
  blobColor: string;
  blobColor2?: string;
  isWelcome?: boolean;
  icon?: React.ElementType;
  title: string;
  body: string;
  bullets?: { icon: string; text: string }[];
  isLast?: boolean;
};

const slides: Slide[] = [
  {
    id: 1,
    isWelcome: true,
    accent: '#28325A',
    blobColor: '#EEC5DD',
    blobColor2: '#7A87C2',
    title: 'Tu compañera en el cuidado pediátrico',
    body: 'Toda la información médica de tu hijo/a centralizada, organizada y siempre lista para compartir con el equipo de salud.',
  },
  {
    id: 2,
    accent: '#F6C95A',
    blobColor: '#FDF3D0',
    icon: Calendar,
    title: 'Turnos y consultas',
    body: 'Organizá cada visita médica y llegá preparada.',
    bullets: [
      { icon: '📅', text: 'Próximos y pasados turnos en un vistazo' },
      { icon: '💬', text: 'Preparar preguntas antes de ir' },
      { icon: '📋', text: 'Ficha de lo que dijo el médico' },
      { icon: '⚡', text: 'Modo Consulta: toda la info en 90 seg' },
    ],
  },
  {
    id: 3,
    accent: '#EF8090',
    blobColor: '#FDEAED',
    icon: BookOpen,
    title: 'Diario y documentos',
    body: 'Registrá síntomas y guardá todos los estudios en un lugar.',
    bullets: [
      { icon: '📓', text: 'Diario de síntomas con intensidad' },
      { icon: '⭐', text: 'Marcá entradas para mostrar al médico' },
      { icon: '📎', text: 'Estudios, recetas e informes guardados' },
      { icon: '🔍', text: 'Filtros rápidos por tipo' },
    ],
  },
  {
    id: 4,
    accent: '#5DB3C1',
    blobColor: '#DCF1F4',
    icon: Share2,
    title: 'Compartir con el equipo',
    body: 'Controlás exactamente qué ve cada profesional.',
    bullets: [
      { icon: '🔑', text: 'Accesos temporales con vencimiento' },
      { icon: '🛡️', text: 'Elegís qué información se comparte' },
      { icon: '🖨️', text: 'Pack imprimible para guardia o escuela' },
      { icon: '📱', text: 'QR de acceso rápido para el médico' },
    ],
  },
  {
    id: 5,
    isLast: true,
    accent: '#A9D5B6',
    blobColor: '#E4F5EA',
    blobColor2: '#EEC5DD',
    title: '¡Todo listo para empezar!',
    body: 'CUIPEA te acompaña en cada paso del cuidado de tu hijo/a.',
  },
];

const ACCENT_DOTS = ['#7A87C2', '#F6C95A', '#EF8090', '#5DB3C1', '#A9D5B6'];

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

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-[-80px] right-[-60px] w-64 h-64 rounded-full pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: slide.blobColor, opacity: 0.6 }}
      />
      {slide.blobColor2 && (
        <div
          className="absolute top-[60px] left-[-80px] w-48 h-48 rounded-full pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: slide.blobColor2, opacity: 0.25 }}
        />
      )}

      {/* Skip */}
      <div className="shrink-0 flex justify-between items-center px-5 pt-5 z-10 relative">
        {/* Logo pequeño */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-sm"
          style={{ backgroundColor: '#28325A' }}
        >
          C
        </div>
        {!slide.isLast && (
          <button
            onClick={finish}
            className="text-sm font-semibold text-[#7A87C2] px-3 py-1.5"
          >
            Saltar
          </button>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-7 pb-2 gap-5 relative z-10">

        {/* Welcome slide */}
        {slide.isWelcome && (
          <div className="flex flex-col items-center gap-6 w-full">
            <img
              src="/cuipea-logo.png"
              alt="CUIPEA"
              className="w-56 h-auto object-contain"
            />
            <div className="text-center">
              <h1 className="font-bold text-[26px] text-[#28325A] leading-tight mb-3">
                {slide.title}
              </h1>
              <p className="text-[15px] text-[#7A87C2] font-medium leading-relaxed">
                {slide.body}
              </p>
            </div>
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {[
                { label: 'Turnos', color: '#F6C95A' },
                { label: 'Diario', color: '#EF8090' },
                { label: 'Documentos', color: '#7A87C2' },
                { label: 'Compartir', color: '#5DB3C1' },
                { label: 'Modo Consulta', color: '#A9D5B6' },
              ].map((b) => (
                <span
                  key={b.label}
                  className="text-[13px] font-bold px-3.5 py-1.5 rounded-full text-[#28325A]"
                  style={{ backgroundColor: b.color + '30', border: `1.5px solid ${b.color}60` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Feature slides */}
        {!slide.isWelcome && !slide.isLast && slide.icon && (
          <div className="flex flex-col items-center gap-5 w-full">
            {/* Icon */}
            <div
              className="w-[72px] h-[72px] rounded-[22px] flex items-center justify-center shadow-md"
              style={{ backgroundColor: slide.accent }}
            >
              <slide.icon size={34} color="white" strokeWidth={1.8} />
            </div>
            {/* Text */}
            <div className="text-center">
              <h1 className="font-bold text-2xl text-[#28325A] leading-tight mb-2">
                {slide.title}
              </h1>
              <p className="text-sm text-[#7A87C2] font-medium leading-relaxed">
                {slide.body}
              </p>
            </div>
            {/* Bullets */}
            {slide.bullets && (
              <div className="w-full space-y-2.5">
                {slide.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#F0F0F0]"
                  >
                    <span className="text-lg leading-none">{b.icon}</span>
                    <p className="text-[14px] font-medium text-[#28325A] leading-snug">{b.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Last slide */}
        {slide.isLast && (
          <div className="flex flex-col items-center gap-6 w-full">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#A9D5B6' }}
            >
              <Check size={44} color="white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h1 className="font-bold text-[26px] text-[#28325A] leading-tight mb-3">
                {slide.title}
              </h1>
              <p className="text-[15px] text-[#7A87C2] font-medium leading-relaxed">
                {slide.body}
              </p>
            </div>
            {/* Summary pills */}
            <div className="w-full space-y-2.5">
              {[
                { icon: '📅', text: 'Turnos y consultas organizados', color: '#FDF3D0' },
                { icon: '📓', text: 'Diario y documentos en un lugar', color: '#FDEAED' },
                { icon: '🔗', text: 'Compartir con el equipo médico', color: '#DCF1F4' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-[#F0F0F0]"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-[14px] font-semibold text-[#28325A]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="shrink-0 px-6 pb-8 pt-3 flex flex-col items-center gap-4 relative z-10">
        {/* Dots */}
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                backgroundColor: i === current ? ACCENT_DOTS[i] : '#E0E0E0',
              }}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          style={{ backgroundColor: '#28325A', color: 'white' }}
        >
          {slide.isLast ? 'Entrar a CUIPEA' : 'Siguiente'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
