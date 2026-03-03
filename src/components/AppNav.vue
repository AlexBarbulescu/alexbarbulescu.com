<template>
  <nav class="nav" :class="{ scrolled }" ref="navEl">
    <div class="nav__inner">
      <RouterLink to="/" class="nav__logo"><span class="nav__logo-text">Alex B.</span></RouterLink>

      <div class="nav__links">
        <RouterLink v-for="l in links" :key="l.label" :to="l.to" class="nav__link">{{ l.label }}</RouterLink>
      </div>

      <div class="nav__right">
        <span class="available-badge">
          <span class="available-badge__dot"></span>
          Available for work
        </span>
        <button class="hamburger" :class="{ open: open }" @click="open = !open" aria-label="Toggle menu">
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
        </button>
      </div>
    </div>

    <div class="nav__mobile" :class="{ open }">
      <RouterLink
        v-for="l in links" :key="l.label"
        :to="l.to"
        class="nav__mobile-link"
        @click="open = false"
      >{{ l.label }}</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navEl   = ref(null)
const scrolled = ref(false)
const open    = ref(false)

const links = [
  { to: { path: '/', hash: '#work' },       label: 'Work' },
  { to: { path: '/', hash: '#about' },      label: 'About' },
  { to: { path: '/', hash: '#experience' }, label: 'Experience' },
  { to: { path: '/', hash: '#process' },    label: 'Process' },
  { to: { path: '/', hash: '#contact' },    label: 'Contact' },
  { to: '/articles', label: 'Articles' },
]

let lastY = 0
let st = null

onMounted(() => {
  st = ScrollTrigger.create({
    start: 'top -60', end: '99999',
    onUpdate() {
      const y = window.scrollY
      scrolled.value = y > 60
      if (y > lastY + 4 && y > 180) {
        gsap.to(navEl.value, { yPercent: -100, duration: 0.4, ease: 'expo.inOut' })
      } else if (y < lastY - 4) {
        gsap.to(navEl.value, { yPercent: 0, duration: 0.4, ease: 'expo.out' })
      }
      lastY = y
    },
  })
})
onUnmounted(() => st?.kill())
</script>
