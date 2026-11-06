// Convierte los enlaces de Markdown a archivos de public/descargas/ en botones
// de descarga. Es un plugin de Sätteri, el procesador de Markdown de Astro.
//
//   [Descargar los datos (CSV)](/descargas/ventas.csv)
//
// - Agrega la carpeta base del sitio (GitHub Pages publica en /<repositorio>/).
// - Agrega el atributo `download` para que el navegador descargue el archivo.
// - Agrega la clase "boton-descarga" (estilos en global.css).

export function descargasMarkdown(base = '/') {
  const prefijo = base.replace(/\/?$/, '/');
  return {
    name: 'descargas-markdown',
    element: {
      filter: ['a'],
      visit(enlace, ctx) {
        const href = String(enlace.properties?.href ?? '');
        if (!href.startsWith('/descargas/')) return;
        ctx.setProperty(enlace, 'href', prefijo + href.slice(1));
        ctx.setProperty(enlace, 'download', true);
        ctx.setProperty(enlace, 'className', ['boton-descarga']);
      },
    },
  };
}
