<template>
  <main class="page design-system-page" ref="pageEl">
    <section class="ds-hero">
      <div class="container">
        <RouterLink class="article__back" to="/">← Back to home</RouterLink>

        <div class="ds-hero__top">
          <span class="section-label" data-animate="fade-up">Design System</span>
          <h1 class="ds-hero__title" data-animate="fade-up" data-delay="0.08">
            A scalable framework for <em>consistent digital products</em>
          </h1>
          <p class="ds-hero__sub" data-animate="fade-up" data-delay="0.14">
            A single source of truth for visual tokens, reusable components, and interaction rules
            that helps teams ship faster without sacrificing craft.
          </p>
        </div>

        <article class="ds-preview" data-animate="fade-up" data-delay="0.18">
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
                Tokens, components, and guidelines that unify product experiences.
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
      </div>
    </section>

    <section class="ds-spec ds-spec--palette">
      <div class="container">
        <div class="ds-spec__head">
          <span class="section-label" data-animate="fade-up">Color Palette</span>
          <p class="ds-spec__intro" data-animate="fade-up" data-delay="0.05">
            Core and semantic colors are documented with clear usage so every surface feels coherent.
          </p>
        </div>

        <div class="ds-palette-grid">
          <article
            v-for="(item, i) in palette"
            :key="item.name"
            class="ds-palette-card"
            data-animate="fade-up"
            :data-delay="0.04 + i * 0.03"
          >
            <div class="ds-palette-card__swatch" :style="{ background: item.color }"></div>
            <h3 class="ds-palette-card__name">{{ item.name }}</h3>
            <p class="ds-palette-card__meta">{{ item.token }}</p>
            <p class="ds-palette-card__hex">{{ item.color }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="ds-spec">
      <div class="container">
        <div class="ds-spec__head">
          <span class="section-label" data-animate="fade-up">Typography &amp; Layout</span>
          <p class="ds-spec__intro" data-animate="fade-up" data-delay="0.05">
            A practical type hierarchy, spacing rhythm, and layout metrics that scale from landing pages to product screens.
          </p>
        </div>

        <div class="ds-spec-layout">
          <article class="ds-spec-panel" data-animate="fade-up" data-delay="0.08">
            <h3 class="ds-spec-panel__title">Font Families</h3>
            <ul class="ds-list">
              <li><span>Display</span><strong>Syne, 700-800</strong></li>
              <li><span>Body</span><strong>DM Sans, 400-500</strong></li>
              <li><span>Fallback</span><strong>system-ui, sans-serif</strong></li>
            </ul>
          </article>

          <article class="ds-spec-panel" data-animate="fade-up" data-delay="0.12">
            <h3 class="ds-spec-panel__title">Type Scale</h3>
            <ul class="ds-list">
              <li><span>Display</span><strong>82 / 1.05</strong></li>
              <li><span>Section Title</span><strong>60 / 1.15</strong></li>
              <li><span>Body L</span><strong>18 / 1.65</strong></li>
              <li><span>Body</span><strong>16 / 1.6</strong></li>
              <li><span>Caption</span><strong>12 / 1.5</strong></li>
            </ul>
          </article>

          <article class="ds-spec-panel ds-spec-panel--full" data-animate="fade-up" data-delay="0.16">
            <h3 class="ds-spec-panel__title">Spacing Scale</h3>
            <div class="ds-spacing">
              <div v-for="item in spacingScale" :key="item.token" class="ds-spacing__row">
                <span>{{ item.token }}</span>
                <div class="ds-spacing__track"><i :style="{ width: item.width }"></i></div>
                <strong>{{ item.px }}</strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ds-spec">
      <div class="container">
        <div class="ds-spec__head">
          <span class="section-label" data-animate="fade-up">Form Elements</span>
          <p class="ds-spec__intro" data-animate="fade-up" data-delay="0.05">
            Inputs, selections, and validation behavior are normalized to improve clarity and reduce implementation drift.
          </p>
        </div>

        <div class="ds-spec-layout">
          <article class="ds-spec-panel" data-animate="fade-up" data-delay="0.08">
            <h3 class="ds-spec-panel__title">Field Preview</h3>
            <div class="ds-form-preview" aria-hidden="true">
              <div class="ds-field">Name</div>
              <div class="ds-field">Email</div>
              <div class="ds-field ds-field--select">Quicksite One</div>
              <div class="ds-check-row">
                <span class="ds-check ds-check--on">GSAP</span>
                <span class="ds-check">Dark Mode</span>
                <span class="ds-check">Data Viz</span>
              </div>
            </div>
          </article>

          <article class="ds-spec-panel" data-animate="fade-up" data-delay="0.12">
            <h3 class="ds-spec-panel__title">State Rules</h3>
            <ul class="ds-list">
              <li><span>Default</span><strong>1px border / muted text</strong></li>
              <li><span>Hover</span><strong>Border + 12% contrast</strong></li>
              <li><span>Focus</span><strong>2px ring accent-light</strong></li>
              <li><span>Error</span><strong>#f43f5e + helper text</strong></li>
              <li><span>Success</span><strong>#10b981 + confirmation</strong></li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="ds-spec">
      <div class="container">
        <div class="ds-spec__head">
          <span class="section-label" data-animate="fade-up">Data Components</span>
          <p class="ds-spec__intro" data-animate="fade-up" data-delay="0.05">
            Analytics widgets are documented with chart styling, labeling rules, and contrast-safe data colors.
          </p>
        </div>

        <div class="ds-data-grid">
          <article class="ds-spec-panel" data-animate="fade-up" data-delay="0.08">
            <h3 class="ds-spec-panel__title">Ranking Bars</h3>
            <div class="ds-bars" aria-hidden="true">
              <div v-for="bar in rankingBars" :key="bar.name" class="ds-bars__row">
                <span>{{ bar.name }}</span>
                <div class="ds-bars__track"><i :style="{ width: bar.width }"></i></div>
                <strong>{{ bar.value }}</strong>
              </div>
            </div>
          </article>

          <article class="ds-spec-panel" data-animate="fade-up" data-delay="0.12">
            <h3 class="ds-spec-panel__title">Data Cards</h3>
            <ul class="ds-list">
              <li><span>Card Radius</span><strong>16px</strong></li>
              <li><span>Header Height</span><strong>52px</strong></li>
              <li><span>Label Color</span><strong>var(--text-dim)</strong></li>
              <li><span>Primary Data</span><strong>var(--text)</strong></li>
              <li><span>Positive Delta</span><strong>#10b981</strong></li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="ds-workflow">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-label" data-animate="fade-up">Core Components</span>
            <h2 class="section-title" data-animate="fade-up" data-delay="0.06">
              Reusable UI rules for <em>faster product delivery</em>
            </h2>
          </div>
        </div>

        <div class="ds-timeline">
          <article class="ds-step" data-animate="fade-up" data-delay="0.1">
            <p class="ds-step__num">01</p>
            <h3 class="ds-step__title">Button</h3>
            <p class="ds-step__text">Primary, ghost, and subtle variants with shared height, radius, and focus behavior.</p>
          </article>
          <article class="ds-step" data-animate="fade-up" data-delay="0.15">
            <p class="ds-step__num">02</p>
            <h3 class="ds-step__title">Tag</h3>
            <p class="ds-step__text">Compact metadata chips for status, platform, and category labels across cards and tables.</p>
          </article>
          <article class="ds-step" data-animate="fade-up" data-delay="0.2">
            <p class="ds-step__num">03</p>
            <h3 class="ds-step__title">Form</h3>
            <p class="ds-step__text">Consistent label/input/help-text hierarchy with validation states and keyboard-safe interactions.</p>
          </article>
          <article class="ds-step" data-animate="fade-up" data-delay="0.25">
            <p class="ds-step__num">04</p>
            <h3 class="ds-step__title">Data Card</h3>
            <p class="ds-step__text">Structured title/value/footer slots that keep analytics modules clean and comparable.</p>
          </article>
        </div>

        <article class="ds-spec-panel ds-spec-panel--component" data-animate="fade-up" data-delay="0.3">
          <h3 class="ds-spec-panel__title">Component Properties</h3>
          <ul class="ds-list">
            <li><span>Button Height</span><strong>44px / 36px / 30px</strong></li>
            <li><span>Card Padding</span><strong>24px desktop / 16px mobile</strong></li>
            <li><span>Tag Radius</span><strong>999px</strong></li>
            <li><span>Focus Ring</span><strong>2px rgba(var(--accent-rgb), 0.55)</strong></li>
            <li><span>Transition</span><strong>0.3s var(--ease-out-expo)</strong></li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { setupMagnetic, setupScrollAnimations } from '../composables/useGsap.js'

const pageEl = ref(null)

const palette = [
  { name: 'Background', token: 'Surface / Base', color: '#080808' },
  { name: 'Elevated', token: 'Surface / Card', color: '#111111' },
  { name: 'Foreground', token: 'Content / Primary', color: '#f0f0f0' },
  { name: 'Secondary', token: 'Content / Muted', color: '#888888' },
  { name: 'Accent', token: 'Brand / Primary', color: '#f97316' },
  { name: 'Accent Light', token: 'Brand / Hover', color: '#fb923c' },
  { name: 'Accent 2', token: 'Brand / Gradient', color: '#eab308' },
  { name: 'Success', token: 'Semantic / Positive', color: '#10b981' },
]

const spacingScale = [
  { token: '4', px: '4px', width: '10%' },
  { token: '8', px: '8px', width: '20%' },
  { token: '12', px: '12px', width: '30%' },
  { token: '16', px: '16px', width: '40%' },
  { token: '24', px: '24px', width: '56%' },
  { token: '32', px: '32px', width: '70%' },
  { token: '48', px: '48px', width: '85%' },
  { token: '64', px: '64px', width: '100%' },
]

const rankingBars = [
  { name: '4XL', value: '9', width: '95%' },
  { name: '3XL', value: '8', width: '84%' },
  { name: '2XL', value: '7', width: '72%' },
  { name: 'XL', value: '6', width: '61%' },
  { name: 'L', value: '5', width: '52%' },
  { name: 'M', value: '4', width: '42%' },
  { name: 'S', value: '3', width: '32%' },
]

onMounted(() => {
  setupScrollAnimations(pageEl.value)
  setupMagnetic(pageEl.value)
})
</script>
