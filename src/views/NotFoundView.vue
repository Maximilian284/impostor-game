<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-center text-neutral-200 px-8">
    <h1 class="text-5xl font-bold mb-6 text-red-700">Ops...giocatore fuori luogo!</h1>
    <p class="text-xl text-gray-300 mb-10">
      Sembra che tu abbia cercato di entrare in una stanza che non esiste.  
      Forse hai preso la strada sbagliata, o forse sei tu l’impostore...
    </p>
    <RouterLink
      to="/"
      class="bg-red-700 font-semibold py-3 px-6 rounded-2xl text-3xl transition-colors duration-200">
      Torna alla Home
    </RouterLink>
  </div>
</template>