// Imágenes de Markdown guardadas en public/imagenes/, por ejemplo GIF
// animados (Astro los publica tal cual, sin convertirlos ni quitarles la
// animación). Es un plugin de Sätteri, el procesador de Markdown de Astro.
//
//   ![Texto alternativo](/imagenes/animacion.gif "Texto del recuadro de reemplazo")
//
// - Agrega la carpeta base del sitio (GitHub Pages publica en /<repositorio>/).
// - La imagen ocupa el ancho del contenido (clase "imagen-ancha" en global.css).
// - Si el archivo todavía no existe, el navegador muestra en su lugar un
//   recuadro con el texto entre comillas (o "Imagen por agregar"). Basta con
//   copiar el archivo a public/imagenes/ para que aparezca la imagen.

export function imagenesMarkdown(base = '/') {
  const prefijo = base.replace(/\/?$/, '/');
  return {
    name: 'imagenes-markdown',
    element: {
      filter: ['img'],
      visit(imagen, ctx) {
        const { src, title, dataImagenAncha, ...propiedades } = imagen.properties ?? {};
        if (dataImagenAncha || !String(src ?? '').startsWith('/imagenes/')) return;

        ctx.replaceNode(imagen, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['imagen-ancha'] },
          children: [
            {
              type: 'element',
              tagName: 'img',
              properties: {
                ...propiedades,
                src: prefijo + String(src).slice(1),
                dataImagenAncha: true,
                onError: "this.parentNode.classList.add('sin-archivo')",
              },
              children: [],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['imagen-pendiente'] },
              children: [{ type: 'text', value: title || 'Imagen por agregar' }],
            },
          ],
        });
      },
    },
  };
}
