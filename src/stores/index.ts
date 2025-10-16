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

  const packets = reactive<Record<string, { name: string, description: string, selected: boolean, items: Array<{ word: string, hint: string[] }> }>>({
    luoghi: {
      name: 'Luoghi',
      description: 'Include parole relative a posti e ambientazioni.',
      selected: true,
      items: [
        { word: 'Parco', hint: ['Terra', 'Verde'] },
        { word: 'Hotel', hint: ['Dormire', 'Letto'] }, // migliorare dormire
        { word: 'Cinema', hint: ['Biglietto', 'Rumore'] },
        { word: 'Supermercato', hint: ['Scontrino', 'Zucchero'] },
        { word: 'Mare', hint: ['Costume', 'Medusa'] },
        { word: 'Museo', hint: ['Guida'] }, 
        { word: 'Stazione', hint: ['Partenza', 'Annuncio'] }, // aggiungere parola con annuncio
        { word: 'Aeroporto', hint: ['Partenza', 'Sicurezza'] },
        { word: 'Acquario', hint: ['Vasca', 'Medusa'] },
        { word: 'Zoo', hint: ['Gabbia', 'Guida'] },
        { word: 'Piscina', hint: ['Vasca', 'Costume']},
        { word: 'Stadio', hint: ['Verde', 'Rumore'] },
        { word: 'Palestra', hint: ['Specchio'] }, // completare
        { word: 'Forno', hint: ['Zucchero'] }, // completare
        { word: 'Macelleria', hint: ['Coltello', 'Sangue'] },
        { word: 'Bar', hint: ['Zucchero', 'Scontrino'] },
        { word: 'Teatro', hint: ['Biglietto', 'Canto'] },
        { word: 'Ospedale', hint: ['Igiene'] }, // completare
        { word: 'Bagno', hint: ['Igiene', 'Specchio']},
        { word: 'Fiorista', hint: ['Terra', 'Verde'] },
        { word: 'Chiesa', hint: ['Canto' ]}, // completare
        { word: 'Obitorio', hint: ['Coltello', 'Sangue']},
        { word: 'Prigione', hint: ['Sicurezza', 'Gabbia']}
      ]
    },
    attivita_eventi: {
      name: 'Eventi e Attività',
      description: 'Parole riguardanti eventi e attività comuni.',
      selected: false,
      items: [
        { word: 'Viaggio', hint: ['Partenza', 'Biglietto'] },
        { word: 'Festa', hint: ['Musica', 'Torta'] },
        { word: 'Cena', hint: ['Scontrino', 'Cibo'] },
        { word: 'Vacanza', hint: ['Dormire'] }, // completare
        { word: 'Matrimonio', hint: ['Abito', 'Fedi'] },
        { word: 'Passeggiata', hint: ['Terra'] }, // completare
        { word: 'Picnic', hint: ['Coperta', 'Cibo'] },
      ]
    },
    tempo_libero: {
      name: 'Tempo libero',
      description: 'Parole legate al tempo libero e hobby.',
      selected: false,
      items: [
        { word: 'Concerto', hint: ['Rumore', 'Cantante'] },
        { word: 'Spettacolo', hint: ['Musica', 'Biglietto'] },
        { word: 'Film', hint: ['Schermo', 'Pubblico'] },
        { word: 'Concerto', hint: ['Musica', 'Pubblico'] },
        { word: 'Teatro', hint: ['Canto', 'Luce'] },
        { word: 'Mostra', hint: ['Guida', 'Pubblico'] },
        { word: 'Festival', hint: ['Musica', 'Luce'] },
      ]
    },
    natura: {
      name: 'Natura',
      description: 'Parole che descrivono elementi naturali.',
      selected: false,
      items: [
        { word: 'Montagna', hint: ['Freddo', 'Animale'] },
        { word: 'Foresta', hint: ['Verde', 'Animale'] },
        { word: 'Fiume', hint: ['Acqua', 'Pesce'] },
        { word: 'Campo', hint: ['Erba', 'Terra'] },
        { word: 'Giardino', hint: ['Terra', 'Verde'] },
        { word: 'Onda', hint: ['Acqua', 'Suono'] },
        { word: 'Sabbia', hint: ['Mare', 'Terra'] }
      ]
    },
  })

  return { packets, currentGame }
})
