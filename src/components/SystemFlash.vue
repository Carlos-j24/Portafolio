<template>
  <div
    class="fixed inset-0 z-[9999] pointer-events-none flash"
  ></div>
</template>

<style scoped>
.flash {
  animation: flashEffect 1s ease forwards;
}

@keyframes flashEffect {

  0% {
    opacity: 0;
  }

  20% {
    opacity: .4;
  }

  100% {
    opacity: 0;
  }

}

.flash {
  background:
    radial-gradient(
      circle,
      rgba(59,130,246,.35),
      transparent 70%
    );
}
</style>