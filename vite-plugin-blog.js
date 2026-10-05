import { marked } from 'marked'

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

export default function blogPlugin() {
  return {
    name: 'devforge-blog',
    transform(source, id) {
      const [rawPath, query = ''] = id.split('?')
      const path = rawPath.replace(/\\/g, '/')
      const match = path.match(/\/content\/blog\/([^/]+)\/([a-z]{2})\.md$/)
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
