import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import CuiCharacter, { CuiState } from './CuiCharacter';

interface Message {
  id: string;
  from: 'cui' | 'user';
  text: string;
  chips?: string[];
}

function buildInitialMessages(pacienteData: any, pacienteActivo: string): Message[] {
  const perfil = pacienteData.perfil;
  const nombre = perfil?.nombre?.split(' ')[0] || 'tu hijo/a';
  const turnos = pacienteData.turnos || [];
  const vacunas = pacienteData.vacunas || [];

  const pendingTurno = turnos
    .filter((t: any) => t.estado === 'pendiente' && t.fecha !== 'cada-martes' && t.fecha !== 'cada-miercoles')
    .sort((a: any, b: any) => a.fecha.localeCompare(b.fecha))[0];

  const antigripalPendiente = vacunas.find(
    (v: any) => v.nombre.includes('Antigripal') && (v.status === 'pendiente' || v.status === 'proxima')
  );

  const msgs: Message[] = [
    {
      id: 'm0',
      from: 'cui',
      text: `¡Hola! Soy **CUI**, tu asistente en CUIPEA. Estoy acá para ayudarte a registrar todo sin que tengas que escribir nada. 👋`,
    },
  ];

  if (pendingTurno) {
    const fecha = new Date(pendingTurno.fecha + 'T00:00:00').toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long',
    });
    msgs.push({
      id: 'm1',
      from: 'cui',
      text: `Vi que ${nombre} tiene turno con ${pendingTurno.especialista} el **${fecha}**. ¿Querés que prepare el resumen para esa consulta?`,
      chips: ['Sí, preparalo 📋', 'Registrar síntoma', '¿Qué vacunas faltan?', 'Ver medicación de hoy'],
    });
  } else if (antigripalPendiente) {
    msgs.push({
      id: 'm1',
      from: 'cui',
      text: `La **antigripal** de ${nombre} está pendiente. Es importante antes del invierno, ¡especialmente con su diagnóstico!`,
      chips: ['Registrar síntoma', 'Preparar consulta', '¿Qué vacunas faltan?', 'Ver medicación de hoy'],
    });
  } else {
    msgs.push({
      id: 'm1',
      from: 'cui',
      text: `¿En qué te ayudo hoy?`,
      chips: ['Registrar síntoma', 'Preparar consulta', '¿Qué vacunas faltan?', 'Ver medicación de hoy'],
    });
  }

  return msgs;
}

