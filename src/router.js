import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

// Altura de la barra fija, para que las secciones no queden tapadas al saltar a ellas
const HEADER_OFFSET = 96

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// El router ignora la navegación a la ruta en la que ya estás: si el visitante pulsa
// otra vez la misma sección después de moverse, se hace el scroll a mano
export const scrollIfCurrent = (hash) => {
  const current = router.currentRoute.value
  if (current.path !== '/' || current.hash !== hash) return

  const el = document.querySelector(hash)
  if (!el) return

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  })
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/blog/:slug', name: 'post', component: () => import('./views/BlogPost.vue') },
    { path: '/projects/:slug', name: 'project', component: () => import('./views/ProjectPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      // Al venir de otra página, espera a que la sección exista en el DOM
      const delay = from.name && from.name !== to.name ? 150 : 0

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            top: HEADER_OFFSET,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
          })
        }, delay)
      })
    }

    return { top: 0 }
  }
})
