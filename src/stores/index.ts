import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCounterStore = defineStore('store', () => {

  // Example packages with words and hints (only for testing purposes for now)
  const packets = reactive<Record<string, { name: string, selected: boolean, items: Array<{ word: string, hint: string }> }>>({
    animali: {
      name: 'Animali',
      selected: true,
      items: [
        { word: 'Cane', hint: 'Fido' },
        { word: 'Gatto', hint: 'Miao' },
        { word: 'Elefante', hint: 'Grande' },
        { word: 'Leone', hint: 'Re della giungla' },
        { word: 'Tigre', hint: 'Strisce' },
        { word: 'Orso', hint: 'Miele' },
      ]
    },
    cibi: {
      name: 'Cibi',
      selected: false,
      items: [
        { word: 'Pizza', hint: 'Margherita' },
        { word: 'Pasta', hint: 'Spaghetti' },
        { word: 'Gelato', hint: 'Fresco' },
        { word: 'Insalata', hint: 'Verde' },
        { word: 'Hamburger', hint: 'Fast food' },
      ]
    },
  })

  return { packets }
})
