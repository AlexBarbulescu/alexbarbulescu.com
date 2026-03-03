<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <span class="footer__logo">Alex B.</span>
        <nav class="footer__nav">
          <RouterLink v-for="l in links" :key="l.label" :to="l.to">{{ l.label }}</RouterLink>
        </nav>
      </div>
      <div class="footer__bottom">
        <span class="footer__copy">© 2025 Alex Barbulescu. All rights reserved.</span>
        <span class="footer__credit">Designed &amp; built with care.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = [
  { to: { path: '/', hash: '#work' },       label: 'Work' },
  { to: { path: '/', hash: '#about' },      label: 'About' },
  { to: { path: '/', hash: '#experience' }, label: 'Experience' },
  { to: { path: '/', hash: '#process' },    label: 'Process' },
  { to: { path: '/', hash: '#contact' },    label: 'Contact' },
]
</script>
