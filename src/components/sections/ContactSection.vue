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

      <div class="flex flex-wrap justify-center gap-4">

        <a
          href="mailto:carlos.castro24@outlook.es"
          class="px-6 py-3 bg-white text-black rounded-lg hover:scale-105 transition shadow-lg"
        >
          {{ t.contact.email }}
        </a>

        <a
          href="https://github.com/Carlos-j24"
          target="_blank"
          rel="noopener noreferrer"
          class="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
        >
          {{ t.contact.github }}
        </a>

        <a
          href="https://www.linkedin.com/in/carlos-castro-lpz/"
          target="_blank"
          rel="noopener noreferrer"
          class="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
        >
          {{ t.contact.linkedin }}
        </a>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'

const { t } = useLang()
</script>
