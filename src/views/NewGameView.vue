<script setup lang="ts">
import IconPlayers from '@/components/icons/IconPlayers.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconSpy from '@/components/icons/IconSpy.vue'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import IconMinusCircle from '@/components/icons/IconMinusCircle.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconCards from '@/components/icons/IconCards.vue'
import { ref, watch } from 'vue'

const players = ref(4)
const impostors = ref(1)
const duration = ref(4)
const packets = ref(1)

function changeImpostors(n: number) {
  if (impostors.value + n >= 1 && impostors.value + n < players.value) {
    impostors.value += n
  } 
}

watch(players, () => {
  duration.value = players.value
})
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800 overflow-hidden">
    <p class="text-red-700 font-extrabold text-6xl mb-20 -mt-[8rem]">IMPOSTORE</p>
    <div class="w-[calc(100%-4rem)]">
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 rounded-t-2xl border-neutral-600 text-2xl font-semibold text-left flex pl-6"> 
        <IconPlayers class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Giocatori
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ players }}</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-6"> 
        <IconSpy class="inline w-6 h-6 mr-3 mt-1 fill-neutral-200"/>
        Impostori
        <div class="ml-auto flex items-center text-xl pr-2">
          <IconPlusCircle class="inline w-6 h-6 mr-3 fill-neutral-200" @click="changeImpostors(1)"/>
          <p class="pt-1">{{ impostors }}</p>
          <IconMinusCircle class="inline w-6 h-6 ml-3 fill-neutral-200" @click="changeImpostors(-1)"/>
        </div>
      </button>
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-6"> 
        <IconCards class="inline w-6 h-6 mr-3 mt-1 fill-neutral-200"/>
        Pacchetti
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ packets }} pac.</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 rounded-b-2xl text-2xl font-semibold text-left flex pl-6"> 
        <IconClock class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Durata
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ duration }} min</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>
    </div>
  </div>
</template>

