# Curso de Análisis de Datos — sitio web

Sitio estático del curso, hecho con [Astro](https://astro.build). Cada módulo y cada lección es un archivo de texto (Markdown) que puedes editar con cualquier editor. No hay base de datos ni servidor: al publicar, Astro convierte esos archivos en páginas web.

---

## Índice

1. [Correr el sitio en tu computadora](#1-correr-el-sitio-en-tu-computadora)
2. [Dónde está cada cosa](#2-dónde-está-cada-cosa)
3. [Editar los datos generales del curso](#3-editar-los-datos-generales-del-curso)
4. [Editar un módulo](#4-editar-un-módulo)
5. [Editar o agregar una lección](#5-editar-o-agregar-una-lección)
6. [Marcar una lección como "lista"](#6-marcar-una-lección-como-lista)
7. [Agregar imágenes](#7-agregar-imágenes)
8. [Agregar bloques de código](#8-agregar-bloques-de-código)
9. [Publicar en GitHub Pages](#9-publicar-en-github-pages)
10. [Si algo falla](#10-si-algo-falla)

---

## 1. Correr el sitio en tu computadora

**Solo la primera vez:**

1. Instala [Node.js](https://nodejs.org) (versión 22.23 o más reciente; la opción "LTS" sirve).
2. Abre una terminal en la carpeta del proyecto. En VS Code: menú **Terminal → Nuevo terminal**.
3. Instala las dependencias:

   ```bash
   npm install
   ```

**Cada vez que quieras trabajar:**

```bash
npm run dev
```

Abre en el navegador la dirección que aparece (normalmente <http://localhost:4321>). Cada vez que guardes un archivo, la página se actualiza sola. Para detener el servidor, presiona `Ctrl + C` en la terminal.

**Otros comandos útiles:**

| Comando           | Qué hace                                                      |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Abre el sitio en modo edición, con recarga automática.        |
| `npm run build`   | Genera el sitio final en la carpeta `dist/` y revisa errores. |
| `npm run preview` | Muestra el sitio generado por `build`, tal como se publicará. |

---

## 2. Dónde está cada cosa

```
src/
├── config/curso.ts          ← título, lema, instructor, horario, requisitos…
├── assets/instructor.webp   ← foto del instructor (portada)
├── content/
│   ├── modulos/             ← un archivo por módulo (fundamentos.md, sql.md…)
│   └── lecciones/
│       ├── fundamentos/     ← lecciones del módulo Fundamentos
│       │   ├── 01-que-es-el-analisis-de-datos.md   ← una lección
│       │   └── 01-que-es-el-analisis-de-datos/     ← las actividades de esa lección
│       ├── sql/             ← lecciones del módulo SQL
│       └── …
├── content.config.ts        ← reglas que deben cumplir los archivos (no hace falta tocarlo)
├── lib/colores.ts           ← color de cada módulo
├── components/inicio/       ← secciones de la portada (hero, banda de temas, instructor)
├── pages/, components/, layouts/, styles/   ← diseño del sitio
```

El sitio usa un tema oscuro de estilo cyberpunk. Las animaciones de la portada son solo CSS (sin librerías) y se desactivan solas si la persona tiene activada la opción "reducir movimiento" en su sistema.

Para el día a día solo necesitas `src/config/curso.ts` y la carpeta `src/content/`.

---

## 3. Editar los datos generales del curso

Abre `src/config/curso.ts` y escribe los valores entre las comillas:

```ts
export const curso = {
  titulo: 'Análisis de Datos',
  lema: 'SQL, visualización, Python, nube e inteligencia artificial: …',
  descripcion: '',
  modalidad: 'Virtual',
  horario: 'Martes y jueves, 7:00 p. m.',
  requisitos: ['Conocimientos básicos de Excel', 'Computadora con internet'],

  instructor: {
    nombre: 'Jhon Byron Quiroz',
    rol: 'Desarrollador full-stack con enfoque IA-first',
    bio: 'Aquí va una presentación corta.',
    sitio: 'https://www.jhonbyron.site/',
    github: 'https://github.com/jhonbyronquirozperez',
    linkedin: '',
  },
};
```

- `lema` es la frase grande de la portada. Si escribes una `descripcion`, la portada muestra la descripción en su lugar.
- `bio` es el texto de la sección **Instructor** de la portada. Mientras esté vacío se ve un recuadro "por agregar".
- Los enlaces de `instructor` que dejes vacíos (por ejemplo `linkedin: ''`) no aparecen.
- Lo demás que dejes vacío (`''` o `[]`) aparece en la portada como **"Por definir"**.

### Cambiar la foto del instructor

Reemplaza el archivo `src/assets/instructor.webp` por otra foto **con el mismo nombre**. Puede ser `.jpg` o `.png`, pero en ese caso cambia también la extensión en `src/components/inicio/Instructor.astro` (línea `import foto from '../../assets/instructor.webp'`). Astro la optimiza al publicar, así que puedes usar una foto grande.

### Cambiar los colores de los módulos

Están en `src/lib/colores.ts`, uno por módulo. El sitio usa un fondo oscuro, así que elige colores claros y brillantes (neón) para que se lean bien.

---

## 4. Editar un módulo

Cada módulo es un archivo en `src/content/modulos/`. Por ejemplo, `sql.md`:

```markdown
---
titulo: "SQL"
orden: 2
descripcion: "Consultas para extraer y resumir información de bases de datos."
duracion: "3 semanas"
objetivos:
  - "Escribir consultas SELECT con filtros y ordenamiento"
  - "Combinar tablas con JOIN"
recursos:
  - texto: "Documentación de PostgreSQL"
    url: "https://www.postgresql.org/docs/"
---

Aquí va la **práctica** del módulo. Se muestra en la sección "Práctica".
```

- La parte entre las dos líneas `---` se llama **frontmatter**: son los datos del módulo.
- `orden` define la posición del módulo (1 a 6) y su color.
- Todo lo que escribas **debajo** del segundo `---` es la sección **Práctica**.
- Los textos entre `<!--` y `-->` son comentarios: no se ven en el sitio. Puedes borrarlos.
- Si `objetivos` o `recursos` están vacíos (`[]`), el sitio muestra un recuadro punteado que dice qué falta.

> **Ojo con la sangría:** en el frontmatter los espacios importan. Usa dos espacios antes de cada `-`, y alinea `url:` debajo de `texto:`.

---

## 5. Editar o agregar una lección

### Editar

Las lecciones están en `src/content/lecciones/<módulo>/`. Por ejemplo, `src/content/lecciones/sql/04-joins.md`:

```markdown
---
titulo: "JOINs"
modulo: sql
orden: 4
estado: por-preparar
---

## ¿Qué es un JOIN?

Un JOIN combina filas de dos tablas…
```

| Campo     | Qué significa                                                                     |
| --------- | --------------------------------------------------------------------------------- |
| `titulo`  | El título de la lección. Puedes cambiarlo cuando quieras.                         |
| `modulo`  | A qué módulo pertenece. Debe ser el nombre de un archivo de `modulos/` sin `.md`. |
| `orden`   | Posición dentro del módulo. La lección 4 del módulo 2 se muestra como **2.4**.    |
| `estado`  | `por-preparar` o `lista` (ver la sección 6).                                      |

Debajo del segundo `---` escribe el contenido de la lección en Markdown. Lo básico:

```markdown
## Subtítulo
### Subtítulo más pequeño

Texto normal, **negrita**, *cursiva* y `código en línea`.

- Elemento de lista
- Otro elemento

1. Paso uno
2. Paso dos

[Texto del enlace](https://ejemplo.com)

> Una nota o cita destacada.

| Columna A | Columna B |
| --------- | --------- |
| 1         | 2         |
```

**Tablas en celular.** Hay dos tipos:

- **Tabla de datos** (la normal): en celular sigue siendo tabla y, si no cabe, se desplaza de lado. Para alinear números a la derecha, pon `---:` en la línea de separación de esa columna.
- **Tabla comparativa:** si dejas vacía la primera celda del encabezado (`| | Columna A | Columna B |`), la primera columna se vuelve el título de cada fila. En celular, cada fila se muestra como una tarjeta, con el nombre de la columna sobre cada dato.

La lección 1.1 tiene un ejemplo de cada una: la comparativa en la lección y la de datos en su actividad.

### Agregar actividades a una lección

Las actividades aparecen al final de la lección, en "Actividades de la lección". Cada actividad es un archivo `.md` dentro de una carpeta que se llama **igual que el archivo de la lección, sin `.md`**:

```
src/content/lecciones/fundamentos/
├── 01-que-es-el-analisis-de-datos.md
└── 01-que-es-el-analisis-de-datos/
    ├── 01-que-nos-dicen-los-datos.md      ← Actividad 1
    └── 02-otra-actividad.md               ← Actividad 2
```

Cada archivo de actividad se ve así:

```markdown
---
titulo: "¿Qué nos dicen los datos?"
orden: 1
objetivo: "descubrir por qué una buena pregunta es el punto de partida…"
tiempo: "10 minutos"
---

Aquí van las instrucciones, en Markdown: texto, listas, tablas, imágenes…
```

- `titulo` y `orden` son obligatorios. El sitio muestra **Actividad 1: ¿Qué nos dicen los datos?** a partir de ellos.
- `objetivo` y `tiempo` son opcionales; si los dejas vacíos, no aparecen.
- Todo lo que escribas debajo del segundo `---` aparece bajo el título "Instrucciones". Si necesitas subtítulos dentro de una actividad, usa `####`.
- Si una lección no tiene carpeta de actividades, el sitio muestra "Actividades por agregar".
- Si el nombre de la carpeta no coincide con ninguna lección, `npm run build` muestra un error que dice qué archivo revisar.

### Archivos para descargar (CSV, Excel, PDF…)

1. Copia el archivo en la carpeta `public/descargas/`, por ejemplo `public/descargas/ventas.csv`.
2. En la lección o actividad, escribe un enlace que empiece por `/descargas/`:

   ```markdown
   [Descargar los datos (CSV)](/descargas/ventas.csv)
   ```

El sitio lo muestra como un botón de descarga y agrega solo la carpeta del repositorio cuando publica en GitHub Pages. La actividad 1 de la lección 1.1 tiene un ejemplo.

### Agregar una lección nueva

1. Copia un archivo existente de la misma carpeta y cámbiale el nombre, por ejemplo `07-indices.md`.
2. Cambia `titulo` y `orden` (por ejemplo `orden: 7`).
3. Borra el contenido viejo y escribe el nuevo.

La dirección de la página sale del nombre del archivo **sin el número inicial**: `sql/07-indices.md` se publica en `/sql/indices/`. Usa en el nombre solo minúsculas, números y guiones (sin tildes, `ñ` ni espacios).

El número del nombre de archivo solo sirve para que las carpetas se vean ordenadas; el orden real en el sitio lo define el campo `orden`.

### ¿Archivos `.md` o `.mdx`?

Usa `.md` para todo. El formato `.mdx` también funciona y permite insertar componentes, pero en él los comentarios se escriben `{/* así */}` en lugar de `<!-- así -->`.

---

## 6. Marcar una lección como "lista"

En el frontmatter de la lección cambia:

```yaml
estado: por-preparar
```

por:

```yaml
estado: lista
```

Guarda el archivo. La etiqueta de la lección cambia a **Lista** y se actualizan el contador y la barra de progreso del módulo, tanto en el inicio como en la barra lateral.

---

## 7. Agregar imágenes

1. Dentro de la carpeta del módulo crea una carpeta llamada `imagenes`. Por ejemplo: `src/content/lecciones/sql/imagenes/`.
2. Copia ahí tu imagen (`.png`, `.jpg`, `.webp` o `.gif`), por ejemplo `diagrama-join.png`.
3. En la lección escribe:

   ```markdown
   ![Diagrama de un INNER JOIN entre clientes y pedidos](./imagenes/diagrama-join.png)
   ```

- El texto entre `[ ]` describe la imagen para personas que usan lectores de pantalla. Escríbelo siempre.
- La ruta empieza con `./` porque es relativa al archivo de la lección.
- Astro optimiza la imagen automáticamente (la comprime y la convierte a un formato liviano).
- Para imágenes en la práctica de un módulo, usa `src/content/modulos/imagenes/` y la ruta `./imagenes/archivo.png`.

---

## 8. Agregar bloques de código

Escribe tres comillas invertidas (`` ``` ``) seguidas del nombre del lenguaje, el código, y cierra con otras tres comillas invertidas:

````markdown
```sql
SELECT cliente, SUM(total) AS ventas
FROM pedidos
GROUP BY cliente
ORDER BY ventas DESC;
```

```python
import pandas as pd

df = pd.read_csv("ventas.csv")
df.groupby("cliente")["total"].sum()
```
````

El código se colorea automáticamente y muestra arriba una etiqueta con el lenguaje (SQL, PYTHON…). Otros lenguajes útiles: `bash`, `json`, `csv`, `yaml`, `r`, `js`. Si no indicas lenguaje, el código se muestra sin colores.

> En Windows, la comilla invertida `` ` `` suele estar en la tecla junto a `P` o se escribe con `Alt Gr` + `}`. Si no la encuentras, copia y pega un ejemplo de arriba.

---

## 9. Publicar en GitHub Pages

El proyecto ya incluye la configuración necesaria (`.github/workflows/deploy.yml`). Cada vez que subas cambios a GitHub, el sitio se publica solo.

### La primera vez

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo: botón **New**, ponle un nombre (por ejemplo `curso-analisis-datos`), déjalo **Public** y **no** marques ninguna casilla de README ni .gitignore.
3. Instala [Git](https://git-scm.com/downloads) y, en la terminal, dentro de la carpeta del proyecto, ejecuta (cambia `TU-USUARIO` y el nombre del repositorio):

   ```bash
   git init
   git add .
   git commit -m "Primera versión del sitio del curso"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/curso-analisis-datos.git
   git push -u origin main
   ```

4. En GitHub, entra al repositorio y ve a **Settings → Pages**.
5. En **Build and deployment → Source**, elige **GitHub Actions**.
6. Ve a la pestaña **Actions**. Verás la tarea "Publicar en GitHub Pages" en marcha. Si ya terminó antes del paso 5, ábrela y presiona **Re-run all jobs**.
7. Cuando aparezca el check verde, tu sitio estará en:

   ```
   https://TU-USUARIO.github.io/curso-analisis-datos/
   ```

### Cada vez que actualices el contenido

```bash
git add .
git commit -m "Agrego la lección de JOINs"
git push
```

En uno o dos minutos el sitio publicado se actualiza. Puedes seguir el avance en la pestaña **Actions**.

> **Consejo:** antes de subir cambios, corre `npm run build`. Si hay un error en algún archivo, lo verás en tu computadora en vez de en GitHub.

### Alternativa: Netlify

El archivo `netlify.toml` ya está listo. En [netlify.com](https://www.netlify.com) elige **Add new site → Import an existing project**, conecta tu repositorio de GitHub y acepta la configuración que aparece (comando `npm run build`, carpeta `dist`).

---

## 10. Si algo falla

Al correr `npm run dev` o `npm run build`, los errores aparecen en la terminal indicando el archivo. Los más comunes:

| Mensaje (aproximado)                         | Causa y solución                                                                                               |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `estado: Invalid option`                     | El estado está mal escrito. Debe ser exactamente `por-preparar` o `lista`.                                     |
| `modulo: ... does not exist`                 | El campo `modulo` no coincide con un módulo. Usa: `fundamentos`, `sql`, `visualizacion`, `python`, `data-warehouse` o `ia`. |
| `orden: Invalid input: expected number`      | `orden` debe ser un número sin comillas: `orden: 3`.                                                           |
| `titulo: Invalid input: expected string`     | Falta el título o está vacío.                                                                                  |
| `YAMLException` / `bad indentation`          | Error de espacios en el frontmatter. Revisa la sangría y que los textos con `:` estén entre comillas.          |
| `Could not find image`                       | La ruta de la imagen no coincide con el nombre del archivo. Revisa mayúsculas, extensión y el `./` inicial.    |

Si un título contiene dos puntos (`:`), escríbelo entre comillas: `titulo: "pandas: Series y DataFrames"`.
