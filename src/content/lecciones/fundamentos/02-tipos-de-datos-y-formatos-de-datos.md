---
titulo: "Tipos de datos y formatos de datos"
modulo: fundamentos
orden: 2
estado: por-preparar
---

## ¿Qué es un dato?

Un dato es una representación básica de un hecho, una característica o un valor. Por sí solo, normalmente tiene poco contexto o significado.

Cuando relacionamos e interpretamos los datos dentro de un contexto, se convierten en **información**: adquieren significado y nos permiten comprender algo o tomar decisiones.

**Ejemplo.** Observa estos cuatro datos sueltos:

- 25
- Jhon
- 9 de noviembre
- Medellín

Así, separados, no dicen mucho. ¿25 qué? ¿25 años, 25 grados, 25 pesos? ¿Quién es Jhon? ¿Qué pasó el 9 de noviembre?

Ahora relacionémoslos: **"Jhon, de 25 años, se mudó a Medellín el 9 de noviembre."** Los mismos cuatro datos, puestos en contexto, ya cuentan algo. Eso es información.

> **Dato + contexto = información**

## Tipos de datos en computación

Para que un computador pueda trabajar con los datos, cada uno debe tener un tipo. El tipo le dice al programa qué clase de valor es y qué operaciones puede hacer con él: los números se pueden sumar, los textos se pueden unir y las fechas se pueden restar para saber cuántos días pasaron.

Estos son los tipos de datos fundamentales:

| Tipo de dato | Qué guarda | Ejemplo |
| --- | --- | --- |
| Numérico entero | Números sin decimales | 25 (edad en años) |
| Numérico decimal | Números con decimales | 1,75 (estatura en metros) |
| Alfanumérico | Combinaciones de letras y números | ABC123 (placa de un carro) |
| Cadena de texto | Palabras o frases | "Jhon", "Medellín" |
| Lógico (booleano) | Solo dos valores: verdadero o falso | ¿Es estudiante? Verdadero |
| Fecha y hora | Un día del calendario, una hora o ambos | 2026-11-09 08:30 |

**Nota:** en la mayoría de los programas, los datos alfanuméricos y las cadenas de texto se guardan como el mismo tipo: texto. Los separamos porque cumplen funciones distintas. Los alfanuméricos suelen ser códigos que sirven para identificar algo, como una placa, una cédula o un código de producto. Con ellos no se hacen cálculos, aunque tengan números.

## Clasificación estadística de los datos

La estadística clasifica los datos según lo que significan. Esa clasificación decide qué cálculos tienen sentido. Hay dos grandes familias:

- **Cualitativos (categóricos):** describen una cualidad o categoría.
  - *Nominales:* sin orden. Ejemplos: ciudad, color, producto.
  - *Ordinales:* con un orden natural. Ejemplos: estrato, talla (S, M, L), nivel de satisfacción.
- **Cuantitativos (numéricos):** expresan una cantidad.
  - *Discretos:* se cuentan en números enteros. Ejemplos: número de hijos, unidades vendidas.
  - *Continuos:* se miden y admiten decimales. Ejemplos: estatura, peso, temperatura.

**Una pregunta para no confundirse:** ¿tiene sentido sumarlo o promediarlo? Si la respuesta es no, el dato no es cuantitativo, aunque esté escrito con números. Por ejemplo, la cédula tiene solo dígitos, pero es un dato cualitativo nominal.

## ¿Qué son los formatos de datos?

Los formatos de datos son las distintas maneras de organizar, representar, almacenar e intercambiar información para que los programas, los sistemas operativos y las bases de datos puedan trabajar con ella. Piensa en ellos como diferentes maneras de organizar la información.

Una forma de verlo: el **tipo de dato** es el ingrediente (harina, huevos, leche) y el **formato** es el recipiente donde lo guardas (bolsa, cartón, botella). El mismo ingrediente puede ir en recipientes distintos, y cada recipiente sirve mejor para una situación.

<div class="pregunta">

### Pregunta para la clase

**¿Una base de datos es un formato de datos?**

</div>

## Formatos de datos más usados

Para comparar los formatos, usaremos los mismos datos en todos los ejemplos: las ventas de una tienda escolar.

### CSV (valores separados por comas)

Es el formato más simple y universal. Cada línea es una fila y las columnas se separan con comas. Lo puede abrir cualquier programa, incluso el bloc de notas.

