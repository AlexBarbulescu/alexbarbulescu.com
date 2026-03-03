<template>
  <main class="page">
    <section class="articles-index">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-label" data-animate="fade-up">Writing</span>
            <h1 class="section-title" data-animate="fade-up" data-delay="0.1">
              Articles &amp;<br /><em>notes</em>
            </h1>
          </div>
          <RouterLink to="/" class="btn btn--ghost btn--sm" data-animate="fade-up" data-delay="0.2">
            Back home →
          </RouterLink>
        </div>

        <div class="articles-grid">
          <article v-for="a in articles" :key="a.slug" class="article-card">
            <RouterLink class="article-card__link" :to="`/articles/${a.slug}`">
              <div class="article-card__meta">
                <div class="article-card__tags">
                  <span v-for="t in a.tags" :key="t" class="tag">{{ t }}</span>
                </div>
                <span class="article-card__date">{{ formatDate(a.date) }}</span>
              </div>
              <h2 class="article-card__title">{{ a.title }}</h2>
              <p class="article-card__excerpt">{{ a.excerpt }}</p>
              <div class="article-card__footer">
                <span class="article-card__read">{{ a.readingTime }}</span>
                <span class="article-card__cta">Read →</span>
              </div>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { articles } from '../data/articles.js'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}
</script>
