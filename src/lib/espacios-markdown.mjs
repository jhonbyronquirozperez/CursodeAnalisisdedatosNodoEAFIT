// El símbolo ␣ representa un espacio en blanco. Dentro de código en línea
// (`LAS␣␣ESTANCIAS`), cada ␣ se envuelve en <span class="espacio-visible">
// para dibujarlo grande y claro (global.css): con la letra de código se ve
// casi igual que un guion bajo (_). Es un plugin de Sätteri, el procesador de
// Markdown de Astro (astro.config.mjs).

const ESPACIO = '␣';

export const espaciosMarkdown = {
  name: 'espacios-markdown',
  element: {
    filter: ['code'],
    visit(codigo, ctx) {
      const hijos = codigo.children ?? [];
      if (!hijos.some((n) => n.type === 'text' && n.value.includes(ESPACIO))) return;

      const nuevos = hijos.flatMap((n) => {
        if (n.type !== 'text') return [n];
        return n.value
          .split(/(␣)/)
          .filter(Boolean)
          .map((parte) =>
            parte === ESPACIO
              ? {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['espacio-visible'], title: 'espacio' },
                  children: [{ type: 'text', value: ESPACIO }],
                }
              : { type: 'text', value: parte },
          );
      });
      ctx.replaceNode(codigo, { ...codigo, children: nuevos });
    },
  },
};
