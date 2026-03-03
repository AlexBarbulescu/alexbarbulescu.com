<template>
  <main class="page">
    <section class="article" v-if="article">
      <div class="container">
        <div class="article__top">
          <RouterLink class="article__back" to="/articles">← All articles</RouterLink>
        </div>

        <header class="article__header">
          <span class="section-label">Article</span>
          <h1 class="article__title">{{ article.title }}</h1>

          <div class="article__meta">
            <span class="article__meta-item">{{ formatDate(article.date) }}</span>
            <span class="article__meta-dot"></span>
            <span class="article__meta-item">{{ article.readingTime }}</span>
          </div>

          <div class="article__tags">
            <span v-for="t in article.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </header>

        <article class="article__content">
          <template v-for="(block, i) in article.content" :key="i">
            <h2 v-if="block.type === 'h2'" class="article__h2">{{ block.text }}</h2>
            <p v-else-if="block.type === 'p'" class="article__p">{{ block.text }}</p>
            <ul v-else-if="block.type === 'ul'" class="article__ul">
              <li v-for="(it, j) in block.items" :key="j">{{ it }}</li>
            </ul>
          </template>
        </article>

        <div class="article__bottom">
          <RouterLink class="btn btn--ghost btn--sm" to="/articles">More articles →</RouterLink>
          <RouterLink class="btn btn--primary btn--sm" to="/" >Home →</RouterLink>
        </div>
      </div>
    </section>

    <section class="article" v-else>
      <div class="container">
        <div class="article__notfound">
          <span class="section-label">Not found</span>
          <h1 class="article__title">This article doesn’t exist.</h1>
          <p class="article__p">Check the URL or go back to the list.</p>
          <RouterLink class="btn btn--ghost btn--sm" to="/articles">Back to articles →</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleBySlug } from '../data/articles.js'

const route = useRoute()
const article = computed(() => getArticleBySlug(String(route.params.slug || '')))

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' })
}
</script>
