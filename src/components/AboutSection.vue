<template>
  <section class="about" id="about" ref="sectionEl">
    <div class="container">
      <div class="about__grid">
        <!-- Visual -->
        <div class="about__visual" data-animate="fade-right">
          <div class="about__image-wrap" ref="imgWrap">
            <img
              :src="aboutPhoto"
              alt="Alex Barbulescu" class="about__photo" loading="lazy"
            />
            <div class="about__image-border"></div>
          </div>
          <div class="about__stats">
            <div class="stat" data-animate="fade-up" data-delay="0.1">
              <span class="stat__number" data-count="10" ref="c1">0</span><span class="stat__plus">+</span>
              <span class="stat__label">Years Experience</span>
            </div>
            <div class="stat" data-animate="fade-up" data-delay="0.2">
              <span class="stat__number" data-count="1000" ref="c2">0</span><span class="stat__plus">+</span>
              <span class="stat__label">Designs Delivered</span>
            </div>
            <div class="stat" data-animate="fade-up" data-delay="0.3">
              <span class="stat__number" data-count="12" ref="c3">0</span><span class="stat__plus">+</span>
              <span class="stat__label">Clients &amp; Projects</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="about__content">
          <span class="section-label" data-animate="fade-up">About Me</span>
          <h2 class="section-title" data-animate="fade-up" data-delay="0.1">
            Designing with<br /><em>purpose &amp; craft</em>
          </h2>
          <p class="about__text" data-animate="fade-up" data-delay="0.2">
            Hi, I'm Alex — a UI/UX and Graphic Designer based in Câmpina, Romania, with over
            10 years of experience delivering high-impact visual solutions in the cryptocurrency
            and technology sectors.
          </p>
          <p class="about__text" data-animate="fade-up" data-delay="0.25">
            I specialise at the intersection of design and frontend development — bridging
            creative vision and technical execution to produce production-ready interfaces using
            modern workflows and AI-accelerated tools.
          </p>
          <div class="about__skills" ref="skillsWrap" data-animate="fade-up" data-delay="0.3">
            <span v-for="s in skills" :key="s" class="skill-pill">{{ s }}</span>
          </div>
          <div data-animate="fade-up" data-delay="0.4">
            <a href="#contact" class="btn btn--primary magnetic">
              <span>Work With Me</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import aboutPhoto from '../img/alex_suit.png'
import {
  setupScrollAnimations, setupCounters, setupSkillPills,
  setupAboutReveal, setupMagnetic,
} from '../composables/useGsap.js'

const sectionEl = ref(null)
const imgWrap   = ref(null)
const skillsWrap = ref(null)

const skills = [
  'Figma', 'Prototyping', 'Design Systems', 'Brand Identity',
  'Frontend Dev', 'Motion Design', 'Advertising Design', 'Unity / 3D',
]

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupAboutReveal(imgWrap.value)
  setupCounters(sectionEl.value)
  setupSkillPills(skillsWrap.value)
  setupMagnetic(sectionEl.value)
})
</script>
