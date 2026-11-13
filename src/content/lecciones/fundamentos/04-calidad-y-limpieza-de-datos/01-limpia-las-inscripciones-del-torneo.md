---
titulo: "Limpia las inscripciones del torneo"
orden: 1
---

Un torneo intercolegial recogió sus inscripciones con un formulario sin validaciones, y el archivo llegó lleno de errores. Tu tarea es dejarlo listo para analizar, sin perder información y sin inventarla. *Los datos son ficticios.*

[Descargar los datos (CSV)](/descargas/inscripciones_torneo_sucio.csv)

**Regla del torneo:** solo participan estudiantes de 13 a 17 años.

1. **Diagnostica.** Encuentra los problemas del archivo y clasifícalos según las seis dimensiones de la calidad.
2. **Limpia.** Trabaja sobre una copia, conserva las 11 columnas originales y guarda el resultado en CSV UTF-8, separado por comas.
3. **Previene.** Para cada tipo de error, escribe la regla de validación que lo habría evitado en el formulario.

**Ten en cuenta:** no inventes datos. Si no sabes cuál es el valor correcto, déjalo vacío. Si un caso incumple la regla del torneo, márcalo en una columna nueva, pero no lo borres.

**Entrega:**

- El CSV limpio, con el nombre `apellido_nombre_torneo.csv`.
- Una bitácora con los cambios que hiciste:

  | Columna | Problema | Qué hice | Por qué |
  | --- | --- | --- | --- |
  | genero | Seis formas de escribir dos valores | Dejé solo F y M | Para poder contar por género |

- Tus reglas de validación.

> **Consejo:** Excel en español suele guardar los CSV con punto y coma. Para obtener uno separado por comas, súbelo a Google Sheets y usa Archivo > Descargar > Valores separados por comas (.csv).

[Descargar el script de validación (Python)](/descargas/script_validacion.py)
