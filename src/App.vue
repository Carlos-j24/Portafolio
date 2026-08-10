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

  <!-- Home -->
  <Home
    v-if="stage === 'home'"
  />

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import Home from './views/Home.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import SystemFlash from './components/SystemFlash.vue'

const progress = ref(0)

const flash = ref(false)

const alreadyVisited = sessionStorage.getItem('intro-seen') === 'true'

const stage = ref(alreadyVisited ? 'home' : 'loading')

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

  if (alreadyVisited) return

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