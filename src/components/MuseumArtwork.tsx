import React from 'react';
import { BandItem, GraphicArchiveItem, HeroSlide } from '../data/museumData';

export const BanrepCrest: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="40" cy="40" r="37" stroke="#1A1415" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="32.5" stroke="#721422" strokeWidth="0.9" strokeDasharray="2 2" />
    <circle cx="40" cy="40" r="24" stroke="#1A1415" strokeWidth="1" />
    {/* Cerros Orientales de San Cristóbal */}
    <path
      d="M17 47 L28 33 L36 41 L45 27 L55 39 L63 47"
      stroke="#721422"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Ondas sonoras y surcos de vinilo */}
    <path d="M22 52 H58" stroke="#1A1415" strokeWidth="1.2" />
    <path d="M26 56 H54" stroke="#1A1415" strokeWidth="1" />
    <path d="M32 60 H48" stroke="#721422" strokeWidth="1.2" />
    {/* Eje central / mástil */}
    <line x1="40" y1="18" x2="40" y2="47" stroke="#1A1415" strokeWidth="1.3" />
    <circle cx="40" cy="20" r="2.2" fill="#721422" />
  </svg>
);

export const HeroBackdropArt: React.FC<{ variant: HeroSlide['variant'] }> = ({ variant }) => {
  if (variant === 'chiguaza') {
    return (
      <svg
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bgChig" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B1315" />
            <stop offset="55%" stopColor="#3B0D16" />
            <stop offset="100%" stopColor="#120E0F" />
          </linearGradient>
        </defs>
        <rect width="1440" height="520" fill="url(#bgChig)" />
        {/* Lineas de prensa / afiche mural */}
        <g opacity="0.16" stroke="#FAF3F4" strokeWidth="1">
          <line x1="120" y1="0" x2="120" y2="520" />
          <line x1="480" y1="0" x2="480" y2="520" />
          <line x1="840" y1="0" x2="840" y2="520" />
          <line x1="1200" y1="0" x2="1200" y2="520" />
          <line x1="0" y1="130" x2="1440" y2="130" />
          <line x1="0" y1="390" x2="1440" y2="390" />
        </g>
        {/* Discos y bocinas monumentales al lado derecho */}
        <g transform="translate(960, 260)" opacity="0.28">
          <circle cx="0" cy="0" r="220" stroke="#FAF3F4" strokeWidth="1.5" fill="none" />
          <circle cx="0" cy="0" r="175" stroke="#FAF3F4" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="130" stroke="#C96D7B" strokeWidth="1.5" fill="none" />
          <circle cx="0" cy="0" r="85" stroke="#FAF3F4" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="28" stroke="#FAF3F4" strokeWidth="2" fill="#721422" />
        </g>
        {/* Silueta Cerros San Cristóbal */}
        <path
          d="M0 440 L180 350 L320 400 L520 290 L700 375 L920 250 L1140 365 L1310 295 L1440 360 L1440 520 L0 520 Z"
          fill="#0E0A0B"
          opacity="0.72"
        />
      </svg>
    );
  }

  if (variant === 'mountain') {
    return (
      <svg
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bgMount" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#141112" />
            <stop offset="50%" stopColor="#2A1217" />
            <stop offset="100%" stopColor="#540D18" />
          </linearGradient>
        </defs>
        <rect width="1440" height="520" fill="url(#bgMount)" />
        {/* Espectro sonoro arquitectónico */}
        <g transform="translate(760, 260)" opacity="0.32">
          {Array.from({ length: 32 }).map((_, i) => {
            const x = i * 20;
            const h = 40 + ((i * 37) % 160);
            return (
              <rect
                key={i}
                x={x}
                y={-h / 2}
                width="8"
                height={h}
                fill={i % 4 === 0 ? '#E8B4BC' : '#FAF3F4'}
                opacity={0.35 + (i % 3) * 0.2}
              />
            );
          })}
        </g>
        <path
          d="M0 470 L210 380 L430 430 L680 310 L890 390 L1150 280 L1440 390 L1440 520 L0 520 Z"
          fill="#110C0D"
          opacity="0.8"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full object-cover"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="spotStage" cx="72%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#721422" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#261317" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#110D0E" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="1440" height="520" fill="url(#spotStage)" />
      {/* Haces de luz escénica */}
      <polygon points="980,0 700,520 1120,520" fill="#FAF3F4" opacity="0.06" />
      <polygon points="1180,0 920,520 1360,520" fill="#E8A4AE" opacity="0.08" />
      {/* Cabina / estructura de amplificadores */}
      <g transform="translate(880, 145)" opacity="0.22" stroke="#FAF3F4" strokeWidth="1.4" fill="none">
        <rect x="0" y="0" width="210" height="270" />
        <line x1="0" y1="85" x2="210" y2="85" />
        <circle cx="62" cy="145" r="34" />
        <circle cx="148" cy="145" r="34" />
        <circle cx="62" cy="222" r="34" />
        <circle cx="148" cy="222" r="34" />
        <rect x="230" y="40" width="160" height="230" />
        <circle cx="310" cy="115" r="42" />
        <circle cx="310" cy="208" r="42" />
      </g>
      {/* Horizonte urbano y cerros */}
      <path
        d="M0 430 L160 365 L350 405 L560 315 L770 390 L980 285 L1220 370 L1440 310 L1440 520 L0 520 Z"
        fill="#0D090A"
        opacity="0.72"
      />
    </svg>
  );
};

export const ArchivalPosterArt: React.FC<{ variant: GraphicArchiveItem['posterVariant'] }> = ({
  variant,
}) => {
  switch (variant) {
    case 'chiguaza':
      return (
        <div className="relative w-full h-full bg-[#FAF6F4] border border-[#E5DCDC] p-4 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex justify-between items-start border-b border-[#721422]/30 pb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#721422]">
              III EDICIÓN · 2025
            </span>
            <span className="font-mono text-[10px] text-[#594D4F]">CIRCUITOS B &amp; C</span>
          </div>
          <div className="my-auto py-2">
            <p className="font-serif text-xl font-bold tracking-tight text-[#1A1415] leading-none">
              CHIGUAZA
            </p>
            <p className="font-serif text-lg italic text-[#721422] leading-tight mt-0.5">
              Rock Fest
            </p>
            <svg viewBox="0 0 220 46" className="w-full h-9 mt-2" aria-hidden="true">
              <path
                d="M0 38 L32 14 L58 29 L95 7 L135 28 L168 12 L220 38"
                fill="none"
                stroke="#721422"
                strokeWidth="2"
              />
              <line x1="0" y1="42" x2="220" y2="42" stroke="#1A1415" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#594D4F] border-t border-[#E5DCDC] pt-1.5">
            <span>MANAGUA · CDC LA VICTORIA</span>
            <span>NOV 2025</span>
          </div>
        </div>
      );

    case 'rockween':
      return (
        <div className="relative w-full h-full bg-[#1C1416] text-white p-4 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-white/15 pb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#E8A4AE]">
              31 OCT · 2026
            </span>
            <span className="font-mono text-[10px] text-white/70">ENTRADA LIBRE</span>
          </div>
          <div className="my-auto">
            <p className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
              ROCKWEEN
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8A4AE] mt-1">
              San Cristóbal Sur
            </p>
            <div className="mt-3 h-1 w-16 bg-[#721422]" />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-white/65 border-t border-white/15 pt-1.5">
            <span>C.C. 20 DE JULIO</span>
            <span>@bassmirror</span>
          </div>
        </div>
      );

    case 'gutural':
      return (
        <div className="relative w-full h-full bg-[#240B10] text-white p-4 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#F3CFD4]">
              23 DE MAYO
            </span>
            <span className="font-mono text-[10px] text-[#F3CFD4]">1 KG ALIMENTO</span>
          </div>
          <div className="my-auto text-center py-2">
            <p className="font-serif text-xl font-bold uppercase tracking-wide text-white">
              Bogotá Gutural
            </p>
            <p className="font-mono text-[11px] tracking-[0.25em] text-[#E8A4AE] mt-1">FEST</p>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-white/75 border-t border-white/20 pt-1.5">
            <span>EL ESTRUENDO · CLL 23</span>
            <span>BOG · MEX · BAQ</span>
          </div>
        </div>
      );

    case 'ink':
      return (
        <div className="relative w-full h-full bg-[#FFFFFF] border border-[#E5DCDC] p-4 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-[#1A1415]/15 pb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#721422]">
              6 · 7 JUNIO
            </span>
            <span className="font-mono text-[10px] text-[#594D4F]">TATTOO &amp; ROCK</span>
          </div>
          <div className="my-auto flex items-center justify-between gap-3">
            <div>
              <p className="font-serif text-xl font-bold text-[#1A1415] leading-tight">
                Capital Ink
              </p>
              <p className="font-serif italic text-sm text-[#721422]">Versión San Cristóbal</p>
            </div>
            <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" aria-hidden="true">
              <circle cx="30" cy="30" r="26" stroke="#721422" strokeWidth="1.5" fill="none" />
              <path d="M18 30 L30 16 L42 30 L30 44 Z" stroke="#1A1415" strokeWidth="1.5" fill="none" />
              <circle cx="30" cy="30" r="4" fill="#721422" />
            </svg>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#594D4F] border-t border-[#E5DCDC] pt-1.5">
            <span>VILLA DE LOS ALPES</span>
            <span>@sofia_v.vsg</span>
          </div>
        </div>
      );

    case 'acuerdo':
      return (
        <div className="relative w-full h-full bg-[#721422] text-white p-4 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-white/25 pb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/90">
              REUNIÓN AMPLIADA
            </span>
            <span className="font-mono text-[10px] text-white/80">27 AGO</span>
          </div>
          <div className="my-auto py-2">
            <p className="font-serif text-lg font-semibold leading-snug text-white">
              ¿Qué queremos construir?
            </p>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#F5D3D8] mt-2">
              Memoria · Propuesta · Acuerdo
            </p>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-white/80 border-t border-white/25 pt-1.5">
            <span>SALÓN BARRIO MANAGUA</span>
            <span>MESA LOCAL</span>
          </div>
        </div>
      );

    case 'chikana':
      return (
        <div className="relative w-full h-full bg-[#FAF8F8] border border-[#D8CFCF] p-4 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-[#721422]/30 pb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#721422]">
              IDPAC · 2025
            </span>
            <span className="font-mono text-[10px] text-[#594D4F]">CERTIFICADO</span>
          </div>
          <div className="my-auto text-center py-2">
            <p className="font-serif text-lg font-bold text-[#1A1415]">
              Fondo de Incentivos Chikana
            </p>
            <p className="text-xs text-[#594D4F] mt-1">
              Reconocimiento a la Mesa Local de Rock y Metal
            </p>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#594D4F] border-t border-[#E5DCDC] pt-1.5">
            <span>INSTANCIA PARTICIPATIVA</span>
            <span>21 DIC 2025</span>
          </div>
        </div>
      );
  }
};

