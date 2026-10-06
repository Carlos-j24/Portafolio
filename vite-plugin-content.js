import fs from 'node:fs'
import path from 'node:path'
import { Marked } from 'marked'
import { email, socials } from './src/data/contact.js'

// Contenido en Markdown: content/<colección>/<slug>/<idioma>.md
// - Al compilar, cada archivo se convierte en módulos JS: ?meta exporta el front matter
//   (meta) y ?html el cuerpo ya convertido (html), en módulos distintos para que el HTML
//   de cada página vaya en su propio chunk. El navegador no descarga un lector de Markdown.
// - Tras el build se generan páginas de vista previa, sitemap.xml y robots.txt.

// Colecciones: carpeta en content/ → ruta pública y tipo de schema.org
const COLLECTIONS = {
  blog: { route: 'blog', schema: 'BlogPosting' },
  projects: { route: 'projects', schema: 'SoftwareSourceCode' }
}

// Campos del front matter que llegan a la app (el resto se ignora)
const META_FIELDS = ['title', 'date', 'readingTime', 'tags', 'summary', 'period', 'role', 'stack', 'repo', 'image']

const unquote = (value) => value.replace(/^["'](.*)["']$/, '$1')

const parseValue = (raw) => {
  const value = raw.trim()

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => unquote(item.trim()))
      .filter(Boolean)
  }

  if (/^\d+$/.test(value)) return Number(value)

  return unquote(value)
}

const parseFrontMatter = (source) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: source }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    data[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1))
  }

  return { data, body: match[2] }
}

// Idioma de las vistas previas al compartir (LinkedIn, WhatsApp…): los bots no tienen
// preferencia de idioma, así que se elige uno. Si la página no existe en ese idioma,
// se usa el otro.
const PREVIEW_LANG = 'es'

const LOCALES = { es: 'es_ES', en: 'en_US' }

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Cambia el atributo content (o href) de la etiqueta que contiene `selector` en index.html
const setTag = (html, selector, value, attr = 'content') => {
  const pattern = new RegExp(`(<[^>]*${selector}[^>]*\\s${attr}=")[^"]*(")`)
  if (!pattern.test(html)) throw new Error(`[content] No encuentro ${selector} en index.html`)
  return html.replace(pattern, `$1${escapeAttr(value)}$2`)
}

const readPreviewEntry = (dir, slug) => {
  const langs = [PREVIEW_LANG, ...Object.keys(LOCALES).filter((lang) => lang !== PREVIEW_LANG)]

  for (const lang of langs) {
    const file = path.join(dir, slug, `${lang}.md`)
    if (fs.existsSync(file)) {
      return { lang, data: parseFrontMatter(fs.readFileSync(file, 'utf8')).data }
    }
  }

  return null
}

// <script type="application/ld+json"> seguro dentro de HTML (sin "</script>" en el JSON)
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

const author = (siteUrl) => ({ '@type': 'Person', name: 'Carlos Castro', url: `${siteUrl}/` })

const schemaFor = (collection, { url, siteUrl, image, lang, data }) => {
  if (COLLECTIONS[collection].schema === 'SoftwareSourceCode') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: data.title,
      description: data.summary,
      dateCreated: data.date,
      inLanguage: lang,
      url,
      image,
      codeRepository: data.repo,
      programmingLanguage: data.stack ?? [],
      author: author(siteUrl)
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.summary,
    datePublished: data.date,
    inLanguage: lang,
    url,
    mainEntityOfPage: url,
    image,
    keywords: (data.tags ?? []).join(', '),
    author: author(siteUrl)
  }
}

// index.html con los metadatos de una página de contenido, para que los bots que no
// ejecutan JS (vistas previas de LinkedIn, WhatsApp, X…) vean su título y su descripción
const renderEntryPage = (indexHtml, siteUrl, collection, slug, lang, data) => {
  const url = `${siteUrl}/${COLLECTIONS[collection].route}/${slug}`
  const title = `${data.title} — Carlos Castro`
  const image = data.image ? new URL(data.image, `${siteUrl}/`).href : null

  let html = indexHtml
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)

  html = setTag(html, 'name="description"', data.summary)
  html = setTag(html, 'rel="canonical"', url, 'href')
  html = setTag(html, 'property="og:title"', data.title)
  html = setTag(html, 'property="og:description"', data.summary)
  html = setTag(html, 'property="og:type"', 'article')
  html = setTag(html, 'property="og:url"', url)
  html = setTag(html, 'property="og:locale"', LOCALES[lang])
  html = setTag(html, 'property="og:locale:alternate"', LOCALES[lang === 'es' ? 'en' : 'es'])
  html = setTag(html, 'property="og:image:alt"', data.title)
  html = setTag(html, 'name="twitter:title"', data.title)
  html = setTag(html, 'name="twitter:description"', data.summary)

  if (image) {
    html = setTag(html, 'property="og:image"', image)
    html = setTag(html, 'name="twitter:image"', image)
  }

  const articleTags = [
    `<meta property="article:published_time" content="${escapeAttr(data.date)}" />`,
    '<meta property="article:author" content="Carlos Castro" />',
    ...(data.tags ?? []).map((tag) => `<meta property="article:tag" content="${escapeAttr(tag)}" />`)
  ]

  const schema = schemaFor(collection, { url, siteUrl, image: image ?? `${siteUrl}/og-image.png`, lang, data })

  return html.replace('</head>', `  ${articleTags.join('\n    ')}\n    ${jsonLd(schema)}\n  </head>`)
}

