<template>
  <section
    id="ai"
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

      <h2 class="text-2xl md:text-3xl font-light text-white mb-4">
        {{ t.ai.title }}
      </h2>

      <p class="text-gray-400 mb-10 max-w-2xl">
        {{ t.ai.subtitle }}
      </p>

      <!-- Nivel y herramientas -->
      <div class="rounded-xl border border-emerald-400/40 bg-emerald-400/4 shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)] p-6 md:p-8">
        <p class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span class="font-mono text-xs tracking-widest text-emerald-400">{{ t.ai.levelLabel }}</span>
          <span class="text-xl text-white">{{ t.ai.level }}</span>
          <span class="text-sm text-gray-400">· {{ t.ai.levelNote }}</span>
        </p>

        <p class="mt-4 text-gray-300 leading-relaxed max-w-3xl">
          {{ t.ai.intro }}
        </p>

        <ul class="flex flex-wrap gap-2 mt-6">
          <li
            v-for="tool in tools"
            :key="tool"
            class="text-xs text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 rounded-md px-2 py-1"
          >
            {{ tool }}
          </li>
        </ul>

        <!-- Flujo de trabajo, como una tubería de terminal -->
        <p class="mt-6 font-mono text-xs text-gray-400 leading-loose">
          <span class="text-emerald-400 mr-1.5">></span>
          <span
            v-for="(step, index) in t.ai.workflow"
            :key="step"
            class="inline-block whitespace-nowrap"
          ><span class="text-gray-200">{{ step }}</span><span v-if="index < t.ai.workflow.length - 1" class="text-gray-600 mx-2" aria-hidden="true">→</span></span>
        </p>
      </div>

      <!-- Cómo la uso -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div
          v-for="practice in t.ai.practices"
          :key="practice.title"
          class="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 class="text-white mb-2">{{ practice.title }}</h3>
          <p class="text-sm text-gray-400 leading-relaxed">{{ practice.text }}</p>
        </div>
      </div>

      <!-- Dónde se ve -->
      <h3 class="font-mono text-xs tracking-widest text-gray-400 uppercase mt-12 mb-4">
        {{ t.ai.evidenceTitle }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouterLink
          v-for="item in t.ai.evidence"
          :key="item.to"
          :to="item.to"
          class="group flex flex-col bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition"
        >
          <span class="text-white group-hover:text-emerald-300 transition">{{ item.title }} →</span>
          <span class="mt-1 text-sm text-gray-400 leading-relaxed">{{ item.text }}</span>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'

const { t } = useLang()

// Nombres propios: iguales en los dos idiomas
const tools = ['Claude Code', 'OpenCode', 'Ollama', 'AGENTS.md / CLAUDE.md', 'Spec-Driven Development', 'GitHub Actions']
</script>
