<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InstallPrompt from './components/InstallPrompt.vue'

const isStandalone = ref(false)

onMounted(() => {
  // @ts-expect-error: proprietà non standard di iOS Safari
  isStandalone.value = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true

  if (isStandalone.value) {
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href)
    })
  }
})
</script>

<template>
  <div id="app" :class="{ 'no-swipe': isStandalone }">
    <RouterView />
    <InstallPrompt />
  </div>
</template>

<style>
.no-swipe {
  overscroll-behavior-x: none;
}
</style>
