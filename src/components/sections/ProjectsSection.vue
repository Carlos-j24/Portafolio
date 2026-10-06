<template>
  <section
    id="projects"
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
        {{ t.projectsSection.title }}
      </h2>

      <p class="text-gray-400 mb-10 max-w-2xl">
        {{ t.projectsSection.subtitle }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <article
          v-for="project in projects"
          :key="project.title"
          class="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
        >
          <div
            class="h-2 bg-linear-to-r"
            :class="project.accent"
          ></div>

          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            width="1200"
            height="675"
            loading="lazy"
            class="w-full aspect-video object-cover border-b border-white/10"
          />

          <div class="p-6">

            <div class="flex items-start justify-between gap-4 mb-3">
              <h3 class="text-white text-lg">
                {{ project.title }}
              </h3>

              <span
                class="text-xs px-2 py-1 rounded-full border shrink-0"
                :class="project.statusClass"
              >
                {{ project.status[lang] }}
              </span>
            </div>

            <p class="text-gray-400 text-sm leading-relaxed mb-5">
              {{ project.description[lang] }}
            </p>

            <ul class="flex flex-wrap gap-2 mb-6">
              <li
                v-for="tech in project.stack"
                :key="tech"
                class="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md px-2 py-1"
              >
                {{ tech }}
              </li>
            </ul>

            <div class="flex gap-4 text-sm">
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="text-emerald-400 hover:text-emerald-300 transition"
              >
                {{ t.projectsSection.liveDemo }}
              </a>

              <a
                v-if="project.repo"
                :href="project.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition"
              >
                {{ t.projectsSection.sourceCode }}
              </a>
            </div>

          </div>
        </article>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'
import { projects } from '../../data/projects.js'

const { lang, t } = useLang()
</script>
