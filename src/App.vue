<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MobileView from './views/MobileView.vue'
import VNotaNet from './views/VNotaNet.vue'

const isMobile = ref(window.innerWidth <= 768)

function checkDevice() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', checkDevice)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDevice)
})
</script>

<template>
   <component :is="isMobile ? MobileView : VNotaNet" />
</template>
