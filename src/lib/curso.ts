import { getCollection, type CollectionEntry } from 'astro:content';

export type Modulo = CollectionEntry<'modulos'>;
export type Leccion = CollectionEntry<'lecciones'>;
export type ModuloConLecciones = Modulo & { lecciones: Leccion[]; listas: number };

/** Módulos ordenados, cada uno con sus lecciones ordenadas. */
export async function obtenerCurso(): Promise<ModuloConLecciones[]> {
  const modulos = (await getCollection('modulos')).sort((a, b) => a.data.orden - b.data.orden);
  const lecciones = await getCollection('lecciones');

  return modulos.map((m) => {
    const propias = lecciones
      .filter((l) => l.data.modulo.id === m.id)
      .sort((a, b) => a.data.orden - b.data.orden);
    return {
      ...m,
      lecciones: propias,
      listas: propias.filter((l) => l.data.estado === 'lista').length,
    };
  });
}

/** "01-joins" -> "joins": la parte de la URL de una lección. */
export function slugLeccion(leccion: Leccion): string {
  return leccion.id.split('/').pop()!.replace(/^\d+-/, '');
}

/** Número tipo 2.3 (módulo.lección). */
export function numeroLeccion(modulo: Modulo, leccion: Leccion): string {
  return `${modulo.data.orden}.${leccion.data.orden}`;
}

/** Número con dos dígitos: 2 -> "02". */
export function dosDigitos(n: number): string {
  return String(n).padStart(2, '0');
}

/** Construye una URL interna respetando la carpeta base de GitHub Pages. */
export function url(ruta = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + ruta.replace(/^\//, '');
}

export const urlModulo = (m: Modulo) => url(`${m.id}/`);
export const urlLeccion = (m: Modulo, l: Leccion) => url(`${m.id}/${slugLeccion(l)}/`);

/** true si el cuerpo del archivo solo tiene espacios o comentarios. */
export function estaVacio(cuerpo?: string): boolean {
  if (!cuerpo) return true;
  return (
    cuerpo
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .trim() === ''
  );
}
