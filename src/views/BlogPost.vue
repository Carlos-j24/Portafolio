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
          <p class="font-mono text-xs text-gray-500 mb-4">
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

        <!-- El HTML sale de los .md de content/blog, escritos por nosotros -->
        <div
          class="article-content animate-fade-in-up anim-delay-150"
          v-html="html"
        ></div>

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
import { ref, computed, watch, watchEffect, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang.js'
import { getPost, loadPostHtml, formatDate } from '../data/posts.js'

const route = useRoute()
const { lang, t } = useLang()

const post = computed(() => getPost(route.params.slug, lang.value))

const html = ref('')

// El cuerpo se descarga al abrir el artículo (o al cambiar de idioma); si llega una
// respuesta vieja después de otra más nueva, se descarta
let request = 0

watch(post, async (current) => {
  const id = ++request
  html.value = ''
  if (!current) return

  const body = await loadPostHtml(current)
  if (id === request) html.value = body
}, { immediate: true })

// Título y descripción de la pestaña según el artículo; se restauran al salir
const descriptionTag = document.querySelector('meta[name="description"]')
const originalTitle = document.title
const originalDescription = descriptionTag?.getAttribute('content')

watchEffect(() => {
  if (!post.value) return

  document.title = `${post.value.title} — Carlos Castro`
  descriptionTag?.setAttribute('content', post.value.summary)
})

onUnmounted(() => {
  document.title = originalTitle
  if (originalDescription) descriptionTag?.setAttribute('content', originalDescription)
})
</script>

<style scoped>
.article-content {
  color: rgb(209 213 219);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.article-content :deep(p),
.article-content :deep(ul),
.article-content :deep(ol),
.article-content :deep(pre),
.article-content :deep(blockquote) {
  margin-bottom: 1.5rem;
}

.article-content :deep(h2) {
  margin: 3rem 0 1.25rem;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.3;
}

.article-content :deep(h2)::before {
  content: '// ';
  color: rgb(52 211 153);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
}

.article-content :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.article-content :deep(a) {
  color: rgb(52 211 153);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-content :deep(a:hover) {
  color: rgb(110 231 183);
}

.article-content :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
}

.article-content :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  margin-bottom: 0.75rem;
  padding-left: 0.25rem;
}

.article-content :deep(li::marker) {
  color: rgb(52 211 153);
}

.article-content :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875em;
  color: rgb(110 231 183);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 0.375rem;
  padding: 0.1em 0.35em;
  white-space: nowrap;
}

.article-content :deep(pre) {
  overflow-x: auto;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  line-height: 1.6;
}

.article-content :deep(pre code) {
  color: rgb(209 213 219);
  background: none;
  border: 0;
  padding: 0;
  white-space: pre;
}

.article-content :deep(blockquote) {
  border-left: 2px solid rgb(52 211 153);
  background: rgba(52,211,153,0.05);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 1rem 1.25rem;
  color: rgb(209 213 219);
}

.article-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}
</style>
