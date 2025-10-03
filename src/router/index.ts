import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewGameView from '../views/NewGameView.vue'
import Game from '../views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/new_game',
      name: 'newGame',
      component : NewGameView,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },  
  ],
})

export default router
