<template>
  <article class="px-6 md:px-8 py-16 md:py-24">
    <div class="max-w-3xl mx-auto">

      <RouterLink
        :to="{ path: '/', hash: '#projects' }"
        class="inline-block mb-10 text-sm text-gray-400 hover:text-white transition"
      >
        {{ t.projectPage.back }}
      </RouterLink>

      <template v-if="project">

        <header class="mb-12 animate-fade-in-up">
          <p class="font-mono text-xs text-gray-400 mb-4">
            <span class="text-emerald-400 mr-1.5">></span>{{ project.period }}<template v-if="project.role"> · {{ project.role }}</template>
          </p>

          <h1 class="text-3xl md:text-5xl font-light text-white leading-tight md:leading-none">
            {{ project.title }}
          </h1>

          <p class="mt-6 text-lg text-gray-400 leading-relaxed">
            {{ project.summary }}
          </p>

          <ul class="flex flex-wrap gap-2 mt-6">
            <li
              v-for="tech in project.stack"
              :key="tech"
              class="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md px-2 py-1"
            >
              {{ tech }}
            </li>
          </ul>

          <a
            v-if="project.repo"
            :href="project.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition"
          >
            {{ t.projectPage.repo }}
          </a>

          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            width="1200"
            height="675"
            class="w-full h-auto mt-10 rounded-xl border border-white/10"
          />
        </header>

        <ArticleBody
          :html="html"
          class="animate-fade-in-up anim-delay-150"
        />

        <!-- Siguiente proyecto con caso de estudio -->
        <footer
          v-if="next"
          class="mt-16 pt-8 border-t border-white/10"
        >
          <RouterLink
            :to="{ name: 'project', params: { slug: next.slug } }"
            class="group block"
          >
            <span class="block font-mono text-xs text-gray-400 mb-2">
              {{ t.projectPage.next }}
            </span>
            <span class="text-xl text-white group-hover:text-emerald-300 transition">
              {{ next.title }} →
            </span>
          </RouterLink>
        </footer>

      </template>

      <div v-else class="py-16 text-center">
        <h1 class="text-3xl font-light text-white mb-4">
          {{ t.projectPage.notFoundTitle }}
        </h1>

        <p class="text-gray-400">
          {{ t.projectPage.notFoundText }}
        </p>
      </div>

    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import ArticleBody from '../components/ArticleBody.vue'
import { useLang } from '../composables/useLang.js'
import { useContentEntry } from '../composables/useContentEntry.js'
import { getEntries } from '../data/content.js'

const { lang, t } = useLang()
const { entry: project, html } = useContentEntry('projects')

const next = computed(() => {
  const all = getEntries('projects', lang.value)
  if (!project.value || all.length < 2) return null

  const index = all.findIndex((p) => p.slug === project.value.slug)
  return all[(index + 1) % all.length]
})
</script>
