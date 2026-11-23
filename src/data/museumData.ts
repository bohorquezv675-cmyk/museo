export type SectionId =
  | 'inicio'
  | 'quienes-somos'
  | 'propuesta-pedagogica'
  | 'archivos'
  | 'gestores'
  | 'bandas';

export type AudioMotif =
  | 'punk'
  | 'metal'
  | 'extreme'
  | 'heavy'
  | 'prog'
  | 'compilation'
  | 'radio'
  | 'live'
  | 'archive';

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetSection: SectionId;
  credit: string;
  backdropImageSrc?: string;
  posterImageSrc?: string;
  posterObjectPosition?: string;
  variant: 'stage' | 'chiguaza' | 'mountain';
}

export interface PedagogyItem {
  id: string;
  accession: string;
  category: 'formacion' | 'escuelas' | 'incidencia';
  categoryLabel: string;
  partner: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageObjectPosition?: string;
  imageFrameClass?: string;
  wideCard?: boolean;
  imageCredit?: string;
  details: { label: string; value: string }[];
}

export interface GraphicArchiveItem {
  id: string;
  accession: string;
  year: string;
  category: string;
  title: string;
  venue: string;
  dateLabel: string;
  credit: string;
  description: string;
  imageSrc?: string;
  imageObjectPosition?: string;
  posterVariant: 'chiguaza' | 'rockween' | 'gutural' | 'ink' | 'acuerdo' | 'chikana';
}

export interface SoundArchiveItem {
  id: string;
  accession: string;
  collection: string;
  producer: string;
  title: string;
  description: string;
  audioSrc: string;
  motif: AudioMotif;
  durationSec: number;
  dateLabel: string;
}

export interface GestorItem {
  id: string;
  accession: string;
  name: string;
  role: string;
  organization: string;
  summary: string;
  quote: string;
  transcript: { time: string; text: string }[];
  motif: AudioMotif;
  photoImageSrc?: string;
  photoObjectPosition?: string;
  photoCredit?: string;
  videoPlaceholderNote: string;
}

export interface BandItem {
  id: string;
  accession: string;
  name: string;
  searchTokens: string;
  genre: string;
  genreGroup: 'metal' | 'rock' | 'punk' | 'archivo';
  photoCaption: string;
  photoCredit: string;
  photoImageSrc?: string;
  photoObjectPosition?: string;
  photoVariant:
    | 'karga'
    | 'psicomorbo'
    | 'immolation'
    | 'onix'
    | 'hanasmusen'
    | 'black-knife'
    | 'ashes'
    | 'rainmaker'
    | 'between-souls'
    | 'archivo';
  description: string;
  interview: string;
  audioSrc: string;
  motif: AudioMotif;
  durationSec: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    kicker: 'Localidad Cuarta · San Cristóbal Sur, Bogotá',
    title: 'Museo del Rock de San Cristóbal Sur: Espacio dedicado a la memoria y la difusión',
    subtitle:
      'Un espacio digital dedicado a reunir, preservar y difundir los archivos gráficos, registros sonoros, procesos pedagógicos y memorias comunitarias de la cultura rock y metal en el territorio.',
    ctaLabel: 'Explorar Archivos',
    targetSection: 'archivos',
    credit: 'Archivo Museo del Rock de San Cristóbal Sur · Localidad Cuarta',
    variant: 'stage',
  },
  {
    id: 'slide-2',
    kicker: 'Colección Carteles y Festivales · 2025–2026',
    title: 'III Festival Chiguaza Rock Fest y circuitos de apropiación territorial',
    subtitle:
      'Afiches, convocatorias barriales y registros en vivo del Salón Comunal Barrio Managua, el CDC La Victoria y el Polideportivo Villa de los Alpes.',
    ctaLabel: 'Ver Catálogo Gráfico',
    targetSection: 'archivos',
    credit: 'Archivo: @mesarockymetal_sc',
    posterImageSrc: '/assets/aistudio/35081_7beab082.png',
    posterObjectPosition: 'object-[50%_44%]',
    variant: 'chiguaza',
  },
  {
    id: 'slide-3',
    kicker: 'Archivo Sonoro · La 4ta Estudio',
    title: 'Rock desde la montaña Vol. I: «Sonidos ocultos desde San Cristóbal»',
    subtitle:
      'Lanzamiento del compilado musical, convocatorias de grabación, fotografías y entrevistas de las agrupaciones que sostienen la escena.',
    ctaLabel: 'Ir al Directorio de Bandas',
    targetSection: 'bandas',
    credit: 'Archivo: @mesarockymetal_sc · Procultur · La 4ta Estudio',
    posterImageSrc: '/assets/aistudio/35436_cc63dcb6.png',
    posterObjectPosition: 'object-[50%_44%]',
    variant: 'mountain',
  },
];

