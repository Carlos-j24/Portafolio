<template>
  <CursorGlow />

  <div class="min-h-screen bg-[#0B0F14] text-gray-200 flex flex-col relative overflow-x-clip">

    <!-- Fondo fijo a la ventana: si fuera relativo a la página, el brillo de abajo se
         movería cada vez que la página crece (p. ej. al cargar un artículo) y Lighthouse
         lo cuenta como salto de diseño (CLS) -->

    <!-- ENGINEERING GRID -->
    <div class="fixed inset-0 opacity-[0.04] pointer-events-none">
      <div class="h-full w-full engineering-grid engineering-grid--faded"></div>
    </div>

    <!-- BACKGROUND GLOW -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full top-[-200px] left-[-200px] animate-pulse"></div>

      <div class="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>
    </div>

    <div class="relative z-10 flex-1 flex flex-col">

      <AppHeader />

      <!-- Al menos una pantalla de alto: las páginas de artículos y proyectos se cargan
           aparte, y sin esto el pie aparecería abajo de la pantalla y saltaría (CLS) -->
      <main class="flex-1 flex flex-col min-h-screen">
        <RouterView />
      </main>

      <!-- FOOTER -->
      <footer class="px-8 py-6 text-center text-xs text-gray-400 border-t border-white/5">
        {{ t.footer }}
      </footer>

    </div>
  </div>
</template>

<script setup>
import CursorGlow from './CursorGlow.vue'
import AppHeader from './AppHeader.vue'
import { useLang } from '../composables/useLang.js'

const { t } = useLang()
</script>
