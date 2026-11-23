import React, { useEffect, useState } from 'react';
import { ImagePlus, Maximize2, Pencil, Trash2, X } from 'lucide-react';
import { CustomGraphicItem, useMuseumMedia } from '../context/MuseumMediaContext';
import {
  GRAPHIC_ARCHIVES,
  GraphicArchiveItem,
  SOUND_ARCHIVES,
} from '../data/museumData';
import { ArchivalPosterArt } from './MuseumArtwork';
import { MuseumAudioPlayer } from './MuseumAudioPlayer';

interface ArchivesSectionProps {
  activeTab: 'graficos' | 'sonoros';
  onTabChange: (tab: 'graficos' | 'sonoros') => void;
}

type ArchiveEntry = GraphicArchiveItem | CustomGraphicItem;

export const ArchivesSection: React.FC<ArchivesSectionProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [selectedPiece, setSelectedPiece] = useState<ArchiveEntry | null>(null);
  const { overrides, customArchives, openImageEditor, openAddArchive, removeCustomArchive } =
    useMuseumMedia();

  const allGraphics: ArchiveEntry[] = [...customArchives, ...GRAPHIC_ARCHIVES];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPiece(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const getDisplayImage = (item: ArchiveEntry): string => {
    const override = overrides[item.id];
    if (override?.src) return override.src;
    if ('imageSrc' in item && item.imageSrc) return item.imageSrc;
    if ('customImageSrc' in item && item.customImageSrc) return item.customImageSrc;
    return '';
  };

  const getImagePosition = (item: ArchiveEntry): string => {
    if (overrides[item.id]?.src) return 'object-center';
    if ('imageObjectPosition' in item && item.imageObjectPosition) {
      return item.imageObjectPosition;
    }
    return 'object-center';
  };

  const getDisplayCredit = (item: ArchiveEntry): string => {
    return overrides[item.id]?.credit ?? item.credit;
  };

  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="border-b border-[#E5DCDC] pb-6 mb-8">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
          Colección Documental del Territorio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1415] mt-2 [text-wrap:balance]">
          Archivos gráficos y sonoros
        </h1>
        <p className="text-sm sm:text-base text-[#594D4F] mt-2 max-w-3xl leading-relaxed">
          Explora las piezas visuales de eventos y procesos comunitarios, agrega nuevas fotografías
          o edita las imágenes existentes junto con los créditos en el pie de cada imagen.
        </p>
      </div>

      {/* Pestañas segmentadas + botón agregar imagen */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DCDC] pb-4 mb-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onTabChange('graficos')}
            className={`px-5 py-2.5 text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'graficos'
                ? 'bg-[#721422] text-white border-[#721422]'
                : 'bg-white text-[#594D4F] border-[#E5DCDC] hover:border-[#721422] hover:text-[#721422]'
            }`}
          >
            Archivos Gráficos ({allGraphics.length})
          </button>

          <button
            type="button"
            onClick={() => onTabChange('sonoros')}
            className={`px-5 py-2.5 text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'sonoros'
                ? 'bg-[#721422] text-white border-[#721422]'
                : 'bg-white text-[#594D4F] border-[#E5DCDC] hover:border-[#721422] hover:text-[#721422]'
            }`}
          >
            Archivos Sonoros ({SOUND_ARCHIVES.length})
          </button>
        </div>

        {activeTab === 'graficos' && (
          <button
            type="button"
            onClick={openAddArchive}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#721422] hover:bg-[#540D18] text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ImagePlus className="w-4 h-4" />
            Agregar imagen al archivo
          </button>
        )}
      </div>

      {/* PANEL 1: ARCHIVOS GRÁFICOS */}
      {activeTab === 'graficos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGraphics.map((item) => {
            const imgSrc = getDisplayImage(item);
            const photoCredit = getDisplayCredit(item);
            const isCustom = 'customImageSrc' in item;

            return (
              <article
                key={item.id}
                className="border border-[#E5DCDC] bg-white p-5 flex flex-col justify-between hover:border-[#721422] transition-colors"
              >
                <div>
                  <figure className="mb-4">
                    <div className="relative h-60 border border-[#EAE3E3] bg-[#FAF8F8] overflow-hidden">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${getImagePosition(item)}`}
                        />
                      ) : (
                        <ArchivalPosterArt variant={item.posterVariant} />
                      )}

                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            openImageEditor({
                              targetId: item.id,
                              title: item.title,
                              defaultCaption: '',
                              defaultCredit: item.credit,
                              allowCaptionEdit: false,
                            })
                          }
                          aria-label={`Editar imagen de ${item.title}`}
                          className="w-8 h-8 bg-white/95 border border-[#E5DCDC] text-[#1A1415] hover:bg-[#721422] hover:text-white hover:border-[#721422] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPiece(item)}
                          aria-label={`Ampliar ficha de ${item.title}`}
                          className="w-8 h-8 bg-white/95 border border-[#E5DCDC] text-[#1A1415] hover:bg-[#721422] hover:text-white hover:border-[#721422] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <figcaption className="mt-1.5 text-[11px] font-serif italic text-[#594D4F] truncate">
                      {photoCredit}
                    </figcaption>
                  </figure>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#594D4F] mb-1.5">
                    <span className="text-[#721422] font-medium">{item.accession}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-[#1A1415] leading-snug mb-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-[#594D4F] leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="border-t border-[#EAE3E3] pt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#594D4F] truncate">{item.dateLabel}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => removeCustomArchive(item.id)}
                        aria-label={`Eliminar ${item.title}`}
                        className="text-[#594D4F] hover:text-[#721422] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedPiece(item)}
                      className="font-semibold text-[#721422] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Ver ficha completa
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* PANEL 2: ARCHIVOS SONOROS */}
      {activeTab === 'sonoros' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOUND_ARCHIVES.map((item) => (
            <article
              key={item.id}
              className="border border-[#E5DCDC] bg-white p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#594D4F] mb-2">
                  <span className="text-[#721422] font-medium">{item.accession}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.collection}</span>
                </div>

                <h2 className="font-serif text-xl font-semibold text-[#1A1415] leading-snug mb-2.5">
                  {item.title}
                </h2>

                <p className="text-xs font-medium text-[#721422] mb-3">{item.producer}</p>

                <p className="text-sm text-[#594D4F] leading-relaxed mb-5">{item.description}</p>
              </div>

              <div>
                <MuseumAudioPlayer
                  id={item.id}
                  label={item.title}
                  audioSrc={item.audioSrc}
                  motif={item.motif}
                  durationSec={item.durationSec}
                />
                <p className="font-mono text-[11px] text-[#594D4F] mt-2.5">
                  Fecha de registro: {item.dateLabel}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* VISOR DE FICHA CATALOGRÁFICA (MODAL ESTILO MUSEO) */}
      {selectedPiece && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-piece-title"
          className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
          onClick={() => setSelectedPiece(null)}
        >
          <div
            className="bg-white border border-[#E5DCDC] max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPiece(null)}
              aria-label="Cerrar ficha catalográfica"
              className="absolute top-4 right-4 w-9 h-9 border border-[#E5DCDC] flex items-center justify-center text-[#1A1415] hover:bg-[#721422] hover:text-white hover:border-[#721422] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <figure className="md:col-span-5">
                <div className="h-80 border border-[#EAE3E3] bg-[#FAF8F8] overflow-hidden">
                  {getDisplayImage(selectedPiece) ? (
                    <img
                      src={getDisplayImage(selectedPiece)}
                      alt={selectedPiece.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${getImagePosition(selectedPiece)}`}
                    />
                  ) : (
                    <ArchivalPosterArt variant={selectedPiece.posterVariant} />
                  )}
                </div>
                <figcaption className="mt-2 text-xs font-serif italic text-[#594D4F]">
                  {getDisplayCredit(selectedPiece)}
                </figcaption>
              </figure>

              <div className="md:col-span-7">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
                  {selectedPiece.accession} · {selectedPiece.category}
                </span>
                <h2
                  id="modal-piece-title"
                  className="font-serif text-2xl font-semibold text-[#1A1415] mt-1 mb-3 pr-8"
                >
                  {selectedPiece.title}
                </h2>
                <p className="text-sm text-[#594D4F] leading-relaxed mb-5">
                  {selectedPiece.description}
                </p>

                <dl className="border-t border-[#E5DCDC] divide-y divide-[#EAE3E3] text-xs mb-5">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="font-mono uppercase text-[#594D4F]">Escenario</dt>
                    <dd className="text-[#1A1415] font-medium text-right">{selectedPiece.venue}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="font-mono uppercase text-[#594D4F]">Fecha</dt>
                    <dd className="text-[#1A1415] font-medium text-right">
                      {selectedPiece.dateLabel}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="font-mono uppercase text-[#594D4F]">Crédito fotográfico</dt>
                    <dd className="text-[#1A1415] font-medium text-right">
                      {getDisplayCredit(selectedPiece)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => {
                    const piece = selectedPiece;
                    setSelectedPiece(null);
                    openImageEditor({
                      targetId: piece.id,
                      title: piece.title,
                      defaultCaption: '',
                      defaultCredit: piece.credit,
                      allowCaptionEdit: false,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-[#721422] text-[#721422] hover:bg-[#721422] hover:text-white transition-colors cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar imagen o crédito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
