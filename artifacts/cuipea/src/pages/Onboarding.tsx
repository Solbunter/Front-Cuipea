import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { saveData } from '../data/store';
import { ChevronRight, Calendar, BookOpen, Share2, Syringe } from 'lucide-react';

/* ─── FLOATING BLOCKS ─────────────────────────────────────────────── */
interface BlockDef {
  color: string; w: number; h: number;
  top?: number|string; bottom?: number|string;
  left?: number|string; right?: number|string;
  rotate: number; opacity: number; delay: number;
  entryX: number; entryY: number; floatAmp: number;
}

const HERO_BLOCKS: BlockDef[] = [
  { color:'#EEC5DD', w:110, h:85,  top:-30,  right:-30, rotate:20,  opacity:0.65, delay:0,    entryX:120,  entryY:-100, floatAmp:14 },
  { color:'#F6C95A', w:70,  h:55,  top:60,   left:-35,  rotate:-18, opacity:0.55, delay:0.08, entryX:-90,  entryY:-60,  floatAmp:10 },
  { color:'#5DB3C1', w:60,  h:48,  top:200,  right:-25, rotate:28,  opacity:0.45, delay:0.15, entryX:80,   entryY:40,   floatAmp:8  },
  { color:'#EF8090', w:80,  h:62,  bottom:110,left:-25,  rotate:-30, opacity:0.5,  delay:0.22, entryX:-100, entryY:80,   floatAmp:12 },
  { color:'#A9D5B6', w:45,  h:36,  top:30,   right:90,  rotate:8,   opacity:0.5,  delay:0.1,  entryX:40,   entryY:-100, floatAmp:9  },
  { color:'#EEC5DD', w:50,  h:40,  bottom:80, right:-15, rotate:-22, opacity:0.4,  delay:0.18, entryX:70,   entryY:100,  floatAmp:11 },
];

function FloatingBlock({ b, i }: { b: BlockDef; i: number }) {
  const pos: React.CSSProperties = {
    position:'absolute',
    ...(b.top    !== undefined ? { top:    b.top }    : {}),
    ...(b.bottom !== undefined ? { bottom: b.bottom } : {}),
    ...(b.left   !== undefined ? { left:   b.left }   : {}),
    ...(b.right  !== undefined ? { right:  b.right }  : {}),
  };
  return (
    <motion.div
      style={pos}
      initial={{ opacity:0, scale:0, x:b.entryX, y:b.entryY }}
      animate={{ opacity:b.opacity, scale:1, x:0, y:0 }}
      transition={{ delay:b.delay, type:'spring', stiffness:220, damping:18 }}
    >
      <motion.div
        style={{ width:b.w, height:b.h, borderRadius:14, backgroundColor:b.color }}
        animate={{ y:[0, -b.floatAmp, 0], rotate:[b.rotate, b.rotate+6, b.rotate] }}
        transition={{ duration:3.5+i*0.4, repeat:Infinity, ease:'easeInOut', delay:b.delay+0.9 }}
      />
    </motion.div>
  );
}

/* ─── ANIMATED LETTER ─────────────────────────────────────────────── */
const LETTER_DIRS = [
  { x:-60, y:-80, rotate:-40 },
  { x:-30, y:100, rotate:30  },
  { x:0,   y:-100,rotate:-20 },
  { x:80,  y:60,  rotate:25  },
  { x:60,  y:-80, rotate:-30 },
  { x:40,  y:80,  rotate:20  },
];

function AnimatedLogo() {
  const letters = 'CUIPEA'.split('');
  return (
    <div className="flex items-center justify-center gap-0.5 select-none">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ opacity:0, scale:0.3, x:LETTER_DIRS[i].x, y:LETTER_DIRS[i].y, rotate:LETTER_DIRS[i].rotate }}
          animate={{ opacity:1, scale:1, x:0, y:0, rotate:0 }}
          transition={{ delay:0.5 + i*0.1, type:'spring', stiffness:260, damping:20 }}
          style={{
            fontFamily:"'Plus Jakarta Sans', sans-serif",
            fontWeight:800, fontSize:44,
            color:'white', display:'inline-block',
            lineHeight:1,
            textShadow:'0 2px 12px rgba(0,0,0,0.15)',
          }}
        >
          {l}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── TAGLINE ─────────────────────────────────────────────────────── */