export const PEDAGOGY_ITEMS: PedagogyItem[] = [
  {
    id: 'ped-sena',
    accession: 'PED-01',
    category: 'formacion',
    categoryLabel: 'Formación Técnica',
    partner: 'Alianza Institucional · SENA',
    title: 'Evaluación y Certificación de Competencias Laborales',
    description:
      'Proceso gratuito impulsado por la Mesa Local de Rock y Metal en alianza con el SENA para certificar oficialmente conocimientos y trayectoria adquirida de forma empírica o académica en la escena.',
    imageSrc: '/assets/aistudio/35017_f300d239.png',
    imageObjectPosition: 'object-[50%_47%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · Alianza SENA',
    details: [
      {
        label: 'Áreas',
        value:
          'Música e interpretación (todos los géneros), técnica y audio (sonidistas, roadies, montaje), gestión y audiovisual (fotógrafos, gestores, creadores de contenido).',
      },
      { label: 'Registro', value: 'Inscripciones hasta el 13 de noviembre · Convocatoria 2026.' },
    ],
  },
  {
    id: 'ped-escuela',
    accession: 'PED-02',
    category: 'escuelas',
    categoryLabel: 'Escuelas y Talleres',
    partner: 'Escuela de Rock · Tu Casa Rock / FDL',
    title: 'Escuela de Rock San Cristóbal',
    description:
      'Proceso formativo dirigido a jóvenes músicos e intérpretes de rock de San Cristóbal en guitarra eléctrica, batería, bajo eléctrico, técnica vocal, teclado (composición), marketing digital y producción básica.',
    imageSrc: '/assets/aistudio/35056_1e242269.png',
    imageObjectPosition: 'object-[50%_38%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · @tucasarock',
    details: [
      {
        label: 'Áreas formativas',
        value: 'Guitarra eléctrica, batería, bajo eléctrico, técnica vocal, teclado, marketing y producción básica.',
      },
      {
        label: 'Cierre',
        value: 'Participación de las agrupaciones en concierto de cierre territorial.',
      },
    ],
  },
  {
    id: 'ped-master-vocal',
    accession: 'PED-03',
    category: 'escuelas',
    categoryLabel: 'Escuelas y Talleres',
    partner: 'Escuela de Rock · CDC La Victoria',
    title: 'Master Class de Técnica Vocal — Amos Piñeros',
    description:
      'Sesión formativa de técnica vocal orientada por Amos Piñeros, referente del rock colombiano con trayectoria en agrupaciones como Ultrágeno, Catedral, Tequendama y Mástil.',
    imageSrc: '/assets/aistudio/35054_52e17e21.png',
    imageObjectPosition: 'object-[50%_36%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · @tucasarock',
    details: [
      {
        label: 'Fecha y horario',
        value: 'Sábado 2 y domingo 3 de mayo · 8:00 a. m. a 12:00 p. m.',
      },
      {
        label: 'Lugar',
        value: 'CDC La Victoria · Proyecto apoyado por el FDL de San Cristóbal.',
      },
    ],
  },
  {
    id: 'ped-master-bajo',
    accession: 'PED-04',
    category: 'escuelas',
    categoryLabel: 'Escuelas y Talleres',
    partner: 'Escuela de Rock · CDC La Victoria',
    title: 'Master Class de Bajo Eléctrico — Hans Joachim Vollert',
    description:
      'Encuentro formativo de bajo eléctrico orientado por Hans Joachim Vollert (Mástil, V For Volume, Raíz, Koyi K Utho, Ultrágeno), enfocado en técnica, ensamble y experiencia en grandes escenarios.',
    imageSrc: '/assets/aistudio/35052_f4e21941.png',
    imageObjectPosition: 'object-[50%_38%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · @tucasarock',
    details: [
      {
        label: 'Fecha y horario',
        value: 'Sábado 9 de mayo (2:00 p. m. a 6:00 p. m.) y domingo 10 de mayo (8:00 a. m. a 12:00 p. m.).',
      },
      {
        label: 'Lugar',
        value: 'CDC La Victoria · San Cristóbal Sur.',
      },
    ],
  },
  {
    id: 'ped-master-gutural',
    accession: 'PED-05',
    category: 'escuelas',
    categoryLabel: 'Escuelas y Talleres',
    partner: 'Sala Dohko · Más Cultura Local',
    title: 'Master Class de Voz con Énfasis en Gutural — Juan K del Río',
    description:
      'Taller gratuito dirigido a participantes desde los 14 años sobre técnica vocal contemporánea, respiración, control de potencia, introducción a la técnica gutural y expresión escénica.',
    imageSrc: '/assets/aistudio/35028_3c5b2c61.png',
    imageObjectPosition: 'object-[50%_50%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · Sala Dohko',
    details: [
      {
        label: 'Fecha y lugar',
        value: 'Sábado 30 de mayo de 2026 · 4:00 p. m. · Calle 36 L Sur # 6-65 Este, La Victoria.',
      },
      {
        label: 'Formador',
        value: 'Juan K del Río (Razón de Ser, Break Stuff).',
      },
    ],
  },
  {
    id: 'ped-muestra-final',
    accession: 'PED-06',
    category: 'escuelas',
    categoryLabel: 'Escuelas y Talleres',
    partner: 'Escuela de Rock · Casa Rock',
    title: 'Muestra Final de la Escuela de Rock',
    description:
      'Concierto de cierre y socialización de resultados del proceso formativo en el CDC La Victoria con la participación de agrupaciones locales en proceso de circulación.',
    imageSrc: '/assets/aistudio/35025_33001ecc.png',
    imageObjectPosition: 'object-[50%_52%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · @tucasarock',
    details: [
      {
        label: 'Bandas participantes',
        value: 'Karga Inerte, Psicomorbo, Visajes del Palenque, C.R. Ensamble y Caminos del Cerro.',
      },
      {
        label: 'Fecha y lugar',
        value: 'Domingo 14 de junio de 1:00 p. m. a 6:00 p. m. · CDC La Victoria.',
      },
    ],
  },
  {
    id: 'ped-casa-rock-muestra',
    accession: 'PED-07',
    category: 'escuelas',
    categoryLabel: 'Escuelas y Talleres',
    partner: 'Casa Rock · Tu Casa Rock',
    title: 'Rock Muestra Final — Concierto de Cierre Casa Rock',
    description:
      'Cartel de difusión de la jornada de cierre en el CDC La Victoria articulada por Casa Rock y la Mesa Local de Rock y Metal para proyectar a las bandas participantes.',
    imageSrc: '/assets/aistudio/35026_345eba67.png',
    imageObjectPosition: 'object-[50%_52%]',
    imageCredit: 'Archivo: @tucasarock · @mesarockymetal_sc',
    details: [
      {
        label: 'Escenario',
        value: 'CDC La Victoria · Domingo 14 de junio de 1:00 p. m. a 6:00 p. m.',
      },
    ],
  },
  {
    id: 'ped-marketing',
    accession: 'PED-08',
    category: 'formacion',
    categoryLabel: 'Formación Técnica',
    partner: 'Gestión y Circulación · Procultur',
    title: 'Taller de Marketing Musical — Jasa Rhem',
    description:
      'Espacio formativo orientado por Jasa Rhem en articulación con Procultur y la Mesa Local de Rock y Metal sobre estrategias eficaces de difusión, circulación y posicionamiento para proyectos musicales.',
    imageSrc: '/assets/aistudio/35024_680e1100.png',
    imageObjectPosition: 'object-[50%_48%]',
    imageCredit: 'Archivo: @mesarockymetal_sc · @procultur.sc',
    details: [
      {
        label: 'Enfoque',
        value: 'Algunas estrategias eficaces, prensa independiente y circulación territorial.',
      },
      {
        label: 'Registro',
        value: 'Jornada realizada en articulación con Procultur.',
      },
    ],
  },
  {
    id: 'ped-produccion',
    accession: 'PED-09',
    category: 'formacion',
    categoryLabel: 'Formación Técnica',
    partner: 'Producción Musical · El Rancho Record',
    title: 'Taller: Aprende Producción Musical',
    description:
      'Proceso formativo teórico-práctico orientado por el maestro y baterista Carlos Urraya, dirigido a artistas y agentes musicales de San Cristóbal (Más Cultura Local / FDL San Cristóbal).',
    imageSrc: '/assets/aistudio/35420_1ce4f420.png',
    imageObjectPosition: 'object-[50%_32%]',
    imageCredit: 'Carlos Urraya · Registro: @smutsmetalband',
    details: [
      {
        label: 'Contenidos',
        value: 'Mezcla y masterización, identidad sonora, capturas de audio y creación de pieza musical.',
      },
      { label: 'Lema', value: '«Tu música no se queda en el ensayo, se muestra».' },
    ],
  },
  {
    id: 'ped-mujeres',
    accession: 'PED-10',
    category: 'incidencia',
    categoryLabel: 'Memoria e Incidencia',
    partner: 'Almas Rocas · Saquina / Mesa Local',
    title: 'Reunión y Encuentro de Mujeres en el Territorio',
    description:
      'Espacio de convergencia e incidencia femenina en San Cristóbal Sur reunido por artistas, emprendedoras, productoras y gestoras culturales en torno a Almas Rocas, el taller de customización y el conversatorio «Mujeres, Rock y Territorio».',
    imageSrc: '/assets/aistudio/35445__1__520e1594.png',
    imageObjectPosition: 'object-[50%_34.75%]',
    imageFrameClass: 'aspect-[16/8.6] w-full',
    wideCard: true,
    imageCredit: 'Archivo: @saquina_z · @mesarockymetal_sc',
    details: [
      {
        label: 'Procesos',
        value:
          'Reunión de convergencia Almas Rocas y primera sesión del taller de customización de ropa (27 de febrero).',
      },
      {
        label: 'Conversatorio 14 de marzo (Biblioteca La Victoria)',
        value:
          'Patricia Gómez (moderadora), M. Liliana López, Carolina Repizo, Eloisa Rico y Carolina Briceño.',
      },
    ],
  },
  {
    id: 'ped-acuerdo',
    accession: 'PED-11',
    category: 'incidencia',
    categoryLabel: 'Memoria e Incidencia',
    partner: 'Incidencia y Participación · Acuerdo Local',
    title: 'Reuniones Ampliadas y Acuerdo Local de Rock y Metal',
    description:
      'Asambleas abiertas y espacios deliberativos convocados con bandas, artistas, gestores, colectivos y medios en el Salón Comunal Barrio Managua y el CDC La Victoria para construir colectivamente el Proyecto de Acuerdo Local de Rock y Metal y articularse con el Fondo Chikana (IDPAC).',
    imageSrc: '/assets/aistudio/35020_bb5e8aa8.png',
    imageObjectPosition: 'object-[50%_45%]',
    imageCredit: 'Archivo: @mesarockymetal_sc',
    details: [
      {
        label: 'Escenarios',
        value: 'Salón Comunal Barrio Managua (Kra. 8 # 35-51 Sur) y CDC La Victoria.',
      },
      {
        label: 'Ejes',
        value: 'Memoria, propuesta, acuerdo comunitario y presupuestos participativos.',
      },
    ],
  },
];

