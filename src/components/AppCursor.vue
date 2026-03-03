<template>
  <template v-if="isPointer">
    <div class="cursor" ref="dotEl"></div>
    <div class="cursor-follower" ref="ringEl"></div>
  </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isPointer = window.matchMedia('(hover: hover)').matches
const dotEl  = ref(null)
const ringEl = ref(null)

let mx = 0, my = 0, rx = 0, ry = 0, rafId = null

function onMove(e) {
  mx = e.clientX; my = e.clientY
  if (dotEl.value) gsap.to(dotEl.value, { x: mx, y: my, duration: 0.08, ease: 'none' })
}
function tick() {
  rx += (mx - rx) * 0.1
  ry += (my - ry) * 0.1
  if (ringEl.value) gsap.set(ringEl.value, { x: rx, y: ry })
  rafId = requestAnimationFrame(tick)
}
function onLeave() { gsap.to([dotEl.value, ringEl.value], { opacity: 0, duration: 0.3 }) }
function onEnter() { gsap.to([dotEl.value, ringEl.value], { opacity: 1, duration: 0.3 }) }

onMounted(() => {
  if (!isPointer) return
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  tick()
})
onUnmounted(() => {
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>
