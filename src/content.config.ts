import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un campo vacío en el frontmatter (por ejemplo `descripcion:`) llega como null.
// Estos ayudantes lo convierten en texto vacío o lista vacía para que no falle.
const texto = z.string().nullish().transform((v) => v ?? '');
const lista = <T extends z.ZodType>(item: T) =>
  z.array(item).nullish().transform((v) => v ?? []);

const enlace = z.object({
  texto: z.string(),
  url: z.string(),
});

const modulos = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/modulos' }),
  schema: z.object({
    titulo: z.string(),
    orden: z.number().int().positive(),
    descripcion: texto,
    duracion: texto,
    objetivos: lista(z.string()),
    recursos: lista(enlace),
  }),
});

const lecciones = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lecciones' }),
  schema: z.object({
    titulo: z.string(),
    // Debe coincidir con el nombre de un archivo de src/content/modulos (sin .md)
    modulo: reference('modulos'),
    orden: z.number().int().positive(),
    estado: z.enum(['por-preparar', 'lista']).default('por-preparar'),
    enlaces: lista(enlace),
  }),
});

export const collections = { modulos, lecciones };
