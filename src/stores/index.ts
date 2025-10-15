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
        { word: 'Parco', hint: ['Terra', 'Verde'] },
        { word: 'Hotel', hint: ['Dormire', 'Sedia'] }, // migliorare dormire
        { word: 'Cinema', hint: ['Biglietto', 'Rumore'] },
        { word: 'Supermercato', hint: ['Scontrino', 'Zucchero'] },
        { word: 'Mare', hint: ['Costume', 'Medusa'] },
        { word: 'Museo', hint: ['Sedia', 'Guida'] }, 
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
      name: 'Attività ed Eventi',
      selected: false,
      items: [
        { word: 'Viaggio', hint: ['Valigia', 'Treno'] },
        { word: 'Festa', hint: ['Musica', 'Torta'] },
        { word: 'Lavoro', hint: ['Ufficio', 'Colleghi'] },
        { word: 'Cena', hint: ['Forchetta', 'Ristorante'] },
        { word: 'Concerto', hint: ['Palco', 'Cantante'] },
        { word: 'Gara', hint: ['Premio', 'Sfida'] },
        { word: 'Vacanza', hint: ['Hotel', 'Relax'] },
        { word: 'Allenamento', hint: ['Palestra', 'Sudore'] },
        { word: 'Esame', hint: ['Studio', 'Ansia'] },
        { word: 'Riunione', hint: ['Agenda', 'Parlare'] },
        { word: 'Matrimonio', hint: ['Abito', 'Fedi'] },
        { word: 'Spettacolo', hint: ['Pubblico', 'Applausi'] },
        { word: 'Lezione', hint: ['Professore', 'Lavagna'] },
        { word: 'Uscita', hint: ['Amici', 'Sera'] },
        { word: 'Passeggiata', hint: ['Scarpe', 'Strada'] },
        { word: 'Picnic', hint: ['Coperta', 'Cibo'] },
        { word: 'Riposo', hint: ['Letto', 'Silenzio'] },
        { word: 'Colloquio', hint: ['Domande', 'Curriculum'] },
        { word: 'Spesa', hint: ['Carrello', 'Supermercato'] }
      ]
    }
  })

  return { packets, currentGame }
})