export const GRAPHIC_ARCHIVES: GraphicArchiveItem[] = [
  {
    id: 'graf-chiguaza',
    accession: 'ARC-GR-001',
    year: '2025',
    category: 'Cartel de Festival',
    title: 'III Festival Chiguaza Rock Fest (2025) — Grupo B',
    venue: 'Salón Comunal Barrio Managua · CDC La Victoria',
    dateLabel: '9 de noviembre de 2025',
    credit: 'Archivo: @mesarockymetal_sc',
    description:
      'Cartel del Segundo Circuito de Eliminación (Grupo B) en el Salón Comunal Barrio Managua (Kra. 8 # 35-51 Sur) con Legion for Death, Ashes, Onixx, Recalentado, Hanasmusen, Machina Dei, Los Olvidados y Rhyme of Tears.',
    imageSrc: '/assets/aistudio/35081_7beab082.png',
    imageObjectPosition: 'object-[50%_44%]',
    posterVariant: 'chiguaza',
  },
  {
    id: 'graf-rockween',
    accession: 'ARC-GR-002',
    year: '2026',
    category: 'Cartel de Festival',
    title: 'Rockween San Cristóbal 2026',
    venue: 'Frente al Centro Comercial 20 de Julio',
    dateLabel: 'Sábado 31 de octubre de 2026 · 1:00 p. m.',
    credit: 'Archivo: @mesarockymetal_sc · Bazar 20 de Julio',
    description:
      'Pieza gráfica oficial del festival de Halloween de la localidad realizado frente al Centro Comercial 20 de Julio con entrada libre, junto a agrupaciones como Maniac, Smuts, Internal Self Immolation, Azghort, A.S.M.A., Unbroken y The Wild Side.',
    imageSrc: '/assets/aistudio/35435_c980c48a.png',
    imageObjectPosition: 'object-[50%_53%]',
    posterVariant: 'rockween',
  },
  {
    id: 'graf-almas-rocas',
    accession: 'ARC-GR-003',
    year: '2026',
    category: 'Circuito Musical',
    title: 'Almas Rocas — Circuito Musical San Cristóbal',
    venue: 'C.C. Bazar 20 de Julio (frente al Éxito)',
    dateLabel: 'Sábado 25 de abril de 2026 · Desde el mediodía',
    credit: 'Archivo: @saquina_z · @mesarockymetal_sc',
    description:
      'Cartel del circuito musical con entrada libre apoyado por el FDL de San Cristóbal y Más Cultura Local, con Rhyme of Tears, No Dependiente (NXD), Kvrdera, Kraisler A.B., Urnabyk, Ashes e Interrogantex.',
    imageSrc: '/assets/aistudio/35058_13ba2bb8.png',
    imageObjectPosition: 'object-[50%_48%]',
    posterVariant: 'chiguaza',
  },
  {
    id: 'graf-lanzamiento-4ta',
    accession: 'ARC-GR-011',
    year: '2026',
    category: 'Lanzamiento Sonoro',
    title: 'La 4ta Estudio — Rock desde la montaña Vol. I «Sonidos ocultos desde San Cristóbal»',
    venue: 'Salón Comunal Barrio Managua (Kra. 8 # 35-51 Sur)',
    dateLabel: 'Viernes 22 de mayo de 2026 · 7:00 p. m.',
    credit: 'Archivo: @mesarockymetal_sc · Procultur',
    description:
      'Cartel oficial del lanzamiento del compilado musical «Rock desde la montaña Vol. I: Sonidos ocultos desde San Cristóbal» en el Salón Comunal Managua, con Black Knife, Las Señoras, Black Thunder y agrupaciones invitadas de México.',
    imageSrc: '/assets/aistudio/35436_cc63dcb6.png',
    imageObjectPosition: 'object-[50%_44%]',
    posterVariant: 'acuerdo',
  },
  {
    id: 'graf-4ta-estudio',
    accession: 'ARC-GR-004',
    year: '2026',
    category: 'Convocatoria Sonora',
    title: 'La 4ta Estudio — Convocatoria para Bandas de Rock',
    venue: 'Localidad San Cristóbal Sur · Procultur / Mesa Local',
    dateLabel: 'Cierre: 18 de marzo de 2026',
    credit: 'Archivo: @mesarockymetal_sc · Procultur',
    description:
      'Pieza de convocatoria del proyecto apoyado por Más Cultura Local y el FDL de San Cristóbal para seleccionar 10 agrupaciones independientes y grabar un tema original en estudio.',
    imageSrc: '/assets/aistudio/35069_07ffd730.png',
    imageObjectPosition: 'object-[50%_38%]',
    posterVariant: 'acuerdo',
  },
  {
    id: 'graf-reunion-ampliada',
    accession: 'ARC-GR-005',
    year: '2025',
    category: 'Convocatoria Comunitaria',
    title: 'Reunión Ampliada Mesa Local de Rock y Metal',
    venue: 'CDC La Victoria',
    dateLabel: 'Jueves 16 de octubre de 2025 · 5:45 p. m.',
    credit: 'Archivo: @mesarockymetal_sc',
    description:
      'Afiche informativo con la agenda comunitaria sobre los circuitos de Chiguaza Rock Fest, rendición de cuentas, presupuestos participativos, Fondo Chikana y delegaciones femenina y juvenil.',
    imageSrc: '/assets/aistudio/35084_af15d4d5.png',
    imageObjectPosition: 'object-[50%_52%]',
    posterVariant: 'acuerdo',
  },
  {
    id: 'graf-gutural',
    accession: 'ARC-GR-006',
    year: '2026',
    category: 'Cartel Solidario',
    title: 'Bogotá Gutural Fest',
    venue: 'El Estruendo (Calle 23 # 4-36)',
    dateLabel: '23 de mayo',
    credit: 'Circuito Metal · San Cristóbal / Centro',
    description:
      'Cartel del encuentro en El Estruendo (Calle 23 # 4-36) con intercambio solidario de 1 kg de alimento para perro o gato, articulando bandas locales y visitantes (México y Barranquilla).',
    posterVariant: 'gutural',
  },
  {
    id: 'graf-ink',
    accession: 'ARC-GR-007',
    year: '2026',
    category: 'Convención y Música',
    title: 'Convención de Tatuadores — Capital Ink Fest',
    venue: 'Coliseo / Polideportivo Villa de los Alpes',
    dateLabel: '6 y 7 de junio · Desde las 12:00 p. m.',
    credit: 'Archivo: @mesarockymetal_sc · Registro: @sofia_v.vsg',
    description:
      'Versión San Cristóbal Sur en el Coliseo / Polideportivo Villa de los Alpes (6 y 7 de junio), integrando arte corporal, emprendimientos, bandas locales y recolección de un kilo de alimento para mascotas.',
    imageSrc: '/assets/aistudio/35027_8435ef32.png',
    imageObjectPosition: 'object-[50%_60%]',
    posterVariant: 'ink',
  },
  {
    id: 'graf-acuerdo',
    accession: 'ARC-GR-008',
    year: '2026',
    category: 'Convocatoria Comunitaria',
    title: 'Cartel: ¿Qué queremos construir? Acuerdo Local',
    venue: 'Salón Comunal Barrio Managua (Kra. 8 # 35-51 Sur)',
    dateLabel: 'Jueves 27 de agosto · 5:00 p. m.',
    credit: 'Archivo: @mesarockymetal_sc',
    description:
      'Pieza de convocatoria en el Salón Comunal Barrio Managua bajo los ejes Memoria · Propuesta · Acuerdo para fortalecer el Proyecto de Acuerdo Local de Rock y Metal de San Cristóbal.',
    imageSrc: '/assets/aistudio/35020_bb5e8aa8.png',
    imageObjectPosition: 'object-[50%_45%]',
    posterVariant: 'acuerdo',
  },
  {
    id: 'graf-chikana',
    accession: 'ARC-GR-009',
    year: '2025',
    category: 'Documento Institucional',
    title: 'Reconocimiento Fondo de Incentivos Chikana 2025',
    venue: 'IDPAC · Bogotá D.C.',
    dateLabel: '21 de diciembre de 2025',
    credit: 'Archivo: @mesarockymetal_sc · IDPAC',
    description:
      'Certificado otorgado por el Instituto Distrital de la Participación y Acción Comunal (IDPAC) a la Mesa Local de Rock y Metal de San Cristóbal por su destacada participación y fortalecimiento en el Fondo de Incentivos Chikana 2025.',
    imageSrc: '/assets/aistudio/35076_65a74384.png',
    imageObjectPosition: 'object-[50%_34%]',
    posterVariant: 'chikana',
  },
  {
    id: 'graf-sena',
    accession: 'ARC-GR-010',
    year: '2026',
    category: 'Convocatoria Formativa',
    title: 'Certificación de Competencias Laborales — Alianza SENA',
    venue: 'Localidad San Cristóbal Sur · Mesa Local / SENA',
    dateLabel: 'Inscripciones hasta el 13 de noviembre',
    credit: 'Archivo: @mesarockymetal_sc · SENA',
    description:
      'Cartel de convocatoria gratuita dirigida a músicos, cantantes, instrumentistas, sonidistas, roadies, gestores culturales, fotógrafos y creadores de contenido para certificar su trayectoria empírica o académica.',
    imageSrc: '/assets/aistudio/35017_f300d239.png',
    imageObjectPosition: 'object-[50%_47%]',
    posterVariant: 'acuerdo',
  },
];

