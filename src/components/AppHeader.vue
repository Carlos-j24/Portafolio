<template>
  <header
    class="flex justify-between items-center gap-6 px-4 md:px-8 py-6 border-b border-white/5 backdrop-blur sticky top-0 bg-[#0B0F14]/60 z-50"
  >
    <RouterLink
      :to="{ path: '/', hash: '#home' }"
      @click="scrollIfCurrent('#home')"
      class="min-w-0 text-xs sm:text-sm tracking-widest text-gray-400 hover:text-white transition animate-fade-in truncate"
    >
      CARLOS.DEV // SYSTEM ONLINE
    </RouterLink>

    <div class="flex items-center gap-3 xl:gap-6">
      <nav class="hidden xl:flex gap-6 whitespace-nowrap text-sm text-gray-400">
        <RouterLink
          v-for="link in links"
          :key="link"
          :to="{ path: '/', hash: `#${link}` }"
          class="hover:text-white transition hover:scale-105"
          @click="scrollIfCurrent(`#${link}`)"
        >
          {{ t.nav[link] }}
        </RouterLink>
      </nav>

      <div class="hidden sm:flex items-center gap-3 xl:pl-6 xl:border-l xl:border-white/10">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.href"
          :target="social.external ? '_blank' : null"
          :rel="social.external ? 'noopener noreferrer' : null"
          :aria-label="social.label"
          :title="social.label"
          class="w-4 h-4 text-gray-400 hover:text-white transition"
        >
          <SocialIcon :name="social.name" />
        </a>
      </div>

      <button
        class="text-xs tracking-widest text-gray-400 hover:text-white transition border border-white/10 hover:border-white/30 rounded-full px-3 py-1.5 shrink-0"
        @click="toggleLang"
      >
        {{ lang === 'en' ? 'ES' : 'EN' }}
      </button>

      <button
        class="xl:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0"
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
      class="xl:hidden absolute top-full left-0 right-0 flex flex-col gap-1 bg-[#0B0F14]/95 border-b border-white/5 backdrop-blur px-4 py-4 text-sm text-gray-400"
    >
      <RouterLink
        v-for="link in links"
        :key="link"
        :to="{ path: '/', hash: `#${link}` }"
        class="py-3 border-b border-white/5 hover:text-white transition"
        @click="mobileMenuOpen = false; scrollIfCurrent(`#${link}`)"
      >
        {{ t.nav[link] }}
      </RouterLink>

      <div class="flex gap-6 pt-4">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.href"
          :target="social.external ? '_blank' : null"
          :rel="social.external ? 'noopener noreferrer' : null"
          :aria-label="social.label"
          class="w-5 h-5 text-gray-400 hover:text-white transition"
        >
          <SocialIcon :name="social.name" />
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import SocialIcon from './SocialIcon.vue'
import { useLang } from '../composables/useLang.js'
import { scrollIfCurrent } from '../router.js'
import { email, socials } from '../data/contact.js'

const { lang, t, toggleLang } = useLang()

const mobileMenuOpen = ref(false)

const links = ['home', 'about', 'skills', 'journey', 'projects', 'blog', 'contact']

const socialLinks = [
  { name: 'email', label: email, href: `mailto:${email}`, external: false },
  { name: 'linkedin', label: 'LinkedIn', href: socials.linkedin, external: true },
  { name: 'github', label: 'GitHub', href: socials.github, external: true }
]
</script>
