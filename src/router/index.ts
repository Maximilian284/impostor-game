import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewGameView from '../views/NewGameView.vue'
import GameView from '../views/GameView.vue'
import HowToPlayView from '../views/HowToPlayView.vue'
import NotFoundView from '../views/NotFoundView.vue'

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
      component: GameView,
    },  
    {
      path: '/how_to_play',
      name: 'howToPlay',
      component: HowToPlayView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
})

export default router
