// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import { tablasMarkdown } from './src/lib/tablas-markdown.mjs';
import { descargasMarkdown } from './src/lib/descargas-markdown.mjs';

// SITE_URL y BASE_PATH los define el workflow de GitHub Pages
// (.github/workflows/deploy.yml). En tu computadora no hace falta tocarlos.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base,
  integrations: [mdx()],
  markdown: {
    // Tablas que se convierten en tarjetas en celular y botones de descarga
    processor: satteri({ hastPlugins: [tablasMarkdown, descargasMarkdown(base)] }),
    shikiConfig: {
      // Tema oscuro de alto contraste para el resaltado de código
      theme: 'github-dark-default',
    },
  },
});
