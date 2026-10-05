<template>
  <section
    id="home"
    class="flex-1 flex items-center justify-center px-6 py-24 scroll-mt-24"
  >
    <div class="text-center max-w-3xl">

      <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 animate-fade-in-up">
        <div class="absolute inset-0 rounded-full bg-emerald-400/25 blur-2xl"></div>
        <img
          src="/avatar.jpg"
          alt="Carlos Castro"
          class="relative w-full h-full object-cover rounded-full border-2 border-emerald-400/40 shadow-lg"
        />
        <span class="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0B0F14]"></span>
      </div>

      <p class="text-emerald-400 text-sm tracking-widest mb-4 animate-pulse">
        {{ t.hero.booting }}
      </p>

      <h1 class="text-4xl md:text-6xl font-light leading-tight animate-fade-in-up">
        {{ t.hero.greeting }} <span class="text-white font-medium">Carlos</span>
        <br />
        {{ t.hero.role }}
      </h1>

      <p class="mt-6 text-gray-400 text-lg leading-relaxed animate-fade-in-up anim-delay-150">
        {{ t.hero.description }}
      </p>

      <!-- STATUS CARDS -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up anim-delay-300">

        <div class="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition">
          <p class="text-xs text-gray-400">{{ t.hero.focusLabel }}</p>
          <p class="text-white mt-1">{{ t.hero.focusValue }}</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition">
          <p class="text-xs text-gray-400">{{ t.hero.stackLabel }}</p>
          <p class="text-white mt-1">Vue • Django • Python</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-105 transition">
          <p class="text-xs text-gray-400">{{ t.hero.statusLabel }}</p>
          <p class="text-emerald-400 mt-1">{{ t.hero.statusValue }}</p>
        </div>

      </div>

      <!-- CTA -->
      <div class="mt-10 flex justify-center gap-4 animate-fade-in-up anim-delay-500">
        <a
          href="#projects"
          class="px-6 py-3 bg-white text-black rounded-lg hover:scale-105 transition shadow-lg"
        >
          {{ t.hero.viewProjects }}
        </a>

        <a
          href="#contact"
          class="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
        >
          {{ t.hero.contactMe }}
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useLang } from '../../composables/useLang.js'

const { t } = useLang()
</script>
