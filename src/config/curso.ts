// Datos generales del curso. Edita estos valores cuando los tengas.
// Si un campo queda vacío, el sitio muestra "Por definir".

export const curso = {
  titulo: 'Análisis de Datos',
  // Frase corta que aparece en la portada mientras "descripcion" esté vacía
  lema: 'SQL, visualización, Python, nube e inteligencia artificial: aprende a convertir datos en decisiones.',
  descripcion: '',
  modalidad: '',
  horario: '',
  // Ejemplo: ['Conocimientos básicos de Excel', 'Computadora con internet']
  requisitos: [] as string[],

  // La foto está en src/assets/instructor.webp (reemplázala por otra con el mismo nombre)
  instructor: {
    nombre: 'Jhon Byron Quiroz',
    rol: 'Ingeniero de Datos',
    // Presentación corta para la sección "Instructor" de la portada
    bio: 'Ingeniero de datos con experiencia en análisis de datos, visualización y desarrollo de soluciones basadas en inteligencia artificial. Apasionado por transformar datos en información valiosa para la toma de decisiones.',
    sitio: 'https://www.jhonbyron.site/',
    github: 'https://github.com/jhonbyronquirozperez',
    linkedin: '',
  },
};
