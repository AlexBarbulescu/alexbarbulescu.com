<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track" ref="track">
      <div v-for="n in 2" :key="n" class="marquee__inner" :aria-hidden="n === 2 ? 'true' : undefined">
        <template v-for="item in items" :key="item.text + n">
          <span>{{ item.text }}</span>
          <span class="dot">·</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const track = ref(null)

const items = [
  { text: 'UI Design' }, { text: 'UX Research' }, { text: 'Design Systems' },
  { text: 'Prototyping' }, { text: 'Figma' }, { text: 'User Testing' },
  { text: 'Wireframing' }, { text: 'Motion Design' },
]

function pause()  { track.value?.querySelectorAll('.marquee__inner').forEach(el => el.style.animationPlayState = 'paused') }
function resume() { track.value?.querySelectorAll('.marquee__inner').forEach(el => el.style.animationPlayState = 'running') }

onMounted(() => {
  track.value?.addEventListener('mouseenter', pause)
  track.value?.addEventListener('mouseleave', resume)
})
onUnmounted(() => {
  track.value?.removeEventListener('mouseenter', pause)
  track.value?.removeEventListener('mouseleave', resume)
})
</script>
