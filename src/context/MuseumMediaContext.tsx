import React, { createContext, useContext, useEffect, useState } from 'react';
import { GraphicArchiveItem } from '../data/museumData';

export interface MediaOverride {
  src: string;
  caption?: string;
  credit?: string;
}

export interface CustomGraphicItem extends GraphicArchiveItem {
  customImageSrc: string;
}

interface EditorTarget {
  mode: 'edit';
  targetId: string;
  title: string;
  defaultCaption: string;
  defaultCredit: string;
  allowCaptionEdit: boolean;
}

interface AddTarget {
  mode: 'add-archive';
}

export type ModalTarget = EditorTarget | AddTarget | null;

interface MuseumMediaContextValue {
  overrides: Record<string, MediaOverride>;
  customArchives: CustomGraphicItem[];
  modalTarget: ModalTarget;
  openImageEditor: (target: Omit<EditorTarget, 'mode'>) => void;
  openAddArchive: () => void;
  closeModal: () => void;
  saveOverride: (targetId: string, override: MediaOverride) => void;
  resetOverride: (targetId: string) => void;
  addCustomArchive: (item: Omit<CustomGraphicItem, 'id' | 'accession' | 'posterVariant'>) => void;
  removeCustomArchive: (id: string) => void;
}

const OVERRIDES_KEY = 'museo_rock_sc_media_overrides_v1';
const CUSTOM_ARCHIVES_KEY = 'museo_rock_sc_custom_archives_v1';

const MuseumMediaContext = createContext<MuseumMediaContextValue | null>(null);

export const MuseumMediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overrides, setOverrides] = useState<Record<string, MediaOverride>>(() => {
    try {
      const raw = localStorage.getItem(OVERRIDES_KEY);
      return raw ? (JSON.parse(raw) as Record<string, MediaOverride>) : {};
    } catch {
      return {};
    }
  });

  const [customArchives, setCustomArchives] = useState<CustomGraphicItem[]>(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_ARCHIVES_KEY);
      return raw ? (JSON.parse(raw) as CustomGraphicItem[]) : [];
    } catch {
      return [];
    }
  });

  const [modalTarget, setModalTarget] = useState<ModalTarget>(null);

  useEffect(() => {
    try {
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
    } catch {
      // Ignorar si el almacenamiento local excede cuota
    }
  }, [overrides]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_ARCHIVES_KEY, JSON.stringify(customArchives));
    } catch {
      // Ignorar si el almacenamiento local excede cuota
    }
  }, [customArchives]);

  const openImageEditor = (target: Omit<EditorTarget, 'mode'>) => {
    setModalTarget({ mode: 'edit', ...target });
  };

  const openAddArchive = () => {
    setModalTarget({ mode: 'add-archive' });
  };

  const closeModal = () => setModalTarget(null);

  const saveOverride = (targetId: string, override: MediaOverride) => {
    setOverrides((prev) => ({
      ...prev,
      [targetId]: override,
    }));
  };

  const resetOverride = (targetId: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[targetId];
      return next;
    });
  };

  const addCustomArchive = (
    item: Omit<CustomGraphicItem, 'id' | 'accession' | 'posterVariant'>,
  ) => {
    const nextNumber = customArchives.length + 7;
    const accession = `ARC-GR-${String(nextNumber).padStart(3, '0')}`;
    const newItem: CustomGraphicItem = {
      ...item,
      id: `custom-graf-${Date.now()}`,
      accession,
      posterVariant: 'chiguaza',
    };
    setCustomArchives((prev) => [newItem, ...prev]);
  };

  const removeCustomArchive = (id: string) => {
    setCustomArchives((prev) => prev.filter((item) => item.id !== id));
    resetOverride(id);
  };

  return (
    <MuseumMediaContext.Provider
      value={{
        overrides,
        customArchives,
        modalTarget,
        openImageEditor,
        openAddArchive,
        closeModal,
        saveOverride,
        resetOverride,
        addCustomArchive,
        removeCustomArchive,
      }}
    >
      {children}
    </MuseumMediaContext.Provider>
  );
};

export function useMuseumMedia(): MuseumMediaContextValue {
  const ctx = useContext(MuseumMediaContext);
  if (!ctx) {
    throw new Error('useMuseumMedia debe usarse dentro de MuseumMediaProvider');
  }
  return ctx;
}
