<template>
  <section
    v-motion
    :initial="{
      opacity: 0,
      scale: 0.9
    }"
    :visibleOnce="{
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1000
      }
    }"
    class="px-8 py-24 border-t border-white/5"
  >
    <div class="max-w-4xl mx-auto">

      <div class="bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

        <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>

          <span class="ml-4 text-xs text-gray-400">
            system-terminal
          </span>
        </div>

        <div class="p-6 font-mono text-sm space-y-4">

          <p class="text-emerald-400">
            > status
          </p>

          <p class="text-gray-300">
            {{ t.terminal.statusVal }}
          </p>

          <p class="text-emerald-400">
            > current_focus
          </p>

          <p class="text-gray-300">
            {{ t.terminal.focusVal }}
          </p>

          <p class="text-emerald-400">
            > stack
          </p>

          <p class="text-gray-300">
            Vue • Django • Python • PostgreSQL
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
