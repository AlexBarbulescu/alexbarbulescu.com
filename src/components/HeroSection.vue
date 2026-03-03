<template>
  <section class="hero" id="hero" ref="heroEl">
    <div class="hero__bg">
      <div class="hero__gradient"></div>
      <div class="hero__grid"></div>
    </div>

    <div class="hero__container">
      <!-- Content -->
      <div class="hero__content">
        <div class="hero__eyebrow" ref="eyebrow">
          <span class="hero__eyebrow-dot"></span>
          UI/UX &amp; Graphic Designer · Crypto &amp; Tech
        </div>

        <h1 class="hero__title">
          <span class="hero__title-row" ref="t0">Crafting</span>
          <span class="hero__title-row hero__title-row--accent" ref="t1">Digital</span>
          <span class="hero__title-row" ref="t2">Experiences.</span>
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

      <!-- Visual -->
      <div class="hero__visual" ref="visual">
        <div class="hero__image-frame">
          <img src="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&q=80"
               alt="Alex Barbulescu" class="hero__photo" loading="eager" />
          <div class="hero__image-glow"></div>
        </div>
        <div class="hero__card hero__card--1" data-parallax="0.04">
          <span class="hero__card-label">Design Tools</span>
          <div class="hero__card-tools">
            <span>Figma</span><span>FigJam</span><span>Framer</span>
          </div>
        </div>
        <div class="hero__card hero__card--2" data-parallax="-0.06">
          <span class="hero__card-num">1000+</span>
          <span class="hero__card-label">Designs delivered</span>
        </div>
        <div class="hero__card hero__card--3" data-parallax="0.03">
          <div class="hero__card-score">
            <span>UX Score</span><span class="hero__card-pct">98%</span>
          </div>
          <div class="hero__card-bar"><div class="hero__card-bar-fill"></div></div>
        </div>
      </div>
    </div>

    <div class="hero__scroll-hint" ref="scrollHint">
      <div class="hero__scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
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
const visual    = ref(null)
const scrollHint = ref(null)

let cleanupMagnetic = null

function runEntrance() {
  const rows = [t0.value, t1.value, t2.value]
  gsap.set(rows, { clipPath: 'inset(0 0 100% 0)' })
  gsap.set([eyebrow.value, sub.value, actions.value, scrollHint.value], { opacity: 0, y: 20 })
  gsap.set(visual.value, { opacity: 0, x: 40 })
  gsap.set('.hero__card', { opacity: 0, y: 18, scale: 0.92 })

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.to(eyebrow.value,  { opacity: 1, y: 0, duration: 0.8 }, 0)
  tl.to(rows,           { clipPath: 'inset(0 0 0% 0)', stagger: 0.12, duration: 0.9 }, 0.15)
  tl.to(sub.value,      { opacity: 1, y: 0, duration: 0.8 }, 0.5)
  tl.to(actions.value,  { opacity: 1, y: 0, duration: 0.8 }, 0.65)
  tl.to(visual.value,   { opacity: 1, x: 0, duration: 1.1 }, 0.3)
  tl.to('.hero__card',  { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8 }, 0.7)
  tl.to(scrollHint.value, { opacity: 1, duration: 0.8 }, 1.2)
}

watch(() => props.ready, (val) => { if (val) runEntrance() })

function onMouseMove(e) {
  const cx = (e.clientX / window.innerWidth  - 0.5) * 2
  const cy = (e.clientY / window.innerHeight - 0.5) * 2
  document.querySelectorAll('.hero__card[data-parallax]').forEach((card) => {
    const f = parseFloat(card.dataset.parallax) * 80
    gsap.to(card, { x: cx * f, y: cy * f, duration: 1.2, ease: 'expo.out' })
  })
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  cleanupMagnetic = setupMagnetic(heroEl.value)
})
onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  cleanupMagnetic?.()
})
</script>
