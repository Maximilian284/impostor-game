<script setup lang="ts">
import IconPlayers from '@/components/icons/IconPlayers.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconSpy from '@/components/icons/IconSpy.vue'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import IconMinusCircle from '@/components/icons/IconMinusCircle.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconCards from '@/components/icons/IconCards.vue'
import IconPlusFilledCircle from '@/components/icons/IconPlusFilledCircle.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import { ref, watch } from 'vue'

const players = ref(["Giocatore 1", "Giocatore 2", "Giocatore 3", "Giocatore 4"])
const impostors = ref(1)
const duration = ref(4)
const packets = ref(1)

const showModalPlayers = ref(false)
const showModalPackets = ref(false)

function addPlayer() {
  players.value.push(`Giocatore ${players.value.length + 1}`)
}

function changeImpostors(n: number) {
  if (impostors.value + n >= 1 && impostors.value + n < players.value.length) {
    impostors.value += n
  } 
}

function switchVar(varName: string) {
  switch (varName) {
    case 'players':
      showModalPlayers.value = !showModalPlayers.value
      break
    case 'impostors':
      break
    case 'duration':
      break
    case 'packets':
      break
  }
}

watch(players, () => {
  duration.value = players.value.length + 1
})
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800 overflow-hidden">
    <!-- View Title -->
    <p class="text-red-700 font-extrabold text-6xl mb-20 -mt-[8rem]">IMPOSTORE</p>

    <!-- Options -->
    <div class="w-[calc(100%-4rem)]">

      <!-- Players option -->
      <button @click="switchVar('players')" class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 rounded-t-2xl border-neutral-600 text-2xl font-semibold text-left flex pl-6"> 
        <IconPlayers class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Giocatori
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ players.length }}</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>

      <!-- Impostors option -->
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-6"> 
        <IconSpy class="inline w-6 h-6 mr-3 mt-1 fill-neutral-200"/>
        Impostori
        <div class="ml-auto flex items-center text-xl pr-2">
          <IconPlusCircle class="inline w-6 h-6 mr-3 fill-neutral-200" @click="changeImpostors(1)"/>
          <p class="pt-1">{{ impostors }}</p>
          <IconMinusCircle class="inline w-6 h-6 ml-3 fill-neutral-200" @click="changeImpostors(-1)"/>
        </div>
      </button>

      <!-- Duration option -->
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-6"> 
        <IconCards class="inline w-6 h-6 mr-3 mt-1 fill-neutral-200"/>
        Pacchetti
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ packets }} pac.</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>

      <!-- Packets option -->
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 rounded-b-2xl text-2xl font-semibold text-left flex pl-6"> 
        <IconClock class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Durata
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ duration }} min</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>
    </div>

    <!-- Modal Players -->
    <Transition name="slide-up">
      <div v-show="showModalPlayers" class="z-10 w-screen h-[calc(100vh-12rem)] absolute bottom-0 left-0 bg-neutral-800 rounded-t-2xl border-t-2 border-neutral-600 flex flex-col">
        <div class="shrink-0 flex flex-col items-center">
          <IconPlayers class="inline w-10 h-10 mt-2.5 fill-neutral-200"/>
          <p class="mt-2 mb-7 text-neutral-200 text-3xl">Aggiungi giocatori</p>
        </div>
        <div class="flex-1 overflow-y-auto px-6">
          <div v-for="(player, index) in players" :key="index" class="bg-neutral-700 rounded-2xl px-6 pt-4 pb-3 mb-4 flex items-center justify-between">
            <div>
              <p class="text-neutral-200">Giocatore {{ index + 1 }}</p>
              <input v-model="players[index]" type="text" class="bg-neutral-700 text-neutral-200 text-xl rounded-lg mt-1 focus:outline-none" placeholder="Nome"/>
            </div>
           <IconTrash @click="players.splice(index, 1)" class="inline w-6 h-6 fill-red-700 mb-1 cursor-pointer"/>
          </div>
          <button @click="addPlayer" class="flex items-center border-2 text-red-700 px-4 pt-2 pb-1.5 rounded-2xl text-xl font-semibold mt-2 mb-6 mx-auto">
            <IconPlusFilledCircle class="inline w-5 h-5 fill-red-700 mb-0.5 mr-1.5"/>
            <p>Aggiungi giocatore</p>
          </button>
        </div>
      </div>
    </Transition>
    <div v-if="showModalPlayers" @click="switchVar('players')" class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>
  
    <!-- Modal Packets -->
  </div>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
