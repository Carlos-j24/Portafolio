// Textos de la interfaz en inglés y español
export const translations = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', ai: 'AI', journey: 'Journey', projects: 'Projects', blog: 'Blog', contact: 'Contact', menu: 'Open menu', close: 'Close menu' },
    hero: {
      booting: 'INITIALIZING DEVELOPER PROFILE...',
      greeting: "Hi, I'm",
      role: 'Full Stack Developer',
      description: 'I build reliable, scalable and well-structured systems with a focus on clean architecture, real-world impact and thoughtful user experience.',
      focusLabel: 'CURRENT FOCUS',
      focusValue: 'Full Stack Systems',
      stackLabel: 'STACK',
      statusLabel: 'STATUS',
      statusValue: 'Available for work',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      downloadCv: 'Download CV'
    },
    about: {
      title: 'About Me',
      p1: 'I am a Full Stack Developer focused on building structured, scalable and meaningful software systems.',
      p2: 'I enjoy transforming complex problems into simple, maintainable solutions. My focus is clean architecture, real-world impact and systems that actually solve problems like automation and healthcare.',
      cards: [
        { title: 'Responsibility', text: 'Clean code, structure and long-term maintainability.' },
        { title: 'Functionality', text: 'Real-world problem solving systems.' },
        { title: 'Innovation', text: 'Creative but disciplined engineering solutions.' }
      ]
    },
    skills: {
      title: 'Engineering Skills',
      primaryBadge: 'Main specialty',
      subtitle: 'Structured view of my technical capabilities organized by system layers and engineering focus.',
      groups: [
        { title: 'Backend Systems', primary: true, items: ['Python (Advanced)', 'Django (Advanced)', 'REST APIs', 'PostgreSQL', 'System Design'] },
        { title: 'Frontend Engineering', items: ['Vue 3', 'React', 'TypeScript', 'TailwindCSS', 'PWA (offline)', 'Component Architecture'] },
        { title: 'Mobile', items: ['Android', 'Kotlin', 'WebView', 'Android Studio', 'Google Play Console'] },
        { title: 'AI-Assisted Development', items: ['Claude Code (upper-intermediate)', 'OpenCode', 'Ollama (local models)', 'AGENTS.md / CLAUDE.md', 'Spec-Driven Development'] },
        { title: 'Quality & Testing', items: ['pytest & Django tests', 'Vitest', 'Pester', 'Selenium', 'GitHub Actions (CI)'] },
        { title: 'Engineering Tools', items: ['Git & GitHub', 'Docker', 'Netlify & Vercel', 'PowerShell', 'Agile Workflow'] }
      ]
    },
    ai: {
      title: 'AI-Assisted Development',
      subtitle: 'I use AI every day as a development tool, not as a replacement for judgment: it writes code under the rules of each project, and tests decide what gets in.',
      levelLabel: 'LEVEL WITH CLAUDE',
      level: 'Upper-intermediate',
      levelNote: 'as a development tool',
      intro: 'I work daily with Claude Code and OpenCode to plan from specs, write code, refactor, test and document. Every AI contribution goes through tests, a Pull Request and CI before it is merged.',
      workflow: ['spec', 'plan', 'code with AI', 'tests', 'pull request', 'CI', 'merge'],
      practices: [
        { title: 'Specs before prompts', text: 'Medium and large changes start with a spec, a plan and tasks (Spec-Driven Development). The AI implements one task at a time, against clear acceptance criteria.' },
        { title: 'An agent harness', text: 'I designed a harness (AGENTS.md, CLAUDE.md and project memory) that gives the AI the context, commands and rules of each repository, so they are not repeated in every conversation.' },
        { title: 'Validate, don’t trust', text: 'Nothing gets merged without green tests. If a test passes on the first try, I break the code on purpose to prove it protects something. Ollama covers local models.' }
      ],
      evidenceTitle: 'Where you can see it',
      evidence: [
        { title: 'DevForge', text: 'Init installs the agent harness (AGENTS.md, CLAUDE.md, MEMORY.md) in any project, detecting its stack.', to: '/projects/devforge' },
        { title: 'Inventario-POS', text: 'Seven specs with Spec-Driven Development and 637 automated tests: the AI writes code, tests and CI decide what gets in.', to: '/projects/inventario-pos' },
        { title: 'MedAlert', text: 'A time zone bug became a rule in the project’s AGENTS.md so it never comes back.', to: '/projects/medalert' },
        { title: 'Blog: how I work with AI agents', text: 'The lessons from building DevForge: specs before prompts and tests as the only way out.', to: '/blog/devforge-ia-con-specs' }
      ]
    },
    journey: {
      title: 'Journey',
      subtitle: 'The education and training that shaped how I build software, most recent first.',
      present: 'present',
      active: 'IN PROGRESS',
      credential: 'View credential →',
      credentialOf: 'Certificate:',
      profile: 'View verified Alura profile →',
      types: { edu: 'EDU', course: 'COURSE', cert: 'CERT', hack: 'HACK', work: 'WORK' }
    },
    projectsSection: {
      title: 'Selected Projects',
      subtitle: 'Real-world systems built with clean architecture, maintainable code and focus on impact.',
      liveDemo: 'Live Demo →',
      sourceCode: 'Source Code',
      caseStudy: 'Case study →'
    },
    projectPage: {
      back: '← Back to projects',
      repo: 'View source code →',
      next: 'Next project',
      notFoundTitle: 'Project not found',
      notFoundText: 'This project does not exist or has been moved.'
    },
    blog: {
      title: 'Blog & Notes',
      subtitle: 'What I learn while building: decisions, mistakes and the way I work.',
      readMore: 'Read article →',
      minRead: 'min read',
      back: '← Back to blog',
      notFoundTitle: 'Article not found',
      notFoundText: 'This article does not exist or has been moved.'
    },
    terminal: {
      statusVal: 'System online',
      focusVal: 'Building scalable and meaningful software systems.'
    },
    contact: {
      title: "Let's Build Something",
      subtitle: 'Open to new opportunities and collaborations. Reach out through any of these channels.',
      email: 'Send an Email',
      copy: 'Copy email',
      copied: 'Copied!',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      cv: 'Download CV'
    },
    footer: 'Built with precision • Designed for impact • Powered by Carlos'
  },
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', skills: 'Habilidades', ai: 'IA', journey: 'Trayectoria', projects: 'Proyectos', blog: 'Blog', contact: 'Contacto', menu: 'Abrir menú', close: 'Cerrar menú' },
    hero: {
      booting: 'INICIALIZANDO PERFIL DE DESARROLLADOR...',
      greeting: 'Hola, soy',
      role: 'Full Stack Developer',
      description: 'Construyo sistemas confiables, escalables y bien estructurados, con enfoque en arquitectura limpia, impacto real y una experiencia de usuario cuidada.',
      focusLabel: 'ENFOQUE ACTUAL',
      focusValue: 'Sistemas Full Stack',
      stackLabel: 'STACK',
      statusLabel: 'ESTADO',
      statusValue: 'Disponible para trabajar',
      viewProjects: 'Ver Proyectos',
      contactMe: 'Contáctame',
      downloadCv: 'Descargar CV'
    },
    about: {
      title: 'Sobre mí',
      p1: 'Soy un Full Stack Developer enfocado en construir sistemas de software estructurados, escalables y con sentido.',
      p2: 'Disfruto transformar problemas complejos en soluciones simples y mantenibles. Mi enfoque es la arquitectura limpia, el impacto real y sistemas que de verdad resuelvan problemas, como automatización y salud.',
      cards: [
        { title: 'Responsabilidad', text: 'Código limpio, estructura y mantenibilidad a largo plazo.' },
        { title: 'Funcionalidad', text: 'Sistemas que resuelven problemas reales.' },
        { title: 'Innovación', text: 'Soluciones de ingeniería creativas pero disciplinadas.' }
      ]
    },
    skills: {
      title: 'Habilidades Técnicas',
      primaryBadge: 'Especialidad principal',
      subtitle: 'Vista estructurada de mis capacidades técnicas, organizadas por capas del sistema y enfoque de ingeniería.',
      groups: [
        { title: 'Sistemas Backend', primary: true, items: ['Python (Avanzado)', 'Django (Avanzado)', 'APIs REST', 'PostgreSQL', 'Diseño de Sistemas'] },
        { title: 'Ingeniería Frontend', items: ['Vue 3', 'React', 'TypeScript', 'TailwindCSS', 'PWA (sin conexión)', 'Arquitectura de Componentes'] },
        { title: 'Móvil', items: ['Android', 'Kotlin', 'WebView', 'Android Studio', 'Google Play Console'] },
        { title: 'Desarrollo con IA', items: ['Claude Code (intermedio-avanzado)', 'OpenCode', 'Ollama (modelos locales)', 'AGENTS.md / CLAUDE.md', 'Spec-Driven Development'] },
        { title: 'Calidad y Pruebas', items: ['pytest y tests de Django', 'Vitest', 'Pester', 'Selenium', 'GitHub Actions (CI)'] },
        { title: 'Herramientas de Ingeniería', items: ['Git y GitHub', 'Docker', 'Netlify y Vercel', 'PowerShell', 'Flujo de trabajo Ágil'] }
      ]
    },
    ai: {
      title: 'Desarrollo con IA',
      subtitle: 'Uso la IA a diario como herramienta de desarrollo, no como reemplazo del criterio: programa con las reglas de cada proyecto, y las pruebas deciden qué entra.',
      levelLabel: 'NIVEL CON CLAUDE',
      level: 'Intermedio-avanzado',
      levelNote: 'como herramienta de desarrollo',
      intro: 'Trabajo a diario con Claude Code y OpenCode para planear desde especificaciones, programar, refactorizar, probar y documentar. Cada aporte de la IA pasa por pruebas, un Pull Request y el CI antes de integrarse.',
      workflow: ['spec', 'plan', 'código con IA', 'pruebas', 'pull request', 'CI', 'fusión'],
      practices: [
        { title: 'Specs antes que prompts', text: 'Los cambios medianos y grandes empiezan con una spec, un plan y tareas (Spec-Driven Development). La IA implementa una tarea a la vez, con criterios de aceptación claros.' },
        { title: 'Un arnés de agentes', text: 'Diseñé un arnés (AGENTS.md, CLAUDE.md y memoria del proyecto) que da a la IA el contexto, los comandos y las reglas de cada repositorio, sin repetirlos en cada conversación.' },
        { title: 'Validar, no confiar', text: 'Nada se fusiona sin pruebas en verde. Si un test pasa a la primera, rompo el código a propósito para comprobar que protege algo. Ollama para modelos locales.' }
      ],
      evidenceTitle: 'Dónde se ve',
      evidence: [
        { title: 'DevForge', text: 'Init instala el arnés de agentes (AGENTS.md, CLAUDE.md, MEMORY.md) en cualquier proyecto, detectando su stack.', to: '/projects/devforge' },
        { title: 'Inventario-POS', text: 'Siete specs con Spec-Driven Development y 637 tests automatizados: la IA programa, y las pruebas y el CI deciden qué entra.', to: '/projects/inventario-pos' },
        { title: 'MedAlert', text: 'Un bug de zona horaria quedó como regla en el AGENTS.md del proyecto para que no vuelva a entrar.', to: '/projects/medalert' },
        { title: 'Blog: cómo trabajo con agentes de IA', text: 'Lo que aprendí construyendo DevForge: specs antes que prompts y los tests como única puerta de salida.', to: '/blog/devforge-ia-con-specs' }
      ]
    },
    journey: {
      title: 'Trayectoria',
      subtitle: 'La formación que ha dado forma a mi manera de construir software, de la más reciente a la más antigua.',
      present: 'actual',
      active: 'EN CURSO',
      credential: 'Ver credencial →',
      credentialOf: 'Certificado:',
      profile: 'Ver perfil verificado en Alura →',
      types: { edu: 'EDU', course: 'CURSO', cert: 'CERT', hack: 'HACK', work: 'TRABAJO' }
    },
    projectsSection: {
      title: 'Proyectos Destacados',
      subtitle: 'Sistemas reales construidos con arquitectura limpia, código mantenible y enfoque en el impacto.',
      liveDemo: 'Ver Demo →',
      sourceCode: 'Código Fuente',
      caseStudy: 'Ver caso de estudio →'
    },
    projectPage: {
      back: '← Volver a proyectos',
      repo: 'Ver código fuente →',
      next: 'Siguiente proyecto',
      notFoundTitle: 'Proyecto no encontrado',
      notFoundText: 'Este proyecto no existe o se ha movido.'
    },
    blog: {
      title: 'Blog y Notas',
      subtitle: 'Lo que aprendo mientras construyo: decisiones, errores y mi forma de trabajar.',
      readMore: 'Leer artículo →',
      minRead: 'min de lectura',
      back: '← Volver al blog',
      notFoundTitle: 'Artículo no encontrado',
      notFoundText: 'Este artículo no existe o se ha movido.'
    },
    terminal: {
      statusVal: 'Sistema en línea',
      focusVal: 'Construyendo sistemas de software escalables y con sentido.'
    },
    contact: {
      title: 'Construyamos Algo',
      subtitle: 'Abierto a nuevas oportunidades y colaboraciones. Escríbeme por cualquiera de estos canales.',
      email: 'Enviar un Correo',
      copy: 'Copiar correo',
      copied: '¡Copiado!',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      cv: 'Descargar CV'
    },
    footer: 'Hecho con precisión • Diseñado para generar impacto • Por Carlos'
  }
}
