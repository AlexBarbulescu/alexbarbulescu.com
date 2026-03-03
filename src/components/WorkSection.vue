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
        <a href="#" class="btn btn--ghost btn--sm" data-animate="fade-up" data-delay="0.2">All projects →</a>
      </div>

      <div class="work__grid" ref="grid">
        <article
          v-for="p in projects" :key="p.id"
          class="project" :class="p.cls"
        >
          <a href="#" class="project__link">
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
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projects } from '../data/projects.js'
import { setupScrollAnimations, setupProjectCards, setupProjectParallax } from '../composables/useGsap.js'

const sectionEl = ref(null)
const grid      = ref(null)

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupProjectCards(grid.value)
  setupProjectParallax(grid.value)
})
</script>
