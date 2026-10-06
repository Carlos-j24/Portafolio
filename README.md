# Carlos Castro — Portfolio

Portafolio personal desarrollado con Vue 3 y Vite, con estética de sistema/terminal (boot sequence, glow interactivo y micro-animaciones con scroll).

## ✨ Características

- **Intro tipo boot sequence** con barra de carga, flash de transición y pantalla de bienvenida — saltable con un botón, y no se repite en la misma sesión (`sessionStorage`).
- **Selector de idioma EN/ES**: detecta el idioma del navegador, lo guarda en `localStorage` y sincroniza el atributo `lang` del HTML.
- **Respeta `prefers-reduced-motion`**: sin intro animada y con animaciones reducidas para quien lo pida en su sistema.
- **Diseño responsive**, con menú hamburguesa por debajo de 1280 px.
- **Animaciones de scroll** con [`@vueuse/motion`](https://motion.vueuse.org/).
- Secciones: Hero, Sobre mí, Habilidades (con la especialidad principal destacada), Trayectoria (línea de tiempo estilo log), Proyectos, Blog, Terminal decorativa y Contacto (correo visible con botón de copiar).
- **Blog bilingüe** en Markdown: cada artículo tiene su página (`/blog/<slug>`) y se convierte a HTML al compilar, así que el navegador no descarga ningún lector de Markdown.
- **Casos de estudio** de MedAlert y DevForge (`/projects/<slug>`), con el mismo sistema: problema, decisiones, arquitectura, capturas y aprendizajes. La tarjeta del proyecto enlaza a su caso de estudio si existe.
- Iconos de correo, LinkedIn y GitHub en la barra de navegación; los datos de contacto viven en `src/data/contact.js`.
- Metadata SEO y Open Graph (incluyendo imagen de preview personalizada) para compartir el link.
- **SEO generado al compilar**: `sitemap.xml` (portada y artículos), `robots.txt` y datos estructurados JSON-LD (`Person` en todas las páginas, `BlogPosting` en cada artículo).

## 🛠️ Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) (configuración en `src/style.css`, vía `@tailwindcss/postcss`)
- [@vueuse/motion](https://motion.vueuse.org/)
- [Vue Router](https://router.vuejs.org/) (portada y páginas del blog)
- [marked](https://marked.js.org/) (solo en el build, para el Markdown del blog)

## 🚀 Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview
```

## ✍️ Escribir un artículo

1. Crea `content/blog/<slug>/es.md` y `content/blog/<slug>/en.md` (si falta un idioma, se muestra el otro).
2. Empieza cada archivo con este front matter:

   ```markdown
   ---
   title: "Título del artículo"
   date: 2026-10-05
   readingTime: 5
   tags: [DevForge, IA]
   summary: "Una o dos frases para la tarjeta y la descripción de la página."
   ---
   ```

3. Escribe el cuerpo en Markdown, sin `#` de título: la página ya lo muestra. Las secciones van con `##`.

El artículo aparece automáticamente en la sección Blog, ordenado por fecha (el más reciente primero).

**Casos de estudio:** igual, en `content/projects/<slug>/es.md` y `en.md`, con estos campos en el front matter: `title`, `date`, `period`, `role`, `stack` (lista), `repo`, `image` (portada), `readingTime` y `summary`. Las imágenes de la galería van en `public/gallery/<slug>/` (no en `public/projects/<slug>/`: chocaría con la ruta de la página). Para enlazarlo desde la tarjeta, pon el mismo `slug` en `src/data/projects.js`.

Al compilar se genera además `dist/blog/<slug>.html` (y `dist/projects/<slug>.html` para los casos de estudio) con el título, la descripción y los datos Open Graph del artículo **en español** (`PREVIEW_LANG` en `vite-plugin-content.js`), para que las vistas previas de LinkedIn, WhatsApp o X muestren el artículo y no la portada. Para una imagen propia, añade `image: /ruta-en-public.png` (1200×630) al front matter; si no, se usa `og-image.png`.

## 📁 Estructura

```
content/blog/<slug>/     # Artículos del blog (es.md y en.md)
content/projects/<slug>/ # Casos de estudio (es.md y en.md)
public/gallery/<slug>/   # Imágenes de los casos de estudio
vite-plugin-content.js   # Markdown a HTML, páginas de vista previa, sitemap, robots y JSON-LD
vercel.json              # cleanUrls (/blog/<slug> → blog/<slug>.html) y el resto de rutas a index.html
src/
├── App.vue                 # Orquesta la intro (loading → flash → welcome → home)
├── main.js
├── router.js               # Rutas (/ y /blog/:slug) y scroll a las secciones
├── style.css               # Tailwind + estilos compartidos (cuadrícula, animaciones)
├── i18n.js                 # Textos en inglés y español
├── composables/
│   ├── useLang.js           # Idioma compartido (detección, persistencia, textos)
│   └── useContentEntry.js   # Página de contenido: carga del HTML y título de la pestaña
├── data/
│   ├── projects.js          # Proyectos (image opcional para la captura)
│   ├── contact.js           # Correo y redes
│   ├── journey.js           # Trayectoria: estudios, cursos, certificados, hackatones y experiencia
│   └── content.js           # Artículos y casos de estudio: listas y carga de cada uno
├── components/
│   ├── LoadingScreen.vue    # Pantalla de carga con barra de progreso y skip
│   ├── SystemFlash.vue      # Efecto de transición
│   ├── WelcomeScreen.vue    # Pantalla de bienvenida
│   ├── SiteLayout.vue       # Fondo, cabecera y pie comunes a todas las páginas
│   ├── CursorGlow.vue       # Brillo que sigue al cursor
│   ├── AppHeader.vue        # Navegación, idioma y menú móvil
│   ├── SocialIcon.vue       # Iconos de correo, LinkedIn y GitHub
│   ├── ArticleBody.vue      # Cuerpo de artículos y casos de estudio (estilos de lectura)
│   └── sections/            # Hero, About, Skills, Journey, Projects, Blog, Terminal y Contact
└── views/
    ├── Home.vue             # Portada: todas las secciones
    ├── BlogPost.vue         # Página de un artículo
    └── ProjectPage.vue      # Página de un caso de estudio
```

## 📦 Deploy

Desplegado en [Vercel](https://vercel.com): https://portafolio-goap.vercel.app (build command `npm run build`, output `dist`). Si cambia el dominio, actualiza las URLs absolutas de `index.html` (canonical, `og:url` y `og:image`).

## 📬 Contacto

- Email: carlos.castro24@outlook.es
- LinkedIn: [carlos-castro-lpz](https://www.linkedin.com/in/carlos-castro-lpz/)
- GitHub: [Carlos-j24](https://github.com/Carlos-j24)
