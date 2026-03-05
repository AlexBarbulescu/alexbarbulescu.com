<template>
  <section class="experience" id="experience" ref="sectionEl">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-label" data-animate="fade-up">Career</span>
          <h2 class="section-title" data-animate="fade-up" data-delay="0.1">
            Previous Work<br /><em>Experience</em>
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
            <span class="exp__date">{{ formatExpDate(exp.date) }}</span>
            <span class="exp__duration">{{ formatExpDuration(exp.duration) }}</span>
          </div>

          <!-- Connector -->
          <div class="exp__connector">
            <div class="exp__dot" :class="exp.dotClass"></div>
            <div v-if="i < experience.length - 1" class="exp__line"></div>
          </div>

          <!-- Card -->
          <div
            class="exp__card"
            :class="{ 'exp__card--highlight': selectedExpId === exp.id }"
            role="button"
            tabindex="0"
            @click="(e) => onCardActivate(e, exp.id)"
            @keydown="(e) => onCardKeydown(e, exp.id)"
          >
            <!-- Mobile date -->
            <span class="exp__date-mobile">{{ formatExpDate(exp.date) }} · {{ formatExpDuration(exp.duration) }}</span>
            <div class="exp__card-header">
              <div>
                <span class="exp__company">{{ exp.company }}</span>
                <h3 class="exp__role">{{ exp.role }}</h3>
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
const selectedExpId = ref(null)

const MONTH_ABBREVIATIONS = Object.freeze({
  january: 'Jan',
  february: 'Feb',
  march: 'Mar',
  april: 'Apr',
  may: 'May',
  june: 'Jun',
  july: 'Jul',
  august: 'Aug',
  september: 'Sep',
  october: 'Oct',
  november: 'Nov',
  december: 'Dec',
})

function formatExpDate(value) {
  if (!value) return ''
  return String(value).replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/gi,
    (match) => MONTH_ABBREVIATIONS[match.toLowerCase()] ?? match,
  )
}

function formatExpDuration(value) {
  if (!value) return ''
  const input = String(value)
  return input
    .replace(/\bLess than a year\b/gi, 'Less than a yr')
    .replace(/\b(\d+)\s+years\b/gi, '$1 yrs')
    .replace(/\b(\d+)\s+year\b/gi, '$1 yr')
    .replace(/\b(\d+)\s+months\b/gi, '$1 mos')
    .replace(/\b(\d+)\s+month\b/gi, '$1 mo')
}

function onCardActivate(event, expId) {
  const target = event?.target
  if (target?.closest?.('a, button, input, textarea, select, label')) return
  selectedExpId.value = selectedExpId.value === expId ? null : expId
}

function onCardKeydown(event, expId) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  onCardActivate(event, expId)
}

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupExperienceTimeline(timeline.value)
})
</script>
