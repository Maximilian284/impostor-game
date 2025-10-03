<script setup lang="ts">
import ButtonHome from '../components/ButtonHome.vue'
import { goToPage } from '@/router/navigation'
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800">
    <p class="text-red-700 font-extrabold text-6xl mb-20 -mt-[12vh]">IMPOSTORE</p>
    <div class="grid grid-cols-1 gap-y-6">
      <ButtonHome buttonText="Nuova Partita" @click="goToPage('newGame')"/>
      <ButtonHome buttonText="Impostazioni"/>
    </div>
  </div>
</template>
