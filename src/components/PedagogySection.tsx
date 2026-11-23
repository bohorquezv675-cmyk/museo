import React, { useState } from 'react';
import { Pencil, X, ZoomIn } from 'lucide-react';
import { useMuseumMedia } from '../context/MuseumMediaContext';
import { PEDAGOGY_ITEMS, PedagogyItem } from '../data/museumData';

type CategoryFilter = 'todos' | PedagogyItem['category'];

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'todos', label: 'Todos los procesos' },
  { id: 'formacion', label: 'Formación Técnica' },
  { id: 'escuelas', label: 'Escuelas y Talleres' },
  { id: 'incidencia', label: 'Memoria e Incidencia' },
];

export const PedagogySection: React.FC = () => {
  const [filter, setFilter] = useState<CategoryFilter>('todos');
  const [selectedItem, setSelectedItem] = useState<PedagogyItem | null>(null);
  const { overrides, openImageEditor } = useMuseumMedia();

  const filteredItems =
    filter === 'todos'
      ? PEDAGOGY_ITEMS
      : PEDAGOGY_ITEMS.filter((item) => item.category === filter);

  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="border-b border-[#E5DCDC] pb-6 mb-8">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
          Procesos Formativos desde la Mesa Local de Rock y Metal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1415] mt-2 [text-wrap:balance]">
          Propuesta pedagógica
        </h1>
        <p className="text-sm sm:text-base text-[#594D4F] mt-2 max-w-3xl leading-relaxed">
          Iniciativas pedagógicas, talleres y alianzas de transferencia de saberes surgidas desde la
          Mesa Local de Rock y Metal de San Cristóbal para fortalecer a músicos, técnicos,
          fotógrafos, gestores y agentes culturales del territorio.
        </p>
      </div>

      {/* Filtros interactivos segmentados */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-[#721422] text-white border-[#721422]'
                  : 'bg-white text-[#594D4F] border-[#E5DCDC] hover:border-[#721422] hover:text-[#721422]'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Cuadrícula de procesos pedagógicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const override = overrides[item.id];
          const photoSrc = override?.src || item.imageSrc;
          const photoCredit = override?.credit ?? item.imageCredit;
          const imgPositionClass =
            !override?.src && item.imageObjectPosition
              ? item.imageObjectPosition
              : 'object-center';

          const frameClass = item.imageFrameClass ?? 'h-60';

          return (
            <article
              key={item.id}
              className={`border border-[#E5DCDC] bg-white p-6 flex flex-col justify-between hover:border-[#721422]/60 transition-colors ${
                item.wideCard ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {photoSrc && (
                  <figure className="mb-4">
                    <div
                      onClick={() => setSelectedItem(item)}
                      className={`relative ${frameClass} border border-[#EAE3E3] bg-[#FAF8F8] overflow-hidden cursor-pointer group`}
                    >
                      <img
                        src={photoSrc}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${imgPositionClass}`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 text-[#1A1415] border border-[#E5DCDC] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                    <figcaption className="mt-1.5 flex items-center justify-between gap-2 text-[11px] font-serif italic text-[#594D4F]">
                      <span className="truncate">{photoCredit ?? ''}</span>
                      <button
                        type="button"
                        onClick={() =>
                          openImageEditor({
                            targetId: item.id,
                            title: item.title,
                            defaultCaption: '',
                            defaultCredit: item.imageCredit ?? 'Archivo: @mesarockymetal_sc',
                            allowCaptionEdit: false,
                          })
                        }
                        className="not-italic font-sans font-semibold text-[#721422] hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                        Editar
                      </button>
                    </figcaption>
                  </figure>
                )}

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#594D4F] mb-2">
                  <span className="text-[#721422] font-medium">{item.accession}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{item.partner}</span>
                </div>

                <h2 className="font-serif text-xl font-semibold text-[#1A1415] leading-snug mb-3">
                  {item.title}
                </h2>

                <p className="text-sm text-[#594D4F] leading-relaxed mb-5">{item.description}</p>
              </div>

              <dl className="border-t border-[#EAE3E3] pt-3.5 space-y-2 text-xs">
                {item.details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="font-semibold text-[#1A1415] inline">{detail.label}: </dt>
                    <dd className="text-[#594D4F] inline leading-relaxed">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>

      {/* Modal de vista ampliada para leer los carteles pedagógicos completos */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white border border-[#E5DCDC] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5DCDC] pb-3 mb-4">
              <div>
                <span className="font-mono text-xs text-[#721422]">
                  {selectedItem.accession} · {selectedItem.partner}
                </span>
                <h2 className="font-serif text-2xl font-semibold text-[#1A1415] mt-1">
                  {selectedItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Cerrar vista ampliada"
                className="w-9 h-9 flex items-center justify-center border border-[#E5DCDC] text-[#1A1415] hover:border-[#721422] hover:text-[#721422] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {(overrides[selectedItem.id]?.src || selectedItem.imageSrc) && (
              <figure className="mb-5">
                {selectedItem.imageFrameClass && !overrides[selectedItem.id]?.src ? (
                  <div
                    className={`border border-[#E5DCDC] bg-[#140E10] overflow-hidden ${selectedItem.imageFrameClass}`}
                  >
                    <img
                      src={selectedItem.imageSrc}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${
                        selectedItem.imageObjectPosition ?? 'object-center'
                      }`}
                    />
                  </div>
                ) : (
                  <div className="border border-[#E5DCDC] bg-[#140E10] flex items-center justify-center max-h-[62vh] overflow-hidden">
                    <img
                      src={overrides[selectedItem.id]?.src || selectedItem.imageSrc}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[62vh] w-auto object-contain"
                    />
                  </div>
                )}
                <figcaption className="mt-1.5 text-[11px] font-serif italic text-[#594D4F]">
                  {overrides[selectedItem.id]?.credit ?? selectedItem.imageCredit}
                </figcaption>
              </figure>
            )}

            <p className="text-sm text-[#594D4F] leading-relaxed mb-4">
              {selectedItem.description}
            </p>
            <dl className="border-t border-[#EAE3E3] pt-3 space-y-2 text-xs">
              {selectedItem.details.map((detail) => (
                <div key={detail.label}>
                  <dt className="font-semibold text-[#1A1415] inline">{detail.label}: </dt>
                  <dd className="text-[#594D4F] inline leading-relaxed">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
};

