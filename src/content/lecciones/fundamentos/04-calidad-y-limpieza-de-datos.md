---
titulo: "Calidad y limpieza de datos"
modulo: fundamentos
orden: 4
estado: por-preparar
---

> Un dato sucio no da error: da una respuesta equivocada que parece correcta.

En esta sección aprenderás a medir la calidad de un conjunto de datos y a limpiarlo sin perder información ni inventarla.

## Por qué importa la calidad

En el mundo de los datos hay una frase clásica: **basura entra, basura sale**. Si los datos tienen errores, el análisis más sofisticado solo produce conclusiones equivocadas con mejor presentación.

<div class="pregunta">

### Haz la prueba

Piensa en todas las formas en que alguien podría escribir "Medellín" en un formulario. Por ejemplo:

<ul class="chips">
<li><code class="chip-correcto">Medellín</code></li>
<li><code>Medellin</code></li>
<li><code>MEDELLIN</code></li>
<li><code>medellín</code></li>
<li><code>Mdllín</code></li>
<li><code><span class="espacio-visible" title="espacio">␣</span>Medellín</code></li>
<li><code>Medellín, Antioquia</code></li>
<li><code>MED</code></li>
</ul>

Para el computador, ¿cuántas ciudades distintas hay en esa lista?

<details>
<summary>Ver respuesta</summary>

**Ocho.** El computador no sabe que todas son la misma ciudad: para él, cualquier diferencia, aunque sea una tilde, una mayúscula o un espacio, es un valor distinto. Si contaras los inscritos por ciudad, Medellín quedaría dividida en ocho grupos pequeños, y ninguno parecería la ciudad más grande.

</details>

</div>

Dos casos que ya conoces de secciones anteriores:

- **El precio "2.500".** Si un programa configurado en inglés lo lee, vale 2,5, y los ingresos de la tienda salen mil veces más pequeños.
- **"SAN JAVIER #1" frente a "San Javier No. 1".** Al cruzar los barrios con una tabla de población, ese barrio queda sin datos y su densidad desaparece del análisis.

## Las seis dimensiones de la calidad

"Datos de buena calidad" es una idea vaga. Para medirla, los profesionales revisan seis dimensiones, y cada una responde una pregunta distinta. Los ejemplos vienen del archivo de barrios de Medellín que usaste en la actividad de la sección 1.3.

| Dimensión | Pregunta | Ejemplo real | Cómo revisarla |
| --- | --- | --- | --- |
| **Completitud** | ¿Falta información? | El archivo no tiene la comuna ni la población de cada barrio | Contar las celdas vacías y comparar las columnas con las que pide la pregunta |
| **Exactitud** | ¿Los datos reflejan la realidad? | `ELTESORO` y `SANLUCAS` parecen errores de escritura de "El Tesoro" y "San Lucas" | Comparar con una fuente confiable, como la lista oficial de la Alcaldía |
| **Consistencia** | ¿Lo mismo se escribe siempre igual? | 7 barrios numerados con `#1` y 23 con `No.1` | Listar los valores distintos de cada columna y buscar variantes |
| **Validez** | ¿Cumple las reglas y formatos? | La fecha viene como `2022/03/29 00:00:00+00` y no en AAAA-MM-DD | Definir reglas (formatos, rangos, valores permitidos) y contar cuántos datos las incumplen |
| **Unicidad** | ¿Hay registros repetidos? | Ningún barrio se repite: esta dimensión está bien | Buscar filas duplicadas y llaves repetidas |
| **Actualidad** | ¿Los datos están al día? | Cubre de 1980 a 2014 y tiene 271 barrios; hoy la Alcaldía reporta 249 | Leer la fecha de actualización y el periodo en los metadatos |

## Problemas comunes y técnicas de limpieza

Casi todos los problemas de limpieza caen en esta lista. Para cada uno hay una forma de resolverlo en Excel o Google Sheets y otra en Python con pandas.

| Problema | Ejemplo | Qué hacer | Excel / Sheets | Python (pandas) |
| --- | --- | --- | --- | --- |
| Espacios de más | `LAS␣␣ESTANCIAS` | Quitar los espacios del inicio, del final y los dobles | `=ESPACIOS(A2)` | `.str.strip()` y `.str.replace(r"\s+", " ", regex=True)` |
| Mayúsculas inconsistentes | `isabella zapata` | Elegir un formato y aplicarlo a toda la columna | `=NOMPROPIO(A2)`, `=MAYUSC(A2)` | `.str.title()`, `.str.upper()` |
| Variantes de una categoría | `Futbol`, `Volleyball` | Definir el valor correcto y reemplazar las variantes | Buscar y reemplazar (Ctrl + L en Excel en español) | `.replace({"Futbol": "Fútbol"})` |
| Duplicados | La misma inscripción dos veces | Eliminar los exactos y revisar los que comparten la llave (por ejemplo, el documento) | Datos > Quitar duplicados | `.drop_duplicates()`, con `subset="documento"` |
| Tipo incorrecto | `quince` en la columna de edad | Convertir al tipo correcto; lo que no se pueda convertir queda vacío | `=VALOR(A2)`, Datos > Texto en columnas | `pd.to_numeric(col, errors="coerce")` |
| Formatos mezclados | `01/10/2026`, `2026/10/02` | Llevar todo al estándar: fechas en AAAA-MM-DD | Formato de celda personalizado `aaaa-mm-dd` | `pd.to_datetime(col, format=...)` |
| Valores imposibles | Una edad de `150` años | Dejar el valor vacío y pedir el dato real; nunca adivinarlo | Filtro con condición (mayor que 100) | `df.loc[df.edad > 100, "edad"] = pd.NA` |
| Columnas sin información | `MEDELLIN` repetido en las 271 filas | Guardar el valor una vez como metadato y quitar la columna | Eliminar la columna | `df.nunique() == 1` y `.drop(columns=...)` |
| Unidades equivocadas | Área en grados al cuadrado | Convertir y dejar la unidad en el nombre de la columna | `=H2*12236` | `df["area_km2"] = df["Shape__Area"] * 12236` |
