<template>
  <div
    class="fixed inset-0 bg-[#05080D] flex items-center justify-center overflow-hidden"
  >
    <!-- Glow -->
    <div
      class="absolute w-[700px] h-[700px] bg-blue-500/10 blur-3xl rounded-full"
    ></div>

    <!-- Grid -->
    <div class="absolute inset-0 engineering-grid opacity-[0.04]"></div>

    <button
      class="absolute top-6 right-6 text-xs tracking-widest text-gray-500 hover:text-white transition border border-white/10 hover:border-white/30 rounded-full px-4 py-2"
      @click="$emit('skip')"
    >
      SKIP →
    </button>

    <div class="relative z-10 w-full max-w-3xl px-8">

      <!-- Header -->
      <div class="text-center">

        <h1
          class="text-5xl md:text-7xl text-white font-light tracking-widest"
        >
          CARLOS.DEV
        </h1>

        <p
          class="mt-4 text-gray-400 tracking-[4px] text-sm"
        >
          INITIALIZING DEVELOPER ENVIRONMENT
        </p>

      </div>

      <!-- Progress -->
      <div class="mt-16">

        <div
          class="h-3 bg-white/10 rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-linear-to-r from-blue-500 to-emerald-400 transition-all duration-100"
            :style="{ width: progress + '%' }"
          ></div>
        </div>

        <div class="mt-5 text-center">

          <div class="text-4xl text-white font-light">
            {{ progress }}%
          </div>

          <div class="mt-3 text-gray-400">
            {{ currentMessage }}
          </div>

        </div>

      </div>

      <!-- Modules -->
      <div class="mt-12 grid md:grid-cols-2 gap-4">

        <div
          v-for="(item, index) in modules"
          :key="index"
          class="flex items-center gap-3"
        >
          <span
            v-if="progress >= item.trigger"
            class="text-emerald-400"
          >
            ✓
          </span>

          <span
            v-else
            class="text-gray-600"
          >
            ○
          </span>

          <span
            :class="
              progress >= item.trigger
                ? 'text-gray-300'
                : 'text-gray-600'
            "
          >
            {{ item.name }}
          </span>

        </div>

      </div>

      <!-- Success -->
      <transition name="fade">

        <div
          v-if="progress >= 100"
          class="mt-12 text-center"
        >
          <p
            class="text-emerald-400 text-xl tracking-widest animate-pulse"
          >
            AUTHENTICATION SUCCESSFUL
          </p>

          <p class="text-gray-400 mt-2">
            ENTERING SYSTEM...
          </p>
        </div>

      </transition>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})

defineEmits(['skip'])

const modules = [
  {
    name: 'Backend Systems',
    trigger: 15
  },
  {
    name: 'Frontend Engine',
    trigger: 30
  },
  {
    name: 'API Services',
    trigger: 45
  },
  {
    name: 'Database Layer',
    trigger: 60
  },
  {
    name: 'Portfolio Interface',
    trigger: 80
  },
  {
    name: 'Developer Profile',
    trigger: 95
  }
]

const currentMessage = computed(() => {

  const p = props.progress

  if (p < 20) {
    return 'Loading Backend Systems...'
  }

  if (p < 40) {
    return 'Connecting API Services...'
  }

  if (p < 60) {
    return 'Initializing Database Layer...'
  }

  if (p < 80) {
    return 'Loading Portfolio Interface...'
  }

  if (p < 100) {
    return 'Loading Developer Profile...'
  }

  return 'Authentication Successful'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>