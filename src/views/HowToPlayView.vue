<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import { useStore } from '@/stores'
import { goToPage } from '@/router/navigation'
import { ref } from 'vue'

const store = useStore()
const packets = store.packets

const isGoHomeModalActive = ref(false)
</script>

<template>
  <IconClose class="w-9 h-9 stroke-2 fill-neutral-200 absolute rounded-full border-2 border-neutral-200 mt-7 ml-[21px] p-0.5 bg-neutral-200/10" @click="isGoHomeModalActive = true"/>
  
  <div class="flex flex-col items-center justify-center h-[100vh] w-[100vw] p-8 space-y-12 bg-neutral-800 overscroll-y-auto overflow-y-auto">
    <h1 class="text-5xl text-red-700 font-bold">COME GIOCARE</h1>
    <div class="max-w-3xl text-neutral-200 space-y-6">
      <h2 class="text-3xl font-semibold -mt-2 mb-4">Procedura di gioco</h2>
      <ol class="list-decimal list-inside space-y-2 text-lg">
        <li>Inserisci il nome dei giocatori.</li>
        <li>Scegli il numero di impostori.</li>
        <li>Attiva/disattiva il suggerimento (permette all'impostore di avere un aiuto per il primo turno).</li>
        <li>Scegli i pacchetti.</li>
        <li>Inserisci il tempo di gioco.</li>
      </ol>
    </div>
    <div class="max-w-3xl text-neutral-200 space-y-6">
      <h2 class="text-3xl font-semibold mb-4">Pacchetti</h2>
      <ul class="list-disc list-inside space-y-2 text-lg">
        <li v-for="packet in packets">
          <strong>{{ packet.name }} ({{ packet.items.length }} parole): </strong>{{ packet.description }}
        </li>
      </ul>
    </div>
  </div>

  <div v-if="isGoHomeModalActive" @touchstart.prevent class="fixed z-30 inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>


    <div v-if="isGoHomeModalActive" class="fixed inset-0 z-50 overflow-y-auto text-neutral-200">
      <div class="flex min-h-full items-center justify-center px-8 text-center ">
        <div class="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all">
          <div class="select-none bg-neutral-800 px-4 pb-4 pt-5">
            <div>
              <div class="mx-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-red-200/20">
                <IconClose class="w-8 h-8 fill-red-500"/>
              </div>
              <div class="mt-3 text-center">
                <h3 class="text-2xl font-semibold" id="modal-title">Torna alla home</h3>
                <div class="mt-2">
                  <p class="text-lg" style="white-space: pre-line">Sei sicuro di voler tornare alla home?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-neutral-800 px-6 py-4 pb-5 pt-5 flex justify-between gap-3">
            <button type="button" class="flex-1 inline-flex justify-center rounded-lg px-3 py-2 text-lg font-semibold ring-2 ring-inset ring-neutral-200 bg-neutral-200/10" @click="isGoHomeModalActive = false">
              Annulla
            </button>
            <button type="button" class="flex-1 inline-flex justify-center rounded-lg px-3 py-2 text-lg font-semibold ring-2 ring-inset ring-red-500 text-red-500 bg-red-300/10" @click="goToPage('home')">
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
</template>