<template>
  <!-- CURSOR GLOW -->
  <div
    class="fixed inset-0 pointer-events-none z-0"
    :style="{
      background: `radial-gradient(
        600px at ${mouseX}px ${mouseY}px,
        rgba(59,130,246,0.12),
        transparent 80%
      )`
    }"
  ></div>

  <div class="min-h-screen bg-[#0B0F14] text-gray-200 flex flex-col relative overflow-x-hidden">

    <!-- ENGINEERING GRID -->
    <div class="absolute inset-0 opacity-[0.04]">
      <div class="h-full w-full engineering-grid"></div>
    </div>

    <!-- BACKGROUND GLOW -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full top-[-200px] left-[-200px] animate-pulse"></div>

      <div class="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>
    </div>

    <div class="relative z-10 flex-1 flex flex-col">

      <!-- NAVBAR -->
      <header
        class="relative flex justify-between items-center px-4 md:px-8 py-6 border-b border-white/5 backdrop-blur sticky top-0 bg-[#0B0F14]/60 z-50"
      >
        <div class="text-xs sm:text-sm tracking-widest text-gray-400 animate-fade-in truncate">
          CARLOS.DEV // SYSTEM ONLINE
        </div>

        <div class="flex items-center gap-3 md:gap-6">
          <nav class="hidden md:flex gap-6 text-sm text-gray-400">
            <a href="#home" class="hover:text-white transition hover:scale-105">
              {{ t.nav.home }}
            </a>

            <a href="#about" class="hover:text-white transition hover:scale-105">
              {{ t.nav.about }}
            </a>

            <a href="#skills" class="hover:text-white transition hover:scale-105">
              {{ t.nav.skills }}
            </a>

            <a href="#projects" class="hover:text-white transition hover:scale-105">
              {{ t.nav.projects }}
            </a>

            <a href="#contact" class="hover:text-white transition hover:scale-105">
              {{ t.nav.contact }}
            </a>
          </nav>

          <button
            class="text-xs tracking-widest text-gray-400 hover:text-white transition border border-white/10 hover:border-white/30 rounded-full px-3 py-1.5 shrink-0"
            @click="toggleLang"
          >
            {{ lang === 'en' ? 'ES' : 'EN' }}
          </button>

          <button
            class="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0"
            :aria-label="mobileMenuOpen ? t.nav.close : t.nav.menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span
              class="block h-px bg-gray-300 transition-transform"
              :class="mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''"
            ></span>
            <span
              class="block h-px bg-gray-300 transition-opacity"
              :class="mobileMenuOpen ? 'opacity-0' : ''"
            ></span>
            <span
              class="block h-px bg-gray-300 transition-transform"
              :class="mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''"
            ></span>
          </button>
        </div>

        <!-- MOBILE MENU -->
        <nav
          v-if="mobileMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 flex flex-col gap-1 bg-[#0B0F14]/95 border-b border-white/5 backdrop-blur px-4 py-4 text-sm text-gray-400"
        >
          <a href="#home" class="py-3 border-b border-white/5 hover:text-white transition" @click="mobileMenuOpen = false">
            {{ t.nav.home }}
          </a>
          <a href="#about" class="py-3 border-b border-white/5 hover:text-white transition" @click="mobileMenuOpen = false">
            {{ t.nav.about }}
          </a>
          <a href="#skills" class="py-3 border-b border-white/5 hover:text-white transition" @click="mobileMenuOpen = false">
            {{ t.nav.skills }}
          </a>
          <a href="#projects" class="py-3 border-b border-white/5 hover:text-white transition" @click="mobileMenuOpen = false">
            {{ t.nav.projects }}
          </a>
          <a href="#contact" class="py-3 hover:text-white transition" @click="mobileMenuOpen = false">
            {{ t.nav.contact }}
          </a>
        </nav>
      </header>

      <!-- HERO -->
      <section
        id="home"
        class="flex-1 flex items-center justify-center px-6 py-24"
      >
        <div class="text-center max-w-3xl">

          <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 animate-fade-in-up">
            <div class="absolute inset-0 rounded-full bg-emerald-400/25 blur-2xl"></div>
            <img
              src="/avatar.jpg"
              alt="Carlos Castro"
              class="relative w-full h-full object-cover rounded-full border-2 border-emerald-400/40 shadow-lg"
            />
            <span class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0B0F14]"></span>
          </div>

          <p class="text-emerald-400 text-sm tracking-widest mb-4 animate-pulse">
            INITIALIZING DEVELOPER PROFILE...
          </p>

          <h1 class="text-4xl md:text-6xl font-light leading-tight animate-fade-in-up">
            {{ t.hero.greeting }} <span class="text-white font-medium">Carlos</span>
            <br />
            {{ t.hero.role }}
          </h1>

          <p class="mt-6 text-gray-400 text-lg leading-relaxed animate-fade-in-up delay-150">
            {{ t.hero.description }}
          </p>

          <!-- STATUS CARDS -->
          <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-300">

            <div class="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition">
              <p class="text-xs text-gray-400">{{ t.hero.focusLabel }}</p>
              <p class="text-white mt-1">{{ t.hero.focusValue }}</p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition">
              <p class="text-xs text-gray-400">{{ t.hero.stackLabel }}</p>
              <p class="text-white mt-1">Vue • Django • Python</p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition">
              <p class="text-xs text-gray-400">{{ t.hero.statusLabel }}</p>
              <p class="text-emerald-400 mt-1">{{ t.hero.statusValue }}</p>
            </div>

          </div>

          <!-- CTA -->
          <div class="mt-10 flex justify-center gap-4 animate-fade-in-up delay-500">
            <button
              class="px-6 py-3 bg-white text-black rounded-lg hover:scale-105 transition shadow-lg"
              @click="scrollToSection('projects')"
            >
              {{ t.hero.viewProjects }}
            </button>

            <button
              class="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
              @click="scrollToSection('contact')"
            >
              {{ t.hero.contactMe }}
            </button>
          </div>

        </div>
      </section>

      <!-- ABOUT -->
      <section
        id="about"
        v-motion
        :initial="{
          opacity: 0,
          y: 80
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 800
          }
        }"
        class="px-8 py-24 border-t border-white/5"
      >
        <div class="max-w-4xl mx-auto">

          <h2 class="text-2xl md:text-3xl font-light text-white mb-6">
            {{ t.about.title }}
          </h2>

          <p class="text-gray-400 leading-relaxed text-lg">
            {{ t.about.p1 }}
          </p>

          <p class="mt-6 text-gray-400 leading-relaxed">
            {{ t.about.p2 }}
          </p>

          <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

            <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-105 transition">
              <h3 class="text-white mb-2">{{ t.about.cards[0].title }}</h3>

              <p class="text-sm text-gray-400">
                {{ t.about.cards[0].text }}
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-105 transition">
              <h3 class="text-white mb-2">{{ t.about.cards[1].title }}</h3>

              <p class="text-sm text-gray-400">
                {{ t.about.cards[1].text }}
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-105 transition">
              <h3 class="text-white mb-2">{{ t.about.cards[2].title }}</h3>

              <p class="text-sm text-gray-400">
                {{ t.about.cards[2].text }}
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- SKILLS -->
      <section
        id="skills"
        v-motion
        :initial="{
          opacity: 0,
          y: 120
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1000
          }
        }"
        class="px-8 py-24 border-t border-white/5"
      >
        <div class="max-w-5xl mx-auto">

          <h2 class="text-2xl md:text-3xl font-light text-white mb-10">
            {{ t.skills.title }}
          </h2>

          <p class="text-gray-400 mb-10 max-w-2xl">
            {{ t.skills.subtitle }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition">
              <h3 class="text-white mb-4">{{ t.skills.groups[0].title }}</h3>

              <ul class="space-y-2 text-gray-400 text-sm">
                <li v-for="item in t.skills.groups[0].items" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition">
              <h3 class="text-white mb-4">{{ t.skills.groups[1].title }}</h3>

              <ul class="space-y-2 text-gray-400 text-sm">
                <li v-for="item in t.skills.groups[1].items" :key="item">{{ item }}</li>
              </ul>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition">
              <h3 class="text-white mb-4">{{ t.skills.groups[2].title }}</h3>

              <ul class="space-y-2 text-gray-400 text-sm">
                <li v-for="item in t.skills.groups[2].items" :key="item">{{ item }}</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      <!-- PROJECTS -->
      <section
        id="projects"
        v-motion
        :initial="{
          opacity: 0,
          y: 120
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1000
          }
        }"
        class="px-8 py-24 border-t border-white/5"
      >
        <div class="max-w-5xl mx-auto">

          <h2 class="text-2xl md:text-3xl font-light text-white mb-4">
            {{ t.projectsSection.title }}
          </h2>

          <p class="text-gray-400 mb-10 max-w-2xl">
            {{ t.projectsSection.subtitle }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <article
              v-for="project in projects"
              :key="project.title"
              class="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
            >
              <div
                class="h-2 bg-gradient-to-r"
                :class="project.accent"
              ></div>

              <div class="p-6">

                <div class="flex items-start justify-between gap-4 mb-3">
                  <h3 class="text-white text-lg">
                    {{ project.title }}
                  </h3>

                  <span
                    class="text-xs px-2 py-1 rounded-full border shrink-0"
                    :class="project.statusClass"
                  >
                    {{ project.status[lang] }}
                  </span>
                </div>

                <p class="text-gray-400 text-sm leading-relaxed mb-5">
                  {{ project.description[lang] }}
                </p>

                <ul class="flex flex-wrap gap-2 mb-6">
                  <li
                    v-for="tech in project.stack"
                    :key="tech"
                    class="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md px-2 py-1"
                  >
                    {{ tech }}
                  </li>
                </ul>

                <div class="flex gap-4 text-sm">
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-emerald-400 hover:text-emerald-300 transition"
                  >
                    {{ t.projectsSection.liveDemo }}
                  </a>

                  <a
                    v-if="project.repo"
                    :href="project.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition"
                  >
                    {{ t.projectsSection.sourceCode }}
                  </a>
                </div>

              </div>
            </article>

          </div>

        </div>
      </section>

      <!-- MINI TERMINAL -->
      <section
        v-motion
        :initial="{
          opacity: 0,
          scale: 0.9
        }"
        :visibleOnce="{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 1000
          }
        }"
        class="px-8 py-24 border-t border-white/5"
      >
        <div class="max-w-4xl mx-auto">

          <div class="bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

            <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>

              <span class="ml-4 text-xs text-gray-400">
                system-terminal
              </span>
            </div>

            <div class="p-6 font-mono text-sm space-y-4">

              <p class="text-emerald-400">
                > status
              </p>

              <p class="text-gray-300">
                {{ t.terminal.statusVal }}
              </p>

              <p class="text-emerald-400">
                > current_focus
              </p>

              <p class="text-gray-300">
                {{ t.terminal.focusVal }}
              </p>

              <p class="text-emerald-400">
                > stack
              </p>

              <p class="text-gray-300">
                Vue • Django • Python • PostgreSQL
              </p>

            </div>

          </div>

        </div>
      </section>

      <!-- CONTACT -->
      <section
        id="contact"
        v-motion
        :initial="{
          opacity: 0,
          y: 80
        }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 800
          }
        }"
        class="px-8 py-24 border-t border-white/5"
      >
        <div class="max-w-3xl mx-auto text-center">

          <h2 class="text-2xl md:text-3xl font-light text-white mb-4">
            {{ t.contact.title }}
          </h2>

          <p class="text-gray-400 mb-10">
            {{ t.contact.subtitle }}
          </p>

          <div class="flex flex-wrap justify-center gap-4">

            <a
              href="mailto:carlos.castro24@outlook.es"
              class="px-6 py-3 bg-white text-black rounded-lg hover:scale-105 transition shadow-lg"
            >
              {{ t.contact.email }}
            </a>

            <a
              href="https://github.com/Carlos-j24"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
            >
              {{ t.contact.github }}
            </a>

            <a
              href="https://www.linkedin.com/in/carlos-castro-lpz/"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
            >
              {{ t.contact.linkedin }}
            </a>

          </div>

        </div>
      </section>

      <!-- FOOTER -->
      <footer class="px-8 py-6 text-center text-xs text-gray-500 border-t border-white/5">
        {{ t.footer }}
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const mobileMenuOpen = ref(false)

