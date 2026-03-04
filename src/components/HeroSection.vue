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
        <img src="../img/alex.png" alt="Alex Barbulescu" />
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
const scrollHint = ref(null)
const heroImage  = ref(null)

let cleanupMagnetic = null

function runEntrance() {
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

watch(() => props.ready, (val) => { if (val) runEntrance() })

onMounted(() => {
  cleanupMagnetic = setupMagnetic(heroEl.value)
})
onUnmounted(() => {
  cleanupMagnetic?.()
})
</script>
