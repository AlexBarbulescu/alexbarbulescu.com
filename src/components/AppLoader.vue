<template>
  <div class="loader" :class="{ hidden }" aria-hidden="true">
    <div class="loader__bar"></div>
    <span class="loader__text">Loading</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit  = defineEmits(['done'])
const hidden = ref(false)

onMounted(() => {
  setTimeout(() => { hidden.value = true; emit('done') }, 1500)
})
</script>
