import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'
import { email, socials } from './src/data/contact.js'

// Convierte los artículos de content/blog/<slug>/<idioma>.md en módulos JS al compilar:
// ?meta exporta el front matter (meta) y ?html el cuerpo ya convertido (html), en módulos
// distintos para que el HTML de cada artículo vaya en su propio chunk.
// Así el navegador no descarga un lector de Markdown.

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

// Idioma de las vistas previas al compartir un artículo (LinkedIn, WhatsApp…): los bots no
// tienen preferencia de idioma, así que se elige uno. Si el artículo no existe en ese
// idioma, se usa el otro.
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
  if (!pattern.test(html)) throw new Error(`[devforge-blog] No encuentro ${selector} en index.html`)
  return html.replace(pattern, `$1${escapeAttr(value)}$2`)
}

const readPreviewPost = (blogDir, slug) => {
  const langs = [PREVIEW_LANG, ...Object.keys(LOCALES).filter((lang) => lang !== PREVIEW_LANG)]

  for (const lang of langs) {
    const file = path.join(blogDir, slug, `${lang}.md`)
    if (fs.existsSync(file)) {
      return { lang, data: parseFrontMatter(fs.readFileSync(file, 'utf8')).data }
    }
  }

  return null
}

// index.html con los metadatos de un artículo, para que los bots que no ejecutan JS
// (vistas previas de LinkedIn, WhatsApp, X…) vean su título y su descripción
const renderPostPage = (indexHtml, siteUrl, slug, lang, data) => {
  const url = `${siteUrl}/blog/${slug}`
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

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.summary,
    datePublished: data.date,
    inLanguage: lang,
    url,
    mainEntityOfPage: url,
    image: image ?? `${siteUrl}/og-image.png`,
    keywords: (data.tags ?? []).join(', '),
    author: { '@type': 'Person', name: 'Carlos Castro', url: `${siteUrl}/` }
  }

  return html.replace('</head>', `  ${articleTags.join('\n    ')}\n    ${jsonLd(blogPosting)}\n  </head>`)
}

// <script type="application/ld+json"> seguro dentro de HTML (sin "</script>" en el JSON)
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

// Datos estructurados de la persona (portada y artículos): Google entiende quién es el autor
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

const sitemapXml = (siteUrl, posts) => {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${siteUrl}/`, lastmod: today },
    ...posts.map((post) => ({ loc: `${siteUrl}/blog/${post.slug}`, lastmod: post.data.date }))
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

export default function blogPlugin() {
  let config

  return {
    name: 'devforge-blog',

    configResolved(resolved) {
      config = resolved
    },

    // Tras el build:
    // - index.html con los datos estructurados de la persona (JSON-LD)
    // - dist/blog/<slug>.html por artículo (Vercel lo sirve en /blog/<slug> gracias a
    //   cleanUrls). El visitante ve lo mismo: la app arranca y pinta el artículo.
    // - sitemap.xml y robots.txt
    // El dominio sale del <link rel="canonical"> de index.html: no se repite en ningún sitio.
    closeBundle() {
      if (config.command !== 'build') return

      const outDir = path.resolve(config.root, config.build.outDir)
      const blogDir = path.resolve(config.root, 'content/blog')
      const indexPath = path.join(outDir, 'index.html')
      let indexHtml = fs.readFileSync(indexPath, 'utf8')

      const canonical = indexHtml.match(/rel="canonical" href="([^"]+)"/)
      if (!canonical) throw new Error('[devforge-blog] index.html necesita <link rel="canonical">')
      const siteUrl = canonical[1].replace(/\/$/, '')

      indexHtml = indexHtml.replace('</head>', `  ${personJsonLd(siteUrl)}\n  </head>`)
      fs.writeFileSync(indexPath, indexHtml)

      fs.mkdirSync(path.join(outDir, 'blog'), { recursive: true })

      const posts = []
      for (const slug of fs.readdirSync(blogDir)) {
        const post = readPreviewPost(blogDir, slug)
        if (!post) continue
        posts.push({ slug, ...post })

        fs.writeFileSync(
          path.join(outDir, 'blog', `${slug}.html`),
          renderPostPage(indexHtml, siteUrl, slug, post.lang, post.data)
        )
      }

      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml(siteUrl, posts))
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt(siteUrl))
    },

    transform(source, id) {
      const [rawPath, query = ''] = id.split('?')
      const filePath = rawPath.replace(/\\/g, '/')
      const match = filePath.match(/\/content\/blog\/([^/]+)\/([a-z]{2})\.md$/)
      if (!match) return null

      const [, slug, lang] = match
      const { data, body } = parseFrontMatter(source)

      const meta = {
        slug,
        lang,
        title: data.title,
        date: data.date,
        readingTime: data.readingTime,
        tags: data.tags ?? [],
        summary: data.summary
      }

      const code = query.includes('html')
        ? `export const html = ${JSON.stringify(marked.parse(body))}`
        : `export const meta = ${JSON.stringify(meta)}`

      return { code, map: null }
    }
  }
}
