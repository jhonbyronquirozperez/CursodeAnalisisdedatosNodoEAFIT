// Ajusta los enlaces de Markdown. Es un plugin de Sätteri, el procesador de
// Markdown de Astro (astro.config.mjs).
//
// Archivos de public/descargas/ → botón de descarga:
//
//   [Descargar los datos (CSV)](/descargas/ventas.csv)
//
// - Agrega la carpeta base del sitio (GitHub Pages publica en /<repositorio>/).
// - Agrega el atributo `download` para que el navegador descargue el archivo.
// - Agrega la clase "boton-descarga" (estilos en global.css).
//
// Enlaces a otros sitios (http:// o https://) → se abren en una pestaña nueva,
// igual que los recursos de los módulos (ListaEnlaces.astro):
//
//   [datos.gov.co](https://www.datos.gov.co)
//
// - Agrega target="_blank" y rel="noopener noreferrer".
// - Agrega un aviso oculto para lectores de pantalla: "(se abre en otra pestaña)".

export function enlacesMarkdown(base = '/') {
  const prefijo = base.replace(/\/?$/, '/');
  return {
    name: 'enlaces-markdown',
    element: {
      filter: ['a'],
      visit(enlace, ctx) {
        const href = String(enlace.properties?.href ?? '');

        if (href.startsWith('/descargas/')) {
          ctx.setProperty(enlace, 'href', prefijo + href.slice(1));
          ctx.setProperty(enlace, 'download', true);
          ctx.setProperty(enlace, 'className', ['boton-descarga']);
          return;
        }

        if (/^https?:\/\//.test(href) && enlace.properties?.target !== '_blank') {
          ctx.replaceNode(enlace, {
            ...enlace,
            properties: {
              ...enlace.properties,
              target: '_blank',
              rel: ['noopener', 'noreferrer'],
            },
            children: [
              ...enlace.children,
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['sr-only'] },
                children: [{ type: 'text', value: ' (se abre en otra pestaña)' }],
              },
            ],
          });
        }
      },
    },
  };
}