export const SOUND_ARCHIVES: SoundArchiveItem[] = [
  {
    id: 'son-montana',
    accession: 'ARC-SN-001',
    collection: 'Compilado Local',
    producer: 'La 4ta Estudio · FDL San Cristóbal',
    title: 'Rock desde la montaña Vol. I: «Sonidos ocultos desde San Cristóbal»',
    description:
      'Lanzamiento realizado el viernes 22 de mayo de 2026 en el Salón Comunal Managua (rueda de prensa e intervención musical en vivo). Proyecto apoyado por el FDL de San Cristóbal y Más Cultura Local.',
    audioSrc: '/audio/sonidos-ocultos-san-cristobal.mp3',
    motif: 'compilation',
    durationSec: 42,
    dateLabel: '22 de mayo de 2026',
  },
  {
    id: 'son-retorno',
    accession: 'ARC-SN-002',
    collection: 'Radio Online',
    producer: 'El Retorno Rock · Procultur',
    title: 'Entrevista y difusión del compilado local',
    description:
      'Emisión radial online realizada el martes 8 de septiembre a las 6:30 p. m. a través de www.elretornorock.com, con participación de agrupaciones locales (como Flagrata) y apoyo de Procultur y la Mesa Local.',
    audioSrc: '/audio/entrevista-el-retorno-rock.mp3',
    motif: 'radio',
    durationSec: 36,
    dateLabel: '8 de septiembre · 6:30 p. m.',
  },
  {
    id: 'son-festivales',
    accession: 'ARC-SN-003',
    collection: 'Registro en Vivo',
    producer: 'Escena Local San Cristóbal',
    title: 'Registros sonoros de festivales barriales',
    description:
      'Capturas de audio en vivo de agrupaciones participantes en Chiguaza Rock Fest, Rockween San Cristóbal 2026 y la Muestra Final de Casa Rock en el CDC La Victoria.',
    audioSrc: '/audio/muestra-en-vivo-sc.mp3',
    motif: 'live',
    durationSec: 48,
    dateLabel: '2025–2026',
  },
];