function AnimatedTagline() {
  const line1 = 'La salud de tus hijos,';
  const line2Words = ['en', 'tus', 'manos.'];
  return (
    <div className="text-center mt-2">
      <motion.p
        initial={{ opacity:0, y:24 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:1.4, duration:0.6 }}
        style={{ color:'rgba(255,255,255,0.75)', fontSize:16, fontWeight:500, lineHeight:1.5 }}
      >
        {line1}
      </motion.p>
      <div className="flex justify-center gap-2 flex-wrap">
        {line2Words.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity:0, y:20, scale:0.8 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay:1.9 + i*0.18, type:'spring', stiffness:280 }}
            style={{
              fontSize: w === 'manos.' ? 26 : 22,
              fontWeight:800,
              color: w === 'manos.' ? '#F6C95A' : 'white',
              display:'inline-block',
              lineHeight:1.3,
            }}
          >
            {w}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─── SLIDES DATA ─────────────────────────────────────────────────── */
const FEATURE_SLIDES = [
  {
    icon: Calendar, accent:'#F6C95A', accentLight:'#FDF3D0',
    blockColor:'#F6C95A',
    title:'Turnos y consultas',
    body:'Llegá a cada consulta preparada. Nada se pierde.',
    bullets:[
      { icon:'📅', text:'Próximos y pasados turnos de un vistazo' },
      { icon:'💬', text:'Prepará tus preguntas antes de ir' },
      { icon:'📋', text:'Ficha con lo que te dijo el médico' },
      { icon:'⚡', text:'Modo Consulta: toda la info en 90 segundos' },
    ],
  },
  {
    icon: BookOpen, accent:'#EF8090', accentLight:'#FDEAED',
    blockColor:'#EF8090',
    title:'Diario y documentos',
    body:'Registrá síntomas y guardá todos los estudios.',
    bullets:[
      { icon:'📓', text:'Diario de síntomas con intensidad' },
      { icon:'⭐', text:'Marcá entradas para mostrar al médico' },
      { icon:'📎', text:'Estudios, recetas e informes en un lugar' },
      { icon:'🔍', text:'Filtros rápidos por tipo de documento' },
    ],
  },
  {
    icon: Share2, accent:'#5DB3C1', accentLight:'#DCF1F4',
    blockColor:'#5DB3C1',
    title:'Compartir con el equipo',
    body:'Vos decidís quién ve qué y hasta cuándo.',
    bullets:[
      { icon:'🔑', text:'Accesos temporales con vencimiento' },
      { icon:'🛡️', text:'Elegís qué información se comparte' },
      { icon:'🖨️', text:'Pack imprimible para guardia o escuela' },
      { icon:'📱', text:'QR de acceso rápido para el médico' },
    ],
  },
  {
    icon: Syringe, accent:'#A9D5B6', accentLight:'#E4F5EA',
    blockColor:'#A9D5B6',
    title:'Vacunas y seguimiento',
    body:'El calendario nacional en un lugar, siempre al día.',
    bullets:[
      { icon:'💉', text:'Calendario Nacional de Vacunación Argentina' },
      { icon:'✅', text:'Seguimiento de aplicadas y pendientes' },
      { icon:'🔔', text:'Alertas de vacunas próximas' },
      { icon:'🤖', text:'CUI te avisa cuándo es el momento' },
    ],
  },
];

/* ─── MAIN COMPONENT ──────────────────────────────────────────────── */
const TOTAL_SLIDES = 6; // 1 hero + 4 feature + 1 last
const DOT_COLORS = ['#EEC5DD','#F6C95A','#EF8090','#5DB3C1','#A9D5B6','#28325A'];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const navigate = useNavigate();

  function go(next: number) {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  }
  function handleNext() {
    if (current < TOTAL_SLIDES - 1) go(current + 1);
    else finish();
  }
  function finish() {
    saveData('onboardingDone', true);
    navigate('/');
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d * 340, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d * -340, opacity: 0 }),
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden relative">

      {/* ── HERO SLIDE ── */}
      {current === 0 && (
        <div className="absolute inset-0 bg-[#28325A] flex flex-col overflow-hidden">
          {/* Floating blocks */}
          {HERO_BLOCKS.map((b, i) => <FloatingBlock key={i} b={b} i={i} />)}

          {/* Skip */}
          <motion.button
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5 }}
            onClick={finish}
            className="absolute top-5 right-5 z-20 text-white/50 text-sm font-semibold px-3 py-1.5"
          >
            Saltar
          </motion.button>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-5 relative z-10">
            {/* Logo letters */}
            <AnimatedLogo />

            {/* Tagline */}
            <AnimatedTagline />

            {/* Feature badges */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:2.8 }}
              className="flex flex-wrap justify-center gap-2 mt-3"
            >
              {[
                { label:'Turnos', c:'#F6C95A' },
                { label:'Diario', c:'#EF8090' },
                { label:'Documentos', c:'#7A87C2' },
                { label:'Vacunas', c:'#A9D5B6' },
                { label:'CUI IA', c:'#EEC5DD' },
              ].map(b => (
                <span key={b.label}
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: b.c+'30', border:`1.5px solid ${b.c}70`, color:'white' }}
                >
                  {b.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:2.8, type:'spring' }}
            className="shrink-0 px-6 pb-8 pt-3 flex flex-col items-center gap-4 relative z-10"
          >
            <div className="flex gap-2 items-center">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i===current ? 28 : 8, height:8, backgroundColor: i===current ? DOT_COLORS[i] : 'rgba(255,255,255,0.3)' }}
                />
              ))}
            </div>
            <button onClick={handleNext}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 bg-white text-[#28325A] shadow-lg active:scale-95 transition-transform"
            >
              Siguiente <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      )}

      {/* ── FEATURE SLIDES ── */}
      {current >= 1 && current <= 4 && (() => {
        const slide = FEATURE_SLIDES[current - 1];
        const Icon = slide.icon;
        return (
          <div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
            {/* Decorative block top-right */}
            <div className="absolute top-0 right-0 pointer-events-none overflow-hidden w-40 h-40">
              <motion.div
                key={current}
                initial={{ scale:0, rotate:60, x:40, y:-40 }}
                animate={{ scale:1, rotate:22, x:0, y:0 }}
                transition={{ type:'spring', stiffness:200, damping:18 }}
                style={{ width:120, height:95, borderRadius:16, backgroundColor:slide.blockColor, opacity:0.18,
                         position:'absolute', top:-20, right:-20 }}
              />
              <motion.div
                key={current+'b'}
                initial={{ scale:0, rotate:0, x:20, y:-20 }}
                animate={{ scale:1, rotate:-12, x:0, y:0 }}
                transition={{ type:'spring', stiffness:200, damping:18, delay:0.1 }}
                style={{ width:60, height:48, borderRadius:10, backgroundColor:slide.blockColor, opacity:0.14,
                         position:'absolute', top:60, right:10 }}
              />
            </div>

            {/* Skip */}
            <div className="shrink-0 flex justify-end px-5 pt-5 z-10">
              <button onClick={finish} className="text-sm font-semibold text-[#7A87C2] px-3 py-1.5">Saltar</button>
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type:'spring', stiffness:280, damping:28 }}
                className="flex-1 flex flex-col items-center justify-center px-7 gap-5 relative z-10"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale:0, rotate:-30 }}
                  animate={{ scale:1, rotate:0 }}
                  transition={{ type:'spring', stiffness:320, damping:18, delay:0.1 }}
                  className="w-20 h-20 rounded-[26px] flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: slide.accent }}
                >
                  <Icon size={36} color="white" strokeWidth={1.7} />
                </motion.div>

                {/* Title + body */}
                <motion.div
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.15, duration:0.5 }}
                  className="text-center"
                >
                  <h1 className="font-bold text-[26px] text-[#28325A] leading-tight mb-2">{slide.title}</h1>
                  <p className="text-[15px] text-[#7A87C2] font-medium leading-relaxed">{slide.body}</p>
                </motion.div>

                {/* Bullets */}
                <div className="w-full space-y-2.5">
                  {slide.bullets.map((b, i) => (
                    <motion.div
                      key={b.text}
                      initial={{ opacity:0, x:40 }}
                      animate={{ opacity:1, x:0 }}
                      transition={{ delay:0.25 + i*0.1, type:'spring', stiffness:260 }}
                      className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#F0F0F0]"
                    >
                      <span className="text-lg leading-none">{b.icon}</span>
                      <p className="text-[14px] font-medium text-[#28325A] leading-snug">{b.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom nav */}
            <div className="shrink-0 px-6 pb-8 pt-3 flex flex-col items-center gap-4 relative z-10">
              <div className="flex gap-2 items-center">
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                  <button key={i} onClick={() => go(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: i===current ? 28 : 8, height:8,
                             backgroundColor: i===current ? DOT_COLORS[i] : '#E0E0E0' }}
                  />
                ))}
              </div>
              <button onClick={handleNext}
                className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
                style={{ backgroundColor:'#28325A', color:'white' }}
              >
                Siguiente <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── LAST SLIDE — Presentando CUI ── */}
      {current === 5 && (
        <div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
          {/* Bloque decorativo */}
          <div className="absolute top-0 right-0 pointer-events-none">
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.2 }}
              style={{ width:110, height:85, borderRadius:14, backgroundColor:'#EEC5DD', opacity:0.25,
                       position:'absolute', top:-20, right:-20, transform:'rotate(20deg)' }} />
          </div>
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', delay:0.35 }}
              style={{ width:80, height:62, borderRadius:12, backgroundColor:'#F6C95A', opacity:0.2,
                       position:'absolute', bottom:-15, left:-20, transform:'rotate(-15deg)' }} />
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key="last"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type:'spring', stiffness:280, damping:28 }}
              className="flex-1 flex flex-col items-center justify-center px-7 gap-6 relative z-10"
            >
              {/* CUI preview */}
              <motion.div
                initial={{ scale:0, rotate:-20 }}
                animate={{ scale:1, rotate:0 }}
                transition={{ type:'spring', stiffness:280, damping:18, delay:0.1 }}
              >
                <CuiPreview />
              </motion.div>

              <motion.div
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.3 }}
                className="text-center"
              >
                <h1 className="font-bold text-[28px] text-[#28325A] leading-tight mb-3">
                  ¡Hola! Soy <span style={{ color:'#5DB3C1' }}>CUI</span>
                </h1>
                <p className="text-[15px] text-[#7A87C2] font-medium leading-relaxed">
                  Voy a ayudarte a registrar consultas, síntomas y medicación sin que tengas que escribir nada. Solo hablame.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:0.5 }}
                className="w-full space-y-2"
              >
                {[
                  { icon:'🎙️', text:'Resumí la consulta de hoy hablando', c:'#EEC5DD' },
                  { icon:'📸', text:'Sacá foto a la receta y la cargo yo', c:'#F6C95A' },
                  { icon:'💬', text:'Preguntame lo que necesites', c:'#DCF1F4' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.55+i*0.1 }}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-[#F0F0F0]"
                    style={{ backgroundColor: item.c+'40' }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-[14px] font-medium text-[#28325A]">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.7, type:'spring' }}
            className="shrink-0 px-6 pb-8 pt-3 flex flex-col items-center gap-4 relative z-10"
          >
            <div className="flex gap-2 items-center">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i===current ? 28 : 8, height:8,
                           backgroundColor: i===current ? DOT_COLORS[i] : '#E0E0E0' }}
                />
              ))}
            </div>
            <button onClick={finish}
              className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
              style={{ backgroundColor:'#28325A', color:'white' }}
            >
              Entrar a CUIPEA <ChevronRight size={22} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ─── CUI PREVIEW (inline, en último slide) ──────────────────────── */
