<template>
  <div>
    <div class="grain-overlay" aria-hidden="true"></div>
    <div class="scroll-progress" ref="progressEl" aria-hidden="true"></div>
    <AppCursor />
    <AppLoader @done="heroReady = true" />
    <AppNav />
    <RouterView />
    <AppFooter />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import AppCursor         from './components/AppCursor.vue'
import AppLoader         from './components/AppLoader.vue'
import AppNav            from './components/AppNav.vue'
import AppFooter         from './components/AppFooter.vue'
import BackToTop         from './components/BackToTop.vue'

const heroReady  = ref(false)
const progressEl = ref(null)
provide('heroReady', heroReady)

function onScroll() {
  const scrolled = window.scrollY
  const total    = document.documentElement.scrollHeight - window.innerHeight
  const pct      = total > 0 ? scrolled / total : 0
  if (progressEl.value) progressEl.value.style.transform = `scaleX(${pct})`
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
