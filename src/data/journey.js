// Trayectoria, de la más reciente a la más antigua.
// type: edu | course | cert | hack | work · start y end en formato AAAA-MM (end: null si sigue en curso)
// (si start y end coinciden, se muestra una sola fecha) · credential: enlace opcional al certificado
// items: desglose opcional (formaciones de un programa), con horas, mes de finalización y
// credential opcional · profile: enlace opcional a un perfil público que reúne los certificados

// Certificados públicos de Alura: se abren sin iniciar sesión (el del programa completo no)
const ALURA = 'https://app.aluracursos.com/user/carlos-castro131121'
const aluraCert = (degree) => `${ALURA}/${degree}/certificate`

export const journey = [
  {
    type: 'edu',
    start: '2024-09',
    end: null,
    title: {
      en: 'Software Analysis and Development Technologist',
      es: 'Tecnólogo en Análisis y Desarrollo de Software'
    },
    place: 'SENA',
    description: {
      en: 'Technology program covering the full software cycle: requirements analysis, design, databases and application development.',
      es: 'Programa tecnológico centrado en el ciclo completo del software: análisis de requisitos, diseño, bases de datos y desarrollo de aplicaciones.'
    },
    skills: [],
    credential: null
  },
  {
    type: 'cert',
    start: '2023-03',
    end: '2023-09',
    title: {
      en: 'Oracle Next Education (ONE) — Cohort 5',
      es: 'Oracle Next Education (ONE) — Generación 5'
    },
    place: 'Oracle + Alura Latam',
    description: {
      en: 'Full program completed: 6 tracks, 326 hours and 1,596 of 1,596 activities, from programming fundamentals to front end with JavaScript and React.',
      es: 'Programa completo: 6 formaciones, 326 horas y 1.596 de 1.596 actividades, desde los fundamentos de programación hasta el front end con JavaScript y React.'
    },
    items: [
      { name: { en: 'React', es: 'React' }, hours: 68, date: '2023-09', credential: aluraCert('degree-react-grupo5-one-15576') },
      { name: { en: 'Front End', es: 'Front End' }, hours: 77, date: '2023-08', credential: aluraCert('degree-frontend-grupo5-one-15575') },
      { name: { en: 'Entrepreneurship', es: 'Emprendimiento' }, hours: 45, date: '2023-06', credential: aluraCert('degree-emprendimiento-grupo5-one-15578') },
      { name: { en: 'Business Agility', es: 'Business Agility' }, hours: 26, date: '2023-06', credential: aluraCert('degree-business-agility-grupo5-one-15577') },
      { name: { en: 'Programming Beginner', es: 'Principiante en Programación' }, hours: 75, date: '2023-05', credential: aluraCert('degree-programacion-primeros-pasos-grupo5-one-15570') },
      { name: { en: 'Personal Development', es: 'Desarrollo Personal' }, hours: 35, date: '2023-04', credential: aluraCert('degree-desarrollo-personal-grupo5-one-15568') }
    ],
    skills: ['JavaScript', 'React', 'React Router', 'DOM', 'HTTP', 'Flexbox', 'Responsive'],
    credential: null,
    profile: ALURA
  },
  {
    type: 'cert',
    start: '2023-06',
    end: '2023-06',
    title: {
      en: 'HTML & CSS',
      es: 'HTML y CSS'
    },
    place: 'Alura Latam',
    description: {
      en: '7 courses, 65 hours: semantic HTML5, CSS3, forms and tables, Flexbox, responsive mobile layouts and CSS architecture.',
      es: '7 cursos, 65 horas: HTML5 semántico, CSS3, formularios y tablas, Flexbox, layouts responsivos para móvil y arquitectura CSS.'
    },
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Responsive'],
    credential: aluraCert('degree-html-css-v15485-15485')
  },
  {
    type: 'course',
    start: '2021-05',
    end: '2022-12',
    title: {
      en: 'Software Development with a focus on web applications',
      es: 'Desarrollo de Software con énfasis en aplicaciones web'
    },
    place: 'Universidad Sergio Arboleda',
    description: {
      en: 'Program designed by Colombia’s Ministry of ICT to train new programmers, in partnership with Universidad Sergio Arboleda: databases, back end and front end.',
      es: 'Programa diseñado por el Ministerio TIC para formar nuevos programadores, en alianza con la Universidad Sergio Arboleda: bases de datos, back end y front end.'
    },
    skills: ['Python', 'Back end', 'Front end'],
    credential: null
  }
]
