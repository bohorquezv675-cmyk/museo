import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Pause, Pencil, Play } from 'lucide-react';
import { useMuseumMedia } from '../context/MuseumMediaContext';
import { GRAPHIC_ARCHIVES, HERO_SLIDES, SectionId } from '../data/museumData';
import { ArchivalPosterArt, HeroBackdropArt } from './MuseumArtwork';

interface HomeSectionProps {
  onNavigate: (section: SectionId, archiveTab?: 'graficos' | 'sonoros') => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { overrides, customArchives, openImageEditor } = useMuseumMedia();

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const currentSlide = HERO_SLIDES[slideIndex];
  const heroOverride = overrides[currentSlide.id];
  const heroCredit = heroOverride?.credit ?? currentSlide.credit;
  const backdropSrc = heroOverride?.src || currentSlide.backdropImageSrc;
  const hasFramedPoster = !heroOverride?.src && Boolean(currentSlide.posterImageSrc);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const featuredGraphics = [...customArchives, ...GRAPHIC_ARCHIVES].slice(0, 6);

  return (
    <div>
      {/* HERO CAROUSEL ESTILO BANREPCULTURAL */}
      <section aria-label="Exposiciones destacadas" className="relative w-full bg-[#140E10] overflow-hidden">
        <div className="relative min-h-[430px] sm:min-h-[480px] flex items-center">
          <div className="absolute inset-0">
            {backdropSrc ? (
              <img
                src={backdropSrc}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <HeroBackdropArt variant={currentSlide.variant} />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#120A0C]/92 via-[#1D0C10]/80 to-[#120A0C]/45"
              aria-hidden="true"
            />
          </div>

          {/* Controles esquina superior derecha (Cambiar imagen + Play/Pause) */}
          <div className="absolute top-5 right-6 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                openImageEditor({
                  targetId: currentSlide.id,
                  title: `Portada (${currentSlide.kicker})`,
                  defaultCaption: '',
                  defaultCredit: currentSlide.credit,
                  allowCaptionEdit: false,
                })
              }
              aria-label="Cambiar imagen de portada"
              className="inline-flex items-center gap-1.5 h-9 px-3 bg-black/45 hover:bg-[#721422] text-white border border-white/25 text-xs transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cambiar imagen</span>
            </button>

            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              aria-label={autoPlay ? 'Pausar presentación' : 'Reanudar presentación'}
              className="w-9 h-9 flex items-center justify-center bg-black/45 hover:bg-[#721422] text-white border border-white/25 transition-colors cursor-pointer"
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Flechas laterales circulares */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Diapositiva anterior"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-[#721422] text-white backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente diapositiva"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-[#721422] text-white backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Contenido editorial + afiche destacado en slides de colección */}
          <div className="relative z-10 max-w-[1220px] w-full mx-auto px-12 sm:px-16 pt-12 pb-16 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className={hasFramedPoster ? 'lg:col-span-7' : 'lg:col-span-9'}>
                <p className="font-mono text-xs uppercase tracking-widest text-[#F0C2C9] mb-3">
                  {currentSlide.kicker}
                </p>
                <h1 className="font-serif text-[clamp(1.75rem,3.4vw,3rem)] font-semibold text-white leading-[1.15] max-w-3xl [text-wrap:balance]">
                  {currentSlide.title}
                </h1>
                <p className="mt-4 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
                  {currentSlide.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate(currentSlide.targetSection)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#721422] hover:bg-[#540D18] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {currentSlide.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {hasFramedPoster && currentSlide.posterImageSrc && (
                <div className="lg:col-span-5">
                  <figure className="max-w-[260px] sm:max-w-xs mx-auto lg:ml-auto lg:mr-0 border border-white/25 bg-[#120A0C]/90 p-2.5">
                    <div className="h-60 sm:h-64 lg:h-72 overflow-hidden bg-[#1A1315]">
                      <img
                        src={currentSlide.posterImageSrc}
                        alt={currentSlide.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover ${
                          currentSlide.posterObjectPosition ?? 'object-center'
                        }`}
                      />
                    </div>
                    <figcaption className="mt-1.5 text-[10.5px] font-serif italic text-white/75 truncate">
                      {heroCredit}
                    </figcaption>
                  </figure>
                </div>
              )}
            </div>
          </div>

          {/* Indicadores inferiores + botón guía */}
          <div className="absolute bottom-4 left-0 right-0 z-20 max-w-[1220px] mx-auto px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                  className={`h-1.5 transition-all cursor-pointer ${
                    idx === slideIndex ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('quienes-somos')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-[#721422] hover:bg-[#540D18] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Sobre el Proyecto UPN
            </button>
          </div>
        </div>

        {/* Pie de imagen discreto debajo de la fotografía de portada */}
        <div className="bg-[#110C0D] border-t border-white/10 px-4 sm:px-6 py-1.5">
          <div className="max-w-[1220px] mx-auto flex items-center justify-between gap-4 text-[11px] text-white/65 font-serif italic">
            <span>
              Museo del Rock de San Cristóbal Sur · Espacio dedicado a la memoria y la difusión
            </span>
            <span>{heroCredit}</span>
          </div>
        </div>
      </section>

      {/* CINTA INSTITUCIONAL DE UTILIDAD */}
      <div className="border-b border-[#E5DCDC] bg-[#FAF8F8]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#594D4F]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#721422]">Acceso libre y gratuito</span>
            <span aria-hidden="true">·</span>
            <span>Espacio dedicado a la memoria y la difusión</span>
            <span aria-hidden="true">·</span>
            <span>San Cristóbal Sur, Bogotá</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#594D4F]">
            Licenciatura en Artes Visuales · UPN
          </span>
        </div>
      </div>

      {/* SALAS Y COLECCIONES DEL MUSEO CON PREVIEW VISUAL */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5DCDC] pb-4 mb-8 gap-3">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
              Colecciones y Salas Digitales
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1415] mt-1">
              Explorar el Patrimonio Sonoro y Visual
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('bandas')}
            className="text-sm font-semibold text-[#721422] hover:underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            Consultar directorio completo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article
            onClick={() => onNavigate('archivos', 'graficos')}
            className="group border border-[#E5DCDC] bg-white p-5 hover:border-[#721422] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <figure className="mb-4">
                <div className="h-44 border border-[#EAE3E3] bg-[#FAF8F8] overflow-hidden">
                  <img
                    src="/assets/aistudio/35081_7beab082.png"
                    alt="III Festival Chiguaza Rock Fest 2025"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[50%_44%]"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] font-serif italic text-[#594D4F] truncate">
                  Archivo: @mesarockymetal_sc
                </figcaption>
              </figure>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#594D4F]">
                01 · Sala Documental
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#1A1415] group-hover:text-[#721422] transition-colors mt-1.5 mb-2.5">
                Archivos Gráficos y Sonoros
              </h3>
              <p className="text-sm text-[#594D4F] leading-relaxed">
                Colección de afiches de festivales barriales (Chiguaza Rock Fest, Rockween, Almas
                Rocas) y compilados sonoros locales como <em>Sonidos ocultos desde San Cristóbal</em>.
              </p>
            </div>
            <span className="mt-5 text-xs font-semibold text-[#721422] inline-flex items-center gap-1.5">
              Ingresar a la colección <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </article>

          <article
            onClick={() => onNavigate('propuesta-pedagogica')}
            className="group border border-[#E5DCDC] bg-white p-5 hover:border-[#721422] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <figure className="mb-4">
                <div className="h-44 border border-[#EAE3E3] bg-[#FAF8F8] overflow-hidden">
                  <img
                    src="/assets/aistudio/35017_f300d239.png"
                    alt="Convocatoria de Certificación SENA"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[50%_47%]"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] font-serif italic text-[#594D4F] truncate">
                  Archivo: @mesarockymetal_sc · Alianza SENA
                </figcaption>
              </figure>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#594D4F]">
                02 · Formación y Territorio
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#1A1415] group-hover:text-[#721422] transition-colors mt-1.5 mb-2.5">
                Propuesta Pedagógica Territorial
              </h3>
              <p className="text-sm text-[#594D4F] leading-relaxed">
                Sistematización de talleres, certificación de competencias laborales con el SENA,
                Escuelas de Rock y espacios de formación impulsados desde la Mesa Local de Rock y
                Metal.
              </p>
            </div>
            <span className="mt-5 text-xs font-semibold text-[#721422] inline-flex items-center gap-1.5">
              Ver procesos formativos <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </article>

          <article
            onClick={() => onNavigate('gestores')}
            className="group border border-[#E5DCDC] bg-white p-5 hover:border-[#721422] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <figure className="mb-4">
                <div className="h-44 border border-[#EAE3E3] bg-[#FAF8F8] overflow-hidden">
                  <img
                    src="/assets/aistudio/35420_1ce4f420.png"
                    alt="Carlos Urraya en batería"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[50%_32%]"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] font-serif italic text-[#594D4F] truncate">
                  Carlos Urraya en batería · Registro: @smutsmetalband
                </figcaption>
              </figure>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#594D4F]">
                03 · Memoria Viva
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#1A1415] group-hover:text-[#721422] transition-colors mt-1.5 mb-2.5">
                Voces y Bandas del Territorio
              </h3>
              <p className="text-sm text-[#594D4F] leading-relaxed">
                Testimonios audiovisuales de gestores culturales y fichas documentales de
                agrupaciones locales con sus registros sonoros, trayectorias y entrevistas.
              </p>
            </div>
            <span className="mt-5 text-xs font-semibold text-[#721422] inline-flex items-center gap-1.5">
              Escuchar testimonios <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </article>
        </div>

        {/* VITRINA DE PIEZAS CATALOGADAS (CHIGUAZA FEST, ROCKWEEN, LA 4TA ESTUDIO Y MÁS) */}
        <div className="mt-14 pt-10 border-t border-[#E5DCDC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
                Selección Curatorial
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#1A1415] mt-1">
                Festivales, Convocatorias y Archivo Gráfico
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('archivos', 'graficos')}
              className="text-xs font-semibold text-[#721422] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              Ver todas las piezas del archivo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGraphics.map((item) => {
              const override = overrides[item.id];
              const customSrc =
                override?.src ||
                ('imageSrc' in item && item.imageSrc ? item.imageSrc : '') ||
                ('customImageSrc' in item ? String(item.customImageSrc) : '');
              const photoCredit = override?.credit ?? item.credit;
              const imgPosition =
                !override?.src && 'imageObjectPosition' in item && item.imageObjectPosition
                  ? item.imageObjectPosition
                  : 'object-center';

              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate('archivos', 'graficos')}
                  className="border border-[#E5DCDC] bg-white p-4 hover:border-[#721422] transition-colors cursor-pointer"
                >
                  <figure className="mb-3">
                    <div className="h-52 overflow-hidden border border-[#EAE3E3] bg-[#FAF8F8]">
                      {customSrc ? (
                        <img
                          src={customSrc}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${imgPosition}`}
                        />
                      ) : (
                        <ArchivalPosterArt variant={item.posterVariant} />
                      )}
                    </div>
                    <figcaption className="mt-1.5 text-[11px] font-serif italic text-[#594D4F] truncate">
                      {photoCredit}
                    </figcaption>
                  </figure>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#594D4F] mb-1">
                    <span className="text-[#721422] font-medium">{item.accession}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1A1415]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#594D4F] mt-1">{item.venue}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
