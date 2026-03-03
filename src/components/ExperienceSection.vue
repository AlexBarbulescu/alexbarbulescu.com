<template>
  <section class="experience" id="experience" ref="sectionEl">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-label" data-animate="fade-up">Career</span>
          <h2 class="section-title" data-animate="fade-up" data-delay="0.1">
            Work<br /><em>Experience</em>
          </h2>
        </div>
      </div>

      <div class="exp__timeline" ref="timeline">
        <div
          v-for="(exp, i) in experience" :key="exp.id"
          class="exp__item" :data-animate="'fade-up'" :data-delay="(i * 0.05).toFixed(2)"
        >
          <!-- Date (desktop) -->
          <div class="exp__left">
            <span class="exp__date">{{ exp.date }}</span>
            <span class="exp__duration">{{ exp.duration }}</span>
          </div>

          <!-- Connector -->
          <div class="exp__connector">
            <div class="exp__dot" :class="exp.dotClass"></div>
            <div v-if="i < experience.length - 1" class="exp__line"></div>
          </div>

          <!-- Card -->
          <div class="exp__card" :class="{ 'exp__card--highlight': exp.highlight }">
            <!-- Mobile date -->
            <span class="exp__date-mobile">{{ exp.date }} · {{ exp.duration }}</span>
            <div class="exp__card-header">
              <div>
                <h3 class="exp__role">{{ exp.role }}</h3>
                <span class="exp__company">{{ exp.company }}</span>
              </div>
              <div class="exp__tags">
                <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <ul class="exp__list">
              <li v-for="(item, j) in exp.items" :key="j" v-html="item"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { experience } from '../data/experience.js'
import { setupScrollAnimations, setupExperienceTimeline } from '../composables/useGsap.js'

const sectionEl = ref(null)
const timeline  = ref(null)

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupExperienceTimeline(timeline.value)
})
</script>
