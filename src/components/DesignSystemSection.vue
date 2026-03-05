<template>
  <section class="design-system" id="design-system" ref="sectionEl">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-label" data-animate="fade-up">Product Foundations</span>
          <h2 class="section-title" data-animate="fade-up" data-delay="0.08">
            Building products with a <em>living design system</em>
          </h2>
        </div>
      </div>

      <article class="ds-preview" data-animate="fade-up" data-delay="0.14">
        <div class="ds-preview__window" aria-hidden="true">
          <span class="ds-dot ds-dot--dim"></span>
          <span class="ds-dot ds-dot--light"></span>
          <span class="ds-dot ds-dot--light"></span>
          <span class="ds-dot ds-dot--accent"></span>
          <span class="ds-dot ds-dot--dim"></span>
        </div>

        <div class="ds-preview__body">
          <div class="ds-preview__left">
            <p class="ds-preview__eyebrow">Design System</p>
            <p class="ds-preview__subtitle">
              Tokens, components, and rules that keep every release visually and behaviorally consistent.
            </p>
            <div class="ds-preview__lines" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div class="ds-preview__right" aria-hidden="true">
            <p class="ds-preview__type">Aa</p>
            <p class="ds-preview__font">GOOGLE SANS</p>
            <p class="ds-preview__scale">16 · 14 · 12 · 10</p>
            <div class="ds-preview__grid"></div>
          </div>
        </div>
      </article>

      <div class="ds-pillars">
        <article class="ds-pillar" data-animate="fade-up" data-delay="0.18">
          <p class="ds-pillar__kicker">01</p>
          <h3 class="ds-pillar__title">Tokens</h3>
          <p class="ds-pillar__text">
            Color, typography, spacing, and elevation tokens are centralized and documented for consistent usage.
          </p>
        </article>

        <article class="ds-pillar" data-animate="fade-up" data-delay="0.24">
          <p class="ds-pillar__kicker">02</p>
          <h3 class="ds-pillar__title">Components</h3>
          <p class="ds-pillar__text">
            Reusable blocks with clear states, interaction patterns, and accessibility constraints for rapid product work.
          </p>
        </article>

        <article class="ds-pillar" data-animate="fade-up" data-delay="0.3">
          <p class="ds-pillar__kicker">03</p>
          <h3 class="ds-pillar__title">Guidelines</h3>
          <p class="ds-pillar__text">
            Writing, motion, and layout principles define how teams design and ship cohesive experiences across features.
          </p>
        </article>
      </div>

      <div class="ds-cta" data-animate="fade-up" data-delay="0.34">
        <RouterLink to="/design-system" class="btn btn--primary magnetic">
          <span>Open Design System Page</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { setupMagnetic, setupScrollAnimations } from '../composables/useGsap.js'

const sectionEl = ref(null)

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupMagnetic(sectionEl.value)
})
</script>
