<template>
  <section class="hero" id="hero" ref="heroEl" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <div class="hero__bg">
      <div class="hero__gradient"></div>
      <div class="hero__grid"></div>
      <div class="hero__orb hero__orb--1"></div>
      <div class="hero__orb hero__orb--2"></div>
      <div class="hero__orb hero__orb--3"></div>
      <div class="hero__spotlight"></div>
    </div>

    <div class="hero__container">
      <!-- Content -->
      <div class="hero__content">
        <div class="hero__eyebrow" ref="eyebrow">
          <span class="hero__eyebrow-dot"></span>
          UI/UX &amp; Graphic Designer · Crypto &amp; Tech
        </div>

        <h1 class="hero__title">
          <span class="hero__title-row" ref="t0">Building</span>
          <span class="hero__title-row hero__title-row--accent" ref="t1">Great</span>
          <span class="hero__title-row" ref="t2">Products.</span>
        </h1>

        <p class="hero__sub" ref="sub">
          Transforming complex problems into intuitive,<br class="hero__br" />
          beautiful products that people love to use.
        </p>

        <div class="hero__actions" ref="actions">
          <a href="#work" class="btn btn--primary magnetic">
            <span>View Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#contact" class="btn btn--ghost magnetic"><span>Let's Talk</span></a>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="hero__image" ref="heroImage">
        <div class="hero__image-glow"></div>
        <img src="/work/alex_v2_back.png" alt="Blurred Background" class="hero__img-back" />
        <img src="/work/alex_v2_main.png" alt="Alex Barbulescu" class="hero__img-front" />
      </div>
    </div>

    <div class="hero__scroll-hint" ref="scrollHint">
      <div class="hero__scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { setupMagnetic } from '../composables/useGsap.js'

const props = defineProps({ ready: Boolean })

const heroEl    = ref(null)
const eyebrow   = ref(null)
const t0        = ref(null)
const t1        = ref(null)
const t2        = ref(null)
const sub       = ref(null)
const actions   = ref(null)
const scrollHint = ref(null)
const heroImage  = ref(null)

let cleanupMagnetic = null
let resizeTimer = null

function handleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (heroImage.value) {
      gsap.set(heroImage.value, { clearProps: 'transform' })
    }
  }, 150)
}

function runEntrance() {
  if (!heroEl.value || !eyebrow.value || !t0.value || !t1.value || !t2.value || !sub.value || !actions.value || !scrollHint.value || !heroImage.value) return

  const rows = [t0.value, t1.value, t2.value]
  gsap.set(rows, { clipPath: 'inset(0 0 100% 0)' })
  gsap.set([eyebrow.value, sub.value, actions.value, scrollHint.value], { opacity: 0, y: 20 })
  gsap.set(heroImage.value, { opacity: 0, scale: 0.9, y: 30 })

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.to(eyebrow.value,  { opacity: 1, y: 0, duration: 0.8 }, 0)
  tl.to(rows,           { clipPath: 'inset(0 0 0% 0)', stagger: 0.12, duration: 0.9 }, 0.15)
  tl.to(sub.value,      { opacity: 1, y: 0, duration: 0.8 }, 0.5)
  tl.to(actions.value,  { opacity: 1, y: 0, duration: 0.8 }, 0.65)
  tl.to(heroImage.value, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.3)
  tl.to(scrollHint.value, { opacity: 1, duration: 0.8 }, 1.2)
}

watch(() => props.ready, (val) => {
  if (val) runEntrance()
})

function onMouseMove(e) {
  const rect = heroEl.value.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  heroEl.value.style.setProperty('--mx', `${x}%`)
  heroEl.value.style.setProperty('--my', `${y}%`)
}
function onMouseLeave() {
  heroEl.value.style.setProperty('--mx', '65%')
  heroEl.value.style.setProperty('--my', '45%')
}

onMounted(() => {
  cleanupMagnetic = setupMagnetic(heroEl.value)
  window.addEventListener('resize', handleResize)

  // When returning from another route, `ready` is often already true.
  // Run the intro after mount so refs are guaranteed to exist.
  if (props.ready) {
    nextTick(() => runEntrance())
  }
})
onUnmounted(() => {
  cleanupMagnetic?.()
  window.removeEventListener('resize', handleResize)
  clearTimeout(resizeTimer)
})
</script>
