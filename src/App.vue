<template>
  <div>
    <AppCursor />
    <AppLoader @done="heroReady = true" />
    <AppNav />
    <RouterView />
    <AppFooter />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import AppCursor         from './components/AppCursor.vue'
import AppLoader         from './components/AppLoader.vue'
import AppNav            from './components/AppNav.vue'
import AppFooter         from './components/AppFooter.vue'
import BackToTop         from './components/BackToTop.vue'

const heroReady = ref(false)
provide('heroReady', heroReady)
</script>

