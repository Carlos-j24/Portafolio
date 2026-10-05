<template>
  <section
    id="skills"
    v-motion
    :initial="{
      opacity: 0,
      y: 120
    }"
    :visibleOnce="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 1000
      }
    }"
    class="px-8 py-24 border-t border-white/5 scroll-mt-24"
  >
    <div class="max-w-5xl mx-auto">

      <h2 class="text-2xl md:text-3xl font-light text-white mb-10">
        {{ t.skills.title }}
      </h2>

      <p class="text-gray-400 mb-10 max-w-2xl">
        {{ t.skills.subtitle }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div
          v-for="group in t.skills.groups"
          :key="group.title"
          class="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition"
        >
          <h3 class="text-white mb-4">{{ group.title }}</h3>

          <ul class="space-y-2 text-gray-400 text-sm">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'

const { t } = useLang()
</script>
