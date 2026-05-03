import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { FileText, Plus, Image as ImageIcon, Download, Star, X, Upload, ChevronRight, Check } from 'lucide-react';

const TIPO_COLOR: Record<string, string> = {
  Estudio: '#7A87C2',
  Receta: '#EF8090',
  Informe: '#5DB3C1',
  Otro: '#D4D4D4',
};

function DocDetalle({ doc, onClose, onToggleConsulta }: { doc: any; onClose: () => void; onToggleConsulta: (id: string) => void }) {
  const color = TIPO_COLOR[doc.tipo] || '#D4D4D4';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom">
        <div className="flex items-start justify-between p-5 border-b border-[#D4D4D4]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: `${color}15` }}>
              {doc.tipo === 'Receta' ? <FileText size={24} style={{ color }} /> : <ImageIcon size={24} style={{ color }} />}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{doc.tipo}</span>
              <h2 className="font-bold text-[#28325A] text-base leading-snug">{doc.titulo}</h2>
            </div>
          </div>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Preview placeholder */}
          <div className="bg-[#F4F4F4] rounded-2xl h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-[#D4D4D4] text-[#7A87C2]">
            {doc.tipo === 'Receta' ? <FileText size={40} className="mb-2 opacity-40" /> : <ImageIcon size={40} className="mb-2 opacity-40" />}
            <p className="text-sm font-medium">Vista previa no disponible</p>
            <p className="text-xs mt-1">Tocá Descargar para verlo</p>
          </div>

          {/* Metadata */}
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-[#F4F4F4] text-sm">
              <span className="text-[#7A87C2] font-medium">Fecha</span>
              <span className="font-bold text-[#28325A]">{new Date(doc.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F4F4F4] text-sm">
              <span className="text-[#7A87C2] font-medium">Tipo</span>
              <span className="font-bold" style={{ color }}>{doc.tipo}</span>
            </div>
            {doc.nota && (
              <div className="flex justify-between py-2 border-b border-[#F4F4F4] text-sm">
                <span className="text-[#7A87C2] font-medium">Nota</span>
                <span className="font-medium text-[#28325A] text-right max-w-[60%]">{doc.nota}</span>
              </div>
            )}
          </div>

          {/* Incluir en pack */}
          <div className="bg-[#F4F4F4] p-4 rounded-2xl text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#28325A]">Incluir en Pack imprimible</p>
                <p className="text-xs text-[#7A87C2] mt-0.5">Se incluirá al generar el PDF</p>
              </div>
              <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${doc.incluirEnPack ? 'bg-[#A9D5B6]' : 'bg-[#D4D4D4]'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mx-0.5 ${doc.incluirEnPack ? 'translate-x-6' : ''}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-[#D4D4D4] space-y-3">
          <button
            onClick={() => onToggleConsulta(doc.id)}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
              doc.mostrarEnConsulta
                ? 'bg-[#EF8090]/10 text-[#EF8090] border-2 border-[#EF8090]'
                : 'bg-[#EF8090] text-white'
            }`}
          >
            {doc.mostrarEnConsulta ? (
              <><Check size={18} /> Marcado para la próxima consulta</>
            ) : (
              <><Star size={18} /> Sumar a la próxima consulta</>
            )}
          </button>
          <button className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-[#F4F4F4] text-[#28325A]">
            <Download size={18} /> Descargar documento
          </button>
        </div>
      </div>
    </div>
  );
}

function SubirDocModal({ onClose }: { onClose: () => void }) {
  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#28325A]">Subir documento</h2>
          <button onClick={onClose}><X size={22} className="text-[#7A87C2]" /></button>
        </div>

        {/* Upload area */}
        <div className="bg-[#F4F4F4] border-2 border-dashed border-[#D4D4D4] rounded-2xl p-8 flex flex-col items-center text-center mb-5">
          <Upload size={36} className="text-[#7A87C2] mb-3" />
          <p className="font-bold text-[#28325A]">Tocar para seleccionar archivo</p>
          <p className="text-xs text-[#7A87C2] mt-1">PDF, JPG, PNG · Máx. 10MB</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-2">Tipo de documento</label>
            <div className="grid grid-cols-2 gap-2">
              {['Estudio', 'Receta', 'Informe', 'Otro'].map(t => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`py-3 rounded-xl font-bold text-sm border-2 transition ${tipo === t ? 'border-[#28325A] bg-[#28325A] text-white' : 'border-[#D4D4D4] text-[#28325A]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#7A87C2] uppercase tracking-wider mb-1">Nombre / título</label>
            <input
              type="text"
              placeholder="Ej: Resonancia cerebro - febrero 2026"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              className="w-full p-4 border-2 border-[#D4D4D4] rounded-2xl text-[#28325A] outline-none focus:border-[#28325A]"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button onClick={onClose} className="w-full bg-[#28325A] text-white py-4 rounded-2xl font-bold text-lg">
            Guardar documento
          </button>
          <button onClick={onClose} className="w-full text-[#7A87C2] py-3 font-semibold">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default function Documentos() {
  const { pacienteData, data, updateData, pacienteActivo } = useAppContext();
  const [filtro, setFiltro] = useState('Todos');
  const [selected, setSelected] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const estudios = pacienteData.estudios || [];
  const filtros = ['Todos', 'Estudios', 'Recetas', 'Informes'];

  const displayed = filtro === 'Todos'
    ? estudios
    : estudios.filter((e: any) => {
        if (filtro === 'Estudios') return e.tipo === 'Estudio';
        if (filtro === 'Recetas') return e.tipo === 'Receta';
        if (filtro === 'Informes') return e.tipo === 'Informe';
        return true;
      });

  const toggleConsulta = (id: string) => {
    const newEstudios = (data.estudios || []).map((e: any) =>
      e.id === id ? { ...e, mostrarEnConsulta: !e.mostrarEnConsulta } : e
    );
    updateData({ ...data, estudios: newEstudios });
    // Update selected if open
    if (selected?.id === id) {
      setSelected((prev: any) => ({ ...prev, mostrarEnConsulta: !prev.mostrarEnConsulta }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-[#D4D4D4] bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#28325A]">Documentos y Estudios</h1>
        <p className="text-sm text-[#7A87C2] mt-0.5">{estudios.length} documento{estudios.length !== 1 ? 's' : ''} guardado{estudios.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="px-4 py-3 flex gap-2 border-b border-[#D4D4D4] overflow-x-auto">
        {filtros.map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold shrink-0 transition ${filtro === f ? 'bg-[#28325A] text-white' : 'bg-[#F4F4F4] text-[#7A87C2]'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {displayed.length === 0 ? (
          <div className="text-center p-10 text-[#7A87C2]">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No hay documentos en esta categoría.</p>
          </div>
        ) : displayed.map((doc: any) => {
          const color = TIPO_COLOR[doc.tipo] || '#D4D4D4';
          return (
            <button
              key={doc.id}
              onClick={() => setSelected(doc)}
              className="w-full text-left flex gap-4 p-4 border border-[#D4D4D4] rounded-2xl bg-white shadow-sm hover:border-[#28325A] hover:shadow-md transition"
            >
              <div className="p-3 rounded-xl h-fit shrink-0" style={{ backgroundColor: `${color}18` }}>
                {doc.tipo === 'Receta' ? <FileText size={22} style={{ color }} /> : <ImageIcon size={22} style={{ color }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span
                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md mb-1 block w-fit"
                    style={{ color, backgroundColor: `${color}18` }}
                  >
                    {doc.tipo}
                  </span>
                  <span className="text-xs text-[#7A87C2] font-semibold shrink-0 ml-2">{new Date(doc.fecha).toLocaleDateString('es-AR')}</span>
                </div>
                <h3 className="font-bold text-[#28325A] leading-tight text-sm">{doc.titulo}</h3>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {doc.mostrarEnConsulta && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#EF8090] bg-[#EF8090]/10 px-2 py-0.5 rounded-md">
                      <Star size={10} fill="currentColor" /> Para consulta
                    </span>
                  )}
                  {doc.incluirEnPack && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F6C95A] bg-[#F6C95A]/20 px-2 py-0.5 rounded-md">
                      En pack
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight size={18} className="text-[#D4D4D4] shrink-0 self-center" />
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-[90px] right-4 w-14 h-14 bg-[#28325A] text-white rounded-full flex items-center justify-center shadow-xl z-20"
      >
        <Plus size={30} />
      </button>

      {selected && (
        <DocDetalle
          doc={selected}
          onClose={() => setSelected(null)}
          onToggleConsulta={toggleConsulta}
        />
      )}
      {showForm && <SubirDocModal onClose={() => setShowForm(false)} />}
    </div>
  );
}
