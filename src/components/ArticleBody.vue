<template>
  <!-- El HTML sale de los .md de content/, escritos por nosotros -->
  <div
    class="article-content"
    v-html="html"
  ></div>
</template>

<script setup>
defineProps({
  html: {
    type: String,
    default: ''
  }
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

.article-content :deep(h3) {
  margin: 2rem 0 0.75rem;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
}

.article-content :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  margin: 2rem 0 0.75rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.75rem;
  box-shadow: 0 30px 80px -30px rgba(0,0,0,0.8);
}

/* Pie de foto: un párrafo solo en cursiva justo después de una imagen */
.article-content :deep(p:has(> img) + p > em:only-child) {
  display: block;
  margin-top: -0.75rem;
  color: rgb(156 163 175);
  font-size: 0.875rem;
  font-style: normal;
  text-align: center;
}
</style>
