<script setup lang="ts">
defineProps<{
  buttonText: string,
}>()
</script>

<template>
  <button class="bg-red-700 text-neutral-200 font-extrabold text-3xl py-4 px-8 rounded-3xl">
    {{ buttonText }}
  </button>
</template>