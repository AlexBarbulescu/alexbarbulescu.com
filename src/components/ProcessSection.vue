<template>
  <section class="process" id="process" ref="sectionEl">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="section-label" data-animate="fade-up">How I Work</span>
          <h2 class="section-title" data-animate="fade-up" data-delay="0.1">
            My Design<br /><em>Process</em>
          </h2>
        </div>
      </div>

      <div class="process__steps" ref="stepsEl">
        <div v-for="(step, i) in steps" :key="step.num" class="process__step">
          <div class="process__num">{{ step.num }}</div>
          <div class="process__body">
            <h3 class="process__name">{{ step.name }}</h3>
            <p class="process__desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { setupScrollAnimations, setupProcessSteps } from '../composables/useGsap.js'

const sectionEl = ref(null)
const stepsEl   = ref(null)

const steps = [
  { num: '01', name: 'Discover', desc: 'Deep dive into user research, stakeholder interviews, and competitive analysis to fully understand the problem space before touching any design tool.' },
  { num: '02', name: 'Define',   desc: 'Synthesise findings into clear problem statements, user personas, and KPIs — turning ambiguity into a focused, measurable design brief.' },
  { num: '03', name: 'Design',   desc: 'Rapid ideation, wireframing, and high-fidelity prototyping — iterating quickly to explore the solution space with continuous stakeholder feedback.' },
  { num: '04', name: 'Deliver',  desc: 'Usability testing, pixel-perfect developer handoff, and post-launch analysis to ensure every design decision drives real results.' },
]

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupProcessSteps(stepsEl.value)
})
</script>
