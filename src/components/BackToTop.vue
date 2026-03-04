<template>
  <Transition name="btt">
    <button
      v-show="visible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M5 10l5-5 5 5" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 500
}
function scrollToTop() {
  visible.value = false  // hide immediately — prevents re-clicks during smooth scroll
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 36px;
  right: 36px;
  z-index: 200;

  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.12);
  background: rgba(14,14,14,0.8);
  backdrop-filter: blur(16px);
  color: #fff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    background 0.25s,
    border-color 0.25s,
    transform 0.25s cubic-bezier(0.16,1,0.3,1),
    box-shadow 0.25s;
}
.back-to-top:hover {
  background: var(--accent);
  border-color: var(--accent-light);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--accent-glow);
}
.back-to-top:active {
  transform: translateY(-1px);
}

/* Transition */
.btt-enter-active,
.btt-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.85);
}

@media (max-width: 640px) {
  .back-to-top { bottom: 24px; right: 20px; width: 42px; height: 42px; }
}
</style>
