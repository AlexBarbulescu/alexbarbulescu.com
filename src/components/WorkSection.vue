<template>
  <section class="work" id="work" ref="sectionEl">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-label" data-animate="fade-up">Selected Work</span>
          <h2 class="section-title" data-animate="fade-up" data-delay="0.1">
            Projects that<br /><em>made an impact</em>
          </h2>
        </div>
        <RouterLink
          :to="{ path: '/', hash: '#work' }"
          class="btn btn--ghost btn--sm"
          data-animate="fade-up"
          data-delay="0.2"
        >All projects →</RouterLink>
      </div>

      <div class="work__grid" ref="grid">
        <article
          v-for="p in projects" :key="p.id"
          class="project" :class="p.cls"
        >
          <RouterLink :to="`/work/${p.slug}`" class="project__link">
            <div class="project__image">
              <img :src="p.src" :alt="p.alt" class="project__img" loading="lazy" />
              <div class="project__overlay">
                <span class="project__cta">View Case Study →</span>
              </div>
            </div>
            <div class="project__info">
              <div class="project__meta">
                <div class="project__tags">
                  <span v-for="tag in p.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <span class="project__year">{{ p.year }}</span>
              </div>
              <h3 class="project__title">{{ p.title }}</h3>
              <p class="project__desc">{{ p.desc }}</p>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { projects } from '../data/projects.js'
import { setupScrollAnimations, setupProjectCards, setupProjectParallax } from '../composables/useGsap.js'

const sectionEl = ref(null)
const grid      = ref(null)

function setupTilt(gridEl) {
  const cards = gridEl.querySelectorAll('.project__link')
  const cleanups = []
  cards.forEach(card => {
    function onMove(e) {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, {
        rotateX: -y * 7,
        rotateY: x * 7,
        transformPerspective: 900,
        ease: 'power2.out',
        duration: 0.35,
      })
    }
    function onLeave() {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    cleanups.push(() => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    })
  })
  return () => cleanups.forEach(fn => fn())
}

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupProjectCards(grid.value)
  setupProjectParallax(grid.value)
  setupTilt(grid.value)
})
</script>
