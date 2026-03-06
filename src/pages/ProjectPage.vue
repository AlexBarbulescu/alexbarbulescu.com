<template>
  <main class="page">
    <section class="article" v-if="project">
      <div class="container">
        <div class="article__top">
          <RouterLink class="article__back" :to="{ path: '/', hash: '#work' }">← Back to work</RouterLink>
        </div>

        <header class="article__header">
          <span class="section-label">Case Study</span>
          <h1 class="article__title">{{ project.title }}</h1>

          <div class="article__meta">
            <span class="article__meta-item">{{ project.year }}</span>
            <span class="article__meta-dot"></span>
            <span class="article__meta-item">Selected Work</span>
          </div>

          <div class="article__tags">
            <span v-for="t in project.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </header>

        <div class="slideshow" v-if="gallery.length" aria-label="Project images">
          <div class="slideshow__frame">
            <img
              class="slideshow__img"
              :src="gallery[current].src"
              :alt="gallery[current].alt"
              loading="lazy"
            />
            <div class="slideshow__overlay"></div>

            <button class="slideshow__btn slideshow__btn--prev" type="button" @click="prev" aria-label="Previous image">
              ‹
            </button>
            <button class="slideshow__btn slideshow__btn--next" type="button" @click="next" aria-label="Next image">
              ›
            </button>
          </div>

          <div class="slideshow__bar">
            <div class="slideshow__dots" v-if="gallery.length > 1">
              <button
                v-for="(_, i) in gallery"
                :key="i"
                class="slideshow__dot"
                :class="{ active: i === current }"
                type="button"
                :aria-label="`Go to image ${i + 1}`"
                @click="current = i"
              ></button>
            </div>
            <span class="slideshow__count">{{ current + 1 }} / {{ gallery.length }}</span>
          </div>

          <div
            v-if="banners.length"
            class="slideshow__banner-layer"
            aria-label="Project banners"
            @wheel="onBannerWheel"
          >
            <div class="slideshow__banner-header">
              <span class="slideshow__banner-label">Campaign banners</span>
            </div>

            <div class="slideshow__banner-window">
              <div
                class="slideshow__banner-track"
                :style="bannerTrackStyle"
              >
                <button
                  v-for="(banner, i) in bannerLoopItems"
                  :key="banner.loopKey"
                  class="slideshow__banner-card"
                  :class="{ active: i === bannerCenterIndex }"
                  type="button"
                  :aria-label="`Show banner ${banner.originalIndex + 1}`"
                  @click="currentBanner = banner.originalIndex"
                >
                  <img
                    class="slideshow__banner-img"
                    :src="banner.src"
                    :alt="banner.alt"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>

            <div class="slideshow__banner-seek" v-if="banners.length > 1">
              <div class="slideshow__banner-range-wrap" :style="bannerProgressStyle">
                <div class="slideshow__banner-range-visual" aria-hidden="true"></div>
                <input
                  class="slideshow__banner-range"
                  type="range"
                  min="0"
                  :max="banners.length - 1"
                  step="1"
                  :value="currentBanner"
                  aria-label="Choose campaign banner"
                  @input="onBannerSeek"
                  @change="onBannerSeek"
                />
              </div>
              <span class="slideshow__banner-count">{{ currentBanner + 1 }} / {{ banners.length }}</span>
            </div>
          </div>
        </div>

        <article class="article__content">
          <p class="article__p">{{ project.desc }}</p>

          <template v-for="(block, i) in blocks" :key="i">
            <h2 v-if="block.type === 'h2'" class="article__h2">{{ block.text }}</h2>
            <p v-else-if="block.type === 'p'" class="article__p">{{ block.text }}</p>
            <ul v-else-if="block.type === 'ul'" class="article__ul">
              <li v-for="(it, j) in block.items" :key="j">{{ it }}</li>
            </ul>
          </template>
        </article>

        <div class="article__bottom">
          <RouterLink class="btn btn--ghost btn--sm" :to="{ path: '/', hash: '#work' }">More work →</RouterLink>
        </div>
      </div>
    </section>

    <section class="article" v-else>
      <div class="container">
        <div class="article__notfound">
          <span class="section-label">Not found</span>
          <h1 class="article__title">This project doesn’t exist.</h1>
          <p class="article__p">Check the URL or go back to Selected Work.</p>
          <RouterLink class="btn btn--ghost btn--sm" :to="{ path: '/', hash: '#work' }">Back to work →</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectBySlug } from '../data/projects.js'

