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
import IconHint from '@/components/icons/IconHint.vue'
import { ref, watch, reactive, computed } from 'vue'
import { useStore } from '@/stores'
import { goToPage } from '@/router/navigation'

const store = useStore()
const packetsAvailable = store.packets

type ModalKeys = 'players' | 'duration' | 'packets'

const players = reactive(["Giocatore 1", "Giocatore 2", "Giocatore 3", "Giocatore 4"])
const impostors = ref(1)
const hint = ref(true)
const duration = ref(4)
const packets = computed(() =>
  Object.values(packetsAvailable).filter(packet => packet.selected).length
)

// Modal and backdrop state management
const showModal = reactive<Record<ModalKeys, boolean>>({
  players: false,
  duration: false,
  packets: false,
})
const isClosingModal = reactive<Record<ModalKeys, boolean>>({
  players: false,
  duration: false,
  packets: false,
})
const isBackdropVisible = ref(false)
const isAnyModalOpen = computed(() =>
  Object.values(showModal).some(Boolean)
)

function addPlayer() {
  if (players.length < 30) {
    players.push(`Giocatore ${players.length + 1}`)
  }
}

function changeImpostors(n: number) {
  if (impostors.value + n >= 1 && impostors.value + n < players.length) {
    impostors.value += n
  } 
}

function changeDuration(n: number) {
  if (duration.value + n >= 1 && duration.value + n <= 30) {
    duration.value += n
  } 
}

function switchVar(varName: ModalKeys) {
  for (const key in showModal) {
    const modalKey = key as ModalKeys
    if (modalKey === varName) {
      showModal[modalKey] = !showModal[modalKey]
      isBackdropVisible.value = showModal[modalKey] || isAnyModalOpen.value
    } else {
      showModal[modalKey] = false
    }
  }
}

// Watchers to enforce limits
watch(players, () => {
  duration.value = players.length

  if (duration.value > 30) {
    duration.value = 30
  }

  if (impostors.value >= players.length) {
    impostors.value = players.length - 1
  }
})

// Start Game function
function startGame() {
  store.currentGame = {
    players: [...players],
    impostors: impostors.value,
    duration: duration.value,
    hint: hint.value,
    packets: Object.values(packetsAvailable ?? {}).filter(packet => packet.selected),
  }

  goToPage('game')
}

// Drag to close modal logic
const startY = ref(0)
const currentY = ref(0)
const isDragging = ref(false)
const dragTranslateModal = reactive<Record<ModalKeys, number>>({
  players: 0,
  duration: 0,
  packets: 0,
})
const threshold = 250
let activeModal: ModalKeys | null = null

function onTouchStart(event: TouchEvent) {
  if (!showModal.players && !showModal.duration && !showModal.packets) return
  const touch = event.touches[0]
  if (!touch) return

  startY.value = touch.clientY
  currentY.value = startY.value
  isDragging.value = true
  dragTranslateModal.players = 0


  if (showModal.players) {
    activeModal = 'players'
  } else if (showModal.duration) {
    activeModal = 'duration'
  } else if (showModal.packets) {
    activeModal = 'packets'
  }
}

function onTouchMove(event: TouchEvent) {
  if (!isDragging.value) return
  const touch = event.touches[0]
  if (!touch) return

  currentY.value = touch.clientY
  const deltaY = Math.max(currentY.value - startY.value, 0)

  if (!activeModal) return
  dragTranslateModal[activeModal] = deltaY
}

function onTouchEnd() {
  if (!isDragging.value || !activeModal) return

  isDragging.value = false

  if (!activeModal) return
  let dragTranslate = dragTranslateModal[activeModal]

  if (dragTranslate > threshold) {
    isClosingModal[activeModal] = true
    dragTranslateModal[activeModal] = window.innerHeight
  } else {
    dragTranslateModal[activeModal] = 0
  }

  activeModal = null
}

function handleTransitionEndModal(modal: 'players' | 'duration' | 'packets') {
  if (!isClosingModal[modal]) return

  showModal[modal] = false
  isClosingModal[modal] = false
  dragTranslateModal[modal] = 0

  if (!isAnyModalOpen.value) {
    isBackdropVisible.value = false
  }
}

