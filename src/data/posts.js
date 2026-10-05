// Artículos en content/blog/<slug>/<idioma>.md, convertidos al compilar por vite-plugin-blog.js.
// Los metadatos van en el bundle (para las tarjetas); el HTML se descarga al abrir el artículo.
const metas = import.meta.glob('/content/blog/*/*.md', { eager: true, query: '?meta', import: 'meta' })
const bodies = import.meta.glob('/content/blog/*/*.md', { query: '?html', import: 'html' })

const posts = Object.entries(metas).map(([path, meta]) => ({ ...meta, path }))

// Un artículo por slug en el idioma pedido; si no existe, el otro idioma
export const getPost = (slug, lang) =>
  posts.find((post) => post.slug === slug && post.lang === lang) ??
  posts.find((post) => post.slug === slug)

export const getPosts = (lang) => {
  const slugs = [...new Set(posts.map((post) => post.slug))]

  return slugs
    .map((slug) => getPost(slug, lang))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const loadPostHtml = (post) => bodies[post.path]()

// Las fechas son días sin hora: se formatean en UTC para que no cambien de día
export const formatDate = (date, lang) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))
