<template>
  <section
    id="journey"
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
    <div class="max-w-4xl mx-auto">

      <h2 class="text-2xl md:text-3xl font-light text-white mb-4">
        {{ t.journey.title }}
      </h2>

      <p class="text-gray-400 mb-12 max-w-2xl">
        {{ t.journey.subtitle }}
      </p>

      <ol class="relative border-l border-white/10 ml-1.5 space-y-12">

        <li
          v-for="entry in journey"
          :key="entry.start + entry.place"
          class="relative pl-8"
        >
          <!-- Punto de la línea de tiempo -->
          <span
            class="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[#0B0F14]"
            :class="entry.end ? 'bg-gray-500' : 'bg-emerald-400 animate-pulse'"
          ></span>

          <!-- Línea de log -->
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs mb-3">
            <span class="text-gray-500">
              <span class="text-emerald-400 mr-1.5">></span>
              <template v-if="entry.start === entry.end">{{ entry.start }}</template>
              <template v-else>{{ entry.start }} → {{ entry.end ?? t.journey.present }}</template>
            </span>

            <span
              class="tracking-widest border rounded-sm px-1.5 py-0.5"
              :class="typeClass[entry.type]"
            >
              {{ t.journey.types[entry.type] }}
            </span>

            <span
              v-if="!entry.end"
              class="tracking-widest text-emerald-400"
            >
              ● {{ t.journey.active }}
            </span>
          </div>

          <h3 class="text-white text-lg leading-snug">
            {{ entry.title[lang] }}
          </h3>

          <p class="text-sm text-gray-400 mt-1 mb-3">
            {{ entry.place }}
          </p>

          <p class="text-gray-400 text-sm leading-relaxed max-w-2xl">
            {{ entry.description[lang] }}
          </p>

          <!-- Desglose (formaciones de un programa), como un árbol de terminal -->
          <ul
            v-if="entry.items?.length"
            class="mt-4 font-mono text-xs space-y-1.5 max-w-md"
          >
            <li
              v-for="(item, index) in entry.items"
              :key="item.name.en"
              class="flex items-baseline gap-2"
            >
              <span class="text-gray-600 shrink-0">{{ index === entry.items.length - 1 ? '└─' : '├─' }}</span>
              <a
                v-if="item.credential"
                :href="item.credential"
                target="_blank"
                rel="noopener noreferrer"
                :title="t.journey.credentialOf + ' ' + item.name[lang]"
                class="text-gray-300 underline decoration-dotted decoration-white/30 underline-offset-4 hover:text-emerald-300 hover:decoration-emerald-300 transition"
              >{{ item.name[lang] }} ↗</a>
              <span v-else class="text-gray-300">{{ item.name[lang] }}</span>
              <span class="flex-1 border-b border-dotted border-white/10 translate-y-[-3px]"></span>
              <span class="text-gray-500 shrink-0">{{ item.hours }} h · {{ item.date }}</span>
            </li>
          </ul>

          <ul
            v-if="entry.skills.length"
            class="flex flex-wrap gap-2 mt-4"
          >
            <li
              v-for="skill in entry.skills"
              :key="skill"
              class="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md px-2 py-1"
            >
              {{ skill }}
            </li>
          </ul>

          <a
            v-if="entry.credential"
            :href="entry.credential"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-4 text-sm text-emerald-400 hover:text-emerald-300 transition"
          >
            {{ t.journey.credential }}
          </a>

          <a
            v-if="entry.profile"
            :href="entry.profile"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-4 text-sm text-emerald-400 hover:text-emerald-300 transition"
          >
            {{ t.journey.profile }}
          </a>
        </li>

      </ol>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'
import { journey } from '../../data/journey.js'

const { lang, t } = useLang()

// Clases completas (no generadas) para que Tailwind las incluya en el build
const typeClass = {
  edu: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  course: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
  cert: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
  hack: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  work: 'text-rose-400 border-rose-400/30 bg-rose-400/10'
}
</script>