export const GESTORES_ITEMS: GestorItem[] = [
  {
    id: 'gestor-urraya',
    accession: 'GES-001',
    name: 'Carlos Urraya',
    role: 'Baterista, gestor cultural, productor musical y formador',
    organization: 'El Rancho Record · Mesa Local de Rock y Metal',
    summary:
      'Baterista y gestor cultural de la localidad que lidera procesos de formación técnico-musical (como el taller Aprende Producción Musical), acompañando a bandas locales en mezcla, masterización, identidad sonora y grabación en estudio.',
    quote:
      '«Tu música no se queda en el ensayo, se muestra. Formar en producción musical dentro del barrio permite que las bandas tengan herramientas propias para registrar su memoria sonora.»',
    motif: 'compilation',
    photoImageSrc: '/assets/aistudio/35420_1ce4f420.png',
    photoObjectPosition: 'object-[50%_32%]',
    photoCredit: 'Carlos Urraya en batería · Registro: @smutsmetalband',
    videoPlaceholderNote:
      'Espacio audiovisual testimonial: Carlos Urraya relata su trayectoria como baterista y gestor cultural en San Cristóbal Sur, su labor en El Rancho Record y el acompañamiento técnico a agrupaciones emergentes.',
    transcript: [
      {
        time: '00:00',
        text: 'Presentación personal y origen de su vínculo con la escena rock y metal de San Cristóbal Sur.',
      },
      {
        time: '01:24',
        text: 'El trabajo en El Rancho Record: pasar del ensayo barrial a la captura profesional e identidad sonora.',
      },
      {
        time: '03:10',
        text: 'Articulación con la Mesa Local de Rock y Metal y proyección de los procesos formativos.',
      },
    ],
  },
  {
    id: 'gestor-mesa',
    accession: 'GES-002',
    name: 'Mesa Local de Rock y Metal & Colectivos Aliados',
    role: 'Instancia de participación y articulación territorial',
    organization: 'Saquina / Almas Rocas · Tu Casa Rock · Procultur · San Cristóbal Sur',
    summary:
      'Procesos organizativos que impulsan festivales comunitarios, formación artística, incidencia en el Acuerdo Local de Rock y Metal y espacios de visibilización como el conversatorio Mujeres, Rock y Territorio.',
    quote:
      '«Memoria, propuesta y acuerdo comunitario: sostener la escena en la localidad cuarta exige diálogo intergeneracional, espacios dignos y reconocimiento del trabajo femenino y juvenil.»',
    motif: 'radio',
    videoPlaceholderNote:
      'Espacio reservado para incorporar los testimonios en video de gestoras y gestores de la Mesa Local de Rock y Metal, Saquina / Almas Rocas, Tu Casa Rock y Procultur.',
    transcript: [
      {
        time: '00:00',
        text: 'Historia organizativa de la Mesa Local de Rock y Metal y reconocimiento Fondo Chikana 2025.',
      },
      {
        time: '01:50',
        text: 'Conversatorio Mujeres, Rock y Territorio en la Biblioteca Pública La Victoria.',
      },
      {
        time: '03:40',
        text: 'Construcción colectiva del Proyecto de Acuerdo Local de Rock y Metal en el Salón Comunal Managua.',
      },
    ],
  },
];

