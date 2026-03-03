<template>
  <template v-if="isPointer">
    <canvas class="cursor-canvas" ref="canvasEl"></canvas>
    <div class="cursor" ref="dotEl"></div>
  </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isPointer = window.matchMedia('(hover: hover)').matches
const dotEl    = ref(null)
const canvasEl = ref(null)

const SPAWN_DIST  = 5    // px of travel before spawning a new dot
const MAX_SIZE    = 14   // radius when dot is at distance 0 from mouse
const MIN_SIZE    = 1.5  // radius floor
const LIFETIME_MS = 900  // ms until a dot is fully gone

// accent-light: #a855f7 | accent glow: rgba(124,58,237,…)
const FILL_COLOR  = '#a855f7'
const GLOW_COLOR  = 'rgba(168,85,247,0.9)'
const GLOW_BLUR   = 10

let mx = 0, my = 0
let lastSpawnX = 0, lastSpawnY = 0
let rafId = null
let ctx = null
let lastInteractive = false

// Plain JS objects – no DOM pool, no Vue reactivity
// { x, y, spawnTime }
let particles = []

let setDotX, setDotY

function resize() {
  if (!canvasEl.value) return
  canvasEl.value.width  = window.innerWidth
  canvasEl.value.height = window.innerHeight
}

function onMove(e) {
  mx = e.clientX
  my = e.clientY

  const hovered = document.elementFromPoint(mx, my)
  const interactive = Boolean(
    hovered?.closest?.('a, button, [role="button"], input, select, textarea, label, summary, .btn')
  )

  if (interactive !== lastInteractive) {
    lastInteractive = interactive
    document.body.classList.toggle('cursor-native', interactive)
  }

  if (setDotX) {
    setDotX(mx)
    setDotY(my)
  }

  if (!interactive && Math.hypot(mx - lastSpawnX, my - lastSpawnY) >= SPAWN_DIST) {
    particles.push({ x: mx, y: my, spawnTime: performance.now() })
    lastSpawnX = mx
    lastSpawnY = my
  }
}

function tick() {
  const now = performance.now()

  if (ctx && canvasEl.value) {
    const { width, height } = canvasEl.value
    ctx.clearRect(0, 0, width, height)

    ctx.shadowBlur  = GLOW_BLUR
    ctx.shadowColor = GLOW_COLOR
    ctx.fillStyle   = FILL_COLOR

    // Filter dead particles out while drawing live ones
    const alive = []
    for (const p of particles) {
      const age = now - p.spawnTime
      if (age >= LIFETIME_MS) continue  // drop expired

      // Size + opacity must be monotonic over time (no “re-inflating” when revisiting)
      const t = 1 - age / LIFETIME_MS          // 1 → 0
      const ease = t * t                        // quadratic ease-out
      const radius  = MIN_SIZE + (MAX_SIZE - MIN_SIZE) * ease
      const opacity = 0.85 * ease

      ctx.globalAlpha = opacity
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fill()

      alive.push(p)
    }
    particles = alive
    ctx.globalAlpha = 1
  }

  rafId = requestAnimationFrame(tick)
}

let cursorVisible = true
function onLeave() {
  cursorVisible = false
  if (dotEl.value) gsap.to(dotEl.value, { opacity: 0, duration: 0.25 })
}
function onEnter() {
  cursorVisible = true
  if (dotEl.value) gsap.to(dotEl.value, { opacity: 1, duration: 0.25 })
}

onMounted(() => {
  if (!isPointer) return

  ctx = canvasEl.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)

  // xPercent / yPercent kept via GSAP so subsequent x/y sets don't clobber centering
  gsap.set(dotEl.value, { xPercent: -50, yPercent: -50 })
  setDotX = gsap.quickSetter(dotEl.value, 'x', 'px')
  setDotY = gsap.quickSetter(dotEl.value, 'y', 'px')

  const cx = window.innerWidth  / 2
  const cy = window.innerHeight / 2
  mx = cx; my = cy; lastSpawnX = cx; lastSpawnY = cy
  gsap.set(dotEl.value, { x: cx, y: cy, opacity: 1 })

  document.addEventListener('mousemove',  onMove)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  tick()
})

onUnmounted(() => {
  document.removeEventListener('mousemove',  onMove)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
  window.removeEventListener('resize', resize)
  if (rafId) cancelAnimationFrame(rafId)
  particles = []
  document.body.classList.remove('cursor-native')
})
</script>
