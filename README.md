# Museo del Rock de San Cristóbal Sur — Espacio dedicado a la memoria y la difusión

Archivo vivo de memoria gráfica, sonora, pedagógica y comunitaria del rock y el metal en la Localidad 4ta de San Cristóbal Sur (Bogotá), diseñado con estética editorial museográfica (blanco y vino tinto).

## Cómo ejecutar en Visual Studio Code

1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Abre la terminal integrada (`Ctrl + ñ` o `Terminal > New Terminal`).
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre en tu navegador la dirección `http://localhost:3000`.

## Cómo agregar archivos MP3 reales

Si deseas reemplazar las muestras sonoras integradas por grabaciones `.mp3` reales, crea la carpeta `public/audio/` y guarda los archivos con el nombre indicado en `src/data/museumData.ts` (por ejemplo `public/audio/karga-inerte.mp3`). El reproductor detectará automáticamente los archivos locales.
