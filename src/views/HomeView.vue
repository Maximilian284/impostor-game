<script setup lang="ts">
import ButtonHome from '@/components/ButtonHome.vue'
import { ref, onMounted } from 'vue'
import { goToPage } from '@/router/navigation'

const isMobile = ref(true)

onMounted(() => {
  const userAgent = navigator.userAgent
  const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(userAgent.toLowerCase())
  const isScreenSmall = window.innerWidth <= 768
  isMobile.value = isMobileDevice && isScreenSmall
})
</script>

<template>
  <div v-if="!isMobile" class="flex justify-center items-center h-screen w-screen bg-neutral-800 text-center px-4">
    <p class="text-red-700 font-extrabold text-2xl">
      L'accesso al gioco non e' disponibile da computer. L'app e' pensata esclusivamente per dispositivi mobile.
    </p>
  </div>
  <div v-else class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800">
    <p class="text-red-700 font-extrabold text-6xl mb-20 -mt-[12vh]">IMPOSTORE</p>
    <div class="grid grid-cols-1 gap-y-6">
      <ButtonHome buttonText="Nuova Partita" @click="goToPage('newGame')"/>
      <ButtonHome buttonText="Come Giocare" @click="goToPage('howToPlay')"/>
    </div>
  </div>
</template>
