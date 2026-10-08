// Exporta cv/cv.html a PDF con Chrome sin interfaz (protocolo DevTools, sin dependencias).
//
//   npm run cv                      → public/cv/carlos-castro-cv-{es,en}.pdf (versión web, sin teléfono)
//   CV_PHONE="+57 ..." npm run cv   → además, la versión completa en CV_PRIVATE_DIR (por defecto, Descargas)
//
// La versión con teléfono nunca se escribe dentro del repo.
// Chrome: se usa CHROME_PATH o la ruta habitual en Windows, macOS o Linux.

import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = pathToFileURL(join(root, 'cv', 'cv.html')).href
const publicDir = join(root, 'public', 'cv')
const privateDir = process.env.CV_PRIVATE_DIR || join(homedir(), 'Downloads')
const phone = process.env.CV_PHONE?.trim()
const LANGS = ['es', 'en']

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium'
]

const chromePath = CHROME_CANDIDATES.find((p) => p && existsSync(p))
if (!chromePath) {
  console.error('No encuentro Chrome. Indica la ruta con CHROME_PATH.')
  process.exit(1)
}

const profile = mkdtempSync(join(tmpdir(), 'cv-chrome-'))
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  '--no-first-run',
  'about:blank'
])

try {
  const wsUrl = await new Promise((resolveUrl, reject) => {
    const timer = setTimeout(() => reject(new Error('Chrome no respondió')), 15000)
    chrome.stderr.on('data', (chunk) => {
      const match = /DevTools listening on (ws:\/\/\S+)/.exec(chunk.toString())
      if (match) {
        clearTimeout(timer)
        resolveUrl(match[1])
      }
    })
  })

  const browser = await connect(wsUrl)
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true })
  const page = (method, params) => browser.send(method, params, sessionId)

  await page('Page.enable')
  await page('Runtime.enable')

  const render = async (lang, withPhone) => {
    const query = new URLSearchParams({ lang })
    if (withPhone) query.set('phone', phone)

    const loaded = browser.once('Page.loadEventFired', sessionId)
    await page('Page.navigate', { url: `${source}?${query}` })
    await loaded

    // Espera a las fuentes y comprueba que cada columna deje al menos 1/4" de margen inferior
    const { result } = await page('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `document.fonts.ready.then(() => {
        const bottom = document.body.getBoundingClientRect().bottom
        const overflow = [...document.querySelectorAll('aside, main')]
          .map((column) => Math.ceil(column.lastElementChild.getBoundingClientRect().bottom - (bottom - 24)))
        return { fonts: document.fonts.check('10pt "IBM Plex Sans"'), overflow }
      })`
    })

    const { fonts, overflow } = result.value
    if (!fonts) throw new Error('No se cargó IBM Plex Sans (¿sin conexión?)')
    if (overflow.some((px) => px > 0)) throw new Error(`El CV (${lang}) no cabe en una página: sobran ${Math.max(...overflow)} px`)

    const { data } = await page('Page.printToPDF', {
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false
    })
    return Buffer.from(data, 'base64')
  }

  mkdirSync(publicDir, { recursive: true })

  for (const lang of LANGS) {
    const file = join(publicDir, `carlos-castro-cv-${lang}.pdf`)
    writeFileSync(file, await render(lang, false))
    console.log('✓', file)

    if (phone) {
      mkdirSync(privateDir, { recursive: true })
      const privateFile = join(privateDir, `carlos-castro-cv-${lang}-completo.pdf`)
      writeFileSync(privateFile, await render(lang, true))
      console.log('✓', privateFile, '(con teléfono, fuera del repo)')
    }
  }

  browser.close()
} finally {
  chrome.kill()
  // Chrome tarda un momento en soltar los archivos del perfil
  setTimeout(() => rmSync(profile, { recursive: true, force: true, maxRetries: 5 }), 500)
}

// Cliente mínimo del protocolo DevTools sobre el WebSocket nativo de Node 22+
async function connect(url) {
  const ws = new WebSocket(url)
  await new Promise((ok, fail) => {
    ws.addEventListener('open', ok, { once: true })
    ws.addEventListener('error', fail, { once: true })
  })

  let nextId = 0
  const pending = new Map()
  const waiters = []

  ws.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.id && pending.has(msg.id)) {
      const { ok, fail } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? fail(new Error(msg.error.message)) : ok(msg.result)
      return
    }
    for (const waiter of [...waiters]) {
      if (waiter.method === msg.method && waiter.sessionId === msg.sessionId) {
        waiters.splice(waiters.indexOf(waiter), 1)
        waiter.ok(msg.params)
      }
    }
  })

  return {
    send(method, params = {}, sessionId) {
      const id = ++nextId
      ws.send(JSON.stringify({ id, method, params, sessionId }))
      return new Promise((ok, fail) => pending.set(id, { ok, fail }))
    },
    once(method, sessionId) {
      return new Promise((ok) => waiters.push({ method, sessionId, ok }))
    },
    close: () => ws.close()
  }
}