```csv
Dia,Producto,Unidades_vendidas,Precio_unitario_COP
Lunes,Empanada,30,2500
Lunes,Jugo,35,2000
```

- **Ventajas:** liviano, fácil de leer y compatible con cualquier herramienta.
- **Desventajas:** no guarda los tipos de datos (todo se guarda como texto) ni permite varias hojas.
- **Dato curioso:** en Colombia la coma es el separador decimal, así que Excel en español suele guardar los CSV con punto y coma (;) en lugar de coma.
- **Se usa para:** pasar tablas sencillas entre sistemas y personas.

### XLSX (Excel)

Es el formato de las hojas de cálculo de Excel. Permite tener varias hojas, fórmulas, colores y gráficos en un mismo archivo.

- **Ventajas:** casi todas las personas en una empresa saben usarlo, y guarda algunos tipos de datos (número, fecha, texto).
- **Desventajas:** cada hoja admite como máximo 1.048.576 filas, y Excel a veces cambia los datos sin avisar. Por ejemplo, convierte textos en fechas o quita los ceros a la izquierda.
- **Se usa para:** entregar reportes a personas de negocio y recibir datos de ellas.

### JSON (JavaScript Object Notation)

Es el idioma de las aplicaciones web y las API. Guarda los datos como pares de clave y valor, y permite poner unos datos dentro de otros (anidarlos).

```json
[
  {"dia": "Lunes", "producto": "Empanada", "unidades_vendidas": 30, "precio_unitario_cop": 2500},
  {"dia": "Lunes", "producto": "Jugo", "unidades_vendidas": 35, "precio_unitario_cop": 2000}
]
```

- **Ventajas:** flexible y legible, y cada registro puede tener campos distintos.
- **Desventajas:** ocupa más espacio porque repite el nombre de cada campo en cada registro.
- **Se usa para:** recibir y enviar datos entre aplicaciones, por ejemplo la información del clima que muestra una app en el celular.

### XML (lenguaje de marcado extensible)

Organiza los datos con etiquetas de apertura y cierre, parecidas a las de una página web.

```xml
<ventas>
  <venta>
    <dia>Lunes</dia>
    <producto>Empanada</producto>
    <unidades_vendidas>30</unidades_vendidas>
    <precio_unitario_cop>2500</precio_unitario_cop>
  </venta>
</ventas>
```

- **Ventajas:** muy ordenado y estricto; se puede validar que cada archivo tenga los campos obligatorios.
- **Desventajas:** muy extenso, porque cada dato se escribe entre dos etiquetas.
- **Se usa para:** sistemas empresariales, bancarios y del gobierno. En Colombia, cada factura electrónica de la DIAN es un archivo XML.

### Parquet

Es el formato preferido para grandes volúmenes de datos. A diferencia de los anteriores, es binario: no se puede leer abriéndolo en el bloc de notas. Guarda los datos **por columnas** y no por filas.

```text
Por filas (CSV):        Lunes,Empanada,30 | Lunes,Jugo,35
Por columnas (Parquet): Lunes,Lunes | Empanada,Jugo | 30,35
```

Guardar por columnas tiene dos ventajas. El programa puede leer solo las columnas que necesita, y los valores parecidos quedan juntos, así que se comprimen mucho mejor. En una prueba con un millón de ventas simuladas, el archivo CSV ocupó 36,6 MB y el Parquet solo 2,8 MB. Además, el Parquet cargó unas 7 veces más rápido.

- **Ventajas:** muy liviano y rápido, y conserva los tipos de datos.
- **Desventajas:** no se abre con Excel ni con el bloc de notas, y con tablas pequeñas no conviene: el archivo puede quedar más pesado que un CSV.
- **Se usa para:** analítica de grandes volúmenes en plataformas como Databricks, Snowflake, BigQuery o Spark.

### Resumen

| Formato | ¿Se lee a simple vista? | ¿Guarda los tipos de datos? | Ideal para |
| --- | --- | --- | --- |
| CSV | Sí | No | Intercambio simple de tablas |
| XLSX | Con Excel | En parte | Reportes para personas de negocio |
| JSON | Sí | Solo los básicos | Aplicaciones web y API |
| XML | Sí, pero es extenso | Con un esquema | Sistemas empresariales y factura electrónica |
| Parquet | No | Sí | Grandes volúmenes de datos |
