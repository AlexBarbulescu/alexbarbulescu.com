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
                <div class="exp__company-row">
                  <span class="exp__company-logo" :class="[getCompanyLogoClass(exp), { 'exp__company-logo--image': !!exp.logo }]">
                    <img
                      v-if="exp.logo"
                      :src="exp.logo"
                      :alt="exp.logoAlt || `${exp.company} logo`"
                      class="exp__company-logo-img"
                      loading="lazy"
                    />
                    <span v-else class="exp__company-logo-fallback">{{ getCompanyMonogram(exp.company) }}</span>
                  </span>
                  <span class="exp__company">{{ exp.company }}</span>
                </div>
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

function getCompanyMonogram(company) {
  if (!company) return '•'

  const normalized = String(company)
    .replace(/https?:\/\/|www\./gi, '')
    .replace(/[^a-z0-9@.\s-]/gi, ' ')
    .trim()

  const domainLike = normalized.split(/[.\s-]+/).filter(Boolean)
  if (domainLike.length === 1) {
    return domainLike[0].slice(0, 2).toUpperCase()
  }

  const parts = normalized
    .replace(/^@/, '')
    .split(/\s+/)
    .filter(Boolean)

  if (!parts.length) return '•'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

function getCompanyLogoClass(exp) {
  const company = String(exp?.company || '').toLowerCase()

  if (company.includes('futurevisions')) return 'exp__company-logo--futurevisions'
  if (company.includes('amplifi')) return 'exp__company-logo--amplifi'
  if (company.includes('cryptic')) return 'exp__company-logo--cryptic'
  if (company.includes('leonicorn')) return 'exp__company-logo--leonicorn'
  if (company.includes('mustachetommy')) return 'exp__company-logo--mustache'
  if (company.includes('freelance')) return 'exp__company-logo--freelance'
  if (company.includes('xmanna')) return 'exp__company-logo--xmanna'
  if (company.includes('transmute')) return 'exp__company-logo--transmute'
  if (company.includes('unity')) return 'exp__company-logo--unity'
  if (company.includes('infravision')) return 'exp__company-logo--infravision'
  if (company.includes('migrantcoin')) return 'exp__company-logo--migrant'
  if (company.includes('discord')) return 'exp__company-logo--discord'

  return ''
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