function buildCuiResponse(chip: string, pacienteData: any): { text: string; chips?: string[] } {
  const nombre = pacienteData.perfil?.nombre?.split(' ')[0] || 'tu hijo/a';
  const vacunas = pacienteData.vacunas || [];
  const medicacion = pacienteData.medicacion || [];

  if (chip.includes('preparalo') || chip.includes('Preparar')) {
    const diario = (pacienteData.diario || []).slice(0, 3);
    const n = diario.length;
    return {
      text: `Listo, armé el resumen de ${nombre} para la consulta:\n\n• **${n} entradas recientes** en el diario\n• Medicación activa: ${medicacion.map((m: any) => m.droga).join(', ') || 'ninguna'}\n• Alergias: ${pacienteData.perfil?.alergias?.join(', ') || 'ninguna'}\n\n¿Querés agregar alguna nota antes del turno?`,
      chips: ['Agregar nota ✏️', 'Todo bien, gracias'],
    };
  }
  if (chip.includes('síntoma')) {
    return {
      text: `¿Qué síntoma querés registrar para ${nombre}?`,
      chips: ['Dolor de cabeza 🤕', 'Náuseas 🤢', 'Fiebre 🌡️', 'Tos 😮‍💨', 'Otro...'],
    };
  }
  if (chip.includes('vacunas')) {
    const pendientes = vacunas.filter((v: any) => v.status === 'pendiente' || v.status === 'proxima');
    if (pendientes.length === 0) {
      return { text: `¡Todo al día! ${nombre} tiene el calendario de vacunas completo para su edad. 🎉`, chips: ['Ver todas las vacunas', 'Registrar síntoma'] };
    }
    const lista = pendientes.map((v: any) => `• **${v.nombre}**: ${v.dosis}`).join('\n');
    return {
      text: `${nombre} tiene ${pendientes.length} vacuna${pendientes.length > 1 ? 's' : ''} pendiente${pendientes.length > 1 ? 's' : ''}:\n\n${lista}\n\n¿Querés que te recuerde sacar turno?`,
      chips: ['Sí, recordame 🔔', 'Ver calendario completo', 'Todo bien'],
    };
  }
  if (chip.includes('medicación')) {
    if (medicacion.length === 0) return { text: `${nombre} no tiene medicación activa registrada.`, chips: ['Agregar medicación', 'Registrar síntoma'] };
    const hoy = medicacion.filter((m: any) => m.horarios?.length > 0);
    const lista = hoy.map((m: any) => `• **${m.droga}** ${m.dosis} — ${m.horarios.join(', ')}`).join('\n');
    return {
      text: `Medicación de ${nombre} hoy:\n\n${lista}\n\n¿Marcamos alguna toma?`,
      chips: ['Marcar toma ✅', 'Reportar que faltó ⚠️', 'Todo bien'],
    };
  }
  if (chip.includes('Dolor de cabeza') || chip.includes('Náuseas') || chip.includes('Fiebre') || chip.includes('Tos')) {
    const sintoma = chip.split(' ')[0];
    return {
      text: `Anotado ✅ Registré **${sintoma.toLowerCase()}** de ${nombre} en el diario con la hora actual. ¿Querés agregar una nota o intensidad?`,
      chips: ['Agregar detalle ✏️', 'Así está bien', 'Registrar otro síntoma'],
    };
  }
  if (chip.includes('Agregar nota') || chip.includes('Agregar detalle')) {
    return {
      text: `Dictame la nota y la guardo. Podés decirme, por ejemplo: "Le dio fuerte, tuvo que acostarse una hora" o "Intensidad 3 sobre 5".`,
      chips: [],
    };
  }
  if (chip.includes('recordame') || chip.includes('Recordame')) {
    return {
      text: `Anotado. Te mando un aviso cuando estemos cerca del invierno. En Argentina lo ideal es aplicarla entre abril y junio. ¿Necesitás algo más?`,
      chips: ['Registrar síntoma', '¿Qué más puedo hacer?', 'Nada, gracias'],
    };
  }
  if (chip.includes('Nada') || chip.includes('Todo bien') || chip.includes('gracias')) {
    return {
      text: `¡Perfecto! Acá voy a estar cuando me necesités. 🙌 Tocame cuando quieras.`,
      chips: ['Registrar síntoma', 'Preparar consulta'],
    };
  }
  if (chip.includes('puedo hacer')) {
    return {
      text: `Puedo ayudarte con:\n\n• 🎙️ Resumir consultas por voz\n• 📸 Leer recetas con la cámara\n• 📓 Registrar síntomas y diario\n• 💊 Marcar tomas de medicación\n• 💉 Seguimiento de vacunas\n• 📋 Preparar resumen para el médico`,
      chips: ['Registrar síntoma', 'Preparar consulta', 'Ver medicación'],
    };
  }
  // Fallback
  return {
    text: `Entendido. Tomé nota. ¿Querés que lo registre en el historial de ${nombre} o necesitás algo más?`,
    chips: ['Sí, registralo ✅', 'Registrar síntoma', 'Preparar consulta'],
  };
}

/* ──────────────────────────────────────────────────────────────────── */