export const BandStagePlate: React.FC<{
  variant: BandItem['photoVariant'];
  name: string;
}> = ({ variant, name }) => {
  const palettes: Record<BandItem['photoVariant'], { bg: string; accent: string }> = {
    karga: { bg: '#1D1416', accent: '#9E2334' },
    psicomorbo: { bg: '#22181A', accent: '#721422' },
    immolation: { bg: '#161112', accent: '#B3283B' },
    onix: { bg: '#261719', accent: '#8C1D2E' },
    hanasmusen: { bg: '#1B1618', accent: '#721422' },
    'black-knife': { bg: '#151012', accent: '#961C2F' },
    ashes: { bg: '#1A1315', accent: '#8A1C2D' },
    rainmaker: { bg: '#1F1719', accent: '#721422' },
    'between-souls': { bg: '#161213', accent: '#9A2133' },
    archivo: { bg: '#2A1D20', accent: '#721422' },
  };

  const { bg, accent } = palettes[variant];

  return (
    <div
      className="relative w-full h-48 overflow-hidden border border-[#E5DCDC] flex items-end p-4"
      style={{ backgroundColor: bg }}
    >
      <svg
        viewBox="0 0 400 180"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-55"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`band-${variant}`} cx="65%" cy="25%" r="70%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={bg} stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <rect width="400" height="180" fill={`url(#band-${variant})`} />
        {variant === 'archivo' ? (
          <g stroke="#FAF3F4" strokeOpacity="0.22" fill="none">
            <rect x="24" y="24" width="84" height="110" />
            <rect x="122" y="18" width="96" height="122" />
            <rect x="232" y="28" width="88" height="106" />
            <rect x="332" y="20" width="48" height="114" />
          </g>
        ) : (
          <g>
            <polygon points="240,0 130,180 350,180" fill="#FAF3F4" opacity="0.08" />
            <circle cx="315" cy="86" r="46" stroke="#FAF3F4" strokeOpacity="0.2" fill="none" />
            <circle cx="315" cy="86" r="28" stroke="#FAF3F4" strokeOpacity="0.2" fill="none" />
            <path
              d="M0 150 Q 95 110 185 140 T 400 130 L 400 180 L 0 180 Z"
              fill="#0E090A"
              opacity="0.72"
            />
          </g>
        )}
      </svg>
      <div className="relative z-10 flex items-end justify-between w-full gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/75 block">
            Registro Documental
          </span>
          <p className="font-serif text-lg font-semibold text-white leading-tight mt-0.5">
            {name}
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/70 shrink-0">
          San Cristóbal Sur
        </span>
      </div>
    </div>
  );
};
