<template>
  <header
    class="flex justify-between items-center px-4 md:px-8 py-6 border-b border-white/5 backdrop-blur sticky top-0 bg-[#0B0F14]/60 z-50"
  >
    <div class="text-xs sm:text-sm tracking-widest text-gray-400 animate-fade-in truncate">
      CARLOS.DEV // SYSTEM ONLINE
    </div>

    <div class="flex items-center gap-3 md:gap-6">
      <nav class="hidden md:flex gap-6 text-sm text-gray-400">
        <a
          v-for="link in links"
          :key="link"
          :href="`#${link}`"
          class="hover:text-white transition hover:scale-105"
        >
          {{ t.nav[link] }}
        </a>
      </nav>

      <button
        class="text-xs tracking-widest text-gray-400 hover:text-white transition border border-white/10 hover:border-white/30 rounded-full px-3 py-1.5 shrink-0"
        @click="toggleLang"
      >
        {{ lang === 'en' ? 'ES' : 'EN' }}
      </button>

      <button
        class="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0"
        :aria-label="mobileMenuOpen ? t.nav.close : t.nav.menu"
        :aria-expanded="mobileMenuOpen"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span
          class="block h-px bg-gray-300 transition-transform"
          :class="mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''"
        ></span>
        <span
          class="block h-px bg-gray-300 transition-opacity"
          :class="mobileMenuOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-px bg-gray-300 transition-transform"
          :class="mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''"
        ></span>
      </button>
    </div>

    <!-- MOBILE MENU -->
    <nav
      v-if="mobileMenuOpen"
      class="md:hidden absolute top-full left-0 right-0 flex flex-col gap-1 bg-[#0B0F14]/95 border-b border-white/5 backdrop-blur px-4 py-4 text-sm text-gray-400"
    >
      <a
        v-for="(link, index) in links"
        :key="link"
        :href="`#${link}`"
        class="py-3 hover:text-white transition"
        :class="index < links.length - 1 ? 'border-b border-white/5' : ''"
        @click="mobileMenuOpen = false"
      >
        {{ t.nav[link] }}
      </a>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useLang } from '../composables/useLang.js'

const { lang, t, toggleLang } = useLang()

const mobileMenuOpen = ref(false)

const links = ['home', 'about', 'skills', 'projects', 'contact']
</script>
