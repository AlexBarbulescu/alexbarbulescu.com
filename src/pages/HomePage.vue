<template>
  <main>
    <HeroSection :ready="heroReady" />
    <MarqueeSection />
    <WorkSection />
    <DesignSystemSection />
    <AboutSection />
    <ExperienceSection />
    <ProcessSection />
    <ContactSection />
  </main>
</template>

<script setup>
import { inject, ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import MarqueeSection from '../components/MarqueeSection.vue'
import WorkSection from '../components/WorkSection.vue'
// import DesignSystemSection from '../components/DesignSystemSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import ContactSection from '../components/ContactSection.vue'

const heroReady = inject('heroReady', ref(true))
</script>
