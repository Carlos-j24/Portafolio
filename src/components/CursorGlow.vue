<template>
  <div
    ref="glow"
    class="cursor-glow fixed inset-0 pointer-events-none z-0"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const glow = ref(null)

let frame = null
let x = 0
let y = 0

// Se escribe la posición en variables CSS una vez por frame, sin pasar por la
// reactividad de Vue: así mover el ratón no vuelve a renderizar la página
const paint = () => {
  frame = null
  glow.value?.style.setProperty('--glow-x', `${x}px`)
  glow.value?.style.setProperty('--glow-y', `${y}px`)
}

const handleMouseMove = (e) => {
  x = e.clientX
  y = e.clientY
  if (!frame) frame = requestAnimationFrame(paint)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<style scoped>
.cursor-glow {
  --glow-x: 0px;
  --glow-y: 0px;

  background: radial-gradient(
    600px at var(--glow-x) var(--glow-y),
    rgba(59,130,246,0.12),
    transparent 80%
  );
}
</style>
