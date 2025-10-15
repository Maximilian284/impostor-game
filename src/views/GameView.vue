<script setup lang="ts">
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconHelp from '@/components/icons/IconHelp.vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import TimerDigit from '@/components/TimerDigit.vue'
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores'
import { goToPage } from '@/router/navigation'

const isModalActive = ref(false)

const currentGame = useStore().currentGame

const players = currentGame?.players ?? []

onMounted(() => {
  if (!players || players.length === 0) {
    goToPage("home")
  } else {
    initializeGame()
  }
})

const impostorsCount = currentGame?.impostors ?? 0
const hint = currentGame?.hint 
const duration = currentGame?.duration
const packets = currentGame?.packets

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i]!, arr[j]!] = [arr[j]!, arr[i]!]
  }
  return arr
}

const playerList = ref<{ name: string; impostor: boolean; revealed: boolean }[]>([])
const currentIndex = ref(0)
const showNextButton = ref(false)
const hasDraggedOnce = ref(false)

// Discussion phase logic
const isDiscussion = ref(false)
const isTimerStarted = ref(false)
const discussionTime = ref((duration ?? 1) * 60)
let timer: number | undefined = undefined
const discussionEnded = ref(false)

let chosenWord = ref<{ word: string; hint: string[] } | null>(null)

function initializeGame() {
  if (players.length === 0) return

  // Shuffle players
  const shuffled = shuffleArray(players)

  // Select impostor indices
  const indices = new Set<number>()
  while (indices.size < impostorsCount) {
    const randomIndex = Math.floor(Math.random() * shuffled.length)
    indices.add(randomIndex)
  }

  // Create player list with revealed flag
  playerList.value = shuffled.map((name, idx) => ({
    name,
    impostor: indices.has(idx),
    revealed: false,
  }))

  // Select a random word from selected packets
  const allSelectedItems = packets ? Object.values(packets).flatMap(p => p.items) : []
  let newChosenWord: { word: string; hint: string[] } | null = null
  if (allSelectedItems.length > 0) {
    const index = Math.floor(Math.random() * allSelectedItems.length)
    const wordObj = allSelectedItems[index]
    if (wordObj) {
      const hintIndex = Math.floor(Math.random() * wordObj.hint.length)
      newChosenWord = {
        word: wordObj.word,
        hint: [wordObj.hint[hintIndex] ?? '']
      }
    }
  }
  chosenWord.value = newChosenWord

  // Set state variables
  currentIndex.value = 0
  showNextButton.value = false
  hasDraggedOnce.value = false
  isDiscussion.value = false
  isTimerStarted.value = false
  discussionEnded.value = false
  discussionTime.value = (duration ?? 1) * 60
}

function nextPlayer() {
  if (currentIndex.value < playerList.value.length - 1) {
    currentIndex.value++
    const player = playerList.value[currentIndex.value]
    if (player) player.revealed = false
    showNextButton.value = false
    hasDraggedOnce.value = false
  } else {
    // Last player starts discussion
    isDiscussion.value = true
  }
}

function startDiscussionTimer() {
  isTimerStarted.value = true
  let timeLeft = discussionTime.value
  timer = window.setInterval(() => {
    timeLeft--
    discussionTime.value = timeLeft
    if (timeLeft <= 0) endDiscussion()
  }, 1000)
}

function endDiscussion() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
  discussionEnded.value = true
}

// Replay with same settings
function replayGame() {
  initializeGame()
}

function newGame() {
  goToPage("newGame")
}

function toggleReveal() {
  const player = playerList.value[currentIndex.value]
  if (player && !player.revealed) {
    player.revealed = true
    showNextButton.value = true
  }
}

let startY = 0
let currentY = 0

function startDrag(event: TouchEvent) {
  const touch = event.touches[0]
  if (touch) {
    startY = touch.clientY
  }
}

function onDrag(event: TouchEvent) {
  if (!playerList.value[currentIndex.value]) return
  const touch = event.touches[0]
  if (touch) {
    currentY = startY - touch.clientY 
  }
  if (currentY < 0) currentY = 0

  hasDraggedOnce.value = true

  const cover = event.currentTarget as HTMLElement
  const maxTranslate = cover.offsetHeight * 0.85
  cover.style.transform = `translateY(-${Math.min(currentY, maxTranslate)}px)`
}

function endDrag() {
  const player = playerList.value[currentIndex.value]
  if (!player) return
  const cover = document.querySelector('.absolute.top-0') as HTMLElement

  if (currentY > (cover.offsetHeight / 3) || hasDraggedOnce.value) {
    player.revealed = currentY > (cover.offsetHeight / 3)
    showNextButton.value = true
  } else {
    player.revealed = false
  }

  currentY = 0
  if (cover) {
    cover.style.transition = 'transform 0.3s ease-out'
    cover.style.transform = 'translateY(0)'
    setTimeout(() => {
      if (cover) cover.style.transition = ''
    }, 300)
  }
}
</script>

