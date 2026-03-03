<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <span class="footer__logo">Alex B.</span>
        <nav class="footer__nav">
          <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
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
  { href: '#work',       label: 'Work'       },
  { href: '#about',      label: 'About'      },
  { href: '#experience', label: 'Experience' },
  { href: '#process',    label: 'Process'    },
  { href: '#contact',    label: 'Contact'    },
]
</script>
