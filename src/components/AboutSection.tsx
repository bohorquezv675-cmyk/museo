import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="border-b border-[#E5DCDC] pb-6 mb-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
          Proyecto de Trabajo de Grado · Licenciatura en Artes Visuales
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1415] mt-2 [text-wrap:balance]">
          Quiénes somos
        </h1>
        <p className="text-sm sm:text-base text-[#594D4F] mt-2">
          Universidad Pedagógica Nacional (UPN) · Localidad Cuarta de San Cristóbal Sur, Bogotá
        </p>
      </div>

      {/* Ensayo editorial con ancho óptimo de lectura y letra capital */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <article className="max-w-2xl">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1415] mb-5">
              Investigación, archivo y memoria del rock en San Cristóbal Sur
            </h2>

            <p className="text-[15.5px] leading-[1.8] text-[#2B2325] mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#721422] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              El <strong>Museo del Rock de San Cristóbal Sur</strong>, un espacio dedicado a
              la memoria y la difusión, nace como proyecto de trabajo de grado de la{' '}
              <strong>Licenciatura en Artes Visuales de la Universidad Pedagógica Nacional</strong>,
              orientado a investigar cómo la conservación, organización y puesta en circulación de
              archivos gráficos y sonoros permite acercar, visibilizar y difundir la historia del
              rock y el metal en la localidad.
            </p>

            <p className="text-[15.5px] leading-[1.8] text-[#2B2325] mb-8">
              Lejos de entender el archivo como un depósito estático, esta propuesta concibe los
              afiches, fotografías de conciertos, convocatorias comunitarias, producciones
              musicales y testimonios orales como soportes vivos de identidad territorial. A través
              de este entorno digital, se busca articular las memorias de bandas, gestores
              culturales y espacios autogestionados para reconocer la escena del rock y el metal en
              San Cristóbal como patrimonio cultural local.
            </p>
          </article>

          {/* Cita destacada editorial con divisores finos superior e inferior */}
          <blockquote className="my-10 py-7 border-y border-[#721422]/35 max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422] block mb-3">
              Pregunta de Investigación
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#1A1415] leading-snug">
              «¿De qué manera la articulación de archivos gráficos y sonoros en un museo digital del
              rock visibiliza las identidades de la comunidad como patrimonio local en San
              Cristóbal Sur en la actualidad?»
            </p>
          </blockquote>
        </div>

        {/* Columna lateral de ficha institucional */}
        <aside className="lg:col-span-4 border border-[#E5DCDC] bg-[#FAF8F8] p-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422] block mb-4">
            Ficha Institucional
          </span>
          <dl className="divide-y divide-[#E5DCDC] text-sm">
            <div className="py-3 first:pt-0">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#594D4F]">
                Institución Académica
              </dt>
              <dd className="text-[#1A1415] font-medium mt-1">
                Universidad Pedagógica Nacional · Licenciatura en Artes Visuales
              </dd>
            </div>
            <div className="py-3">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#594D4F]">
                Territorio
              </dt>
              <dd className="text-[#1A1415] font-medium mt-1">
                Localidad 4ta San Cristóbal Sur, Bogotá D.C.
              </dd>
            </div>
            <div className="py-3">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#594D4F]">
                Ejes del Archivo
              </dt>
              <dd className="text-[#1A1415] mt-1">
                Memoria gráfica, registros sonoros, pedagogía territorial y testimonio oral.
              </dd>
            </div>
            <div className="py-3 last:pb-0">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#594D4F]">
                Articulación
              </dt>
              <dd className="text-[#1A1415] mt-1">
                Mesa Local de Rock y Metal, salones comunales, CDC La Victoria y bibliotecas
                públicas.
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Dos pilares complementarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-8 border-t border-[#E5DCDC]">
        <div className="border border-[#E5DCDC] bg-white p-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
            01 · Tejido Comunitario
          </span>
          <h3 className="font-serif text-xl font-semibold text-[#1A1415] mt-2 mb-3">
            Articulación comunitaria
          </h3>
          <p className="text-sm text-[#594D4F] leading-relaxed">
            El archivo dialoga con los procesos organizativos de la{' '}
            <strong className="text-[#1A1415]">Mesa Local de Rock y Metal de San Cristóbal</strong>,
            colectivos culturales, espacios comunitarios (salones comunales, CDC La Victoria,
            bibliotecas públicas) y agrupaciones independientes.
          </p>
        </div>

        <div className="border border-[#E5DCDC] bg-white p-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#721422]">
            02 · Curaduría Digital
          </span>
          <h3 className="font-serif text-xl font-semibold text-[#1A1415] mt-2 mb-3">
            Dimensión visual y sonora
          </h3>
          <p className="text-sm text-[#594D4F] leading-relaxed">
            Desde las artes visuales, se propone una museografía digital accesible que reúne la
            estética gráfica de la escena (flyers, logotipos, fotografía documental) junto con su
            memoria acústica y testimonial.
          </p>
        </div>
      </div>
    </section>
  );
};
