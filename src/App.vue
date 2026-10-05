<template>

  <!-- Loading -->
  <LoadingScreen
    v-if="stage === 'loading'"
    :progress="progress"
    @skip="skipIntro"
  />

  <!-- Flash Effect -->
  <SystemFlash
    v-if="flash"
  />

  <!-- Welcome -->
  <WelcomeScreen
    v-if="stage === 'welcome'"
  />

  <!-- Site (portada y blog) -->
  <SiteLayout
    v-if="stage === 'home'"
  />

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import SiteLayout from './components/SiteLayout.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import SystemFlash from './components/SystemFlash.vue'

const progress = ref(0)

const flash = ref(false)

const alreadyVisited = sessionStorage.getItem('intro-seen') === 'true'

// Quien pide menos movimiento en su sistema va directo a Home, sin la intro animada
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Quien entra directo a un artículo (enlace compartido) tampoco ve la intro
const landedOnHome = window.location.pathname === '/'

const skipIntroOnLoad = alreadyVisited || prefersReducedMotion || !landedOnHome

const stage = ref(skipIntroOnLoad ? 'home' : 'loading')

let interval = null
let timeouts = []

const skipIntro = () => {
  if (interval) clearInterval(interval)
  timeouts.forEach(clearTimeout)
  flash.value = false
  stage.value = 'home'
  sessionStorage.setItem('intro-seen', 'true')
}

onMounted(() => {

  if (skipIntroOnLoad) return

  interval = setInterval(() => {

    if (progress.value < 100) {
      progress.value++
    }

  }, 50)

  timeouts.push(setTimeout(() => {

    clearInterval(interval)

    flash.value = true

    timeouts.push(setTimeout(() => {

      flash.value = false

      stage.value = 'welcome'

      timeouts.push(setTimeout(() => {

        stage.value = 'home'

        sessionStorage.setItem('intro-seen', 'true')

      }, 1800))

    }, 1000))

  }, 5000))

})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  timeouts.forEach(clearTimeout)
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  margin: 0;
  background: #05080D;
  overflow-x: hidden;
  font-family:
    Inter,
    system-ui,
    sans-serif;
}
</style>