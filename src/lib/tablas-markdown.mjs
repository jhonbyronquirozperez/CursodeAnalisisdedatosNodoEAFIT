// Prepara las tablas de las lecciones para verse bien en celular.
// Es un plugin de Sätteri, el procesador de Markdown de Astro (astro.config.mjs).
//
// Las tablas cuya primera celda del encabezado está vacía son tablas
// comparativas: la primera columna se vuelve encabezado de fila
// (<th scope="row">), cada celda recibe el nombre de su columna (data-label)
// y la tabla lleva la clase "tabla-tarjetas". En celular, global.css muestra
// cada fila como una tarjeta.
//
// Las demás tablas (tablas de datos) no cambian: en celular se desplazan de
// lado para que se puedan comparar las filas.
//
// En cualquier tabla, una celda escrita toda en negrita (por ejemplo
// | **Lidera** |) recibe la clase "celda-destacada" y se resalta con el color
// del módulo. No aplica a la primera columna, que suele ser el nombre de la fila.

const hijos = (nodo, etiqueta) =>
  (nodo?.children ?? []).filter((n) => n.type === 'element' && n.tagName === etiqueta);

// ¿Todo el contenido de la celda está en negrita?
const soloNegrita = (celda) => {
  const contenido = (celda.children ?? []).filter(
    (n) => !(n.type === 'text' && !n.value.trim()),
  );
  return contenido.length === 1 && contenido[0].tagName === 'strong';
};

export const tablasMarkdown = {
  name: 'tablas-markdown',
  element: {
    filter: ['table'],
    visit(tabla, ctx) {
      const filaEncabezado = hijos(hijos(tabla, 'thead')[0], 'tr')[0];
      const columnas = hijos(filaEncabezado, 'th').map((th) => ctx.textContent(th).trim());
      const tarjetas = columnas.length >= 2 && columnas[0] === '';

      if (tarjetas) ctx.setProperty(tabla, 'className', ['tabla-tarjetas']);
      for (const cuerpo of hijos(tabla, 'tbody')) {
        for (const fila of hijos(cuerpo, 'tr')) {
          hijos(fila, 'td').forEach((celda, i) => {
            if (i === 0) {
              if (!tarjetas) return;
              ctx.replaceNode(celda, {
                type: 'element',
                tagName: 'th',
                properties: { ...celda.properties, scope: 'row' },
                children: celda.children,
              });
              return;
            }
            if (soloNegrita(celda)) ctx.setProperty(celda, 'className', ['celda-destacada']);
            if (tarjetas && columnas[i]) ctx.setProperty(celda, 'dataLabel', columnas[i]);
          });
        }
      }
    },
  },
};
