<template>
  <section
    id="blog"
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
        {{ t.blog.title }}
      </h2>

      <p class="text-gray-400 mb-10 max-w-2xl">
        {{ t.blog.subtitle }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          :to="{ name: 'post', params: { slug: post.slug } }"
          class="group flex flex-col bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-[1.02] hover:border-white/20 transition"
        >
          <p class="font-mono text-xs text-gray-500 mb-3">
            <span class="text-emerald-400">></span>
            {{ formatDate(post.date, lang) }}
            <span v-if="post.readingTime"> · {{ post.readingTime }} {{ t.blog.minRead }}</span>
          </p>

          <h3 class="text-white text-lg leading-snug mb-3">
            {{ post.title }}
          </h3>

          <p class="text-gray-400 text-sm leading-relaxed mb-5">
            {{ post.summary }}
          </p>

          <ul class="flex flex-wrap gap-2 mb-6">
            <li
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md px-2 py-1"
            >
              {{ tag }}
            </li>
          </ul>

          <span class="mt-auto text-sm text-emerald-400 group-hover:text-emerald-300 transition">
            {{ t.blog.readMore }}
          </span>
        </RouterLink>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLang } from '../../composables/useLang.js'
import { getPosts, formatDate } from '../../data/posts.js'

const { lang, t } = useLang()

const posts = computed(() => getPosts(lang.value))
</script>
