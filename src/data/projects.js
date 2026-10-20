// Proyectos destacados. image es opcional: ruta dentro de public/ (p. ej. '/projects/medalert.png')
// slug: opcional; si existe content/projects/<slug>/, la tarjeta enlaza a su caso de estudio
export const projects = [
  {
    title: 'Inventario-POS',
    slug: 'inventario-pos',
    image: '/projects/inventario-pos.webp',
    description: {
      en: 'Inventory and point of sale for hardware stores: warehouse, register with cash count, orders, reports and Colombian e-invoicing. Installable PWA whose register keeps selling offline and syncs without duplicating sales. 637 automated tests.',
      es: 'Inventario y punto de venta para ferreterías: bodega, caja con arqueo, pedidos, reportes y facturación electrónica DIAN. PWA instalable cuya caja sigue vendiendo sin internet y sincroniza sin duplicar ventas. 637 tests automatizados.'
    },
    stack: ['Django REST', 'PostgreSQL', 'React 19', 'TypeScript', 'PWA', 'Docker'],
    status: { en: 'In Development', es: 'En Desarrollo' },
    statusClass: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    accent: 'from-sky-500 to-cyan-400',
    demo: null,
    repo: 'https://github.com/Carlos-j24/Inventario-POS'
  },
  {
    title: 'MedAlert',
    slug: 'medalert',
    image: '/projects/medalert.webp',
    description: {
      en: 'Web app for caregivers to manage medications, reminders and medical appointments for one or more patients. Automatically generates reminders, sends WhatsApp notifications and produces per-patient PDF reports.',
      es: 'Aplicación web para que un cuidador administre medicamentos, recordatorios y citas médicas de uno o varios pacientes a su cargo. Genera recordatorios automáticamente, envía notificaciones por WhatsApp y produce reportes en PDF por paciente.'
    },
    stack: ['Django REST', 'JWT', 'Vue 3', 'TypeScript', 'Vite', 'TailwindCSS'],
    status: { en: 'Completed', es: 'Completado' },
    statusClass: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    accent: 'from-emerald-500 to-teal-400',
    demo: null,
    repo: 'https://github.com/Carlos-j24/MedAlert'
  },
  {
    title: 'Ondas del Orteguaza',
    slug: 'ondas-del-orteguaza',
    image: '/projects/ondas-del-orteguaza.webp',
    description: {
      en: 'Website and Android app for a Christian radio station in Florencia, Colombia: live stream that reconnects on its own, weekly schedule, events and prayer requests. Content lives in a single JSON file shared by the web and the Google Play app.',
      es: 'Web y app Android de una radio cristiana de Florencia, Caquetá: transmisión en vivo que se reconecta sola, parrilla, actividades y peticiones de oración. El contenido vive en un solo JSON que comparten la web y la app de Google Play.'
    },
    stack: ['JavaScript', 'PWA', 'Service Worker', 'Kotlin', 'Android', 'Netlify'],
    status: { en: 'Live', es: 'En Producción' },
    statusClass: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    accent: 'from-indigo-500 to-blue-400',
    demo: 'https://ondas-del-orteguaza.netlify.app/',
    repo: 'https://github.com/Carlos-j24/ondas-del-orteguaza'
  },
  {
    title: 'DevForge',
    slug: 'devforge',
    image: '/projects/devforge.webp',
    description: {
      en: 'Personal development ecosystem in PowerShell. DevForge Doctor diagnoses the dev environment (console or JSON report) and DevForge Init sets up an AI-agent harness (AGENTS.md, CLAUDE.md, MEMORY.md) in other projects. Built with Spec-Driven Development, automated Pester tests and CI on every PR.',
      es: 'Ecosistema de desarrollo personal en PowerShell. DevForge Doctor diagnostica el entorno de desarrollo (en consola o en JSON) y DevForge Init instala un arnés para agentes de IA (AGENTS.md, CLAUDE.md, MEMORY.md) en otros proyectos. Hecho con Spec-Driven Development, tests automatizados en Pester y CI en cada PR.'
    },
    stack: ['PowerShell 7', 'Pester', 'GitHub Actions', 'Spec-Driven Development', 'AI Agents'],
    status: { en: 'In Development', es: 'En Desarrollo' },
    statusClass: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    accent: 'from-amber-500 to-orange-400',
    demo: null,
    repo: 'https://github.com/Carlos-j24/DevForge'
  },
  {
    title: 'Text Encryptor',
    image: '/projects/encriptador.webp',
    description: {
      en: 'Text encryption/decryption tool via vowel substitution, with input validation, dark mode with persistence, copy/download of results and keyboard shortcuts.',
      es: 'Herramienta de encriptación y desencriptación de texto por sustitución de vocales, con validación de entrada, modo oscuro con persistencia, copiar/descargar resultado y atajos de teclado.'
    },
    stack: ['JavaScript', 'HTML5', 'CSS3'],
    status: { en: 'Completed', es: 'Completado' },
    statusClass: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    accent: 'from-violet-500 to-fuchsia-400',
    demo: 'https://carlos-j24.github.io/Encriptador/',
    repo: 'https://github.com/Carlos-j24/Encriptador'
  }
]
