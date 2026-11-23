import React, { useMemo, useState } from 'react';
import { Pencil, Search, X } from 'lucide-react';
import { useMuseumMedia } from '../context/MuseumMediaContext';
import { BANDS_DATA, BandItem } from '../data/museumData';
import { BandStagePlate } from './MuseumArtwork';
import { MuseumAudioPlayer } from './MuseumAudioPlayer';

type GenreFilter = 'todas' | BandItem['genreGroup'];

const GENRE_FILTERS: { id: GenreFilter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'metal', label: 'Metal / Heavy' },
  { id: 'rock', label: 'Rock / Progresivo' },
  { id: 'punk', label: 'Metal Punk' },
  { id: 'archivo', label: 'En catalogación' },
];

export const BandsSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState<GenreFilter>('todas');
  const { overrides, openImageEditor } = useMuseumMedia();

  const filteredBands = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BANDS_DATA.filter((band) => {
      const matchesGenre = genreFilter === 'todas' || band.genreGroup === genreFilter;
      const matchesQuery =
        !q ||
        band.name.toLowerCase().includes(q) ||
        band.genre.toLowerCase().includes(q) ||
        band.searchTokens.toLowerCase().includes(q);
      return matchesGenre && matchesQuery;
    });
  }, [query, genreFilter]);

  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="border-b border-[#E5DCDC] pb-6 mb-8">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
          Archivo de Agrupaciones Locales
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1415] mt-2 [text-wrap:balance]">
          Bandas de San Cristóbal
        </h1>
        <p className="text-sm sm:text-base text-[#594D4F] mt-2 max-w-3xl leading-relaxed">
          Busca una banda por su nombre para escuchar su registro sonoro, editar o subir su
          fotografía, conocer su trayectoria y leer su entrevista.
        </p>
      </div>

      {/* Buscador + Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search
            className="w-4 h-4 text-[#594D4F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar banda por nombre (ej. Karga Inerte, Psicomorbo, Hanasmusen, Onix...)"
            aria-label="Buscar banda por nombre"
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#E5DCDC] text-[#1A1415] placeholder:text-[#8A7D80] focus:outline-none focus:border-[#721422]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#594D4F] hover:text-[#721422] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {GENRE_FILTERS.map((f) => {
            const active = genreFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setGenreFilter(f.id)}
                className={`px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
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
      </div>

      {/* Resultado vacío */}
      {filteredBands.length === 0 ? (
        <div className="border border-[#E5DCDC] bg-[#FAF8F8] p-10 text-center">
          <p className="font-serif text-xl text-[#1A1415] mb-2">
            No se encontraron agrupaciones para «{query}»
          </p>
          <p className="text-sm text-[#594D4F] mb-5">
            Intenta buscar por otro nombre o restablece los filtros del directorio.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setGenreFilter('todas');
            }}
            className="px-4 py-2 text-xs font-semibold bg-[#721422] text-white hover:bg-[#540D18] cursor-pointer"
          >
            Ver todas las bandas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredBands.map((band) => {
            const override = overrides[band.id];
            const photoSrc = override?.src || band.photoImageSrc;
            const photoCaption = override?.caption ?? band.photoCaption;
            const photoCredit = override?.credit ?? band.photoCredit;
            const imgPositionClass =
              !override?.src && band.photoObjectPosition
                ? band.photoObjectPosition
                : 'object-center';

            return (
              <article
                key={band.id}
                className="border border-[#E5DCDC] bg-white p-6 flex flex-col gap-5"
              >
                {/* 1. ARCHIVO SONORO DE PRIMERAS */}
                <MuseumAudioPlayer
                  id={`band-audio-${band.id}`}
                  label={`Registro sonoro — ${band.name}`}
                  audioSrc={band.audioSrc}
                  motif={band.motif}
                  durationSec={band.durationSec}
                />

                {/* 2. NOMBRE DE LA BANDA Y GÉNERO (Sin cápsulas/pills) */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#594D4F] mb-1">
                    <span className="text-[#721422] font-medium">{band.accession}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#721422] font-semibold">{band.genre}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1A1415] leading-snug">
                    {band.name}
                  </h2>
                </div>

                {/* 3. FOTOGRAFÍA / PLACA VISUAL DE LA BANDA CON PIE DE IMAGEN Y EDICIÓN */}
                <figure>
                  <div className="relative h-64 border border-[#E5DCDC] bg-[#FAF8F8] overflow-hidden">
                    {photoSrc ? (
                      <img
                        src={photoSrc}
                        alt={band.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover ${imgPositionClass}`}
                      />
                    ) : (
                      <BandStagePlate variant={band.photoVariant} name={band.name} />
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        openImageEditor({
                          targetId: band.id,
                          title: band.name,
                          defaultCaption: band.photoCaption,
                          defaultCredit: band.photoCredit,
                          allowCaptionEdit: true,
                        })
                      }
                      aria-label={`Editar fotografía de ${band.name}`}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/95 border border-[#E5DCDC] text-[#1A1415] hover:bg-[#721422] hover:text-white hover:border-[#721422] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Editar foto</span>
                    </button>
                  </div>
                  <figcaption className="mt-2 text-[11.5px] font-serif italic text-[#594D4F] flex items-center justify-between gap-3">
                    <span>{photoCaption}</span>
                    <span className="shrink-0">{photoCredit}</span>
                  </figcaption>
                </figure>

                {/* 4. ESCRITO DETALLADO */}
                <p className="text-sm text-[#2B2325] leading-relaxed">{band.description}</p>

                {/* 5. PEQUEÑA ENTREVISTA */}
                <div className="border-y border-[#E5DCDC] bg-[#FAF8F8] px-4 py-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422] block mb-1.5">
                    Entrevista · Voz de la banda
                  </span>
                  <p className="font-serif italic text-sm text-[#1A1415] leading-relaxed">
                    {band.interview}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