const route = useRoute()
const project = computed(() => getProjectBySlug(String(route.params.slug || '')))
const blocks = computed(() => project.value?.caseStudy || [])

const current = ref(0)
const currentBanner = ref(0)
let bannerTimer = null
let bannerWheelUnlockTimer = null
let bannerWheelLocked = false

const gallery = computed(() => {
  const p = project.value
  if (!p) return []
  if (Array.isArray(p.gallery) && p.gallery.length) return p.gallery
  if (p.src) return [{ src: p.src, alt: p.alt || p.title }]
  return []
})

const banners = computed(() => project.value?.banners || [])

const bannerLoopItems = computed(() => {
  if (!banners.value.length) return []

  return Array.from({ length: 3 }, (_, copyIndex) =>
    banners.value.map((banner, bannerIndex) => ({
      ...banner,
      originalIndex: bannerIndex,
      loopKey: `${copyIndex}-${banner.src}-${bannerIndex}`,
    })),
  ).flat()
})

const bannerCenterIndex = computed(() => {
  if (!banners.value.length) return 0
  return banners.value.length + currentBanner.value
})

const bannerTrackStyle = computed(() => ({
  transform: `translateX(calc(50% - var(--banner-card-center) - ${bannerCenterIndex.value} * var(--banner-track-step)))`,
}))

const bannerProgressStyle = computed(() => {
  const totalSteps = Math.max(banners.value.length - 1, 1)
  const progress = currentBanner.value / totalSteps

  return {
    '--banner-progress-ratio': progress,
  }
})

function prev() {
  if (!gallery.value.length) return
  current.value = (current.value - 1 + gallery.value.length) % gallery.value.length
}

function next() {
  if (!gallery.value.length) return
  current.value = (current.value + 1) % gallery.value.length
}

function restartBannerAutoplay() {
  clearBannerAutoplay()
  if (banners.value.length <= 1) return

  bannerTimer = window.setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 2600)
}

function clearBannerAutoplay() {
  if (bannerTimer) {
    window.clearInterval(bannerTimer)
    bannerTimer = null
  }
}

function stepBanner(direction) {
  if (banners.value.length <= 1) return

  currentBanner.value = (currentBanner.value + direction + banners.value.length) % banners.value.length
  restartBannerAutoplay()
}

function onBannerSeek(event) {
  const nextIndex = Number(event.target.value)
  if (Number.isNaN(nextIndex)) return

  currentBanner.value = nextIndex
  restartBannerAutoplay()
}

function onBannerWheel(event) {
  if (banners.value.length <= 1) return

  const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
  const direction = Math.sign(delta)
  if (!direction) return

  event.preventDefault()

  if (bannerWheelLocked) return

  stepBanner(direction)
  bannerWheelLocked = true

  if (bannerWheelUnlockTimer) {
    window.clearTimeout(bannerWheelUnlockTimer)
  }

  bannerWheelUnlockTimer = window.setTimeout(() => {
    bannerWheelLocked = false
    bannerWheelUnlockTimer = null
  }, 180)
}

watch(
  () => route.params.slug,
  () => {
    current.value = 0
    currentBanner.value = 0
    restartBannerAutoplay()
  }
)

watch(banners, () => {
  currentBanner.value = 0
  restartBannerAutoplay()
})

onMounted(() => {
  restartBannerAutoplay()
})

onUnmounted(() => {
  clearBannerAutoplay()
  if (bannerWheelUnlockTimer) {
    window.clearTimeout(bannerWheelUnlockTimer)
    bannerWheelUnlockTimer = null
  }
})
</script>
