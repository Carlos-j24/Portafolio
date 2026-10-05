<template>
  <div
    class="fixed inset-0 bg-[#05080D] flex items-center justify-center"
  >
    <div class="text-center">

      <p
        class="text-emerald-400 tracking-[5px] text-sm mb-6"
      >
        WELCOME TO THE SYSTEM
      </p>

      <h1
        class="text-5xl md:text-7xl text-white font-light"
      >
        Carlos Castro
      </h1>

      <p
        class="mt-6 text-xl text-gray-400"
      >
        {{ typedText }}
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const typedText = ref('')

const phrase = 'Building solutions with purpose.'

let interval = null

onMounted(() => {

  let index = 0

  // 40 ms por letra: la frase termina (~1,3 s) antes de que App pase a Home (1,8 s)
  interval = setInterval(() => {

    typedText.value += phrase[index]

    index++

    if (index >= phrase.length) {
      clearInterval(interval)
    }

  }, 40)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>