<template>
  <div>
    <IconClose class="w-8 h-8 stroke-2 fill-neutral-200 absolute rounded-full border-2 border-neutral-200 mt-7 ml-[21px] p-0.5" @click="isModalActive = true"/>
    <IconHelp class="w-8 h-8 fill-neutral-200/20 absolute rounded-full border-2 border-neutral-200/20 mt-7 right-[21px] p-1"/>
    <div v-if="isDiscussion" class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800 p-6 space-y-6">
      <h2 v-if="!discussionEnded" class="text-neutral-200 text-5xl font-bold mb-24 -mt-[12vh] text-center">DISCUSSIONE</h2>

      <div v-if="!discussionEnded" class="flex items-center justify-center mb-12">
          <TimerDigit :value="Math.floor(discussionTime / 60 / 10)" />
          <TimerDigit :value="Math.floor(discussionTime / 60) % 10" />
          <div class="text-6xl font-bold text-red-600 mx-2 mb-3">:</div>
          <TimerDigit :value="Math.floor((discussionTime % 60) / 10)" />
          <TimerDigit :value="discussionTime % 10" />
      </div>
      
      <div v-if="!discussionEnded" class="w-[calc(100%-7rem)] flex flex-col items-center space-y-4">
        <button v-if="isTimerStarted" class="min-h-[68px] w-full bg-red-700 text-neutral-200 pt-4 pb-3 rounded-2xl text-3xl font-semibold" @click="endDiscussion">
          Vota!
        </button>
        <button v-else class="flex justify-center w-full bg-red-700 text-neutral-200 pt-4 pb-3 rounded-2xl font-semibold" @click="startDiscussionTimer">
          <IconPlay class="w-10 h-10 fill-neutral-200"/>
        </button>
      </div>

      <div v-else class="flex flex-col w-[calc(100%-2.5rem)] items-center space-y-4">
        <p class="text-neutral-200 text-6xl mb-20 font-bold -mt-[12vh]">VOTATE!</p>
        <button class="w-full bg-red-700 text-neutral-200 pt-4 pb-3 rounded-2xl text-3xl font-semibold" @click="replayGame">Rigioca</button>
        <button class="w-full bg-neutral-600 text-neutral-200 pt-4 pb-3 rounded-2xl text-3xl font-semibold" @click="newGame">Nuova Partita</button>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-screen w-screen bg-neutral-800 p-6 space-y-6">
      <!-- Card -->
      <h2 class="text-neutral-200 text-4xl font-bold mb-10 mt-6 text-center">{{ playerList[currentIndex]?.name }}</h2>

      <div class="relative w-[calc(100%-4rem)] h-[calc(45vh)]">
        <div class="bg-neutral-700 rounded-2xl shadow-xl w-full h-full flex items-center justify-center text-center text-lg text-neutral-200 pt-10">
          <div>
            <p :class="['font-bold text-3xl', playerList[currentIndex]?.impostor ? 'text-red-500' : 'text-green-500']">
              {{ playerList[currentIndex]?.impostor ? 'IMPOSTORE' : 'ALLEATO' }}
            </p>
            <p class="text-2xl pt-2">
              {{ playerList[currentIndex]?.impostor ?  hint ? chosenWord?.hint.join(', ') : 'Non farti scoprire!' : chosenWord?.word }}
            </p>
          </div>
        </div>

        <!-- Card cover -->
        <div
          class="absolute top-0 left-0 w-full h-full border-red-700 border-4 bg-neutral-800 rounded-2xl cursor-pointer touch-none flex items-end pb-5 justify-center text-neutral-200 text-2xl font-semibold"
          @click="toggleReveal()"
          @touchstart.prevent="startDrag($event)"
          @touchmove.prevent="onDrag($event)"
          @touchend.prevent="endDrag()" >
          <div>
            <IconArrowUp class="w-8 h-8 fill-neutral-200 mx-auto mb-1.5" />
            Rivela la parola
          </div>
        </div>
      </div>

      <!-- Next player button -->
      <div class="mt-4 h-16 w-[calc(100%-4rem)] flex items-center justify-center">
        <button v-if="showNextButton" class="w-full bg-red-700 text-neutral-200 pt-4 pb-3 rounded-2xl text-2xl font-semibold" @click="nextPlayer" >
          {{ currentIndex >= playerList.length - 1 ? 'Gioca' : 'Prossimo Giocatore' }}
        </button>
        <div v-else class="w-full h-full"></div>
      </div>
    </div>

    <div v-if="isModalActive" @touchstart.prevent class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>
    <div v-if="isModalActive" class="fixed inset-0 z-30 w-screen overflow-y-auto text-neutral-200">
      <div class="flex min-h-full items-center justify-center p-5 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="select-none bg-neutral-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-red-300 sm:mx-0 sm:size-10">
                <IconClose class="w-8 h-8 fill-red-700"/>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-2xl font-semibold" id="modal-title">Termina la partita</h3>
                <div class="mt-2">
                  <p class="text-lg" style="white-space: pre-line">Sei sicuro di voler terminare la partita?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-neutral-800 px-6 py-4 pb-5 flex justify-between gap-3">
            <button type="button" class="flex-1 inline-flex justify-center rounded-lg px-3 py-2 text-lg font-semibold ring-1 ring-inset ring-neutral-200 bg-neutral-200/20" @click="isModalActive = false">
              Annulla
            </button>
            <button type="button" class="flex-1 inline-flex justify-center rounded-lg px-3 py-2 text-lg font-semibold ring-1 ring-inset ring-red-300 text-red-500 bg-red-300/20" @click="goToPage('newGame')">
              Termina
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>