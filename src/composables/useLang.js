import { ref, computed, watchEffect } from 'vue'
import { translations } from '../i18n.js'

const browserLang = navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'

// Estado compartido: todos los componentes ven el mismo idioma
const lang = ref(localStorage.getItem('portfolio-lang') || browserLang)

const t = computed(() => translations[lang.value])

watchEffect(() => {
  document.documentElement.lang = lang.value
})

const toggleLang = () => {
  lang.value = lang.value === 'en' ? 'es' : 'en'
  localStorage.setItem('portfolio-lang', lang.value)
}

export function useLang() {
  return { lang, t, toggleLang }
}
