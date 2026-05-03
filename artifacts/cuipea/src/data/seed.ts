import { saveData, loadData } from './store';
import { format, subDays } from 'date-fns';

const SEED_VERSION = 4;

export function initializeSeedData() {
  const currentVersion = loadData('seedVersion', 0);
  if (currentVersion >= SEED_VERSION) return;

  const hoy = new Date();

  const seedData = {
    cuidador: {
      nombre: "María Fernández",
      mail: "maria@gmail.com",
      rol: "madre"
    },
    pacientes: [
      {
        id: "lucia",
        nombre: "Lucía Fernández",
        fechaNac: "2018-03-12",
        sexo: "F",
        dni: "51234567",
        obraSocial: "OSDE 210",
        diagnostico: "Neurofibromatosis tipo 1 (NF1)",
        alergias: ["Penicilina", "Maní"]
      },
      {
        id: "mateo",
        nombre: "Mateo Fernández",
        fechaNac: "2021-07-22",
        sexo: "M",
        dni: "56789012",
        obraSocial: "OSDE 210",
        diagnostico: "Asma leve intermitente",
        alergias: ["Polen"]
      }
    ],
    turnos: [
      // Lucía
      { id: "t1", pacienteId: "lucia", fecha: "2026-05-18", hora: "10:00", tipo: "medico", especialista: "Dra. Patricia Lozano", especialidad: "Neurología infantil", lugar: "Hospital Garrahan", motivo: "Control trimestral", estado: "pendiente", preguntas: ["¿Aumentamos la dosis de Selumetinib?", "¿Es normal el dolor de cabeza frecuente?"], esRecurrente: false },
      { id: "t2", pacienteId: "lucia", fecha: "2026-06-02", hora: "14:30", tipo: "medico", especialista: "Dr. Martín Vargas", especialidad: "Oftalmología", lugar: "Consultorio privado", motivo: "Fondo de ojo anual", estado: "pendiente", preguntas: [], esRecurrente: false },
      { id: "t3", pacienteId: "lucia", fecha: "cada-martes", hora: "16:00", tipo: "terapia", especialista: "Lic. Ana Pérez", especialidad: "Fisioterapia", lugar: "Centro Kinesis", motivo: "", estado: "recurrente", preguntas: [], esRecurrente: true, frecuencia: "semanal", dia: "martes" },
      { id: "t4", pacienteId: "lucia", fecha: "2026-02-10", hora: "10:00", tipo: "medico", especialista: "Dra. Patricia Lozano", especialidad: "Neurología infantil", lugar: "Hospital Garrahan", motivo: "Resonancia de control", estado: "realizado", preguntas: ["¿Hubo cambios en la resonancia?"], ficha: { queDijo: "Estable. Sin nuevos neurofibromas. La resonancia no muestra progresión. Continuar con el mismo esquema de Selumetinib.", queTengoQueHacer: "Turno de fondo de ojo en junio con Dr. Vargas. Continuar con medicación actual sin cambios.", proximosPasos: "Control trimestral en mayo. Avisar si aparecen manchas nuevas o cambios en la visión." } },
      { id: "t5", pacienteId: "lucia", fecha: "2026-01-15", hora: "09:00", tipo: "medico", especialista: "Dr. Pediatra general", especialidad: "Pediatría", lugar: "Consultorio barrio", motivo: "Control general", estado: "realizado", preguntas: [], ficha: null },
      // Mateo
      { id: "t6", pacienteId: "mateo", fecha: "2026-05-28", hora: "09:00", tipo: "medico", especialista: "Dra. Claudia Torres", especialidad: "Neumonología pediátrica", lugar: "Centro Médico Sur", motivo: "Control de asma post-invierno", estado: "pendiente", preguntas: ["¿Seguimos con el plan de acción?", "¿Necesita espirometría?"], esRecurrente: false },
      { id: "t7", pacienteId: "mateo", fecha: "cada-miercoles", hora: "17:00", tipo: "terapia", especialista: "Lic. Juan Martínez", especialidad: "Fonoaudiología", lugar: "Consultorio", motivo: "", estado: "recurrente", preguntas: [], esRecurrente: true, frecuencia: "semanal", dia: "miércoles" },
      { id: "t8", pacienteId: "mateo", fecha: "2026-03-05", hora: "10:30", tipo: "medico", especialista: "Dra. Claudia Torres", especialidad: "Neumonología pediátrica", lugar: "Centro Médico Sur", motivo: "Crisis de asma leve", estado: "realizado", preguntas: ["¿Hay que cambiar la dosis del broncodilatador?"], ficha: { queDijo: "Crisis leve. Bien manejado en casa. El plan de acción funcionó. Mantener salbutamol de rescate.", queTengoQueHacer: "Continuar con Budesonide preventivo. Tener siempre salbutamol disponible. Evitar exposición a polvo de aula.", proximosPasos: "Control en mayo para ver cómo responde antes del invierno. Vacuna antigripal urgente." } }
    ],
    estudios: [
      // Lucía
      { id: "e1", pacienteId: "lucia", titulo: "Resonancia cerebro y columna (con contraste)", fecha: "2026-02-10", tipo: "Estudio", nota: "Sin contraste previo", mostrarEnConsulta: false, incluirEnPack: true },
      { id: "e2", pacienteId: "lucia", titulo: "Receta Selumetinib mes 4 — 25mg", fecha: "2026-04-05", tipo: "Receta", nota: "", mostrarEnConsulta: true, incluirEnPack: true },
      { id: "e3", pacienteId: "lucia", titulo: "Informe oftalmológico Dr. Vargas", fecha: "2026-03-03", tipo: "Informe", nota: "", mostrarEnConsulta: false, incluirEnPack: false },
      // Mateo
      { id: "e4", pacienteId: "mateo", titulo: "Espirometría basal", fecha: "2026-01-20", tipo: "Estudio", nota: "Función normal", mostrarEnConsulta: false, incluirEnPack: true },
      { id: "e5", pacienteId: "mateo", titulo: "Receta Budesonide 100mcg", fecha: "2026-04-01", tipo: "Receta", nota: "", mostrarEnConsulta: true, incluirEnPack: true },
      { id: "e6", pacienteId: "mateo", titulo: "Rx de tórax control post-crisis", fecha: "2026-03-06", tipo: "Estudio", nota: "Sin condensaciones", mostrarEnConsulta: false, incluirEnPack: false }
    ],
    contactos: [
      { id: "c1", nombre: "Dra. Patricia Lozano", especialidad: "Neurología infantil", esDeCabecera: true, mail: "patricia.lozano@garrahan.gob.ar", telefono: "011-4308-4300" },
      { id: "c2", nombre: "Dr. Martín Vargas", especialidad: "Oftalmología", esDeCabecera: false, mail: "vargas.oftalmo@gmail.com", telefono: "011-4555-1234" },
      { id: "c3", nombre: "Lic. Sofía Méndez", especialidad: "Psicopedagoga", esDeCabecera: false, mail: "sofiamendez@educacion.ar", telefono: "" },
      { id: "c4", nombre: "Lic. Ana Pérez", especialidad: "Fisioterapeuta", esDeCabecera: false, mail: "", telefono: "011-4777-9988" },
      { id: "c5", nombre: "Dra. Claudia Torres", especialidad: "Neumonología pediátrica", esDeCabecera: true, mail: "claudia.torres@centromedico.com", telefono: "011-4222-3344" },
      { id: "c6", nombre: "Dra. Valeria Ruiz", especialidad: "Pediatra de cabecera", esDeCabecera: true, mail: "valeriaruiz@pediatra.com", telefono: "011-4888-5566" }
    ],
    diario: [
      // Lucía
      { id: "d1", pacienteId: "lucia", fecha: format(hoy, 'yyyy-MM-dd'), titulo: "Náuseas leves post-medicación", descripcion: "Náuseas leves después de la dosis de la mañana de Selumetinib. Se le pasaron en una hora. Desayunó igual.", intensidad: 2, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d2", pacienteId: "lucia", fecha: format(subDays(hoy, 3), 'yyyy-MM-dd'), titulo: "Dolor de cabeza fuerte", descripcion: "Dolor de cabeza fuerte a la tarde, le di paracetamol 10mg/kg. Volvió a la escuela al día siguiente sin síntomas.", intensidad: 4, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d3", pacienteId: "lucia", fecha: format(subDays(hoy, 7), 'yyyy-MM-dd'), titulo: "Hito: leyó un libro sola", descripcion: "Empezó y terminó un libro entero sola en un día. Muy contenta y orgullosa. La motora fina mejoró notablemente.", intensidad: null, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d4", pacienteId: "lucia", fecha: format(subDays(hoy, 14), 'yyyy-MM-dd'), titulo: "Mancha café con leche nueva", descripcion: "Mancha café con leche nueva en el brazo derecho, aprox 5mm. Saqué foto para mostrar a la Dra. Lozano. Parece pequeña.", intensidad: 3, mostrarEnConsulta: true, incluirEnPack: false },
      { id: "d5", pacienteId: "lucia", fecha: format(subDays(hoy, 21), 'yyyy-MM-dd'), titulo: "Semana sin síntomas", descripcion: "Semana excelente. Fue todos los días al colegio, jugó con amigos, durmió bien. Sin efectos adversos.", intensidad: 1, mostrarEnConsulta: false, incluirEnPack: false },
      // Mateo
      { id: "d6", pacienteId: "mateo", fecha: format(hoy, 'yyyy-MM-dd'), titulo: "Tos nocturna leve", descripcion: "Tosió varias veces a la noche, sin sibilancias. Le di las 2 puff preventivas de Budesonide. Se durmió bien.", intensidad: 2, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d7", pacienteId: "mateo", fecha: format(subDays(hoy, 4), 'yyyy-MM-dd'), titulo: "Día perfecto sin síntomas", descripcion: "Jugó en el parque, corrió, no tuvo ningún episodio. Primera semana sin tos en el mes.", intensidad: 1, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d8", pacienteId: "mateo", fecha: format(subDays(hoy, 10), 'yyyy-MM-dd'), titulo: "Crisis leve — usé salbutamol", descripcion: "Crisis al llegar de la escuela, probablemente por el polvo del patio. 2 puff salbutamol, mejoró en 15 minutos. No fue a urgencias.", intensidad: 4, mostrarEnConsulta: true, incluirEnPack: false }
    ],
    indicaciones: [
      // Lucía
      { id: "i1", pacienteId: "lucia", titulo: "Tomar fiebre cada 4hs si supera 37.5°C", tipo: "temperatura", frecuencia: "cada 4hs", duracion: "3 días", horaInicio: "2026-04-28 08:00", medico: "Dra. Patricia Lozano", activa: true, incluirEnConsulta: true,
        registros: [
          { id: "r1", fecha: "2026-04-28T08:15:00", valor: 37.8, nota: "" },
          { id: "r2", fecha: "2026-04-28T12:30:00", valor: 38.2, nota: "Vómito una vez" },
          { id: "r3", fecha: "2026-04-29T10:00:00", valor: 38.4, nota: "" },
          { id: "r4", fecha: "2026-04-29T14:30:00", valor: 38.1, nota: "Le di ibuprofeno" },
          { id: "r5", fecha: "2026-04-30T09:00:00", valor: 37.3, nota: "Bajó la fiebre" }
        ]
      },
      { id: "i2", pacienteId: "lucia", titulo: "Observar manchas café con leche nuevas, fotografiar", tipo: "sintoma", frecuencia: "diaria", duracion: "indefinida", horaInicio: "2026-03-01 00:00", medico: "Dra. Patricia Lozano", activa: true, incluirEnConsulta: false,
        registros: [
          { id: "r6", fecha: "2026-04-30T20:00:00", valor: "sí", nota: "Mancha nueva brazo derecho ~5mm" },
          { id: "r7", fecha: "2026-04-25T20:00:00", valor: "no", nota: "" },
          { id: "r8", fecha: "2026-04-20T20:00:00", valor: "no", nota: "" }
        ]
      },
      { id: "i3", pacienteId: "lucia", titulo: "Antibiótico Amoxicilina cada 8hs por 7 días", tipo: "dosis", frecuencia: "cada 8hs", duracion: "7 días", horaInicio: "2026-04-10 08:00", medico: "Dra. Patricia Lozano", activa: false, incluirEnConsulta: false, registros: [] },
      // Mateo
      { id: "i4", pacienteId: "mateo", titulo: "2 puff Budesonide preventivo mañana y noche", tipo: "dosis", frecuencia: "cada 12hs", duracion: "indefinida", horaInicio: "2026-03-05 08:00", medico: "Dra. Claudia Torres", activa: true, incluirEnConsulta: true,
        registros: [
          { id: "r9", fecha: "2026-05-02T08:00:00", valor: "administrado", nota: "" },
          { id: "r10", fecha: "2026-05-02T20:00:00", valor: "administrado", nota: "" },
          { id: "r11", fecha: "2026-05-01T08:00:00", valor: "administrado", nota: "" },
          { id: "r12", fecha: "2026-05-01T20:00:00", valor: "administrado", nota: "" }
        ]
      },
      { id: "i5", pacienteId: "mateo", titulo: "Medir saturación de oxígeno si hay tos fuerte", tipo: "sintoma", frecuencia: "a demanda", duracion: "indefinida", horaInicio: "2026-03-05 00:00", medico: "Dra. Claudia Torres", activa: true, incluirEnConsulta: false,
        registros: [
          { id: "r13", fecha: "2026-04-22T21:00:00", valor: "sí", nota: "Sat 97%, OK" },
          { id: "r14", fecha: "2026-03-05T22:00:00", valor: "sí", nota: "Sat 95%, le di salbutamol" }
        ]
      }
    ],
    medicacion: [
      // Lucía
      { id: "med1", pacienteId: "lucia", droga: "Selumetinib", dosis: "25mg", frecuencia: "cada 12hs", horarios: ["08:00", "20:00"], fechaInicio: "2026-01-05", activa: true, historial: [] },
      { id: "med2", pacienteId: "lucia", droga: "Vitamina D", dosis: "1000UI 1 gota", frecuencia: "diaria", horarios: ["09:00"], fechaInicio: "2025-06-01", activa: true, historial: [] },
      // Mateo
      { id: "med3", pacienteId: "mateo", droga: "Budesonide", dosis: "100mcg 2 puff", frecuencia: "cada 12hs", horarios: ["08:00", "20:00"], fechaInicio: "2026-03-05", activa: true, historial: [] },
      { id: "med4", pacienteId: "mateo", droga: "Salbutamol (rescate)", dosis: "2 puff", frecuencia: "A demanda (máx c/4hs)", horarios: [], fechaInicio: "2025-11-01", activa: true, historial: [] }
    ],
    crecimiento: [
      // Lucía
      { id: "cr1", pacienteId: "lucia", fecha: "2023-03-12", peso: 18.5, talla: 112, notas: "" },
      { id: "cr2", pacienteId: "lucia", fecha: "2023-09-15", peso: 19.8, talla: 115, notas: "" },
      { id: "cr3", pacienteId: "lucia", fecha: "2024-03-10", peso: 20.5, talla: 119, notas: "Control anual" },
      { id: "cr4", pacienteId: "lucia", fecha: "2024-09-20", peso: 21.8, talla: 122, notas: "" },
      { id: "cr5", pacienteId: "lucia", fecha: "2025-03-12", peso: 23.1, talla: 126, notas: "Cumpleaños" },
      { id: "cr6", pacienteId: "lucia", fecha: "2025-09-10", peso: 24.2, talla: 129, notas: "" },
      { id: "cr7", pacienteId: "lucia", fecha: "2026-02-10", peso: 25.0, talla: 132, notas: "Última visita Garrahan" },
      // Mateo
      { id: "cr8", pacienteId: "mateo", fecha: "2022-07-22", peso: 11.2, talla: 80, notas: "1 año" },
      { id: "cr9", pacienteId: "mateo", fecha: "2023-01-15", peso: 12.5, talla: 85, notas: "" },
      { id: "cr10", pacienteId: "mateo", fecha: "2023-07-22", peso: 13.8, talla: 90, notas: "Cumpleaños 2 años" },
      { id: "cr11", pacienteId: "mateo", fecha: "2024-01-10", peso: 15.1, talla: 94, notas: "" },
      { id: "cr12", pacienteId: "mateo", fecha: "2024-07-22", peso: 16.4, talla: 99, notas: "3 años" },
      { id: "cr13", pacienteId: "mateo", fecha: "2025-01-20", peso: 17.8, talla: 103, notas: "" },
      { id: "cr14", pacienteId: "mateo", fecha: "2025-07-22", peso: 18.9, talla: 107, notas: "4 años" },
      { id: "cr15", pacienteId: "mateo", fecha: "2026-02-15", peso: 19.5, talla: 110, notas: "Última medición" }
    ],
    accesos: [
      { id: "a1", pacienteId: "lucia", nombre: "Dra. Patricia Lozano", tipo: "medico", scope: "Historial completo", vencimiento: "2026-05-30", ultimoUso: "2026-02-12" },
      { id: "a2", pacienteId: "lucia", nombre: "Maestra Sala Amarilla", tipo: "escuela", scope: "Datos de emergencia + alergias", vencimiento: "2026-12-31", ultimoUso: null },
      { id: "a3", pacienteId: "mateo", nombre: "Dra. Claudia Torres", tipo: "medico", scope: "Historial completo", vencimiento: "2026-06-01", ultimoUso: "2026-03-06" }
    ],
    vacunas: [
      // ── LUCÍA (8 años, NF1) ──
      { id: "v1", pacienteId: "lucia", nombre: "BCG", descripcion: "Previene tuberculosis grave. Dosis única al nacer.", dosis: "Dosis única", edadCorresponde: "Al nacer", fechaAplicacion: "2018-03-12", status: "aplicada", importante: false },
      { id: "v2", pacienteId: "lucia", nombre: "Hepatitis B", descripcion: "Protege contra la hepatitis B. Se administra en 3 dosis.", dosis: "3 dosis completas", edadCorresponde: "Nacer, 2 y 6 meses", fechaAplicacion: "2018-09-12", status: "aplicada", importante: false },
      { id: "v3", pacienteId: "lucia", nombre: "Pentavalente (DTP+Hib+HepB)", descripcion: "Protege contra difteria, tétanos, tos convulsa, Hib y hepatitis B.", dosis: "3 dosis + refuerzo", edadCorresponde: "2, 4, 6 y 18 meses", fechaAplicacion: "2019-09-12", status: "aplicada", importante: false },
      { id: "v4", pacienteId: "lucia", nombre: "Polio (IPV/OPV)", descripcion: "Previene la poliomielitis. Se aplica oral e inyectable.", dosis: "3 dosis + refuerzo", edadCorresponde: "2, 4, 6 y 18 meses", fechaAplicacion: "2019-09-12", status: "aplicada", importante: false },
      { id: "v5", pacienteId: "lucia", nombre: "Rotavirus", descripcion: "Previene diarrea grave por rotavirus.", dosis: "2 dosis completas", edadCorresponde: "2 y 4 meses", fechaAplicacion: "2018-07-12", status: "aplicada", importante: false },
      { id: "v6", pacienteId: "lucia", nombre: "Neumococo (PCV13)", descripcion: "Previene neumonía, meningitis y otitis por neumococo.", dosis: "3 dosis completas", edadCorresponde: "2, 4 y 12 meses", fechaAplicacion: "2019-03-12", status: "aplicada", importante: false },
      { id: "v7", pacienteId: "lucia", nombre: "Meningococo C", descripcion: "Previene meningitis y sepsis meningocóccica.", dosis: "3 dosis completas", edadCorresponde: "3, 5 y 15 meses", fechaAplicacion: "2019-06-12", status: "aplicada", importante: false },
      { id: "v8", pacienteId: "lucia", nombre: "Triple Viral (SRP)", descripcion: "Protege contra sarampión, rubeola y paperas.", dosis: "2 dosis completas", edadCorresponde: "12 meses y 5-6 años", fechaAplicacion: "2024-03-12", status: "aplicada", importante: false },
      { id: "v9", pacienteId: "lucia", nombre: "Varicela", descripcion: "Previene la varicela y sus complicaciones.", dosis: "2 dosis completas", edadCorresponde: "15 meses y 5-6 años", fechaAplicacion: "2024-03-12", status: "aplicada", importante: false },
      { id: "v10", pacienteId: "lucia", nombre: "Hepatitis A", descripcion: "Protege contra la hepatitis A.", dosis: "Dosis única", edadCorresponde: "12 meses", fechaAplicacion: "2019-03-12", status: "aplicada", importante: false },
      { id: "v11", pacienteId: "lucia", nombre: "Antigripal", descripcion: "Vacuna estacional contra la gripe. Se renueva cada año antes del invierno.", dosis: "Anual", edadCorresponde: "Cada año (mayo-junio)", fechaAplicacion: null, status: "pendiente", importante: true, nota: "Recomendada especialmente en pacientes con enfermedades crónicas como NF1. Consultá con la Dra. Lozano antes de aplicarla." },
      { id: "v12", pacienteId: "lucia", nombre: "Triple bacteriana (dTpa)", descripcion: "Refuerzo contra difteria, tétanos y tos convulsa. A los 11 años.", dosis: "Dosis única", edadCorresponde: "11 años", fechaAplicacion: null, status: "futura" },
      { id: "v13", pacienteId: "lucia", nombre: "HPV (Virus Papiloma Humano)", descripcion: "Previene el cáncer de cuello de útero y otras enfermedades por HPV.", dosis: "2 dosis", edadCorresponde: "11 años", fechaAplicacion: null, status: "futura" },

      // ── MATEO (4 años, Asma) ──
      { id: "v14", pacienteId: "mateo", nombre: "BCG", descripcion: "Previene tuberculosis grave. Dosis única al nacer.", dosis: "Dosis única", edadCorresponde: "Al nacer", fechaAplicacion: "2021-07-22", status: "aplicada", importante: false },
      { id: "v15", pacienteId: "mateo", nombre: "Hepatitis B", descripcion: "Protege contra la hepatitis B. Se administra en 3 dosis.", dosis: "3 dosis completas", edadCorresponde: "Nacer, 2 y 6 meses", fechaAplicacion: "2022-01-22", status: "aplicada", importante: false },
      { id: "v16", pacienteId: "mateo", nombre: "Pentavalente (DTP+Hib+HepB)", descripcion: "Protege contra difteria, tétanos, tos convulsa, Hib y hepatitis B.", dosis: "3 dosis + refuerzo", edadCorresponde: "2, 4, 6 y 18 meses", fechaAplicacion: "2023-01-22", status: "aplicada", importante: false },
      { id: "v17", pacienteId: "mateo", nombre: "Polio (IPV/OPV)", descripcion: "Previene la poliomielitis.", dosis: "3 dosis + refuerzo", edadCorresponde: "2, 4, 6 y 18 meses", fechaAplicacion: "2023-01-22", status: "aplicada", importante: false },
      { id: "v18", pacienteId: "mateo", nombre: "Rotavirus", descripcion: "Previene diarrea grave por rotavirus.", dosis: "2 dosis completas", edadCorresponde: "2 y 4 meses", fechaAplicacion: "2021-11-22", status: "aplicada", importante: false },
      { id: "v19", pacienteId: "mateo", nombre: "Neumococo (PCV13)", descripcion: "Previene neumonía, meningitis y otitis por neumococo.", dosis: "3 dosis completas", edadCorresponde: "2, 4 y 12 meses", fechaAplicacion: "2022-07-22", status: "aplicada", importante: false },
      { id: "v20", pacienteId: "mateo", nombre: "Meningococo C", descripcion: "Previene meningitis y sepsis meningocóccica.", dosis: "3 dosis completas", edadCorresponde: "3, 5 y 15 meses", fechaAplicacion: "2022-10-22", status: "aplicada", importante: false },
      { id: "v21", pacienteId: "mateo", nombre: "Triple Viral (SRP)", descripcion: "Protege contra sarampión, rubeola y paperas. La 2da dosis corresponde a los 5-6 años.", dosis: "1ra dosis aplicada — 2da pendiente", edadCorresponde: "1ra: 12 meses ✓ · 2da: 5-6 años", fechaAplicacion: "2022-07-22", status: "proxima", importante: false, nota: "La 1ra dosis fue aplicada en 2022. La 2da dosis corresponde cuando Mateo cumpla 5 años (julio 2026)." },
      { id: "v22", pacienteId: "mateo", nombre: "Varicela", descripcion: "Previene la varicela y sus complicaciones. La 2da dosis corresponde a los 5-6 años.", dosis: "1ra dosis aplicada — 2da pendiente", edadCorresponde: "1ra: 15 meses ✓ · 2da: 5-6 años", fechaAplicacion: "2022-10-22", status: "proxima", importante: false, nota: "La 2da dosis se aplica a los 5-6 años. Mateo cumple 5 en julio 2026." },
      { id: "v23", pacienteId: "mateo", nombre: "Hepatitis A", descripcion: "Protege contra la hepatitis A.", dosis: "Dosis única", edadCorresponde: "12 meses", fechaAplicacion: "2022-07-22", status: "aplicada", importante: false },
      { id: "v24", pacienteId: "mateo", nombre: "Antigripal", descripcion: "Vacuna estacional contra la gripe. Especialmente importante en pacientes asmáticos.", dosis: "Anual", edadCorresponde: "Cada año (mayo-junio)", fechaAplicacion: null, status: "pendiente", importante: true, nota: "URGENTE: La Dra. Torres indicó en la última consulta que Mateo necesita la antigripal antes del invierno por su diagnóstico de asma." },
      { id: "v25", pacienteId: "mateo", nombre: "Triple bacteriana (dTpa)", descripcion: "Refuerzo contra difteria, tétanos y tos convulsa.", dosis: "Dosis única", edadCorresponde: "11 años", fechaAplicacion: null, status: "futura" },
      { id: "v26", pacienteId: "mateo", nombre: "HPV (Virus Papiloma Humano)", descripcion: "Previene cánceres relacionados al HPV.", dosis: "2 dosis", edadCorresponde: "11 años", fechaAplicacion: null, status: "futura" }
    ]
  };

  saveData('data', seedData);
  saveData('pacienteActivo', 'lucia');
  saveData('seedVersion', SEED_VERSION);
}
