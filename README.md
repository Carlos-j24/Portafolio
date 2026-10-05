# Carlos Castro — Portfolio

Portafolio personal desarrollado con Vue 3 y Vite, con estética de sistema/terminal (boot sequence, glow interactivo y micro-animaciones con scroll).

## ✨ Características

- **Intro tipo boot sequence** con barra de carga, flash de transición y pantalla de bienvenida — saltable con un botón, y no se repite en la misma sesión (`sessionStorage`).
- **Selector de idioma EN/ES**: detecta el idioma del navegador, lo guarda en `localStorage` y sincroniza el atributo `lang` del HTML.
- **Respeta `prefers-reduced-motion`**: sin intro animada y con animaciones reducidas para quien lo pida en su sistema.
- **Diseño responsive**, con menú hamburguesa en móvil.
- **Animaciones de scroll** con [`@vueuse/motion`](https://motion.vueuse.org/).
- Secciones: Hero, Sobre mí, Habilidades, Proyectos, Terminal decorativa y Contacto.
- Metadata SEO y Open Graph (incluyendo imagen de preview personalizada) para compartir el link.

## 🛠️ Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [@vueuse/motion](https://motion.vueuse.org/)

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

## 📁 Estructura

```
src/
├── App.vue                 # Orquesta la intro (loading → flash → welcome → home)
├── main.js
├── components/
│   ├── LoadingScreen.vue    # Pantalla de carga con barra de progreso y skip
│   ├── SystemFlash.vue      # Efecto de transición
│   └── WelcomeScreen.vue    # Pantalla de bienvenida
└── views/
    └── Home.vue             # Página principal (todas las secciones)
```

## 📦 Deploy

Desplegado en [Vercel](https://vercel.com): https://portafolio-goap.vercel.app (build command `npm run build`, output `dist`). Si cambia el dominio, actualiza las URLs absolutas de `index.html` (canonical, `og:url` y `og:image`).

## 📬 Contacto

- Email: carlos.castro24@outlook.es
- LinkedIn: [carlos-castro-lpz](https://www.linkedin.com/in/carlos-castro-lpz/)
- GitHub: [Carlos-j24](https://github.com/Carlos-j24)
