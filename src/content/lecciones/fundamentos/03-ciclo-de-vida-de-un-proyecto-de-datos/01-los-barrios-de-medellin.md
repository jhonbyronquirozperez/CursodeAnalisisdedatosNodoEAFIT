---
titulo: "Los barrios de Medellín"
orden: 1
---

En esta actividad vas a trabajar con datos reales del portal de datos abiertos. El objetivo es practicar el ciclo de vida de un proyecto de datos: obtener los datos y evaluar si de verdad sirven para responder una pregunta.

#### Paso 1. Descarga los datos

Entra al conjunto de datos **Barrios Medellín** en el portal datos.gov.co:

[https://www.datos.gov.co/dataset/Barrios-Medellin/vhge-rvqt/about_data](https://www.datos.gov.co/dataset/Barrios-Medellin/vhge-rvqt/about_data)

Antes de descargar, lee la información que aparece en la página: quién publicó los datos, para qué los hizo y cuándo se actualizaron. Luego descárgalos y ábrelos en Excel, Google Sheets o Python.

#### Paso 2. Responde estas preguntas

Para cada pregunta, escribe tu respuesta y explica cómo llegaste a ella (qué columna usaste y qué cálculo hiciste).

1. ¿Cuántos barrios tiene el archivo?
2. ¿Cuántos km² suman todos los barrios juntos?
3. ¿Sirve este archivo para saber cuántos barrios tiene hoy Medellín? ¿Por qué sí o por qué no?
4. ¿Cuál es el barrio más poblado?

**Importante:** no todas las preguntas tienen una respuesta directa en el archivo. Si crees que una pregunta no se puede responder con estos datos, también es una respuesta válida: explica por qué y qué datos necesitarías para responderla.

<details class="pista">
<summary>💡 Ayuda: cómo convertir el área a km²</summary>

La columna `Shape__Area` **no está en km²**. Si sumas la columna tal como viene, obtendrás un número muy pequeño (menor que 1). Esto pasa porque el área se calculó sobre coordenadas geográficas (latitud y longitud), que se miden en grados. Por eso el área quedó en **grados al cuadrado**.

Para convertirla a km², multiplica por **12.236**.

**¿De dónde sale ese número?** Es el área en km² de un cuadro de 1 grado por 1 grado en la ubicación de Medellín:

- Un grado de latitud (norte–sur) mide unos **110,57 km**.
- Un grado de longitud (oriente–occidente) mide unos **110,66 km** en Medellín. Este valor cambia según la latitud: los meridianos se juntan hacia los polos, como los gajos de una naranja, y Medellín está cerca del ecuador.
- Entonces: 110,57 × 110,66 ≈ **12.236 km²** por cada grado cuadrado.

**En Excel o Google Sheets:** suma la columna `Shape__Area` y multiplica el resultado por 12236.

**En Python:**

```python
import pandas as pd

df = pd.read_csv("Barrios_Medellin.csv", encoding="utf-8-sig")
area_total_km2 = df["Shape__Area"].sum() * 12236
print(round(area_total_km2, 1), "km²")
```

El `encoding="utf-8-sig"` evita que aparezca un carácter extraño al inicio del nombre de la primera columna.

</details>

