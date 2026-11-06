import { getCollection, type CollectionEntry } from 'astro:content';

export type Modulo = CollectionEntry<'modulos'>;
export type Leccion = CollectionEntry<'lecciones'>;
export type Actividad = CollectionEntry<'actividades'>;
export type ModuloConLecciones = Modulo & { lecciones: Leccion[]; listas: number };

/** "fundamentos/01-intro/01-taller" -> "fundamentos/01-intro": la lección de una actividad. */
const leccionDeActividad = (a: Actividad) => a.id.split('/').slice(0, -1).join('/');

/** Módulos ordenados, cada uno con sus lecciones ordenadas. */
export async function obtenerCurso(): Promise<ModuloConLecciones[]> {
  const modulos = (await getCollection('modulos')).sort((a, b) => a.data.orden - b.data.orden);
  const lecciones = await getCollection('lecciones');

  // Avisa si una carpeta de actividades no coincide con ninguna lección
  const idsLecciones = new Set(lecciones.map((l) => l.id));
  const huerfana = (await getCollection('actividades')).find(
    (a) => !idsLecciones.has(leccionDeActividad(a)),
  );
  if (huerfana) {
    throw new Error(
      `La actividad "${huerfana.filePath}" está en una carpeta que no coincide con ninguna lección. ` +
        'La carpeta debe llamarse igual que el archivo de la lección, sin ".md".',
    );
  }

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

/** Actividades de una lección, ordenadas. */
export async function actividadesDe(leccion: Leccion): Promise<Actividad[]> {
  return (await getCollection('actividades', (a) => leccionDeActividad(a) === leccion.id)).sort(
    (a, b) => a.data.orden - b.data.orden,
  );
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
