import { useState } from 'react';
import { Download } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { ArchivesSection } from './components/ArchivesSection';
import { BandsSection } from './components/BandsSection';
import { GestoresSection } from './components/GestoresSection';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { ImageEditorModal } from './components/ImageEditorModal';
import { BanrepCrest } from './components/MuseumArtwork';
import { PedagogySection } from './components/PedagogySection';
import { MuseumMediaProvider } from './context/MuseumMediaContext';
import { SectionId } from './data/museumData';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [archiveTab, setArchiveTab] = useState<'graficos' | 'sonoros'>('graficos');
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [zipError, setZipError] = useState('');

  const isPreviewHost =
    typeof window !== 'undefined' && window.location.hostname.endsWith('.run.app');

  const handleDownloadProjectZip = async () => {
    setZipError('');
    setDownloadingZip(true);
    try {
      const response = await fetch('/descargar-museo.zip');
      if (!response.ok) {
        throw new Error('No se pudo obtener el archivo.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'museo-del-rock-san-cristobal-sur.zip';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      setZipError('No se pudo iniciar la descarga desde la vista previa.');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleNavigate = (section: SectionId, tab?: 'graficos' | 'sonoros') => {
    setActiveSection(section);
    if (tab) {
      setArchiveTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MuseumMediaProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#1A1415]">
        <Header activeSection={activeSection} onNavigate={handleNavigate} />

        <main className="flex-1">
          {activeSection === 'inicio' && <HomeSection onNavigate={handleNavigate} />}
          {activeSection === 'quienes-somos' && <AboutSection />}
          {activeSection === 'propuesta-pedagogica' && <PedagogySection />}
          {activeSection === 'archivos' && (
            <ArchivesSection activeTab={archiveTab} onTabChange={setArchiveTab} />
          )}
          {activeSection === 'gestores' && <GestoresSection />}
          {activeSection === 'bandas' && <BandsSection />}
        </main>

        <footer className="border-t-2 border-[#721422] bg-[#FAF8F8]">
          <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[#E5DCDC]">
              <div className="md:col-span-5 flex items-start gap-3.5">
                <BanrepCrest className="w-10 h-10 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-lg font-bold text-[#1A1415]">
                    Museo del Rock de San Cristóbal Sur
                  </p>
                  <p className="text-xs text-[#721422] font-medium mt-0.5">
                    Espacio dedicado a la memoria y la difusión
                  </p>
                  <p className="text-xs text-[#594D4F] mt-1.5 leading-relaxed">
                    Proyecto de Trabajo de Grado · Licenciatura en Artes Visuales · Universidad
                    Pedagógica Nacional (UPN). Archivo vivo en diálogo con la Mesa Local de Rock y
                    Metal.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#721422] mb-2.5">
                  Salas del Museo
                </p>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-[#2B2325]">
                  <button
                    type="button"
                    onClick={() => handleNavigate('inicio')}
                    className="text-left hover:text-[#721422] cursor-pointer"
                  >
                    Inicio
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('quienes-somos')}
                    className="text-left hover:text-[#721422] cursor-pointer"
                  >
                    Quiénes somos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('propuesta-pedagogica')}
                    className="text-left hover:text-[#721422] cursor-pointer"
                  >
                    Propuesta pedagógica
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('archivos', 'graficos')}
                    className="text-left hover:text-[#721422] cursor-pointer"
                  >
                    Archivos gráficos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('archivos', 'sonoros')}
                    className="text-left hover:text-[#721422] cursor-pointer"
                  >
                    Archivos sonoros
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('bandas')}
                    className="text-left hover:text-[#721422] cursor-pointer"
                  >
                    Directorio de bandas
                  </button>
                </div>
              </div>

              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#721422] mb-2.5">
                  Territorio
                </p>
                <p className="text-xs text-[#594D4F] leading-relaxed">
                  Localidad 4ta San Cristóbal Sur · Bogotá D.C., Colombia.
                  <br />
                  Salón Comunal Barrio Managua · CDC La Victoria · Biblioteca Pública La Victoria.
                </p>
              </div>
            </div>

            <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#594D4F]">
              <span>© 2026 Museo del Rock de San Cristóbal Sur</span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px]">
                  Espacio dedicado a la memoria y la difusión
                </span>
                {isPreviewHost && (
                  <button
                    type="button"
                    onClick={handleDownloadProjectZip}
                    disabled={downloadingZip}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#721422] hover:bg-[#540D18] disabled:opacity-60 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {downloadingZip
                      ? 'Descargando ZIP...'
                      : 'Descargar proyecto para VS Code (ZIP)'}
                  </button>
                )}
              </div>
            </div>
            {zipError && (
              <p className="mt-2 text-xs text-[#721422] text-right">{zipError}</p>
            )}
          </div>
        </footer>

        <ImageEditorModal />
      </div>
    </MuseumMediaProvider>
  );
}
