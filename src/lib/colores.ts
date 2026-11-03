// Color neón de cada módulo. Todos tienen contraste AA (o mejor)
// sobre el fondo oscuro del sitio, así que sirven para texto y etiquetas.
const colores: Record<string, string> = {
  fundamentos: '#26faf2',
  sql: '#cbff3d',
  visualizacion: '#ffb02e',
  python: '#b48cff',
  'data-warehouse': '#ff4f9a',
  ia: '#ff5a1f',
};

const reserva = '#c7d1cb';

export function colorModulo(slug: string): string {
  return colores[slug] ?? reserva;
}

/** Variable CSS para aplicar el color de un módulo junto con el atributo data-color. */
export function estiloModulo(slug: string): string {
  return `--mod:${colorModulo(slug)}`;
}
