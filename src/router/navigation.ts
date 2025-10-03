import router from './index'  // importa l'istanza del router

/**
 * Funzione per navigare verso una view specifica
 * @param page - il nome della route definita nel router
 */
export function goToPage(page: string) {
  router.push({ name: page })
}