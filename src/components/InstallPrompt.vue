<script setup lang="ts">
import IconShare from './icons/IconShare.vue'
import IconMore from './icons/IconMore.vue'
import { ref, onMounted, type Ref } from 'vue'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt(): Promise<void>
}

const showPrompt: Ref<boolean> = ref(false)
const deferredPrompt: Ref<BeforeInstallPromptEvent | null> = ref(null)
const isIOS: Ref<boolean> = ref(false)
const isAndroid: Ref<boolean> = ref(false)
const appName = 'Impostore'

function dismissPrompt(): void {
  showPrompt.value = false
}

function installApp(): void {
  console.log('beforeinstallprompt fired')

  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.finally(() => {
      deferredPrompt.value = null
      showPrompt.value = false
    })
  }
}

onMounted(() => {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-expect-error: proprietà non standard di iOS Safari
    window.navigator.standalone === true

  if (isStandalone) return

  const ua = window.navigator.userAgent.toLowerCase()
  isIOS.value = /iphone|ipad|ipod/.test(ua)
  isAndroid.value = /android/.test(ua)

  if (isIOS.value) {
    showPrompt.value = true
  }

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    showPrompt.value = true
  })
})
</script>

<template>
  <div v-if="showPrompt" @touchstart.prevent class="fixed z-30 inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>

  <transition name="fade">
    <div v-if="showPrompt" class="fixed inset-0 z-40 flex items-center justify-center px-8">
      <div class="bg-neutral-800 rounded-xl shadow-md text-sm text-center px-4 py-4 text-neutral-200 max-w-sm w-full relative" >
        
        <div v-if="isIOS" class="text-lg">
          <p class="text-3xl mb-2">CONSIGLIO</p>
          Per un’esperienza migliore, aggiungi <span class="font-semibold">{{ appName }}</span> alla schermata Home.<br>
          Tocca <IconShare class="inline w-6 h-6 align-text-bottom fill-neutral-200" />, poi Altro <IconMore class="inline w-6 h-6 fill-neutral-200" /> e infine <span class="font-semibold">Aggiungi alla schermata Home</span>.
        </div>

        <div v-else-if="isAndroid">
          Installa <span class="font-semibold">{{ appName }}</span> sul tuo dispositivo per un’esperienza completa.<br>
          <button @click="installApp" class="mt-2 inline-block bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Installa l’app
          </button>
        </div>

        <div class="bg-neutral-800 px-6 pt-5 flex justify-between gap-3">
          <button type="button" class="rounded-lg w-full px-3 py-2 text-lg font-semibold ring-2 ring-inset ring-neutral-200 bg-neutral-200/10" @click="dismissPrompt">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>