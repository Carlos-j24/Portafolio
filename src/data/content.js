// Contenido en content/<colección>/<slug>/<idioma>.md (blog, projects), convertido al
// compilar por vite-plugin-content.js. Los metadatos van en el bundle (tarjetas, cabeceras);
// el HTML de cada página se descarga al abrirla.
const metas = import.meta.glob('/content/*/*/*.md', { eager: true, query: '?meta', import: 'meta' })
const bodies = import.meta.glob('/content/*/*/*.md', { query: '?html', import: 'html' })

const entries = Object.entries(metas).map(([path, meta]) => ({ ...meta, path }))

// Una página por slug en el idioma pedido; si no existe, el otro idioma
export const getEntry = (collection, slug, lang) => {
  const candidates = entries.filter((e) => e.collection === collection && e.slug === slug)
  return candidates.find((e) => e.lang === lang) ?? candidates[0]
}

// Todas las páginas de una colección, de la más reciente a la más antigua
export const getEntries = (collection, lang) => {
  const slugs = [...new Set(entries.filter((e) => e.collection === collection).map((e) => e.slug))]

  return slugs
    .map((slug) => getEntry(collection, slug, lang))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export const loadEntryHtml = (entry) => bodies[entry.path]()

// Las fechas son días sin hora: se formatean en UTC para que no cambien de día
export const formatDate = (date, lang) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))