function closeModalWithBackdrop() {
  (Object.keys(showModal) as ModalKeys[]).forEach(modal => {
    if (showModal[modal]) {
      isClosingModal[modal] = true
      dragTranslateModal[modal] = window.innerHeight
    }
  })
}

function togglePacket(packet: { name: string, selected: boolean }) {
  if (packet.selected && packets.value <= 1) {
    // impedisci di deselezionare l'ultimo pacchetto
    return
  }
  packet.selected = !packet.selected
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800 overflow-hidden">
    <!-- View Title -->
    <p class="text-red-700 font-extrabold text-6xl mb-16 -mt-7">IMPOSTORE</p>

    <!-- Options -->
    <div class="w-[calc(100%-4rem)]">

      <!-- Players option -->
      <button @click="switchVar('players')" class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 rounded-t-2xl border-neutral-600 text-2xl font-semibold text-left flex pl-5"> 
        <IconPlayers class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Giocatori
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ players.length }}</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>

      <!-- Impostors option -->
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-5"> 
        <IconSpy class="inline w-6 h-6 mr-3 mt-1 fill-neutral-200"/>
        Impostori
        <div class="ml-auto flex items-center text-xl pr-2">
          <IconPlusCircle class="inline w-6 h-6 mr-3 fill-neutral-200" @click="changeImpostors(1)"/>
          <p class="pt-1">{{ impostors }}</p>
          <IconMinusCircle class="inline w-6 h-6 ml-3 mr-2 fill-neutral-200" @click="changeImpostors(-1)"/>
        </div>
      </button>

      <!-- Suggerimento option -->
      <button class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-5 items-center">
        <IconHint class="inline w-6 h-6 mr-3 -mt-1 fill-neutral-200"/>
        Suggerimento
        <div class="ml-auto pr-3.5">
          <div class="w-13 h-7 rounded-full relative cursor-pointer transition-colors duration-300" :class="hint ? 'bg-red-500/20' : 'bg-neutral-600'" @click="hint = !hint">
            <div class="w-5 h-5 rounded-full absolute top-1 transition-all duration-300" :class="hint ? 'bg-red-500 left-[calc(100%-24px)]' : 'bg-neutral-400 left-1'"></div>
          </div>
        </div>
      </button>

      <!-- Packets option -->
      <button @click="switchVar('packets')" class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 border-b-2 border-neutral-600 text-2xl font-semibold text-left flex pl-5"> 
        <IconCards class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Pacchetti
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ packets }} pac.</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>

      <!-- Duration option -->
      <button @click="switchVar('duration')" class="w-full bg-neutral-700 text-neutral-200 pt-4 pb-3 rounded-b-2xl text-2xl font-semibold text-left flex pl-5"> 
        <IconClock class="inline w-6 h-6 mr-3 mt-0.5 fill-neutral-200"/>
        Durata
        <div class="ml-auto flex items-center text-xl pr-2">
          <p class="pt-1">{{ duration }} min</p>
          <IconArrowRight class="inline w-8 h-8 fill-neutral-200"/>
        </div>
      </button>

      <!-- Start Game Button -->
      <button @click="startGame" class="w-full bg-red-700 text-neutral-200 pt-4 pb-3 mt-10 rounded-2xl text-2xl font-semibold text-center flex items-center justify-center">
        <p class="mr-3">Inizia partita</p>
      </button>
    </div>

    <!-- Modal Players -->
    <Transition name="slide-up">
      <div v-if="showModal.players" 
           class="z-10 w-screen h-[calc(100vh-12rem)] absolute bottom-0 left-0 bg-neutral-800 rounded-t-2xl border-t-2 border-neutral-600 flex flex-col transition-transform duration-300 ease-out"
           @touchstart="onTouchStart"
           @touchmove="onTouchMove"
           @touchend="onTouchEnd"
           @transitionend="handleTransitionEndModal('players')"
           :style="{ transform: `translateY(${dragTranslateModal.players}px)` }"
      >
        <div class="shrink-0 flex flex-col items-center">
          <IconPlayers class="inline w-10 h-10 mt-2.5 fill-neutral-200"/>
          <p class="mt-2 mb-6 text-neutral-200 text-3xl">Aggiungi giocatori</p>
        </div>
        <div class="flex-1 overflow-y-auto px-6">
          <div v-for="(_, index) in players" :key="index" class="bg-neutral-700 rounded-2xl px-6 pt-4 pb-3 mb-4 flex items-center justify-between">
            <div>
              <p class="text-neutral-200">Giocatore {{ index + 1 }}</p>
              <input v-model="players[index]" type="text" class="bg-neutral-700 text-neutral-200 text-xl rounded-lg mt-1 focus:outline-none" placeholder="Nome"/>
            </div>
           <IconTrash @click="players.length > 3 && players.splice(index, 1)" class="inline w-6 h-6 fill-red-700 mb-1 cursor-pointer"/>
          </div>
          <button @click="addPlayer" class="flex items-center border-2 text-red-700 px-4 pt-2 pb-1.5 rounded-2xl text-xl font-semibold mt-6 mb-6 mx-auto">
            <IconPlusFilledCircle class="inline w-5 h-5 fill-red-700 mb-0.5 mr-1.5"/>
            <p>Aggiungi giocatore</p>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Modal Packets -->
    <Transition name="slide-up">
      <div v-if="showModal.packets || isClosingModal.packets" 
           class="z-10 w-screen h-[calc(100vh-12rem)] absolute bottom-0 left-0 bg-neutral-800 rounded-t-2xl border-t-2 border-neutral-600 flex flex-col transition-transform duration-300 ease-out"
           @touchstart="onTouchStart"
           @touchmove="onTouchMove"
           @touchend="onTouchEnd"
           @transitionend="handleTransitionEndModal('packets')"
           :style="{ transform: `translateY(${dragTranslateModal.packets}px)` }"
      >
        <div class="shrink-0 flex flex-col items-center">
          <IconCards class="inline w-10 h-10 mt-2.5 fill-neutral-200"/>
          <p class="mt-2 mb-5 text-neutral-200 text-3xl">Pacchetti</p>
        </div>
        <div class="grid grid-cols-2 overflow-y-auto px-6">
          <div v-for="(packet, index) in packetsAvailable" :key="index" class="bg-neutral-700 rounded-2xl px-6 pt-4 pb-3 m-2 flex items-center justify-between cursor-pointer" >
            <p class="text-neutral-200 text-xl">{{ packet.name }}</p>
            <input type="checkbox" :checked="packet.selected" @change="togglePacket(packet)" class="w-6 h-6 mb-1 rounded-full cursor-pointer appearance-none border-2 border-red-700 transition-colors duration-200" :class="packet.selected ? 'bg-red-700' : 'bg-neutral-700'"/>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Duration -->
    <Transition name="slide-up">
      <div v-if="showModal.duration || isClosingModal.duration" 
           class="z-10 w-screen h-[calc(100vh-12rem)] absolute bottom-0 left-0 bg-neutral-800 rounded-t-2xl border-t-2 border-neutral-600 flex flex-col transition-transform duration-300 ease-out"
           @touchstart="onTouchStart"
           @touchmove="onTouchMove"
           @touchend="onTouchEnd"
           @transitionend="handleTransitionEndModal('duration')"
           :style="{ transform: `translateY(${dragTranslateModal.duration}px)` }"
      >
        <div class="shrink-0 flex flex-col items-center">
          <IconClock class="inline w-10 h-10 mt-2.5 fill-neutral-200"/>
          <p class="mt-2 mb-5 text-neutral-200 text-3xl">Durata partita</p>
        </div>
        <div class="flex-1 overflow-y-auto px-6">
          <div class="bg-neutral-700 rounded-2xl px-6 pt-4 pb-3 mb-4 flex items-center justify-between">
            <div>
              <p class="text-neutral-200">Durata</p>
              <div class="flex items-center">
                <IconPlusCircle class="inline w-6 h-6 mr-3 fill-neutral-200" @click="changeDuration(1)"/>
                <p class="text-neutral-200 text-xl pt-1">{{ duration }}</p>
                <IconMinusCircle class="inline w-6 h-6 ml-3 fill-neutral-200" @click="changeDuration(-1)"/>
              </div>
            </div>
           <p class="text-neutral-400">minuti</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <div v-if="isBackdropVisible" @click="closeModalWithBackdrop" @touchmove.prevent class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.575s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}

button, p {
  user-select: none;               /* standard */
  -webkit-user-select: none;       /* Safari */
  -ms-user-select: none;           /* IE/Edge */
}
</style>
