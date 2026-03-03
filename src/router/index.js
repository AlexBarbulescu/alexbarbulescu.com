import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ProjectPage from '../pages/ProjectPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/work/:slug', name: 'project', component: ProjectPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, top: 90, behavior: 'smooth' }), 50)
      })
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
