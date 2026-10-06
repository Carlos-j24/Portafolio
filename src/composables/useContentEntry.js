import { ref, computed, watch, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from './useLang.js'
import { getEntry, loadEntryHtml } from '../data/content.js'

// Página de contenido (artículo o caso de estudio) según el slug de la ruta y el idioma:
// - entry: metadatos (null si el slug no existe)
// - html: cuerpo, que se descarga al abrir la página o al cambiar de idioma
// Además pone el título y la descripción de la pestaña y los restaura al salir.
export function useContentEntry(collection) {
  const route = useRoute()
  const { lang } = useLang()

  const entry = computed(() => getEntry(collection, route.params.slug, lang.value) ?? null)
  const html = ref('')

  // Si llega una respuesta vieja después de otra más nueva, se descarta
  let request = 0

  watch(entry, async (current) => {
    const id = ++request
    html.value = ''
    if (!current) return

    const body = await loadEntryHtml(current)
    if (id === request) html.value = body
  }, { immediate: true })

  const descriptionTag = document.querySelector('meta[name="description"]')
  const originalTitle = document.title
  const originalDescription = descriptionTag?.getAttribute('content')

  const restore = () => {
    document.title = originalTitle
    if (originalDescription) descriptionTag?.setAttribute('content', originalDescription)
  }

  // La misma página se reutiliza al cambiar de slug: si el nuevo no existe, se vuelve
  // al título general en lugar de dejar el de la página anterior
  watchEffect(() => {
    if (!entry.value) return restore()

    document.title = `${entry.value.title} — Carlos Castro`
    descriptionTag?.setAttribute('content', entry.value.summary)
  })

  // onBeforeUnmount y no onUnmounted: este último se ejecuta después de que la página
  // siguiente haya puesto su título y lo pisaría
  onBeforeUnmount(restore)

  return { entry, html }
}
