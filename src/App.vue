<template>
  <div>
    <AppCursor />
    <AppLoader @done="heroReady = true" />
    <AppNav />
    <main>
      <HeroSection      :ready="heroReady" />
      <MarqueeSection   />
      <WorkSection      />
      <AboutSection     />
      <ExperienceSection />
      <ProcessSection   />
      <ContactSection   />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppCursor         from './components/AppCursor.vue'
import AppLoader         from './components/AppLoader.vue'
import AppNav            from './components/AppNav.vue'
import HeroSection       from './components/HeroSection.vue'
import MarqueeSection    from './components/MarqueeSection.vue'
import WorkSection       from './components/WorkSection.vue'
import AboutSection      from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProcessSection    from './components/ProcessSection.vue'
import ContactSection    from './components/ContactSection.vue'
import AppFooter         from './components/AppFooter.vue'
import BackToTop         from './components/BackToTop.vue'

const heroReady = ref(false)
</script>
