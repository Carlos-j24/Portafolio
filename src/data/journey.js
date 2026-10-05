// Trayectoria, de la más reciente a la más antigua.
// type: edu | course | cert | hack | work · start y end en formato AAAA-MM (end: null si sigue en curso)
// credential: enlace opcional al certificado
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
    type: 'course',
    start: '2023-03',
    end: '2023-09',
    title: {
      en: 'Diploma in Web/Multimedia Management and Webmaster',
      es: 'Diplomatura en Web/Multimedia Management and Webmaster'
    },
    place: 'Alura',
    description: {
      en: 'Front-end development and cloud deployment training, completed with a certificate of completion.',
      es: 'Formación en desarrollo front end y despliegue en la nube, completada con certificado de finalización.'
    },
    skills: ['Front end', 'AWS'],
    credential: null
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
