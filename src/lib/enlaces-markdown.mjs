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
//
// Páginas del propio sitio (empiezan con /) → se les agrega la carpeta base:
//
//   [Formulario de estudiantes](/formulario/)
//
// Cualquier enlace se muestra como botón si lleva "botón" entre comillas
// después de la dirección (clase "boton-enlace" en global.css):
//
//   [Abrir el formulario de estudiantes](/formulario/ "botón")

export function enlacesMarkdown(base = '/') {
  const prefijo = base.replace(/\/?$/, '/');
  return {
    name: 'enlaces-markdown',
    element: {
      filter: ['a'],
      visit(enlace, ctx) {
        const href = String(enlace.properties?.href ?? '');
        const esBoton = enlace.properties?.title === 'botón';
        if (esBoton) {
          ctx.setProperty(enlace, 'title', null);
          ctx.setProperty(enlace, 'className', ['boton-enlace']);
        }

        if (href.startsWith('/descargas/')) {
          ctx.setProperty(enlace, 'href', prefijo + href.slice(1));
          ctx.setProperty(enlace, 'download', true);
          ctx.setProperty(enlace, 'className', ['boton-descarga']);
          return;
        }

        // Página del sitio: /formulario/ → /<base>/formulario/ (si aún no la tiene)
        if (href.startsWith('/') && !href.startsWith('//')) {
          if (prefijo !== '/' && !href.startsWith(prefijo)) {
            ctx.setProperty(enlace, 'href', prefijo + href.slice(1));
          }
          return;
        }

        if (/^https?:\/\//.test(href) && enlace.properties?.target !== '_blank') {
          const { title, ...propiedades } = enlace.properties;
          ctx.replaceNode(enlace, {
            ...enlace,
            properties: {
              ...propiedades,
              ...(title && !esBoton ? { title } : {}),
              ...(esBoton ? { className: ['boton-enlace'] } : {}),
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
