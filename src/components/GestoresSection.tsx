import React, { useState } from 'react';
import { Film, Link2, Pencil } from 'lucide-react';
import { useMuseumMedia } from '../context/MuseumMediaContext';
import { GESTORES_ITEMS, GestorItem } from '../data/museumData';
import { MuseumAudioPlayer } from './MuseumAudioPlayer';

function toEmbedUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes('youtube.com') && url.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${url.searchParams.get('v')}`;
    }
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.hostname.includes('vimeo.com')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

const GestorCard: React.FC<{ gestor: GestorItem }> = ({ gestor }) => {
  const [videoInput, setVideoInput] = useState('');
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [urlError, setUrlError] = useState('');
  const [activeSegment, setActiveSegment] = useState(0);
  const { overrides, openImageEditor } = useMuseumMedia();

  const override = overrides[gestor.id];
  const photoSrc = override?.src || gestor.photoImageSrc;
  const photoCredit = override?.credit ?? gestor.photoCredit;
  const imgPosition =
    !override?.src && gestor.photoObjectPosition ? gestor.photoObjectPosition : 'object-center';

  const handleLoadVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = toEmbedUrl(videoInput);
    if (!parsed) {
      setUrlError('Ingresa un enlace válido de YouTube o Vimeo.');
      return;
    }
    setUrlError('');
    setEmbedUrl(parsed);
  };

  return (
    <article className="border border-[#E5DCDC] bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Audiovisual */}
        <div className="lg:col-span-7">
          {embedUrl ? (
            <div className="relative w-full aspect-video bg-black border border-[#E5DCDC]">
              <iframe
                src={embedUrl}
                title={`Testimonio de ${gestor.name}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : photoSrc ? (
            <figure>
              <div className="relative w-full aspect-video bg-[#1A1315] border border-[#E5DCDC] overflow-hidden">
                <img
                  src={photoSrc}
                  alt={gestor.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${imgPosition}`}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() =>
                    openImageEditor({
                      targetId: gestor.id,
                      title: gestor.name,
                      defaultCaption: '',
                      defaultCredit: gestor.photoCredit ?? gestor.organization,
                      allowCaptionEdit: false,
                    })
                  }
                  aria-label={`Editar fotografía de ${gestor.name}`}
                  className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/95 border border-[#E5DCDC] text-[#1A1415] hover:bg-[#721422] hover:text-white hover:border-[#721422] text-[11px] font-medium transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Editar foto</span>
                </button>

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#F0C2C9] block">
                      {gestor.accession} · Registro Documental
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-semibold">{gestor.name}</p>
                  </div>
                  <span className="font-mono text-[10px] text-white/80 hidden sm:inline">
                    Bloque {gestor.transcript[activeSegment]?.time}
                  </span>
                </div>
              </div>
              {photoCredit && (
                <figcaption className="mt-1.5 text-[11.5px] font-serif italic text-[#594D4F]">
                  {photoCredit}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className="relative w-full aspect-video bg-[#1A1315] text-white border border-[#E5DCDC] p-6 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/75">
                <span className="uppercase tracking-widest text-[#F0C2C9]">
                  {gestor.accession} · Registro Audiovisual
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openImageEditor({
                      targetId: gestor.id,
                      title: gestor.name,
                      defaultCaption: '',
                      defaultCredit: gestor.organization,
                      allowCaptionEdit: false,
                    })
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-[#721422] text-white border border-white/25 text-[11px] transition-colors cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Agregar foto</span>
                </button>
              </div>

              <div className="my-auto max-w-lg">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F0C2C9] mb-2">
                  <Film className="w-4 h-4" />
                  <span>Testimonio Oral y Memoria Comunitaria</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                  {gestor.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
                  {gestor.videoPlaceholderNote}
                </p>
              </div>

              <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] font-mono text-white/70">
                <span>Bloque activo: {gestor.transcript[activeSegment]?.time}</span>
                <span className="truncate ml-4">{gestor.organization}</span>
              </div>
            </div>
          )}

          {/* Reproductor de audio testimonial + índice de guion */}
          <div className="mt-4">
            <MuseumAudioPlayer
              id={`gestor-audio-${gestor.id}`}
              label={`Audio testimonial — ${gestor.name}`}
              audioSrc={`/audio/${gestor.id}.mp3`}
              motif={gestor.motif}
              durationSec={52}
            />
          </div>

          {/* Enlace rápido para insertar video real en VS Code o navegador */}
          <form onSubmit={handleLoadVideo} className="mt-3 flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <Link2 className="w-3.5 h-3.5 text-[#594D4F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                placeholder="Pegar enlace de YouTube o Vimeo para previsualizar el video..."
                aria-label={`Enlace de video para ${gestor.name}`}
                className="w-full pl-8 pr-3 py-2 text-xs border border-[#E5DCDC] bg-[#FAF8F8] text-[#1A1415] focus:outline-none focus:border-[#721422]"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 text-xs font-semibold bg-[#721422] text-white hover:bg-[#540D18] transition-colors cursor-pointer whitespace-nowrap"
            >
              Cargar video
            </button>
            {embedUrl && (
              <button
                type="button"
                onClick={() => setEmbedUrl(null)}
                className="px-3 py-2 text-xs font-medium border border-[#E5DCDC] text-[#594D4F] hover:text-[#721422] cursor-pointer"
              >
                Restaurar ficha
              </button>
            )}
          </form>
          {urlError && <p className="text-xs text-[#721422] mt-1.5">{urlError}</p>}
        </div>

        {/* Columna Editorial y Transcripción */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
              {gestor.organization}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1415] mt-1">
              {gestor.name}
            </h2>
            <p className="text-sm font-medium text-[#594D4F] mt-1 mb-4">{gestor.role}</p>
            <p className="text-sm text-[#2B2325] leading-relaxed mb-6">{gestor.summary}</p>

            <blockquote className="py-4 border-y border-[#E5DCDC] font-serif italic text-base text-[#1A1415] leading-relaxed mb-6">
              {gestor.quote}
            </blockquote>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#594D4F] mb-3">
              Índice del Testimonio
            </h3>
            <ul className="divide-y divide-[#EAE3E3] border-y border-[#EAE3E3]">
              {gestor.transcript.map((seg, idx) => (
                <li key={seg.time}>
                  <button
                    type="button"
                    onClick={() => setActiveSegment(idx)}
                    className={`w-full text-left py-2.5 px-2 flex items-start gap-3 text-xs transition-colors cursor-pointer ${
                      activeSegment === idx
                        ? 'bg-[#FAF3F4] text-[#721422]'
                        : 'text-[#594D4F] hover:bg-[#FAF8F8]'
                    }`}
                  >
                    <span className="font-mono tabular-nums font-semibold shrink-0">{seg.time}</span>
                    <span className="leading-relaxed">{seg.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export const GestoresSection: React.FC = () => {
  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="border-b border-[#E5DCDC] pb-6 mb-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
          Memoria Oral y Gestión Comunitaria
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1415] mt-2 [text-wrap:balance]">
          Gestores culturales
        </h1>
        <p className="text-sm sm:text-base text-[#594D4F] mt-2 max-w-3xl leading-relaxed">
          Testimonios audiovisuales de quienes sostienen, organizan y gestionan los procesos del
          rock y el metal en San Cristóbal Sur.
        </p>
      </div>

      <div className="space-y-8">
        {GESTORES_ITEMS.map((gestor) => (
          <GestorCard key={gestor.id} gestor={gestor} />
        ))}
      </div>
    </section>
  );
};
