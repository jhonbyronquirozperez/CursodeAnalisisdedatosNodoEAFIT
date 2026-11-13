---
titulo: "Ciclo de vida de un proyecto de datos"
modulo: fundamentos
orden: 3
estado: por-preparar
---

## Por qué un proyecto de datos necesita un ciclo de vida

Un proyecto de datos no empieza abriendo Excel ni termina con un gráfico bonito. Empieza con una pregunta y termina cuando alguien toma una mejor decisión. El ciclo de vida es el mapa que conecta esos dos puntos.

![Animación del ciclo de vida de un proyecto de datos: siete etapas que van de definir la pregunta a implementar y monitorear](/imagenes/ciclo_vida_datos.gif "Aquí va la animación del ciclo de vida")

Se llama *ciclo* y no *lista* porque rara vez se recorre una sola vez: es normal volver a una etapa anterior, y cada respuesta abre preguntas nuevas.

## Las siete etapas

1. **Definir la pregunta.** Se acuerda qué decisión se quiere tomar y qué hay que saber para tomarla. Es la etapa más importante: si la pregunta está mal planteada, todo lo demás responde algo que nadie necesitaba.
2. **Obtener los datos.** Se identifican las fuentes (bases de datos, archivos, API o encuestas), se piden los permisos y se descargan los datos.
3. **Limpiar y preparar.** Se corrigen tipos de datos, duplicados y valores faltantes, y se unen las tablas, para poder confiar en los datos.
4. **Explorar y analizar.** Se calculan resúmenes y se hacen gráficos para encontrar patrones que respondan la pregunta.
5. **Modelar (si hace falta).** Si la pregunta lo exige, se construye un modelo para predecir o clasificar. Muchos proyectos no necesitan esta etapa.
6. **Comunicar los resultados.** Se presenta una recomendación clara y concreta a quien debe tomar la decisión.
7. **Implementar y monitorear.** Se aplica la decisión y se mide si funcionó. Si surgen nuevas preguntas, el ciclo vuelve a empezar.

## Quién hace qué: roles en cada etapa

En la sección 1.1 vimos la diferencia entre ingeniería, análisis y ciencia de datos. El ciclo de vida muestra dónde trabaja cada rol. A ellos se suma una persona clave que no es técnica: quien conoce el negocio.

| Etapa | Experto del negocio | Ingeniero de datos | Analista de datos | Científico de datos |
| --- | --- | --- | --- | --- |
| 1. Definir la pregunta | **Lidera** | | Apoya | Apoya |
| 2. Obtener los datos | Apoya | **Lidera** | Apoya | |
| 3. Limpiar y preparar | | **Lidera** | Apoya | Apoya |
| 4. Explorar y analizar | Apoya | | **Lidera** | Apoya |
| 5. Modelar | | | | **Lidera** |
| 6. Comunicar | Apoya | | **Lidera** | Apoya |
| 7. Implementar y monitorear | **Lidera** | Apoya | Apoya | Apoya |

**Para leer la tabla:** el experto del negocio aparece al principio y al final. Define qué se necesita saber y decide qué hacer con la respuesta. En una empresa pequeña, una sola persona puede cumplir todos los roles. Lo importante es que nadie se salte las etapas.
