import { createRouter, createWebHistory } from 'vue-router'
import ConvertCSVtoJSON from '../views/ConvertCSVtoJSON.vue'

const DEFAULT_TITLE = 'Convert Pro - Free CSV, JSON, SVG Converter!'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: 'Convert Pro - CSV to JSON',
      },
      component: ConvertCSVtoJSON
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE
})

export default router
