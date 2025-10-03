import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useStore = defineStore('store', () => {

  const currentGame = ref<null | {
    players: string[],
    impostors: number,
    duration: number,
    hint: boolean,
    packets: { name: string; items: Array<{ word: string, hint: string[] }> }[],
  }>(null)

  // Example packages with words and hints (only for testing purposes for now)
  const packets = reactive<Record<string, { name: string, selected: boolean, items: Array<{ word: string, hint: string[] }> }>>({
    luoghi: {
      name: 'Luoghi',
      selected: true,
      items: [
        { word: 'Parco', hint: ['Cane', 'Giostra'] },
        { word: 'Hotel', hint: ['Dormire', 'Chiave'] },
        { word: 'Cinema', hint: ['Biglietto', 'Schermo'] },
        { word: 'Supermercato', hint: ['Scontrino', 'Frigorifero'] },
        { word: 'Scuola', hint: ['Libri', 'Astuccio'] },
        { word: 'Spiaggia', hint: ['Sabbia', 'Acqua'] },
        { word: 'Museo', hint: ['Quadro', 'Guida'] },
        { word: 'Stazione', hint: ['Partenza', 'Annuncio'] },
        { word: 'Aeroporto', hint: ['Controlli', 'Liquidi'] },
        { word: 'Acquario', hint: ['Vasca', 'Medusa'] },
        { word: 'Zoo', hint: ['Gabbia', 'Serra'] },
        { word: 'Stadio', hint: ['Erba', 'Cori'] },
        { word: 'Palestra', hint: ['Peso', 'Sudore'] },
        { word: 'Forno', hint: ['Farina', 'Zucchero'] },
        { word: 'Macelleria', hint: ['Coltello', 'Frigo'] },
        { word: 'Ristorante', hint: ['Bicchiere', 'Piatto'] },
        { word: 'Teatro', hint: ['Costumi', 'Canto'] },
        { word: 'Ospedale', hint: ['Medicine', 'Igiene'] },
        { word: 'Fiorista', hint: ['Vaso', 'Verde'] },
      ]
    }
  })

  return { packets, currentGame }
})
