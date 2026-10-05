<template>
  <CursorGlow />

  <div class="min-h-screen bg-[#0B0F14] text-gray-200 flex flex-col relative overflow-x-clip">

    <!-- ENGINEERING GRID -->
    <div class="absolute inset-0 opacity-[0.04]">
      <div class="h-full w-full engineering-grid engineering-grid--faded"></div>
    </div>

    <!-- BACKGROUND GLOW -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full top-[-200px] left-[-200px] animate-pulse"></div>

      <div class="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>
    </div>

    <div class="relative z-10 flex-1 flex flex-col">

      <AppHeader />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TerminalSection />
      <ContactSection />

      <!-- FOOTER -->
      <footer class="px-8 py-6 text-center text-xs text-gray-500 border-t border-white/5">
        {{ t.footer }}
      </footer>

    </div>
  </div>
</template>

<script setup>
import CursorGlow from '../components/CursorGlow.vue'
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import TerminalSection from '../components/sections/TerminalSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { useLang } from '../composables/useLang.js'

const { t } = useLang()
</script>