interface ChatbotProps {
  onClose: () => void;
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const { pacienteData, pacienteActivo } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(() =>
    buildInitialMessages(pacienteData, pacienteActivo)
  );
  const [input, setInput] = useState('');
  const [cuiState, setCuiState] = useState<CuiState>('idle');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }), 80);
  }, [messages, isTyping]);

  function addCuiMessage(resp: { text: string; chips?: string[] }) {
    setIsTyping(true);
    setCuiState('thinking');
    setTimeout(() => {
      setIsTyping(false);
      setCuiState('talking');
      setMessages(prev => [...prev, { id: Date.now().toString(), from: 'cui', ...resp }]);
      setTimeout(() => setCuiState('idle'), 1200);
    }, 1300);
  }

  function handleChip(chip: string) {
    setMessages(prev => [...prev, { id: Date.now().toString(), from: 'user', text: chip }]);
    const resp = buildCuiResponse(chip, pacienteData);
    addCuiMessage(resp);
  }

  function handleSend() {
    const txt = input.trim();
    if (!txt) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), from: 'user', text: txt }]);
    addCuiMessage({
      text: `Entendido 👍 Anotado en el historial de ${pacienteData.perfil?.nombre?.split(' ')[0] || 'tu hijo/a'}. ¿Necesitás algo más?`,
      chips: ['Registrar otro síntoma', 'Preparar consulta', 'Todo bien'],
    });
  }

  const lastMsg = messages[messages.length - 1];
  const chips = (!isTyping && lastMsg?.from === 'cui' && lastMsg.chips) ? lastMsg.chips : [];

  function renderText(text: string) {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((p, j) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={j}>{p.slice(2, -2)}</strong>
              : p
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  }

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="absolute inset-0 z-50 flex flex-col bg-white rounded-t-3xl overflow-hidden shadow-2xl"
      style={{ top: '10%' }}
    >
      {/* Header */}
      <div className="bg-[#28325A] px-5 pt-5 pb-6 relative overflow-hidden shrink-0">
        <div className="absolute top-[-20px] right-[-20px] w-24 h-20 rotate-[20deg] bg-[#EEC5DD] opacity-20" style={{ borderRadius: 12 }} />
        <div className="absolute bottom-[-8px] right-[55px] w-14 h-11 -rotate-[12deg] bg-[#F6C95A] opacity-20" style={{ borderRadius: 8 }} />

        <div className="flex items-center gap-4 relative z-10">
          <CuiCharacter size={52} state={cuiState} />
          <div className="flex-1">
            <p className="text-white font-black text-xl leading-tight">CUI</p>
            <p className="text-white/60 text-xs font-medium">Asistente de CUIPEA</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 bg-[#A9D5B6] rounded-full" />
              <span className="text-[#A9D5B6] text-[10px] font-semibold">
                {cuiState === 'thinking' ? 'Pensando...' : cuiState === 'talking' ? 'Respondiendo...' : 'Disponible'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F7F8FC]">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'cui' && (
                <div className="w-7 h-7 shrink-0 mr-2 mt-1">
                  <svg width="28" height="34" viewBox="0 0 80 100" fill="none">
                    <path d="M62,14 C62,14 18,14 14,50 C14,50 18,86 62,86" stroke="#28325A" strokeWidth="18" strokeLinecap="round" fill="none"/>
                    <rect x="18" y="29" width="19" height="13" rx="4" fill="#EEC5DD" transform="rotate(-14 27 35)" />
                    <rect x="20" y="57" width="19" height="13" rx="4" fill="#F6C95A" transform="rotate(10 29 63)" />
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-snug ${
                  msg.from === 'user'
                    ? 'bg-[#28325A] text-white rounded-br-sm font-medium'
                    : 'bg-white text-[#28325A] rounded-bl-sm shadow-sm border border-[#ECEEF4]'
                }`}
              >
                {renderText(msg.text)}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 shrink-0">
                <svg width="28" height="34" viewBox="0 0 80 100" fill="none">
                  <path d="M62,14 C62,14 18,14 14,50 C14,50 18,86 62,86" stroke="#28325A" strokeWidth="18" strokeLinecap="round" fill="none"/>
                  <rect x="18" y="29" width="19" height="13" rx="4" fill="#EEC5DD" transform="rotate(-14 27 35)" />
                  <rect x="20" y="57" width="19" height="13" rx="4" fill="#F6C95A" transform="rotate(10 29 63)" />
                </svg>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-[#ECEEF4] flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#C8CCDB] rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick chips */}
      <AnimatePresence>
        {chips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="px-4 py-2 flex gap-2 overflow-x-auto bg-[#F7F8FC] shrink-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {chips.map(chip => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-white border border-[#DCDFF0] text-[#28325A] text-xs font-bold shadow-sm hover:bg-[#28325A] hover:text-white hover:border-[#28325A] transition-all duration-150 shrink-0"
              >
                {chip}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-4 pb-6 pt-2 bg-white border-t border-[#ECEEF4] flex items-center gap-2 shrink-0">
        <div className="flex-1 flex items-center bg-[#F4F5FA] rounded-2xl px-4 py-3 gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Escribile a CUI..."
            className="flex-1 bg-transparent text-sm text-[#28325A] placeholder:text-[#B0B5C8] outline-none font-medium"
          />
          <button className="text-[#B0B5C8] hover:text-[#28325A] transition">
            <Mic size={18} />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-11 h-11 bg-[#28325A] disabled:bg-[#D4D4D4] rounded-2xl flex items-center justify-center transition-all active:scale-90"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
