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
          <RouterLink class="btn btn--primary btn--sm" to="/articles">Articles →</RouterLink>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectBySlug } from '../data/projects.js'

const route = useRoute()
const project = computed(() => getProjectBySlug(String(route.params.slug || '')))
const blocks = computed(() => project.value?.caseStudy || [])
</script>
