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
          class="relative rounded-xl p-6 hover:scale-105 transition border"
          :class="group.primary
            ? 'bg-emerald-400/4 border-emerald-400/40 shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)]'
            : 'bg-white/5 border-white/10'"
        >
          <span
            v-if="group.primary"
            class="inline-flex items-center gap-1.5 mb-3 text-[11px] tracking-widest uppercase text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 rounded-full px-2.5 py-1"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {{ t.skills.primaryBadge }}
          </span>

          <h3 class="text-white mb-4">{{ group.title }}</h3>

          <ul
            class="space-y-2 text-sm"
            :class="group.primary ? 'text-gray-300' : 'text-gray-400'"
          >
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
