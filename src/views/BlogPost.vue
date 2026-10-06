<template>
  <article class="px-6 md:px-8 py-16 md:py-24">
    <div class="max-w-3xl mx-auto">

      <RouterLink
        :to="{ path: '/', hash: '#blog' }"
        class="inline-block mb-10 text-sm text-gray-400 hover:text-white transition"
      >
        {{ t.blog.back }}
      </RouterLink>

      <template v-if="post">

        <header class="mb-12 animate-fade-in-up">
          <p class="font-mono text-xs text-gray-400 mb-4">
            <span class="text-emerald-400">></span>
            {{ formatDate(post.date, lang) }}
            <span v-if="post.readingTime"> · {{ post.readingTime }} {{ t.blog.minRead }}</span>
          </p>

          <h1 class="text-3xl md:text-5xl font-light text-white leading-tight md:leading-none">
            {{ post.title }}
          </h1>

          <ul class="flex flex-wrap gap-2 mt-6">
            <li
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md px-2 py-1"
            >
              {{ tag }}
            </li>
          </ul>
        </header>

        <ArticleBody
          :html="html"
          class="animate-fade-in-up anim-delay-150"
        />

      </template>

      <div v-else class="py-16 text-center">
        <h1 class="text-3xl font-light text-white mb-4">
          {{ t.blog.notFoundTitle }}
        </h1>

        <p class="text-gray-400">
          {{ t.blog.notFoundText }}
        </p>
      </div>

    </div>
  </article>
</template>

<script setup>
import ArticleBody from '../components/ArticleBody.vue'
import { useLang } from '../composables/useLang.js'
import { useContentEntry } from '../composables/useContentEntry.js'
import { formatDate } from '../data/content.js'

const { lang, t } = useLang()
const { entry: post, html } = useContentEntry('blog')
</script>
