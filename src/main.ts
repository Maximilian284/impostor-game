import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/impostor_game/sw.js')
      .then((reg) => console.log('Service worker registrato:', reg))
      .catch((err) => console.error('Errore nel service worker:', err))
  })
}