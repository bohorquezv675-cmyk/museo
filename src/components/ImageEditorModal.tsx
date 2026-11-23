import React, { useEffect, useState } from 'react';
import { ImagePlus, RotateCcw, Upload, X } from 'lucide-react';
import { useMuseumMedia } from '../context/MuseumMediaContext';

function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Formato de imagen no compatible.'));
      img.onload = () => {
        const maxSide = 1400;
        let { width, height } = img;
        if (width > maxSide || height > maxSide) {
          if (width >= height) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.84));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const ImageEditorModal: React.FC = () => {
  const {
    modalTarget,
    overrides,
    closeModal,
    saveOverride,
    resetOverride,
    addCustomArchive,
  } = useMuseumMedia();

  const [imageSrc, setImageSrc] = useState('');
  const [caption, setCaption] = useState('');
  const [credit, setCredit] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Campos adicionales para agregar nueva pieza al archivo
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Fotografía en vivo');
  const [newVenue, setNewVenue] = useState('San Cristóbal Sur');
  const [newDateLabel, setNewDateLabel] = useState('2026');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    if (!modalTarget) return;
    setErrorMsg('');

    if (modalTarget.mode === 'edit') {
      const existing = overrides[modalTarget.targetId];
      setImageSrc(existing?.src ?? '');
      setCaption(existing?.caption ?? modalTarget.defaultCaption);
      setCredit(existing?.credit ?? modalTarget.defaultCredit);
    } else {
      setImageSrc('');
      setNewTitle('');
      setNewCategory('Fotografía en vivo');
      setNewVenue('San Cristóbal Sur');
      setNewDateLabel('2026');
      setCredit('');
      setNewDescription('');
    }
  }, [modalTarget, overrides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalTarget) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [modalTarget, closeModal]);

  if (!modalTarget) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      setImageSrc(compressed);
      setErrorMsg('');
    } catch {
      setErrorMsg('No se pudo cargar la imagen seleccionada.');
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalTarget.mode !== 'edit') return;

    const existing = overrides[modalTarget.targetId];
    const finalSrc = imageSrc.trim();

    if (!finalSrc && !existing?.src && caption === modalTarget.defaultCaption && credit === modalTarget.defaultCredit) {
      closeModal();
      return;
    }

    saveOverride(modalTarget.targetId, {
      src: finalSrc,
      caption: caption.trim(),
      credit: credit.trim(),
    });
    closeModal();
  };

  const handleAddArchiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setErrorMsg('Escribe el título de la fotografía o cartel.');
      return;
    }
    if (!imageSrc.trim()) {
      setErrorMsg('Sube una imagen desde tu equipo o pega la ruta/URL de la imagen.');
      return;
    }
    const yearMatch = newDateLabel.match(/\d{4}/);
    addCustomArchive({
      title: newTitle.trim(),
      category: newCategory.trim() || 'Archivo Gráfico',
      venue: newVenue.trim() || 'San Cristóbal Sur',
      dateLabel: newDateLabel.trim() || '2026',
      year: yearMatch ? yearMatch[0] : '2026',
      credit: credit.trim() || 'Archivo comunitario',
      description:
        newDescription.trim() ||
        'Pieza incorporada al archivo gráfico y fotográfico del Museo del Rock de San Cristóbal Sur.',
      customImageSrc: imageSrc.trim(),
    });
    closeModal();
  };

  const isEditMode = modalTarget.mode === 'edit';
  const hasOverride = isEditMode && Boolean(overrides[modalTarget.targetId]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEditMode ? 'Editar imagen y pie de foto' : 'Agregar imagen al archivo'}
      className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white border border-[#E5DCDC] max-w-xl w-full p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Cerrar editor de imagen"
          className="absolute top-4 right-4 w-9 h-9 border border-[#E5DCDC] flex items-center justify-center text-[#1A1415] hover:bg-[#721422] hover:text-white hover:border-[#721422] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
          {isEditMode ? 'Gestión Visual del Museo' : 'Nueva Pieza Documental'}
        </span>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1415] mt-1 pr-8">
          {isEditMode ? `Editar imagen: ${modalTarget.title}` : 'Agregar imagen al archivo gráfico'}
        </h2>
        <p className="text-xs text-[#594D4F] mt-1 mb-5">
          Sube una fotografía desde tu computador o ingresa la ruta local (por ejemplo{' '}
          <span className="font-mono">/images/foto.jpg</span>). Los cambios se guardan en el
          navegador.
        </p>

        <form
          onSubmit={isEditMode ? handleSaveEdit : handleAddArchiveSubmit}
          className="space-y-4 text-sm"
        >
          {/* Selector de archivo local */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1415] mb-1.5">
              Subir fotografía o afiche desde tu dispositivo
            </label>
            <label className="flex items-center justify-center gap-2 border border-dashed border-[#721422]/60 bg-[#FAF8F8] hover:bg-[#FAF3F4] py-4 px-4 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-[#721422]" />
              <span className="text-xs font-medium text-[#721422]">
                Seleccionar archivo de imagen (.jpg, .png, .webp)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>

          {/* Ruta o URL alternativa */}
          <div>
            <label
              htmlFor="editor-image-url"
              className="block text-xs font-semibold text-[#1A1415] mb-1"
            >
              O pegar ruta / enlace de imagen
            </label>
            <input
              id="editor-image-url"
              type="text"
              value={imageSrc.startsWith('data:') ? '' : imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
              placeholder={
                imageSrc.startsWith('data:')
                  ? 'Imagen cargada desde archivo local (puedes reemplazarla pegando una URL)'
                  : '/images/mi-fotografia.jpg o https://...'
              }
              className="w-full px-3 py-2 text-xs border border-[#E5DCDC] bg-white text-[#1A1415] focus:outline-none focus:border-[#721422]"
            />
          </div>

          {/* Vista previa */}
          {imageSrc && (
            <div className="border border-[#E5DCDC] bg-[#FAF8F8] p-2">
              <img
                src={imageSrc}
                alt="Vista previa seleccionada"
                referrerPolicy="no-referrer"
                className="w-full max-h-48 object-cover"
              />
            </div>
          )}

          {!isEditMode && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="new-archive-title"
                    className="block text-xs font-semibold text-[#1A1415] mb-1"
                  >
                    Título de la pieza *
                  </label>
                  <input
                    id="new-archive-title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. Festival Rock al Sur"
                    className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-archive-category"
                    className="block text-xs font-semibold text-[#1A1415] mb-1"
                  >
                    Categoría
                  </label>
                  <input
                    id="new-archive-category"
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Fotografía en vivo / Cartel"
                    className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="new-archive-venue"
                    className="block text-xs font-semibold text-[#1A1415] mb-1"
                  >
                    Escenario o lugar
                  </label>
                  <input
                    id="new-archive-venue"
                    type="text"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-archive-date"
                    className="block text-xs font-semibold text-[#1A1415] mb-1"
                  >
                    Fecha
                  </label>
                  <input
                    id="new-archive-date"
                    type="text"
                    value={newDateLabel}
                    onChange={(e) => setNewDateLabel(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="new-archive-desc"
                  className="block text-xs font-semibold text-[#1A1415] mb-1"
                >
                  Reseña o descripción
                </label>
                <textarea
                  id="new-archive-desc"
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Contexto del evento, bandas o proceso comunitario..."
                  className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
                />
              </div>
            </>
          )}

          {isEditMode && modalTarget.allowCaptionEdit && (
            <div>
              <label
                htmlFor="editor-caption"
                className="block text-xs font-semibold text-[#1A1415] mb-1"
              >
                Pie de imagen (descripción)
              </label>
              <input
                id="editor-caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="editor-credit"
              className="block text-xs font-semibold text-[#1A1415] mb-1"
            >
              Crédito fotográfico (nombre en el pie de la imagen)
            </label>
            <input
              id="editor-credit"
              type="text"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              placeholder="Ej. Foto: @nombre_fotografo / Colectivo..."
              className="w-full px-3 py-2 text-xs border border-[#E5DCDC] focus:outline-none focus:border-[#721422]"
            />
          </div>

          {errorMsg && <p className="text-xs text-[#721422] font-medium">{errorMsg}</p>}

          <div className="pt-3 border-t border-[#E5DCDC] flex flex-wrap items-center justify-between gap-3">
            {hasOverride ? (
              <button
                type="button"
                onClick={() => {
                  resetOverride(modalTarget.targetId);
                  closeModal();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[#E5DCDC] text-[#594D4F] hover:text-[#721422] hover:border-[#721422] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restaurar original
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-xs font-medium border border-[#E5DCDC] text-[#594D4F] hover:text-[#1A1415] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#721422] text-white hover:bg-[#540D18] cursor-pointer"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                {isEditMode ? 'Guardar cambios' : 'Agregar al archivo'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
