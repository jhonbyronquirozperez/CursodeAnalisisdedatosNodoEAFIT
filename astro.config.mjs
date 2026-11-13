// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import { tablasMarkdown } from './src/lib/tablas-markdown.mjs';
import { enlacesMarkdown } from './src/lib/enlaces-markdown.mjs';
import { imagenesMarkdown } from './src/lib/imagenes-markdown.mjs';
import { espaciosMarkdown } from './src/lib/espacios-markdown.mjs';

// SITE_URL y BASE_PATH los define el workflow de GitHub Pages
// (.github/workflows/deploy.yml). En tu computadora no hace falta tocarlos.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base,
  integrations: [mdx()],
  markdown: {
    // Tablas que se convierten en tarjetas en celular, botones de descarga,
    // enlaces externos en pestaña nueva, imágenes de public/imagenes/
    // (con recuadro si el archivo no existe) y el símbolo ␣ en el código
    processor: satteri({
      hastPlugins: [
        tablasMarkdown,
        enlacesMarkdown(base),
        imagenesMarkdown(base),
        espaciosMarkdown,
      ],
    }),
    shikiConfig: {
      // Tema oscuro de alto contraste para el resaltado de código
      theme: 'github-dark-default',
    },
  },
});