export const BANDS_DATA: BandItem[] = [
  {
    id: 'band-psicomorbo',
    accession: 'BND-001',
    name: 'Psicomorbo',
    searchTokens: 'psicomorbo rock metal local casa rock capital ink villa de los alpes',
    genre: 'Rock / Metal Local',
    genreGroup: 'rock',
    photoCaption: 'Psicomorbo · Nueva etapa de la agrupación en Bogotá',
    photoCredit: 'Registro: @cuervo_thomson_official',
    photoImageSrc: '/assets/aistudio/35367_a29df622.png',
    photoObjectPosition: 'object-[50%_26%]',
    photoVariant: 'psicomorbo',
    description:
      'Banda vinculada a los procesos de circulación y formación en San Cristóbal Sur, presente en la Muestra Final de Casa Rock (CDC La Victoria) y en la jornada cultural de Capital Ink Fest.',
    interview:
      '«Cada presentación en la localidad es una oportunidad para conectar con nuevos públicos y demostrar que en San Cristóbal hay propuestas con identidad visual y sonora propia.»',
    audioSrc: '/audio/psicomorbo.mp3',
    motif: 'metal',
    durationSec: 38,
  },
  {
    id: 'band-karga-inerte',
    accession: 'BND-002',
    name: 'Karga Inerte',
    searchTokens: 'karga inerte metal punk enfermizo chiguaza casa rock capital ink',
    genre: 'Metal Punk Enfermizo',
    genreGroup: 'punk',
    photoCaption: 'Karga Inerte en vivo · Capital Ink Fest, Polideportivo Villa de los Alpes',
    photoCredit: 'Registro: @mesarockymetal_sc · @capital_ink_fest',
    photoImageSrc: '/assets/aistudio/35364_e056bdec.png',
    photoObjectPosition: 'object-[50%_42%]',
    photoVariant: 'karga',
    description:
      'Agrupación activa en los circuitos locales de San Cristóbal Sur, con participación destacada en el Tercer Circuito de Eliminación del III Festival Chiguaza Rock Fest 2025 (CDC La Victoria), la Muestra Final de Casa Rock y el Capital Ink Fest.',
    interview:
      '«Tocar en los escenarios del barrio mantiene vivo el encuentro directo con la gente; la autogestión y los festivales locales nos permiten compartir nuestra propuesta sin perder la raíz territorial.»',
    audioSrc: '/audio/karga-inerte.mp3',
    motif: 'punk',
    durationSec: 34,
  },
  {
    id: 'band-black-knife',
    accession: 'BND-003',
    name: 'Black Knife Band',
    searchTokens: 'black knife band metal bogota colombia oscura radio tv asco y metal ep procultur',
    genre: 'Metal · Bogotá, Colombia',
    genreGroup: 'metal',
    photoCaption: 'Black Knife Band · Sesión fotográfica Detrás de cámara',
    photoCredit: 'Registro: Procultur (@procultur.sc)',
    photoImageSrc: '/assets/aistudio/35360_ae9e5d79.png',
    photoObjectPosition: 'object-[50%_18%]',
    photoVariant: 'black-knife',
    description:
      'Agrupación de metal originaria de Bogotá, Colombia. Ha participado en espacios de diálogo y difusión como las entrevistas realizadas en Oscura Radio TV y presentó recientemente el adelanto de su primer EP con la canción «Asco y Metal».',
    interview:
      '«El adelanto de nuestro primer EP con “Asco y Metal” recoge la fuerza del sonido directo; espacios de difusión como Oscura Radio TV permiten que el metal bogotano siga circulando y dialogando con la audiencia.»',
    audioSrc: '/audio/black-knife-asco-y-metal.mp3',
    motif: 'metal',
    durationSec: 42,
  },
  {
    id: 'band-maniac',
    accession: 'BND-004',
    name: 'Maniac',
    searchTokens: 'maniac thrash metal colombia rockween 20 de julio san cristobal',
    genre: 'Thrash Metal',
    genreGroup: 'metal',
    photoCaption: 'Maniac en vivo · Rockween San Cristóbal, frente al Centro Comercial 20 de Julio',
    photoCredit: 'Archivo: @maniac_colombia · @mesarockymetal_sc',
    photoImageSrc: '/assets/aistudio/35434_3016a6fe.png',
    photoObjectPosition: 'object-[50%_40%]',
    photoVariant: 'immolation',
    description:
      'Agrupación de Thrash Metal participante en Rockween San Cristóbal frente al Centro Comercial 20 de Julio, destacando por su energía en tarima y la conexión directa con el público de la localidad.',
    interview:
      '«El thrash metal se vive en familia. Llegar a Rockween en San Cristóbal, frente al 20 de Julio, dejó una noche llena de metal y encuentro con la escena local.»',
    audioSrc: '/audio/maniac.mp3',
    motif: 'extreme',
    durationSec: 40,
  },
  {
    id: 'band-onix',
    accession: 'BND-005',
    name: 'Onix',
    searchTokens: 'onix hard heavy metal chiguaza managua capital ink',
    genre: 'Hard Heavy Metal',
    genreGroup: 'metal',
    photoCaption: 'Onix en tarima · Capital Ink Fest, Polideportivo Villa de los Alpes',
    photoCredit: 'Registro: @mesarockymetal_sc · @capital_ink_fest',
    photoImageSrc: '/assets/aistudio/35363_a6d8521d.png',
    photoObjectPosition: 'object-[50%_42%]',
    photoVariant: 'onix',
    description:
      'Banda de Hard Heavy Metal con presencia constante en los festivales de la localidad, incluyendo el Segundo Circuito del III Festival Chiguaza Rock Fest 2025 (Salón Comunal Barrio Managua) y Capital Ink Fest.',
    interview:
      '«El heavy metal en San Cristóbal se sostiene con disciplina, ensayo y apoyo mutuo entre músicos de distintas generaciones.»',
    audioSrc: '/audio/onix.mp3',
    motif: 'heavy',
    durationSec: 44,
  },
  {
    id: 'band-hanasmusen',
    accession: 'BND-006',
    name: 'Hanasmusen',
    searchTokens: 'hanasmusen death metal alternativo rock progresivo chiguaza managua',
    genre: 'Death Metal Alternativo / Rock Progresivo',
    genreGroup: 'rock',
    photoCaption: 'Hanasmusen en vivo · Circuito local de San Cristóbal Sur',
    photoCredit: 'Archivo fotográfico de la agrupación',
    photoImageSrc: '/assets/aistudio/32309_72aa359e.jpg',
    photoObjectPosition: 'object-center',
    photoVariant: 'hanasmusen',
    description:
      'Agrupación participante en los circuitos de circulación de la escena local, registrada en el Segundo Circuito de Eliminación del III Festival Chiguaza Rock Fest 2025 en el Salón Comunal Barrio Managua.',
    interview:
      '«Explorar sonoridades pesadas y alternativas desde lo local nos permite dialogar con la memoria del territorio y aportar nuevas búsquedas musicales a la escena.»',
    audioSrc: '/audio/hanasmusen.mp3',
    motif: 'prog',
    durationSec: 46,
  },
  {
    id: 'band-ashes',
    accession: 'BND-007',
    name: 'Ashes',
    searchTokens: 'ashes melodic death metal bogota chiguaza almas rocas rolo375',
    genre: 'Melodic Death Metal',
    genreGroup: 'metal',
    photoCaption: 'Ashes en vivo · Escenario local, Bogotá D.C.',
    photoCredit: 'Foto: @rolo375 · Fotografía Rolando RR',
    photoImageSrc: '/assets/aistudio/35417_52363b6b.png',
    photoObjectPosition: 'object-[50%_55%]',
    photoVariant: 'ashes',
    description:
      'Agrupación de Melodic Death Metal con amplia participación en los circuitos de San Cristóbal Sur, presente en el Segundo Circuito del III Festival Chiguaza Rock Fest 2025 (Salón Comunal Barrio Managua) y en el Circuito Musical Almas Rocas.',
    interview:
      '«Cada presentación en los circuitos locales reafirma la disciplina escénica y la fuerza del metal melódico construido desde Bogotá.»',
    audioSrc: '/audio/ashes.mp3',
    motif: 'extreme',
    durationSec: 40,
  },
  {
    id: 'band-rainmaker',
    accession: 'BND-008',
    name: 'Rainmaker',
    searchTokens: 'rainmaker rock metal bogota san cristobal estudio',
    genre: 'Rock / Metal Alternativo',
    genreGroup: 'rock',
    photoCaption: 'Rainmaker · Registro en sala de ensayo',
    photoCredit: 'Archivo: @rainmakeroficial',
    photoImageSrc: '/assets/aistudio/35419_c11ad5c5.png',
    photoObjectPosition: 'object-[50%_48%]',
    photoVariant: 'rainmaker',
    description:
      'Agrupación documentada en la escena de San Cristóbal Sur, articulada a los procesos de ensayo, grabación y circulación independiente de la localidad.',
    interview:
      '«El trabajo constante en sala de ensayo y la producción independiente permiten consolidar una propuesta sólida para los escenarios locales.»',
    audioSrc: '/audio/rainmaker.mp3',
    motif: 'heavy',
    durationSec: 39,
  },
  {
    id: 'band-between-souls',
    accession: 'BND-009',
    name: 'Between Souls',
    searchTokens: 'between souls metal cultura san cristobal bogota',
    genre: 'Metal · Bogotá',
    genreGroup: 'metal',
    photoCaption: 'Between Souls en vivo · Jornada Metal + Cultura en San Cristóbal',
    photoCredit: 'Archivo: @between_souls_of',
    photoImageSrc: '/assets/aistudio/35403_4cf7f0a6.png',
    photoObjectPosition: 'object-[50%_54%]',
    photoVariant: 'between-souls',
    description:
      'Banda participante en las jornadas de circulación Metal + Cultura en San Cristóbal Sur (julio de 2025), fortaleciendo la presencia del metal en escenarios comunitarios de la localidad.',
    interview:
      '«Compartir escenario en San Cristóbal durante Metal + Cultura demostró la entrega del público y la importancia de sostener espacios culturales en el territorio.»',
    audioSrc: '/audio/between-souls.mp3',
    motif: 'metal',
    durationSec: 41,
  },
  {
    id: 'band-archivo-local',
    accession: 'BND-010',
    name: 'Compilado Musical y Agrupaciones Locales (En catalogación)',
    searchTokens:
      'compilado musical la 4ta estudio rock desde la montana sonidos ocultos desde san cristobal las senoras black thunder internal self immolation flagrata visajes del palenque cr ensamble caminos del cerro legion for death recalentado machina dei los olvidados rhyme of tears korkvak dead silence hybrid minds azghort asma unbroken wild side kvrdera kraisler urnabyk',
    genre: 'Rock · Metal · Punk · Alternativo',
    genreGroup: 'archivo',
    photoCaption:
      'Compilado Musical La 4ta Estudio — Rock desde la montaña Vol. I «Sonidos ocultos desde San Cristóbal»',
    photoCredit: 'Archivo: @mesarockymetal_sc · Procultur · La 4ta Estudio',
    photoImageSrc: '/assets/aistudio/35436_cc63dcb6.png',
    photoObjectPosition: 'object-[50%_42%]',
    photoVariant: 'archivo',
    description:
      'Compilado musical y agrupaciones documentadas en los carteles y memorias de San Cristóbal en proceso de ampliación de ficha: Las Señoras, Black Thunder, Internal Self Immolation, Flagrata, Visajes del Palenque, C.R. Ensamble, Caminos del Cerro, Legion for Death, Recalentado, Machina Dei, Los Olvidados, Rhyme of Tears, Korkvak, Dead Silence, Hybrid Minds, Azghort, A.S.M.A, Unbroken, Wild Side, Kvrdera, Kraisler A.B. y Urnabyk.',
    interview:
      'Nota curatorial: Cada una de estas agrupaciones contará con su ficha individualizada a medida que se incorporen sus entrevistas y registros sonoros al museo.',
    audioSrc: '/audio/archivo-bandas-sc.mp3',
    motif: 'archive',
    durationSec: 38,
  },
];
