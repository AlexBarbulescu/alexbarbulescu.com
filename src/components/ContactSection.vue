<template>
  <section class="contact" id="contact" ref="sectionEl">
    <div class="contact__bg">
      <div class="contact__glow" ref="glowEl"></div>
    </div>
    <div class="container">
      <div class="contact__inner">
        <span class="section-label" data-animate="fade-up">Get In Touch</span>
        <h2 class="contact__title" data-animate="clip-up" data-delay="0.1">
          Let's build something<br /><em>great</em> together.
        </h2>
        <p class="contact__sub" data-animate="fade-up" data-delay="0.2">
          I'm open to freelance projects, full-time roles, and collaborations.<br />
          Drop me a message — I usually respond within 24 hours.
        </p>
        <div class="contact__actions" data-animate="fade-up" data-delay="0.3">
          <a href="mailto:alextnt89@gmail.com" class="btn btn--primary btn--large magnetic">
            <span>Say Hello →</span>
          </a>
          <div class="contact__socials">
            <a href="https://www.linkedin.com/in/alex-barbulescu/" target="_blank" rel="noopener" class="social-link">LinkedIn</a>
            <span class="social-sep">/</span>
            <a href="https://t.me/Alex_TNT" target="_blank" rel="noopener" class="social-link">Telegram</a>
            <span class="social-sep">/</span>
            <a href="mailto:alextnt89@gmail.com" class="social-link">Email</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { setupScrollAnimations, setupContactGlow, setupMagnetic } from '../composables/useGsap.js'

const sectionEl = ref(null)
const glowEl    = ref(null)

onMounted(() => {
  setupScrollAnimations(sectionEl.value)
  setupContactGlow(glowEl.value)
  setupMagnetic(sectionEl.value)
})
</script>