const lang = ref(localStorage.getItem('portfolio-lang') || 'en')

const toggleLang = () => {
  lang.value = lang.value === 'en' ? 'es' : 'en'
  localStorage.setItem('portfolio-lang', lang.value)
  document.documentElement.lang = lang.value
}

const translations = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact', menu: 'Open menu', close: 'Close menu' },
    hero: {
      greeting: "Hi, I'm",
      role: 'Full Stack Developer',
      description: 'I build reliable, scalable and well-structured systems with a focus on clean architecture, real-world impact and thoughtful user experience.',
      focusLabel: 'CURRENT FOCUS',
      focusValue: 'Full Stack Systems',
      stackLabel: 'STACK',
      statusLabel: 'STATUS',
      statusValue: 'Available for work',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me'
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
      subtitle: 'Structured view of my technical capabilities organized by system layers and engineering focus.',
      groups: [
        { title: 'Backend Systems', items: ['Python (Advanced)', 'Django (Advanced)', 'REST APIs', 'PostgreSQL', 'System Design'] },
        { title: 'Frontend Engineering', items: ['Vue 3', 'TailwindCSS', 'Responsive UI', 'Component Architecture', 'UX Principles'] },
        { title: 'Engineering Tools', items: ['Git & GitHub', 'Linux Basics', 'Docker (Learning)', 'CI/CD Concepts', 'Agile Workflow'] }
      ]
    },
    projectsSection: {
      title: 'Selected Projects',
      subtitle: 'Real-world systems built with clean architecture, maintainable code and focus on impact.',
      liveDemo: 'Live Demo →',
      sourceCode: 'Source Code'
    },
    terminal: {
      statusVal: 'System online',
      focusVal: 'Building scalable and meaningful software systems.'
    },
    contact: {
      title: "Let's Build Something",
      subtitle: 'Open to new opportunities and collaborations. Reach out through any of these channels.',
      email: 'Send an Email',
      github: 'GitHub',
      linkedin: 'LinkedIn'
    },
    footer: 'Built with precision • Designed for impact • Powered by Carlos'
  },
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto', menu: 'Abrir menú', close: 'Cerrar menú' },
    hero: {
      greeting: 'Hola, soy',
      role: 'Full Stack Developer',
      description: 'Construyo sistemas confiables, escalables y bien estructurados, con enfoque en arquitectura limpia, impacto real y una experiencia de usuario cuidada.',
      focusLabel: 'ENFOQUE ACTUAL',
      focusValue: 'Sistemas Full Stack',
      stackLabel: 'STACK',
      statusLabel: 'ESTADO',
      statusValue: 'Disponible para trabajar',
      viewProjects: 'Ver Proyectos',
      contactMe: 'Contáctame'
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
      subtitle: 'Vista estructurada de mis capacidades técnicas, organizadas por capas del sistema y enfoque de ingeniería.',
      groups: [
        { title: 'Sistemas Backend', items: ['Python (Avanzado)', 'Django (Avanzado)', 'APIs REST', 'PostgreSQL', 'Diseño de Sistemas'] },
        { title: 'Ingeniería Frontend', items: ['Vue 3', 'TailwindCSS', 'UI Responsiva', 'Arquitectura de Componentes', 'Principios UX'] },
        { title: 'Herramientas de Ingeniería', items: ['Git y GitHub', 'Fundamentos de Linux', 'Docker (Aprendiendo)', 'Conceptos de CI/CD', 'Flujo de trabajo Ágil'] }
      ]
    },
    projectsSection: {
      title: 'Proyectos Destacados',
      subtitle: 'Sistemas reales construidos con arquitectura limpia, código mantenible y enfoque en el impacto.',
      liveDemo: 'Ver Demo →',
      sourceCode: 'Código Fuente'
    },
    terminal: {
      statusVal: 'Sistema en línea',
      focusVal: 'Construyendo sistemas de software escalables y con sentido.'
    },
    contact: {
      title: 'Construyamos Algo',
      subtitle: 'Abierto a nuevas oportunidades y colaboraciones. Escríbeme por cualquiera de estos canales.',
      email: 'Enviar un Correo',
      github: 'GitHub',
      linkedin: 'LinkedIn'
    },
    footer: 'Hecho con precisión • Diseñado para generar impacto • Por Carlos'
  }
}

const t = computed(() => translations[lang.value])

const projects = [
  {
    title: 'MedAlert',
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
    title: 'DevForge',
    description: {
      en: 'Personal AI-powered development ecosystem that automates repetitive tasks and organizes tooling, documentation and workflows around modern software engineering practices.',
      es: 'Ecosistema de desarrollo personal potenciado por IA que automatiza tareas repetitivas y organiza herramientas, documentación y flujos de trabajo bajo buenas prácticas de ingeniería de software.'
    },
    stack: ['Python', 'TypeScript', 'Vue.js', 'Django', 'Docker', 'PostgreSQL'],
    status: { en: 'In Development', es: 'En Desarrollo' },
    statusClass: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    accent: 'from-amber-500 to-orange-400',
    demo: null,
    repo: 'https://github.com/Carlos-j24/DevForge'
  },
  {
    title: 'Text Encryptor',
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

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const handleMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  document.documentElement.lang = lang.value
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.engineering-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);

  background-size: 40px 40px;

  mask-image:
    radial-gradient(circle at center, black 30%, transparent 90%);
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in-up 1s ease-out forwards;
}

.delay-150 {
  animation-delay: 150ms;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-500 {
  animation-delay: 500ms;
}
</style>