import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../data/museumData';
import { BanrepCrest } from './MuseumArtwork';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId, archiveTab?: 'graficos' | 'sonoros') => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'quienes-somos', label: 'Quiénes somos' },
  { id: 'propuesta-pedagogica', label: 'Propuesta pedagógica' },
  { id: 'archivos', label: 'Archivos' },
  { id: 'gestores', label: 'Gestores culturales' },
  { id: 'bandas', label: 'Bandas' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (section: SectionId, archiveTab?: 'graficos' | 'sonoros') => {
    onNavigate(section, archiveTab);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#721422]">
      {/* Fila superior institucional estilo Banrepcultural */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 pt-3 pb-2.5 flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => handleSelect('inicio')}
          className="flex items-center gap-3 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#721422]"
        >
          <BanrepCrest className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-200 group-hover:scale-[1.03]" />
          <div>
            <span className="font-serif text-lg sm:text-[1.3rem] font-bold tracking-tight text-[#1A1415] block leading-tight whitespace-nowrap">
              Museo del Rock de San Cristóbal Sur
            </span>
            <span className="hidden sm:block text-xs text-[#594D4F] tracking-normal">
              Espacio dedicado a la memoria y la difusión
            </span>
          </div>
        </button>

        {/* Acción principal derecha en escritorio / Botón menú en móvil */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('bandas')}
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold bg-[#721422] text-white hover:bg-[#540D18] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#721422]"
          >
            Directorio de Bandas
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú del museo' : 'Abrir menú del museo'}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-[#721422] text-white cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Barra de navegación horizontal estilo Banrepcultural + Mega-menú desplegable */}
      <div ref={menuContainerRef} className="relative border-t border-[#EAE3E3] bg-white">
        <div className="hidden md:flex max-w-[1220px] mx-auto px-4 sm:px-6 items-center gap-6">
          {/* Botón cuadrado Vino Tinto característico de Banrepcultural */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar índice del museo' : 'Abrir índice del museo'}
            className="w-11 h-11 shrink-0 bg-[#721422] hover:bg-[#540D18] text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#721422]"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav aria-label="Navegación principal" className="flex items-center gap-7 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`relative py-3 text-[13.5px] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#721422] ${
                    isActive
                      ? 'text-[#721422] font-semibold'
                      : 'text-[#2B2325] hover:text-[#721422] font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2.5px] bg-[#721422]"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Panel desplegable blanco de dos columnas estilo Banrepcultural */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-[#E5DCDC] shadow-[0_18px_40px_rgba(26,20,21,0.12)] z-50">
            <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-7">
              <div className="border-b border-[#EAE3E3] pb-3 mb-5 flex items-center justify-between">
                <span className="font-serif text-lg font-semibold text-[#1A1415]">
                  Índice del Museo Digital
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
                  San Cristóbal Sur · Bogotá
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#594D4F] mb-3">
                    Secciones Principales
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item.id)}
                          className={`text-left hover:text-[#721422] hover:underline underline-offset-4 cursor-pointer ${
                            activeSection === item.id
                              ? 'text-[#721422] font-semibold'
                              : 'text-[#1A1415]'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#594D4F] mb-3">
                    Colecciones y Programas
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect('archivos', 'graficos')}
                        className="text-left text-[#1A1415] hover:text-[#721422] hover:underline underline-offset-4 cursor-pointer"
                      >
                        Archivos Gráficos y Carteles (2025–2026)
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect('archivos', 'sonoros')}
                        className="text-left text-[#1A1415] hover:text-[#721422] hover:underline underline-offset-4 cursor-pointer"
                      >
                        Archivos Sonoros · Sonidos Ocultos Vol. I
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect('propuesta-pedagogica')}
                        className="text-left text-[#1A1415] hover:text-[#721422] hover:underline underline-offset-4 cursor-pointer"
                      >
                        Certificación SENA y Escuelas de Rock
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect('propuesta-pedagogica')}
                        className="text-left text-[#1A1415] hover:text-[#721422] hover:underline underline-offset-4 cursor-pointer"
                      >
                        Mujeres, Rock y Territorio · Acuerdo Local
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FAF8F8] border border-[#E5DCDC] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#721422] mb-1.5">
                    Proyecto de Investigación
                  </p>
                  <p className="font-serif text-base font-semibold text-[#1A1415] mb-2">
                    Licenciatura en Artes Visuales · UPN
                  </p>
                  <p className="text-xs text-[#594D4F] leading-relaxed">
                    Articulación de archivos gráficos y sonoros para visibilizar la escena rock y
                    metal de San Cristóbal Sur como patrimonio cultural local.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
