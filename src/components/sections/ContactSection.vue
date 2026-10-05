<template>
  <section
    id="contact"
    v-motion
    :initial="{
      opacity: 0,
      y: 80
    }"
    :visibleOnce="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 800
      }
    }"
    class="px-8 py-24 border-t border-white/5 scroll-mt-24"
  >
    <div class="max-w-3xl mx-auto text-center">

      <h2 class="text-2xl md:text-3xl font-light text-white mb-4">
        {{ t.contact.title }}
      </h2>

      <p class="text-gray-400 mb-10">
        {{ t.contact.subtitle }}
      </p>

      <!-- EMAIL VISIBLE + COPIAR -->
      <div class="inline-flex max-w-full items-center gap-3 mb-8 bg-black/40 border border-white/10 rounded-xl pl-4 pr-2 py-2 font-mono text-sm">
        <span class="text-emerald-400 shrink-0">></span>

        <a
          ref="emailLink"
          :href="`mailto:${email}`"
          class="text-gray-200 hover:text-white transition truncate"
        >
          {{ email }}
        </a>

        <button
          class="shrink-0 text-xs font-sans tracking-wide rounded-lg px-3 py-1.5 border transition"
          :class="copied
            ? 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10'
            : 'text-gray-400 border-white/10 hover:text-white hover:border-white/30'"
          @click="copyEmail"
        >
          {{ copied ? t.contact.copied : t.contact.copy }}
        </button>

        <span class="sr-only" aria-live="polite">{{ copied ? t.contact.copied : '' }}</span>
      </div>

      <div class="flex flex-wrap justify-center gap-4">

        <a
          :href="`mailto:${email}`"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:scale-105 transition shadow-lg"
        >
          <SocialIcon name="email" class="w-4 h-4" />
          {{ t.contact.email }}
        </a>

        <a
          :href="socials.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
        >
          <SocialIcon name="github" class="w-4 h-4" />
          {{ t.contact.github }}
        </a>

        <a
          :href="socials.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
        >
          <SocialIcon name="linkedin" class="w-4 h-4" />
          {{ t.contact.linkedin }}
        </a>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import SocialIcon from '../SocialIcon.vue'
import { useLang } from '../../composables/useLang.js'
import { email, socials } from '../../data/contact.js'

const { t } = useLang()

const copied = ref(false)

let resetTimer = null

const emailLink = ref(null)

// Método clásico para navegadores sin Clipboard API o sin permiso para usarla
const legacyCopy = () => {
  const textarea = document.createElement('textarea')
  textarea.value = email
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }

  textarea.remove()
  return ok
}

// Último recurso: dejar el correo seleccionado para que el visitante pulse Ctrl+C
const selectEmail = () => {
  const range = document.createRange()
  range.selectNodeContents(emailLink.value)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

const copyEmail = async () => {
  let ok = false

  try {
    await navigator.clipboard.writeText(email)
    ok = true
  } catch {
    ok = legacyCopy()
  }

  if (!ok) {
    selectEmail()
    return
  }

  copied.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

onUnmounted(() => {
  clearTimeout(resetTimer)
})
</script>
