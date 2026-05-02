import { saveData, loadData } from './store';
import { format, subDays } from 'date-fns';

export function initializeSeedData() {
  const isInitialized = loadData('initialized', false);
  if (isInitialized) return;

  const hoy = new Date();
  const hoyStr = format(hoy, "yyyy-MM-dd'T'HH:mm");

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
        diagnostico: "",
        alergias: []
      }
    ],
    turnos: [
      { id: "t1", pacienteId: "lucia", fecha: "2026-05-18", hora: "10:00", tipo: "medico", especialista: "Dra. Patricia Lozano", especialidad: "Neurología infantil", lugar: "Hospital Garrahan", motivo: "Control trimestral", estado: "pendiente", preguntas: ["¿Aumento la dosis?", "¿Es normal el dolor de cabeza?"], esRecurrente: false },
      { id: "t2", pacienteId: "lucia", fecha: "2026-06-02", hora: "14:30", tipo: "medico", especialista: "Dr. Martín Vargas", especialidad: "Oftalmología", lugar: "Consultorio privado", motivo: "Fondo de ojo anual", estado: "pendiente", preguntas: [], esRecurrente: false },
      { id: "t3", pacienteId: "lucia", fecha: "cada-martes", hora: "16:00", tipo: "terapia", especialista: "Lic. Ana Pérez", especialidad: "Fisioterapia", lugar: "", motivo: "", estado: "recurrente", preguntas: [], esRecurrente: true, frecuencia: "semanal", dia: "martes" },
      { id: "t4", pacienteId: "lucia", fecha: "2026-02-10", hora: "10:00", tipo: "medico", especialista: "Dra. Patricia Lozano", especialidad: "Neurología infantil", lugar: "Hospital Garrahan", motivo: "Resonancia de control", estado: "realizado", ficha: { queDijo: "Estable. Continuar con dosis. Fondo de ojo en junio. Sin nuevos neurofibromas.", queTengoQueHacer: "Fondo de ojo en junio.", proximosPasos: "Turno oftalmología junio." } },
      { id: "t5", pacienteId: "lucia", fecha: "2026-01-15", hora: "09:00", tipo: "medico", especialista: "Dr. Pediatra", especialidad: "Pediatría", lugar: "Consultorio", motivo: "Control general", estado: "realizado", ficha: null }
    ],
    estudios: [
      { id: "e1", pacienteId: "lucia", titulo: "Resonancia de cerebro y columna", fecha: "2026-02-10", tipo: "Estudio", nota: "", mostrarEnConsulta: false, incluirEnPack: true },
      { id: "e2", pacienteId: "lucia", titulo: "Receta Selumetinib mes 4", fecha: "2026-04-05", tipo: "Receta", nota: "", mostrarEnConsulta: true, incluirEnPack: true },
      { id: "e3", pacienteId: "lucia", titulo: "Informe oftalmológico", fecha: "2026-03-03", tipo: "Informe", nota: "", mostrarEnConsulta: false, incluirEnPack: false }
    ],
    contactos: [
      { id: "c1", nombre: "Dra. Patricia Lozano", especialidad: "Neurología infantil", esDeCabecera: true, mail: "patricia.lozano@garrahan.gob.ar", telefono: "011-4308-4300" },
      { id: "c2", nombre: "Dr. Martín Vargas", especialidad: "Oftalmología", esDeCabecera: false, mail: "", telefono: "" },
      { id: "c3", nombre: "Lic. Sofía Méndez", especialidad: "Psicopedagoga", esDeCabecera: false, mail: "", telefono: "" },
      { id: "c4", nombre: "Lic. Ana Pérez", especialidad: "Fisioterapeuta", esDeCabecera: false, mail: "", telefono: "" }
    ],
    diario: [
      { id: "d1", pacienteId: "lucia", fecha: format(hoy, 'yyyy-MM-dd'), titulo: "Náuseas leves", descripcion: "Náuseas leves después de la dosis de la mañana, se le pasaron en una hora.", intensidad: 2, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d2", pacienteId: "lucia", fecha: format(subDays(hoy, 3), 'yyyy-MM-dd'), titulo: "Dolor de cabeza fuerte", descripcion: "Dolor de cabeza fuerte a la tarde, le di paracetamol. Volvió a la escuela al día siguiente.", intensidad: 4, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d3", pacienteId: "lucia", fecha: format(subDays(hoy, 7), 'yyyy-MM-dd'), titulo: "Hito: leyó un libro sola", descripcion: "Empezó a leer sola un libro entero. Muy contenta.", intensidad: null, mostrarEnConsulta: false, incluirEnPack: false },
      { id: "d4", pacienteId: "lucia", fecha: format(subDays(hoy, 14), 'yyyy-MM-dd'), titulo: "Mancha café con leche nueva", descripcion: "Mancha café con leche nueva en el brazo derecho. Foto adjunta para mostrar a la Dra.", intensidad: 3, mostrarEnConsulta: true, incluirEnPack: false }
    ],
    indicaciones: [
      { id: "i1", pacienteId: "lucia", titulo: "Tomar fiebre cada 4hs si supera 37.5°C", tipo: "temperatura", frecuencia: "cada 4hs", duracion: "3 días", horaInicio: "2026-04-28 08:00", medico: "Dra. Patricia Lozano", activa: true, incluirEnConsulta: true,
        registros: [
          { id: "r1", fecha: "2026-04-28 08:15", valor: 37.8, nota: "" },
          { id: "r2", fecha: "2026-04-28 12:30", valor: 38.2, nota: "Vómito una vez" },
          { id: "r3", fecha: "2026-04-29 10:00", valor: 38.4, nota: "" },
          { id: "r4", fecha: "2026-04-29 14:30", valor: 38.1, nota: "Le di ibuprofeno" },
          { id: "r5", fecha: "2026-04-30 09:00", valor: 37.3, nota: "Bajó la fiebre" }
        ]
      },
      { id: "i2", pacienteId: "lucia", titulo: "Observar manchas café con leche nuevas, fotografiar", tipo: "sintoma", frecuencia: "diaria", duracion: "indefinida", horaInicio: "2026-03-01 00:00", medico: "Dra. Patricia Lozano", activa: true, incluirEnConsulta: false,
        registros: [
          { id: "r6", fecha: "2026-04-30 20:00", valor: "sí", nota: "Mancha nueva brazo derecho" },
          { id: "r7", fecha: "2026-04-25 20:00", valor: "no", nota: "" }
        ]
      },
      { id: "i3", pacienteId: "lucia", titulo: "Antibiótico cada 8hs por 7 días", tipo: "dosis", frecuencia: "cada 8hs", duracion: "7 días", horaInicio: "2026-04-10 08:00", medico: "Dra. Patricia Lozano", activa: false, incluirEnConsulta: false,
        registros: []
      }
    ],
    medicacion: [
      { id: "med1", pacienteId: "lucia", droga: "Selumetinib", dosis: "25mg", frecuencia: "cada 12hs", horarios: ["08:00", "20:00"], fechaInicio: "2026-01-05", activa: true, historial: [] },
      { id: "med2", pacienteId: "lucia", droga: "Vitamina D", dosis: "1000UI 1 gota", frecuencia: "diaria", horarios: ["09:00"], fechaInicio: "2025-06-01", activa: true, historial: [] }
    ],
    crecimiento: [
      { id: "cr1", pacienteId: "lucia", fecha: "2023-03-12", peso: 18.5, talla: 112, notas: "" },
      { id: "cr2", pacienteId: "lucia", fecha: "2023-09-15", peso: 19.8, talla: 115, notas: "" },
      { id: "cr3", pacienteId: "lucia", fecha: "2024-03-10", peso: 20.5, talla: 119, notas: "Control anual" },
      { id: "cr4", pacienteId: "lucia", fecha: "2024-09-20", peso: 21.8, talla: 122, notas: "" },
      { id: "cr5", pacienteId: "lucia", fecha: "2025-03-12", peso: 23.1, talla: 126, notas: "Cumpleaños" },
      { id: "cr6", pacienteId: "lucia", fecha: "2025-09-10", peso: 24.2, talla: 129, notas: "" },
      { id: "cr7", pacienteId: "lucia", fecha: "2026-02-10", peso: 25.0, talla: 132, notas: "Última visita Garrahan" },
      { id: "cr8", pacienteId: "mateo", fecha: "2023-07-22", peso: 12.5, talla: 85, notas: "" },
      { id: "cr9", pacienteId: "mateo", fecha: "2024-01-15", peso: 14.2, talla: 90, notas: "" },
      { id: "cr10", pacienteId: "mateo", fecha: "2024-07-22", peso: 15.8, talla: 95, notas: "Cumpleaños" },
      { id: "cr11", pacienteId: "mateo", fecha: "2025-01-10", peso: 17.0, talla: 99, notas: "" },
      { id: "cr12", pacienteId: "mateo", fecha: "2025-07-22", peso: 18.3, talla: 103, notas: "" }
    ],
    accesos: [
      { id: "a1", pacienteId: "lucia", nombre: "Dra. Patricia Lozano", tipo: "medico", scope: "Historial completo", vencimiento: "2026-05-30", ultimoUso: "2026-02-12" },
      { id: "a2", pacienteId: "lucia", nombre: "Maestra de Lucía (QR escolar)", tipo: "escuela", scope: "Datos de emergencia", vencimiento: "2026-12-31", ultimoUso: null }
    ]
  };

  saveData('data', seedData);
  saveData('pacienteActivo', 'lucia');
  saveData('initialized', true);
}