function CuiPreview() {
  return (
    <motion.div
      animate={{ y:[0,-8,0] }}
      transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
      className="relative"
    >
      <svg width="120" height="140" viewBox="0 0 80 100" fill="none">
        {/* C body */}
        <path
          d="M62,14 C62,14 18,14 14,50 C14,50 18,86 62,86"
          stroke="#28325A" strokeWidth="18" strokeLinecap="round" fill="none"
        />
        {/* Upper eye — pinkSoft block */}
        <motion.rect
          x="18" y="30" width="18" height="12" rx="4" fill="#EEC5DD"
          style={{ transformOrigin:'27px 36px' }}
          animate={{ rotate:[-14,-10,-14], scaleY:[1,1,0.15,1,1] }}
          transition={{ rotate:{ duration:4, repeat:Infinity, ease:'easeInOut' },
                        scaleY:{ duration:0.12, repeat:Infinity, repeatDelay:3.5, ease:'easeIn' } }}
        />
        {/* Lower eye — mustard block */}
        <motion.rect
          x="20" y="57" width="18" height="12" rx="4" fill="#F6C95A"
          style={{ transformOrigin:'29px 63px' }}
          animate={{ rotate:[10,14,10], scaleY:[1,1,0.15,1,1] }}
          transition={{ rotate:{ duration:4.5, repeat:Infinity, ease:'easeInOut' },
                        scaleY:{ duration:0.12, repeat:Infinity, repeatDelay:3.5, ease:'easeIn', delay:0.08 } }}
        />
      </svg>
    </motion.div>
  );
}