// Datos estructurados de la persona (todas las páginas): Google entiende quién es el autor
const personJsonLd = (siteUrl) =>
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Carlos Castro',
    alternateName: 'Carlos José Castro López',
    jobTitle: 'Full Stack Developer',
    url: `${siteUrl}/`,
    image: `${siteUrl}/avatar.jpg`,
    email: `mailto:${email}`,
    sameAs: [socials.github, socials.linkedin],
    knowsAbout: ['Python', 'Django', 'Vue.js', 'React', 'PowerShell', 'Spec-Driven Development']
  })

const sitemapXml = (siteUrl, entries) => {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${siteUrl}/`, lastmod: today },
    ...entries.map((e) => ({
      loc: `${siteUrl}/${COLLECTIONS[e.collection].route}/${e.slug}`,
      lastmod: e.data.date
    }))
  ]

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`),
    '</urlset>',
    ''
  ].join('\n')
}

const robotsTxt = (siteUrl) => `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`

// Ancho y alto de una imagen (WebP o PNG) leyendo su cabecera. null si no se reconoce.
const imageSize = (file) => {
  let b
  try {
    b = fs.readFileSync(file)
  } catch {
    return null
  }

  if (b.toString('ascii', 1, 4) === 'PNG') {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  }

  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null

  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') {
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
  }
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
  }
  if (chunk === 'VP8X') {
    return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 }
  }

  return null
}

// Imágenes del Markdown con su tamaño real (el navegador reserva el hueco y la página no
// salta al cargarlas) y carga diferida
const markdownWith = (publicDir) => {
  const md = new Marked()

  md.use({
    renderer: {
      image({ href, title, text }) {
        const size = href.startsWith('/') ? imageSize(path.join(publicDir, href)) : null
        const attrs = [
          `src="${escapeAttr(href)}"`,
          `alt="${escapeAttr(text)}"`,
          title ? `title="${escapeAttr(title)}"` : '',
          size ? `width="${size.width}" height="${size.height}"` : '',
          'loading="lazy"',
          'decoding="async"'
        ].filter(Boolean)

        return `<img ${attrs.join(' ')}>`
      }
    }
  })

  return md
}

const CONTENT_FILE = new RegExp(`/content/(${Object.keys(COLLECTIONS).join('|')})/([^/]+)/([a-z]{2})\\.md$`)

export default function contentPlugin() {
  let config
  let markdown

  return {
    name: 'portfolio-content',

    configResolved(resolved) {
      config = resolved
      markdown = markdownWith(resolved.publicDir)
    },

    // Tras el build:
    // - index.html con los datos estructurados de la persona (JSON-LD)
    // - dist/<ruta>/<slug>.html por página de contenido (Vercel la sirve en /<ruta>/<slug>
    //   gracias a cleanUrls). El visitante ve lo mismo: la app arranca y pinta la página.
    // - sitemap.xml y robots.txt
    // El dominio sale del <link rel="canonical"> de index.html: no se repite en ningún sitio.
    closeBundle() {
      if (config.command !== 'build') return

      const outDir = path.resolve(config.root, config.build.outDir)
      const indexPath = path.join(outDir, 'index.html')
      let indexHtml = fs.readFileSync(indexPath, 'utf8')

      const canonical = indexHtml.match(/rel="canonical" href="([^"]+)"/)
      if (!canonical) throw new Error('[content] index.html necesita <link rel="canonical">')
      const siteUrl = canonical[1].replace(/\/$/, '')

      indexHtml = indexHtml.replace('</head>', `  ${personJsonLd(siteUrl)}\n  </head>`)
      fs.writeFileSync(indexPath, indexHtml)

      const entries = []
      for (const [collection, { route }] of Object.entries(COLLECTIONS)) {
        const dir = path.resolve(config.root, 'content', collection)
        if (!fs.existsSync(dir)) continue
        fs.mkdirSync(path.join(outDir, route), { recursive: true })

        for (const slug of fs.readdirSync(dir)) {
          const entry = readPreviewEntry(dir, slug)
          if (!entry) continue
          entries.push({ collection, slug, ...entry })

          fs.writeFileSync(
            path.join(outDir, route, `${slug}.html`),
            renderEntryPage(indexHtml, siteUrl, collection, slug, entry.lang, entry.data)
          )
        }
      }

      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml(siteUrl, entries))
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt(siteUrl))
    },

    transform(source, id) {
      const [rawPath, query = ''] = id.split('?')
      const match = rawPath.replace(/\\/g, '/').match(CONTENT_FILE)
      if (!match) return null

      const [, collection, slug, lang] = match
      const { data, body } = parseFrontMatter(source)

      const meta = { collection, slug, lang, tags: [] }
      for (const field of META_FIELDS) {
        if (data[field] !== undefined) meta[field] = data[field]
      }

      const code = query.includes('html')
        ? `export const html = ${JSON.stringify(markdown.parse(body))}`
        : `export const meta = ${JSON.stringify(meta)}`

      return { code, map: null }
    }
  }
}
