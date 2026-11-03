// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// SITE_URL y BASE_PATH los define el workflow de GitHub Pages
// (.github/workflows/deploy.yml). En tu computadora no hace falta tocarlos.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      // Tema oscuro de alto contraste para el resaltado de código
      theme: 'github-dark-default',
    },
  },
});
