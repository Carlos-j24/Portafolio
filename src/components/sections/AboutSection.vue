<template>
  <section
    id="about"
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
    <div class="max-w-4xl mx-auto">

      <h2 class="text-2xl md:text-3xl font-light text-white mb-6">
        {{ t.about.title }}
      </h2>

      <p class="text-gray-400 leading-relaxed text-lg">
        {{ t.about.p1 }}
      </p>

      <p class="mt-6 text-gray-400 leading-relaxed">
        {{ t.about.p2 }}
      </p>

      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

        <div
          v-for="card in t.about.cards"
          :key="card.title"
          class="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-105 transition"
        >
          <h3 class="text-white mb-2">{{ card.title }}</h3>

          <p class="text-sm text-gray-400">
            {{ card.text }}
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'

const { t } = useLang()
</script>
